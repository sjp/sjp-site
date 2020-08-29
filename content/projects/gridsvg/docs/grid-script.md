+++
date = "2011-07-06"
title = "grid.script"
+++

{{< important >}}This documentation may lag behind the latest version, use the documentation provided with the package for up to date information.{{</ important >}}

The function `grid.script()` allows the inclusion of JavaScript text or files
within an SVG image. When used in conjunction with
[`grid.garnish()`]({{< ref "projects/gridsvg/docs/grid-garnish.md" >}}), `grid.script()` can
define the behaviour of the SVG document with regards to interactivity.

The usage of the function is defined as follows:

{{< highlight r >}}
grid.script(script = NULL, filename = NULL,
            type = "application/ecmascript",
            inline = FALSE, name = NULL)
{{< /highlight >}}

Typical usage would be to include a JavaScript file (via the `filename`
parameter), or perhaps include a character vector containing JavaScript code
(using the `script` parameter). The `inline` parameter is also useful as it can
enable JavaScript to be embedded within an SVG image, rather than linked to an
external resource (this is implied when using the `script` argument).  A
demonstration of `grid.script()` is shown below:

{{< highlight r >}}
> # Loading gridSVG
> library(gridSVG)
> 
> # Including JavaScript using a character vector
> grid.script('alert("Demonstrating interactivity in gridSVG.");')
> 
> # Including JavaScript from a file called tooltips.js
> grid.script(filename = "tooltips.js")
{{< /highlight >}}

Knowledge of JavaScript is required to perform interactivity, but it is not an
uncommon language and there is plenty of documentation available to learn it. A
good resource for interacting with SVG via JavaScript is available at
[carto:net](http://www.carto.net/papers/svg/samples/#iact).

Applications of `grid.script()` are shown in the
[arrayQualityMetrics]({{< ref "projects/gridsvg/demos/aqm.md" >}}) and
[Tooltips]({{< ref "projects/gridsvg/demos/tooltips.md" >}}) examples.
