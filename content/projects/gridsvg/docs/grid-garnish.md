+++
date = "2011-07-06"
title = "grid.garnish"
+++

{{< important >}}This documentation may lag behind the latest version, use the documentation provided with the package for up to date information.{{</ important >}}

The function `grid.garnish()` allows a user to add arbitrary attributes to grid
graphics objects. These attributes are then applied to the SVG element that the
graphics object translates to. This is most useful for adding JavaScript event
attributes to grid graphics objects. Examples of such attributes are
`onmouseover`, `onmousemove`, `onclick` and `onmouseout`. The values of these
attributes are often JavaScript functions that are called when the appropriate
event is triggered. These functions can be defined and included with the use of
[`grid.script()`]({{< ref "projects/gridsvg/docs/grid-script.md" >}}).

The usage of the function is defined as follows (further parameters are
available to be viewed via `?grid.garnish`):

{{< highlight r >}}
grid.garnish(path, ..., group=TRUE)
{{< /highlight >}}

The key argument here is in fact `...`, which allows us to provide any named
argument and have it applied to the `path`. By providing an argument with any
name or value we like, we are essentially adding attributes to the SVG that
will be generated.

The application of this function is going to be demonstrated with the use of
the `onclick` event attribute on a graphics object.

{{< highlight r >}}
> # Loading grid and gridSVG
> library(grid)
> library(gridSVG)
> 
> # Drawing a solid black rectangle
> grid.rect(width = 0.25, height = 0.25,
+           gp = gpar(fill = "black"))
> 
> # Determining the name of the rectangle
> grid.ls()
GRID.rect.1
> 
> # Adding interactivity for the event where a mouse click occurs on GRID.rect.1
> grid.garnish("GRID.rect.1",
+              onclick = "alert('Example of interactivity with gridSVG.')")
> 
> # Drawing to SVG
> grid.export("example.svg")
{{< /highlight >}}

When gridSVG processes `GRID.rect.1`, it will now attach an additional
attribute to it, `onclick`, holding the value of `alert(...);`. The resulting
SVG image can then be loaded into a browser. Although it appears identical to
what is shown in R's plotting window, upon clicking the rectangle we are shown
a dialog box with some text. By using `grid.garnish()` and `grid.script()`, it
is possible to produce complex interactive graphics with gridSVG. The resulting
image produced from the above example is shown below (try clicking on the
square):

{{< html >}}
<object data="../grid-garnish-example.svg" type="image/svg+xml"></object>
{{</ html >}}

While knowledge of JavaScript is required to perform interactivity, it is not
an uncommon language and fortunately there is plenty of documentation available
to learn it. A good resource for interacting with SVG via JavaScript is
available at [carto:net](http://www.carto.net/papers/svg/samples/#iact).

An example where `grid.garnish()` is demonstrated is in the
[Tooltips]({{< ref "projects/gridsvg/demos/tooltips.md" >}}) example where the SVG elements
produced from a graphics object cause the name of the graphics object to appear
as text in a tooltip.
