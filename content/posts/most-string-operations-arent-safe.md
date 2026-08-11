+++
date = "2026-08-11"
title = "Most string operations aren't safe"
+++

I have been doing common string operations incorrectly for most of my career, and I suspect you have too.

Take this truncation function:

```csharp
public static string Truncate(string value, int maxLength)
{
    return value.Length > maxLength
        ? value.Substring(0, maxLength)
        : value;
}
```

Looks fine. Here's what it does with a string containing an emoji:

```csharp
var hello = "hello! 👋 nice to meet you";
Console.WriteLine(Truncate(hello, 8)); // prints "hello! �"
```

The output should have been `hello! 👋`, but instead the emoji became a replacement character (U+FFFD: `�`). Something clearly went wrong.

This second failure is more subtle:

```csharp
var hello = "hi 👋🏽";
Console.WriteLine(Truncate(hello, 5)); // prints "hi 👋"
```

We silently dropped the skin tone modifier! The output still has a waving hand, but it's the wrong one. This kind of error is easily missed.

The root cause isn't specific to truncation. Any operation that treats a string as a sequence of positions is simply working on the wrong unit. This includes slicing, indexing, measuring length, splitting, reversing.

My examples are all in C# and JavaScript but the ideas carry over to any language you'll use.

## Why you can't avoid it

The tempting response is to validate lengths upfront and reject anything too long. If nothing needs truncating, we won't encounter the bug in the first place.

That works when you own the full data lifecycle. It doesn't work in a very common situation: integrating with a third-party system that has its own field length limits.

Consider a scenario where you have a product catalogue with descriptions of varying lengths, and you need to push them to a partner API that caps descriptions at 100 characters. You have thousands of products. At some point, something is going to truncate.

Even without third-party integrations, anyone who has used SQL Server knows this error:

> String or binary data would be truncated.

Most SQL databases let you define string columns with a maximum length e.g. `varchar(100)` or `nvarchar(100)`. Attempting to insert a value that exceeds the limit causes the query to fail. These length limits consequently propagate to the application layer, and something eventually has to fit the data to the constraint.

## What is a "character"?

The core problem is that a string isn't a sequence of characters, at least not in the way most developers are used to.

Unicode is the standard that catalogues every known character and assigns each one a number called a *code point*, referenced as `U+` followed by a hex number. The waving hand emoji 👋 is code point `U+1F44B`. There are over a million possible code points.

To actually store code points in memory, you need an *encoding*. An encoding translates a code point into one or more *code units*, the raw values a computer reads and writes. The two most common encodings are UTF-8 (8-bit code units) and UTF-16 (16-bit code units).

Some code points require more than one code unit. In UTF-16, 👋 is two code units: `D83D DC4B`. In UTF-8, it's four: `F0 9F 91 8B`. We can see that there's clearly a different byte-level representation of the same codepoint, despite occupying the same amount of storage space.

In C# and JavaScript, strings are sequences of UTF-16 code units. That's what `string.Length` and `s.length` count, meaning that 👋 has a string length of 2 in those languages.

## Graphemes

Some characters that appear as a single unit on screen are actually made of multiple code points. These are called *graphemes*. Combining diacritics are a common example as ü can be represented as the letter u (U+0075) followed by a combining diaeresis (U+0308):

* u + ◌̈ → ü (U+0075 U+0308)
* n + ◌̃ → ñ (U+006E U+0303)
* u + ◌̈ + ◌̃ → ü̃ (U+0075 U+0308 U+0303)

The *zero-width joiner* (<abbr title="zero-width joiner">ZWJ</abbr>, U+200D) can be used to combine emoji into new ones:

* 👨 + <abbr title="zero-width joiner">ZWJ</abbr> + 🍼 → 👨‍🍼 (U+1F468 U+200D U+1F37C)
* 👩 + <abbr title="zero-width joiner">ZWJ</abbr> + 🍼 → 👩‍🍼 (U+1F469 U+200D U+1F37C)

Country flag emoji are built from *regional indicator symbols*, one per letter in the country code:

* 🇦🇺: regional indicator A (U+1F1E6) + regional indicator U (U+1F1FA)
* 🇺🇸: regional indicator U (U+1F1FA) + regional indicator S (U+1F1F8)

Any sequence of one or more code points that renders as a single visible character is a *grapheme*. The hierarchy is:

