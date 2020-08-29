+++
date = "2011-07-06"
title = "Tooltips"
+++

We can demonstrate basic interactivity in gridSVG by drawing a plot that
produces tooltips. These tooltips appear whenever the mouse hovers over a
graphical element in the plot and the text within the tooltip features the name
of the grid graphics object that produced the element.

This tooltip demonstration was largely borrowed from [Paul
Murrell's](https://www.stat.auckland.ac.nz/~paul/)
[gridDebug](https://r-forge.r-project.org/projects/griddebug/) package,
specifically with regards to the `addTooltips()` function. A few modifications
were made to the implementation of `addTooltips()`, mostly with regards to the
JavaScript code and using the `onmousemove` event attribute instead of
`onmouseover`.

{{< html >}}
<object data="tooltips.svg" type="image/svg+xml"></object>
{{</ html >}}

One of the demos from the lattice package has been drawn, upon drawing we apply
the `addTooltips()` function to add tooltips to the plot. The effect of this is
that when hovering the mouse over a graphical element in the plot, we can see
the name of the grid graphics object that produced it.

* [Download the code](tooltips-code.zip)

## How It Works

{{< highlight r >}}
library(gridSVG)
{{< /highlight >}}

Here we are simply loading gridSVG.

{{< highlight r >}}
# Add tooltip attributes to a grob on the DL
garnishAllGrobs <- function(elt) {
    if (inherits(elt, "grob")) {
        garnishGrob(elt,
                    onmousemove = paste("showTooltip(evt, '",
                      gsub("\n", " ", elt$name), "')",
                      sep = ""),
                    onmouseout = "hideTooltip()")
    } else {
        elt
    }
}
{{< /highlight >}}

A function has been defined that, upon encountering a graphics object, adds
event attributes to it using `garnishGrob()` (see
[`grid.garnish()`]({{< ref "projects/gridsvg/docs/grid-garnish.md" >}})). The `onmousemove`
attribute has been added, and every time that event is triggered on an element,
it will execute the following JavaScript code: `showTooltip(evt, [name])`.
`[name]` is just the name of the graphics object that is being inspected.
Another attribute is added too, `onmouseout`, and when it is triggered, the
JavaScript code `hideTooltip()` is executed. These functions are yet to be
defined, so are currently assumed to exist when gridSVG attempts to write an
SVG file.

{{< highlight r >}}
addTooltips <- function(filename = "Rplots.svg") {
    grid.DLapply(garnishAllGrobs)
    grid.script(filename = "tooltip.js")
    grid.export(filename)
}
{{< /highlight >}}

This is where the previously defined functions are glued together to add
tooltips to a grid plot. Firstly we apply the `garnishAllGrobs()` function to
every element on the display list using `grid.DLapply()`. Now all of our graphics
objects have event attributes which will execute JavaScript code once
triggered. The definition of the JavaScript functions used in the event
attributes exists in `tooltip.js`, so we include it using
[`grid.script()`]({{< ref "projects/gridsvg/docs/grid-script.md" >}}). Once the
JavaScript has been included, we can write the grid plot an SVG image using `grid.export()`.

{{< highlight r >}}
library(lattice)
demo(lattice) # We're going to use demo #3
addTooltips("tooltips.svg")
{{< /highlight >}}

Here we're simply going to use the `lattice` package and use one of its demo
plots to illustrate tooltip usage. In particular we're going to draw the third
lattice demo. Once the demo has been drawn, we can add tooltips to the
plot by saving the plot as `tooltips.svg` with `addTooltips()`.
