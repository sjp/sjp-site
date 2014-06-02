---
layout: default
title: grid.hyperlink
permalink: /projects/gridsvg/docs/grid-hyperlink/
---
<p class="notice">This documentation may lag behind the latest version, use the documentation provided with the package for up to date information.</p>

The function `grid.hyperlink()` enables the use of hyperlinks within an SVG
image. By clicking an SVG element that contains a hyperlink, one can visit
another web page. This can be useful to link elements within an SVG image to
associated data sets and resources.

The usage of the function is defined as follows:

{% highlight r %}
grid.hyperlink(path, href, show = NULL, group = TRUE)
{% endhighlight %}

The necessary parameters to `grid.hyperlink()` are simply the grid path of the
graphics object (usually just the name of the object is sufficient) and the URL
that the object is going to link to. The `show` argument allows a link to open
in a new browser window or tab, by setting it to `"new"`. Setting `show` to
`"replace"` will ensure that the link opens in the same browser window or tab.
The `group` argument allows sub-grobs to given the same hyperlink when `TRUE`
or optionally a different hyperlink when `FALSE`.

An example of how this function is used is shown below:

{% capture democode %}
# Loading grid and gridSVG
library(grid)
library(gridSVG)

grid.text("SJP", name = "labeltext",
          gp = gpar(fontsize = 144, col = "lightblue"))
grid.hyperlink("labeltext", "https://sjp.co.nz/", show = "new")

# Drawing to SVG
grid.export("example.svg")
{% endcapture %}

{% highlight rconsole %}
> # Loading grid and gridSVG
> library(grid)
> library(gridSVG)
> 
> grid.text("SJP", name = "labeltext",
+           gp = gpar(fontsize = 144, col = "lightblue"))
> grid.hyperlink("labeltext", "https://sjp.co.nz/", show = "new")
> 
> # Drawing to SVG
> grid.export("example.svg")
{% endhighlight %}

Here we are drawing a text label. Upon clicking this label our browser will
load the address `https://sjp.co.nz/`.

The image produced by the example code is shown below:

<object data="/projects/gridsvg/docs/grid-hyperlink-example.svg" type="image/svg+xml" class="span-90pc"></object>

<script type="text/javascript" src="/scripts/gridsvg-scripts.min.js"></script>
