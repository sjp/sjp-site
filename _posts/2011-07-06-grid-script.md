---
layout: default
title: grid.script
permalink: /projects/gridsvg/docs/grid-script/
---

<p class="notice">This documentation lags behind the latest version, use the documentation provided with the package for up to date information.</p>

The function `grid.script()` allows the inclusion of JavaScript text or files within an SVG image. When used in conjunction with [`grid.garnish()`](/projects/gridsvg/docs/grid-garnish/), `grid.script()` can define the behaviour of the SVG document with regards to interactivity.

The usage of the function is defined as follows:

{% highlight r %}
grid.script(script = NULL, filename = NULL)
{% endhighlight %}

Typical usage would be to include a JavaScript file (via the `filename` parameter), or perhaps include a character vector containing JavaScript code (using the `script` parameter). This is demonstrated below:

{% highlight rconsole %}
> # Loading gridSVG
> library(gridSVG)
> 
> # Including JavaScript using a character vector
> grid.script('alert("Demonstrating interactivity in gridSVG.");')
> 
> # Including JavaScript from a file called tooltips.js
> grid.script(filename = "tooltips.js")
{% endhighlight %}

While knowledge of JavaScript is required to perform interactivity, it is not an uncommon language and fortunately there is plenty of documentation available to learn it. A good resource for interacting with SVG via JavaScript is available at [carto:net](http://www.carto.net/papers/svg/samples/#iact).

Applications of `grid.script()` are shown in the [arrayQualityMetrics](/projects/gridsvg/demos/aqm/) and [Tooltips](/projects/gridsvg/demos/tooltips/) examples.