* A *grapheme* is what you see as one character, e.g. 🇦🇺
* A *grapheme* is made of one or more *code points*, e.g. U+1F1E6 and U+1F1FA
* A *code point* maps to one or more UTF-16 *code units*, e.g. `D83C DDE6` and `D83C DDFA`

## You can't trust `.length`

Every row below is one visible character. It shows what each of the three layers look like, and also demonstrating that the number of code units is what `.length` actually reports:

<div class="table-scroll">

| String | Contents | Graphemes | Code points | `.length` |
|:------:|----------|:---------:|:-----------:|:---------------------:|
| ü | u + combining diaeresis | 1 | 2 | 2 |
| ñ | n + combining tilde | 1 | 2 | 2 |
| ü̃ | u + diaeresis + tilde | 1 | 3 | 3 |
| 👨‍🍼 | man + <abbr title="zero-width joiner">ZWJ</abbr> + baby bottle | 1 | 3 | 5 |
| 👩‍🍼 | woman + <abbr title="zero-width joiner">ZWJ</abbr> + baby bottle | 1 | 3 | 5 |
| 🇦🇺 | regional indicators A + U | 1 | 2 | 4 |
| 🇺🇸 | regional indicators U + S | 1 | 2 | 4 |

</div>

You can verify in a JavaScript console:

```js
"ü".length;  // 2
"ñ".length;  // 2
"ü̃".length;  // 3
"👨‍🍼".length; // 5
"👩‍🍼".length; // 5
"🇦🇺".length; // 4
"🇺🇸".length; // 4
```

The values are identical in C# as both languages store strings as sequences of UTF-16 code units.

## What string operations are really doing

With this foundation, the opening failures make sense.

When `Truncate("hello! 👋 nice to meet you", 8)` slices at code unit 8, it cuts through the middle of 👋's two-code-unit representation (`D83D DC4B`), leaving behind an orphaned `D83D`. That's not a valid UTF-16 sequence on its own, so it renders as the replacement character (U+FFFD).

The skin tone example is more instructive. `"hi 👋🏽"` breaks down like this:

<div class="table-scroll">

| Position | Code unit | Part of |
|:--------:|-----------|---------|
| 0 | `0068` | h |
| 1 | `0069` | i |
| 2 | `0020` | (space) |
| 3 | `D83D` | 👋 first surrogate |
| 4 | `DC4B` | 👋 second surrogate |
| 5 | `D83C` | 🏽 skin tone first surrogate |
| 6 | `DFFD` | 🏽 skin tone second surrogate |

</div>

Slicing at 5 code units yields a valid string as the 👋 surrogate pair is intact but the skin tone modifier is silently gone. There's not even a replacement character to indicate a wrong result.

Every positional string operation has this property as it acts on *code units*, not *graphemes*. A `Substring()` that doesn't produce `�` may still be dropping or stranding code points that belong together.

## Fixing string operations

The fix to problem is to use APIs that understand graphemes. Let's build up from the bottom.

### Enumerating characters

This is the naive and broken approach that most code probably looks like.

C#'s `foreach (char c in s)` and JavaScript's indexed loop both iterate over UTF-16 code units:

```csharp
string s = "héllo 👋";
foreach (char c in s)
{
    Console.WriteLine($"U+{(int)c:X4} {c}");
}
```

```js
const s = "héllo 👋";
for (let i = 0; i < s.length; i++) {
    const codeUnit = s.charCodeAt(i);
    const codeUnitHex = codeUnit.toString(16).toUpperCase().padStart(4, "0");
    console.log(`U+${codeUnitHex} ${s[i]}`);
}
```

Both produce:

```text
U+0068 h
U+00E9 é
U+006C l
U+006C l
U+006F o
U+0020  
U+D83D �
U+DC4B �
```

👋 was split into its two surrogate halves, neither of which is a valid character.

### Enumerating by code point

This is an improvement as code points keep surrogate pairs together, so 👋 appears as one unit instead of two broken halves.

C# has a `Rune` type that represents a single Unicode code point. `string.EnumerateRunes()` iterates over them:

```csharp
using System.Text;

string s = "héllo 👋";
foreach (Rune rune in s.EnumerateRunes())
{
    Console.WriteLine($"U+{rune.Value:X4} {rune}");
}
```

