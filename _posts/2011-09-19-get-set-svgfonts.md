---
layout: default
title: (get|set)SVGFonts
permalink: /projects/gridsvg/docs/get-set-svgfonts/
---

The purpose of `getSVGFonts()` and `setSVGFonts()` is to provide a means of controlling the appearance of text within a web browser.

The usage of the functions are defined as follows:

{% highlight r %}
getSVGFonts()
setSVGFonts(fontStacks)
{% endhighlight %}

Normally in R a user can apply a specifc font using something like `grid.text("hello, world!", gp = gpar(fontfamily = "Helvetica")))` to draw text using the Helvetica font. Often this approach is fine as we can draw the text with the given font if it is available to R. However, a problem when viewing text on the web (like with SVG) is that the presence of a particular font cannot be assumed. `getSVGFonts()` and `setSVGFonts()` deal with this issue by allowing a user to define fallbacks for preferred fonts.

The way in which this is accomplished in SVG is through the use of CSS font stacks. A font stack defines a preference ordering for fonts. An example is shown below:

{% highlight r %}
font-family="Helvetica, Arial, ..., sans-serif"
{% endhighlight %}

This font stack tells the browser to first try using the Helvetica font and if that is not available, try Arial. If Arial cannot be applied, use the next most preferred font. This process could continue until `sans-serif` is reached. `sans-serif` is a special value that lets the browser use a default sans serif font that it knows about. This means we will always have a font applied, we just can't guarantee which font that might be.

A typical workflow for using `getSVGFonts()` and `setSVGFonts()` is shown below. The intent of this code is to use the [Inconsolata](http://www.levien.com/type/myfonts/inconsolata.html) font for monospaced text if possible.

{% capture democode %}
fonts <- getSVGFonts()
names(fonts)

fonts$mono <- "Inconsolata"
setSVGFonts(fonts)
grid.text("hello, world!" , gp = gpar(fontfamily = "mono"))
grid.export("newFont.svg")
{% endcapture %}

{% highlight rconsole %}
> fonts <- getSVGFonts()
> names(fonts)
[1] "sans" "serif" "mono"
> fonts$mono <- "Inconsolata"
> setSVGFonts(fonts)
> grid.text("hello, world!" , gp = gpar(fontfamily = "mono"))
> grid.export("newFont.svg")
{% endhighlight %}

The general process going on here is the following:

* Storing the currently set font stacks in a variable called `fonts`.
* Demonstrating that there are three font stacks, one for each of the different types of fonts that R handles.
* We then replace the value of the monospaced font stack with `Inconsolata` to use the Inconsolata font.
* Upon calling `setSVGFonts()` we now store the font stacks used to draw text.
* We now draw text using a monospaced font, this will trigger the use of the `mono` font stack.
* The `newFont.svg` file is then produced, which should show text with the Inconsolata font if it is available.

By using `getSVGFonts()` and `setSVGFonts()` we are able to provide a means of using a wide variety of fonts if they are available to the browser. The result of the example shown earlier is the SVG image that appears below:

<object data="/projects/gridsvg/docs/get-set-svgfonts-example.svg" type="image/svg+xml" class="span-90pc"></object>

<script type="text/javascript" src="/scripts/gridsvg-scripts.js"></script>
