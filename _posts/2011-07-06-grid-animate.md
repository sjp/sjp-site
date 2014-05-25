---
layout: default
title: grid.animate
permalink: /projects/gridsvg/docs/grid-animate/
---

<p class="notice">To animate complex units, use the <code>animUnit()</code> function available in newer versions of gridSVG. Documentation on <code>animUnit()</code> is available in a <a href="https://www.stat.auckland.ac.nz/~paul/gridSVG/gridsvg.pdf">draft article</a>.</p>

The function `grid.animate()` provides a user the ability to perform animation on graphics objects. This is accomplished using SMIL animation and SVG's `<animate />` element. While it is the case that all properties of graphics objects can be animated, if support is available on a property of a graphics object, we can smoothly animate that object's property over time.

One thing to note when animating the position or dimensions of a graphics object is that a numeric matrix must be used to store these values. The numeric values are relative to the grid units used in the associated graphics object attribute. For example, if the `x` position of text is measured in inches, then animation of the `x` attribute must be done in inches. Currently there is no way in which complex grid units (i.e. units composed of two measurements such as inches and centimetres) can be animated. More information on this is available in Section 4.3 of my [honours report](/files/sjp-hons-report.pdf).

The usage of the `grid.animate()` function is defined as follows (see `?grid.animate` for more complete documentation):

{% highlight r %}
grid.animate(path, ..., duration = 1, id = "auto", rep = FALSE, revert = FALSE)
{% endhighlight %}

The key named arguments to this function are `path`, `duration`, `rep` and `revert`. `path` is the grid path of the graphics object you wish to animate, usually this is the same as the name of that graphics object. `duration` refers to the length of the animation (in seconds), if left unspecified the animation is assumed to last only 1 second. Animations can be repeated by setting `rep` to `TRUE`, by default the value of this parameter is `FALSE`. The `revert` parameter determines the behaviour of the graphics object if and when the animation ends. If `revert` is set to `TRUE`, the animation reverts back to the first value of the animation, otherwise (and by default) the animation finishes on its final value.

Note that `...` is any property that is to be animated and the values that are going to be animated through. The animation values are taken in the form of a matrix (as a single graphics object may require multiple SVG elements to represent it). A simple example to use in place of `...` might be something like `x = matrix(1:9 / 10)`. This will smoothly animate a given graphics object along the x axis through the values of 0.1, 0.2, ..., 0.9. A more complete example is shown below:

{% highlight rconsole %}
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
{% endhighlight %}

We are demonstrating how to animate on two graphical elements that are created from a single graphics object. In this case, we wish to animate the rectangle object named `GRID.rect.1`, but only moving the second rectangle, leaving the first rectangle in the same position.

The way in which we approach this is by creating a matrix of values to animate through, this matrix is `ymat`. Each column of `ymat` is the index of the graphical element produced. The first column represents values for the first rectangle and the second column for the second rectangle. When animating the `y` attribute, to keep the first rectangle at 0.4, we repeat that for all values in the first column of `ymat`. This means that it will be animated, but the animation keeps it in the same place. We are moving the second rectangle from 0.4, to 0.7, and back to 0.4 again, this is clearly shown in the second column of our `ymat` matrix.

After creating the `ymat` matrix, we apply it to our rectangle object `GRID.rect.1` using `grid.animate()`. The `y` attribute is being animated upon using the values held in `ymat`. In order to more easily demonstrate the animation, we ensure it is repeated by setting `rep` to `TRUE` in `grid.animate()`. Now that this information has been added to `GRID.rect.1`, gridSVG can write to SVG using the animation information associated with `GRID.rect.1`. The resulting image is shown below.

<object data="/projects/gridsvg/docs/grid-animate-example.svg" type="image/svg+xml" width="90%"></object>

<script type="text/javascript" src="/scripts/gridsvg-scripts.min.js"></script>