JavaScript's `for...of` loop already iterates by code point:

```js
const s = "héllo 👋";
for (const char of s) {
    const codePoint = char.codePointAt(0);
    const codePointHex = codePoint.toString(16).toUpperCase().padStart(4, "0");
    console.log(`U+${codePointHex} ${char}`);
}
```

Both produce:

```text
U+0068 h
U+00E9 é
U+006C l
U+006C l
U+006F o
U+0020  
U+1F44B 👋
```

👋 is one unit. But code points still aren't graphemes. Adding a skin tone modifier and causes the gap to reappear:

```text
U+1F44B 👋
U+1F3FD 🏽
```

Slicing between the grapheme's code points silently discards the skin tone.

### Enumerating by grapheme

This is what we're really looking for!

C# provides the `StringInfo` class that contains all of the information we need for graphemes. Importantly, `StringInfo.GetTextElementEnumerator` enumerates graphemes. Here's a helper extension method and a diagnostic printer, used for the rest of this post:

```csharp
using System.Globalization;

public static IEnumerable<string> EnumerateGraphemes(this string s)
{
    var enumerator = StringInfo.GetTextElementEnumerator(s);
    while (enumerator.MoveNext())
        yield return enumerator.GetTextElement();
}

public static void PrintGrapheme(string grapheme)
{
    foreach (char c in grapheme)
        Console.Write($"{(int)c:X4} ");
    Console.WriteLine(grapheme);
}
```

JavaScript's `Intl.Segmenter` with `granularity: "grapheme"` does the same. Here's the equivalent helper:

```js
const printGraphemeInfo = (s) => {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    for (const { segment } of segmenter.segment(s)) {
        const utf16 = [];
        for (let i = 0; i < segment.length; i++) {
            utf16.push(segment.charCodeAt(i).toString(16).toUpperCase().padStart(4, "0"));
        }
        console.log(`${utf16.join(" ")} ${segment}`);
    }
};
```

Now enumerate `"héllo 👋🏽"`:

```csharp
string s = "héllo 👋🏽";
foreach (var g in s.EnumerateGraphemes())
    PrintGrapheme(g);
```

```js
const s = "héllo 👋🏽";
printGraphemeInfo(s);
```

Both produce:

```text
0068 h
00E9 é
006C l
006C l
006F o
0020  
D83D DC4B D83C DFFD 👋🏽
```

👋🏽 is a single grapheme comprised of four UTF-16 code units but rendered as one character. Slicing is now safe.

Let's confirm with the flag and <abbr title="zero-width joiner">ZWJ</abbr> examples:

```csharp
foreach (var g in "zwj 👨‍🍼".EnumerateGraphemes()) PrintGrapheme(g);
foreach (var g in "flag 🇦🇺".EnumerateGraphemes()) PrintGrapheme(g);
```

```js
printGraphemeInfo("zwj 👨‍🍼");
printGraphemeInfo("flag 🇦🇺");
```

Both produce:

```text
007A z
0077 w
006A j
0020  
D83D DC68 200D D83C DF7C 👨‍🍼

0066 f
006C l
0061 a
0067 g
0020  
D83C DDE6 D83C DDFA 🇦🇺
```

The <abbr title="zero-width joiner">ZWJ</abbr> emoji and the flag each enumerate as a single unit.

### Correct string length

Counting graphemes follows directly from the enumeration approach.

C# exposes this directly on `StringInfo`:

```csharp
public static int GraphemeLength(this string s)
    => new StringInfo(s).LengthInTextElements;
```

JavaScript spreads the segmenter's output into an array and takes its length:

```js
const graphemeLength = (s) => {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return [...segmenter.segment(s)].length;
};
```

Compare the naive `length` against the grapheme count for `"hi 👋🏽"`:

```csharp
"hi 👋🏽".Length          // 7  (h + i + space + 4 code units for the emoji)
GraphemeLength("hi 👋🏽") // 4  (h, i, space, 👋🏽)
```

```js
"hi 👋🏽".length           // 7  (wrong)
graphemeLength("hi 👋🏽")  // 4  (correct)
```

### The correct `Truncate()`

Now we can make our naive `Truncate()` grapheme-aware. First we have to answer a question that we weren't aware of previously, truncate to what? We could mean *code units*, *code points*, or *graphemes*. Almost always you want code units or graphemes, and rarely code points.

