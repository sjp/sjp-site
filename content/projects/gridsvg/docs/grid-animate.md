+++
date = "2011-07-06"
title = "grid.animate"
+++

{{< important >}}To animate complex units, use the `animUnit()` function in gridSVG. Documentation on `animUnit()` is available in a [draft article](https://www.stat.auckland.ac.nz/~paul/gridSVG/gridsvg.pdf).{{</ important >}}

The function `grid.animate()` provides a user the ability to perform animation
on graphics objects. This is accomplished using SMIL animation and SVG's
`<animate />` element. While it is the case that all properties of graphics
objects can be animated, if support is available on a property of a graphics
object, we can smoothly animate that object's property over time.

The usage of the `grid.animate()` function is defined as follows (see
`?grid.animate` for more complete documentation):

{{< highlight r >}}
grid.animate(path, ..., 
             duration = 1, rep = FALSE, revert = FALSE,
             begin = 0, interpolate = "linear", group = FALSE)
{{< /highlight >}}

The key named arguments to this function are `path`, `duration`, `rep`,
`revert`, `begin` and `interpolate`. `path` is the grid path of the graphics object you wish to animate,
usually this is the same as the name of that graphics object. `duration` refers
to the length of the animation (in seconds), if left unspecified the animation
is assumed to last only 1 second. Animations can be repeated by setting `rep`
to `TRUE`, by default the value of this parameter is `FALSE`. The `revert`
parameter determines the behaviour of the graphics object if and when the
animation ends. If `revert` is set to `TRUE`, the animation reverts back to the
first value of the animation, otherwise (and by default) the animation finishes
on its final value. `begin` is a delay that refers to how many seconds that the
animation should wait before starting. Finally, `interpolate` described whether
animation transitions should occur smoothly (i.e. linearly) or immediately. The
`interpolate` can take one of two values, `"linear"` or `"discrete"`.

The most important argument to the `grid.animate()` function is `...`, which is
any property that you intend to animate and the values that are going to be
animated through. The animation values are taken in the form of an `animUnit`.
A simple example to use in place of `...` might be something like `x = animUnit(unit(1:5 / 10, "npc"))`.
This will smoothly animate a given graphics object along the `x` axis through `npc`
units of 0.1, 0.2, ..., 0.5. A more complete example is shown below:

{{< highlight r >}}
> # Loading grid and gridSVG
> library(grid)
> library(gridSVG)
> 
> # Creating two rectangles using one graphics object
> grid.rect(x = c(0.3, 0.7), y = 0.4,
+           width = 0.2, height = 0.2,
+           gp = gpar(fill = "black"))
> 
> # Finding out the name of the object, in this case
> # it is GRID.rect.1
> grid.ls()
GRID.rect.1
> 
> # Creating an animUnit which described y-position of our
> # rects at each point in time
> yunits <- animUnit(unit(c(rep(0.4, 3),
+                           0.4, 0.7, 0.4), "npc"),
+                    id = rep(1:2, each = 3))
> 
> # Animating our rectange object GRID.rect.1 along the
> # y axis using our animUnit yunits
> grid.animate("GRID.rect.1", y = yunits, rep = TRUE)
> 
> # Drawing to SVG
> grid.export("example.svg")
{{< /highlight >}}

We are demonstrating how to animate on two graphical elements that are created
from a single graphics object. In this case, we wish to animate the rectangle
object named `GRID.rect.1`, but only moving the second rectangle, leaving the
first rectangle in the same position.

The way in which we approach this is by creating a matrix of values to animate
through, we do this by using the `animUnit()` function. We give `animUnit` a
sequence of units to use, then tell it which time period and which sub-grob it
applies to. In our case, we are ensuring that the first rectangle (which has an
`id` of 1), stays at a `y` value of 0.4 for 3 time periods. The other
rectangle, whose `id` is 2, is going to be animated from 0.4, to 0.7, and back
to 0.4 again.

With our `animUnit` of `yunits` ready for use, we can apply it to `GRID.rect.1`
using the `grid.animate()` call above.

Now that this animation information has been added to `GRID.rect.1`,
gridSVG can write to SVG, applying the animation information associated with
`GRID.rect.1`. The resulting image is shown below.

![grid.animate Example Figure](../grid-animate-example.svg)
