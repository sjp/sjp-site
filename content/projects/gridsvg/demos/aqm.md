+++
date = "2011-07-06"
title = "arrayQualityMetrics Figure"
+++

The
[arrayQualityMetrics](https://bioconductor.org/packages/release/bioc/html/arrayQualityMetrics.html)
package, authored by Audrey Kauffmann and Wolfgang Huber, can produce a report
on microarray quality metrics. Within these reports is a scatterplot of
principal components. The plot features interactivity by way of increasing the
size of a point once it is hovered over. arrayQualityMetrics produces this plot
through the use of the [SVGAnnotation](http://www.omegahat.org/SVGAnnotation/)
package.

An attempt has been made by [Paul
Murrell](https://www.stat.auckland.ac.nz/~paul/) to replicate this type of plot
(including interactivity) using gridSVG.

{{< html >}}
<object data="aqm.svg" type="image/svg+xml"></object>
{{</ html >}}

By hovering over each of the points, we are able to highlight the point by
enlarging it. Not only is the point enlarged, but the name of the point is
shown on the bottom-left of the plot.

* [Download the code](aqm-code.zip)

## How It Works

{{< highlight r >}}
library(grid)
library(lattice)
library(gridSVG)

PC1 <- runif(10, -40, 10)
PC2 <- runif(10, -20, 20)
group <- factor(sample(c("Estrogen Receptor Negative",
                         "Estrogen Receptor Positive"),
                       10, replace=TRUE))
{{< /highlight >}}

The way in which this example works is we first get our data and store it in
the variables `PC1`, `PC2` and `group`.

{{< highlight r >}}
customPanel <- function(x, y, groups, ...) {
    grps <- levels(groups)
    for (i in 1:length(grps)) {
        index <- which(groups == grps[i])
        xx <- x[index]
        yy <- y[index]
        for (j in 1:length(xx)) {
            grid.circle(xx[j], yy[j], r = unit(1, "mm"),
                        default.unit = "native",
                        name = paste("point", index[j], sep = "."),
                        gp = gpar(col = NA,
                          fill = trellis.par.get("superpose.symbol")$col[i]))
        }
    }
}
{{< /highlight >}}

We then define a function, `customPanel()`, which will drawing all of the
points in the plot. We will be using a a `circleGrob` to draw the points
because we know that it will be translated to an SVG `<circle />`. These
circles have a naming scheme applied to them so that we can reference them
later, which is simply `point.[index]`.

{{< highlight r >}}
xyplot(PC2 ~ PC1, group = group,
       panel = customPanel,
       key = list(rect = list(col = trellis.par.get("superpose.symbol")$col[1:2]),
                  text = list(label = levels(group))))
{{< /highlight >}}

The lattice package's `xyplot()` function is used to draw the plot. Note that we
are using the `customPanel` function as defined earlier to draw the contents of
the main panel.

{{< highlight r >}}
for (i in 1:10) {
    grid.text(paste("ARRAY", i), x = 0.1, y = 0.01,
              just = c("left", "bottom"),
              name = paste("label", i, sep = "."),
              gp = gpar(fontface = "bold.italic"))
}
{{< /highlight >}}

We then draw 10 of grid's `textGrob`s to show the name of each of the
associated points. Each of the text labels are drawn at the bottom-left of the
plot. These `textGrob`s also have a naming scheme applied to them, the names
applied are of the form `label.[index].1.1` (where index is 1---10). The plot
currently appears messy as several text labels are drawn on top of each other,
this will be remedied later.

{{< highlight r >}}
for (i in 1:10) {
    grid.garnish(paste("point", i, sep = "."), 
                 onmouseover = paste('highlight("', i, '.1.1")', sep = ""),
                 onmouseout = paste('dim("', i, '.1.1")', sep = ""))
    grid.garnish(paste("label", i, sep = "."),
                 visibility = "hidden")
}
{{< /highlight >}}

Given that we know the names of each of the points (`point.[index]`) and each
of the labels (`label.[index]`) we can use [`grid.garnish()`]({{< ref "projects/gridsvg/docs/grid-garnish.md" >}})
to modify them. We want to modify the points so that they are enlarged when
they are hovered over, while the text should be modified to appear only when a
corresponding point is hovered over. We garnish each of the points so that when
the mouse hovers over a point a JavaScript function will be called,
`highlight()`, which will enlarge the corresponding point. `highlight()` takes
a single parameter, the name of the element to highlight. Due to gridSVG's
grouping behaviour (see Section 4.1 of my [honours report](/files/sjp-hons-report.pdf)),
we know that the name of each of the points is `point.[index].1.1`, and this is
the name that is passed onto `highlight()`. To return each of the points to the
correct size once the mouse has left a given point, we apply another JavaScript
function, `dim()`. `dim()` is used similarly to `highlight()` and thus requires
no further explanation.

Although the points have been garnished so that the `highlight()` and `dim()`
functions resize points in response to mouse events, the text labels remain an
issue. To resolve this, we garnish each of the labels so that when viewing the
SVG file, the labels will be hidden. The `highlight()` and `dim()` functions
will be used to toggle visibility of the text label.

{{< highlight r >}}
grid.script(filename = "aqm.js", inline = TRUE)

grid.export("aqm.svg")
{{< /highlight >}}

We then simply include a text file, in this case `aqm.js`, that contains
JavaScript. By setting the `inline` argument to `TRUE`, we are ensuring that
the JavaScript code is embedded within the SVG image, making it easier to
distribute. The JavaScript file `aqm.js` defines the `highlight()` and `dim()`
functions that we are using to perform interactivity. Once this is included, we
can save the plot as SVG with `grid.export()`.
