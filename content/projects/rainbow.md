+++
date = "2012-07-18"
title = "Rainbow"
+++

[Rainbow](https://craig.is/making/rainbows/) is a lightweight syntax highlighter implemented in JavaScript.

I have added support for the R language and ported the pastie theme (with a few minor differences) from [Pygments](http://pygments.org/) to Rainbow. These changes have been incorporated by [Craig Campbell](https://craig.is/) in the [Rainbow GitHub repository](https://github.com/ccampbell/rainbow).

Due to the limitations of JavaScript's implementation of regular expressions, highlighting R output (like you would see in an R session, with prompts) is more challenging and thus was not attempted.

Try highlighting some R code for yourself! Enter code into the text area below, and momentarily the highlighted code will appear below.

{{< html >}}
<div>
<textarea id="rainbow-input" rows="15" cols="80">
# Simple sums of squares function
variance &lt;- function(x) {
  n &lt;- length(x)
  1 / (n - 1) * (sum(x^2) - (sum(x)^2 / n))
} 

# Lets see how good it is against synthetic data:
rand &lt;- rnorm(100, mean = 20, sd = 2)
mu &lt;- mean(rand)
v &lt;- variance(rand)
mu.diff &lt;- abs(20 - mu)
sd.diff &lt;- abs(2 - sqrt(v))</textarea>
<form style="margin-bottom: 2em">
<label for="rainbow-theme">Select theme</label>
<select name="themeselect" id="rainbow-theme">
<option value="all-hallows-eve">All Hallows Eve</option>
<option value="blackboard">Blackboard</option>
<option value="espresso-libre">Espresso Libre</option>
<option value="github">GitHub</option>
<option value="obsidian">Obsidian</option>
<option value="pastie" selected>Pastie</option>
<option value="solarized-dark">Solarized Dark</option>
<option value="solarized-light">Solarized Light</option>
<option value="sunburst">Sunburst</option>
<option value="tricolore">Tricolore</option>
<option value="twilight">Twilight</option>
<option value="zenburnesque">Zenburnesque</option>
</select>
</form>
<pre style="max-width: 100%"><code id="rainbow-output" data-language="r" style="width: 100%"></code></pre>
</div>

<script async src="js/rainbow-demo.js"></script>
{{< /html >}}