Truncate by code units when you're targeting a storage size. Returning to the database example, if the string must fit in a `varchar(100)` then code units are what the limit counts.

Truncate by graphemes when the limit is user-visible. If your app trims a message preview to 50 characters, users expect 👋 to count as one. Code units would make it count as two.

#### Truncating by grapheme count

C# already has something which does most of the work for us: `StringInfo.SubstringByTextElements`, which takes a length in graphemes:

```csharp
using System.Globalization;

public static string TruncateByGraphemes(string value, int maxGraphemes)
{
    var info = new StringInfo(value);
    return info.LengthInTextElements <= maxGraphemes
        ? value
        : info.SubstringByTextElements(0, maxGraphemes);
}
```

In JavaScript, we can accumulate segments until the limit is reached:

```js
function truncateByGraphemes(value, maxGraphemes) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    let result = "";
    let count = 0;
    for (const { segment } of segmenter.segment(value)) {
        if (count >= maxGraphemes) break;
        result += segment;
        count++;
    }
    return result;
}
```

Back to the two failing examples from the beginning:

```csharp
Console.WriteLine(TruncateByGraphemes("hello! 👋 nice to meet you", 8)); // "hello! 👋"
Console.WriteLine(TruncateByGraphemes("hi 👋🏽", 5)); // "hi 👋🏽"
```

```js
console.log(truncateByGraphemes("hello! 👋 nice to meet you", 8)); // "hello! 👋"
console.log(truncateByGraphemes("hi 👋🏽", 5)); // "hi 👋🏽"
```

The first example now ends with the complete emoji. The second example returns the string unchanged as it has only 4 graphemes, so a limit of 5 truncates nothing.

#### Truncating to a code-unit limit

This is the case that matches the problems from the beginning of the post. An approach we can take is to accumulate as many graphemes as possible until we exceed our storage threshold.

For the C# example, let's reuse the `EnumerateGraphemes()` helper defined earlier where `grapheme.Length` gives its UTF-16 code-unit size:

```csharp
public static string TruncateToCodeUnits(string value, int maxCodeUnits)
{
    if (value.Length <= maxCodeUnits)
        return value;

    var result = new StringBuilder();
    int used = 0;
    foreach (var grapheme in value.EnumerateGraphemes())
    {
        if (used + grapheme.Length > maxCodeUnits)
            break;
        result.Append(grapheme);
        used += grapheme.Length;
    }
    return result.ToString();
}
```

In JavaScript `segment.length` is the UTF-16 code-unit size:

```js
function truncateToCodeUnits(value, maxCodeUnits) {
    if (value.length <= maxCodeUnits) return value;
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    let result = "";
    for (const { segment } of segmenter.segment(value)) {
        if (result.length + segment.length > maxCodeUnits) break;
        result += segment;
    }
    return result;
}
```

Back to the string that mangled at the top of the post, with the same limit of 8 code units:

```csharp
TruncateToCodeUnits("hello! 👋 nice to meet you", 8); // "hello! "
TruncateToCodeUnits("hello! 👋 nice to meet you", 9); // "hello! 👋"
```

```js
truncateToCodeUnits("hello! 👋 nice to meet you", 8); // "hello! "
truncateToCodeUnits("hello! 👋 nice to meet you", 9); // "hello! 👋"
```

With a limit of 8 code units, 👋 needs 2 code units and only 1 slot remains, so the emoji is dropped entirely rather than split. The result is 7 code units, a valid string that fits the limit. Increasing the limit to 9 allows us to fit the emoji exactly.

## Summary

Like I said at the top, I got this wrong for years. The problem was that despite being aware of many Unicode complexities I still treated a string as a sequence of characters, rather than a sequence of code units. Every positional operation, such as length, substring, split, reverse, works on code units instead of the characters you actually see.

Before you slice a string, first ask yourself whether you mean code units, code points, or graphemes?

For anything a human reads, the answer is almost always graphemes.

The grapheme-aware APIs already exist with `StringInfo` in .NET, `Intl.Segmenter` in the browser and Node.js. They're barely more code than the naive version and they don't mangle emoji.

Hardly anyone reaches for them, which means most codebases are carrying a latent string bug, quietly waiting for the right emoji to set it off.
