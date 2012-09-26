---
layout: default
title: grid.hyperlink
permalink: /projects/gridsvg/docs/grid-hyperlink/
---
<p class="warning"><em>Note</em>: this documentation lags behind the latest version, use the documentation provided with the package for up to date information.</p>

The function `grid.hyperlink` enables the use of hyperlinks within an SVG image. By clicking an SVG element that contains a hyperlink, one can visit another web page. This can be useful to link elements within an SVG image to associated data sets and resources.

The usage of the function is defined as follows:

{% highlight r %}
grid.hyperlink(path, href)
{% endhighlight %}

The parameters to `grid.hyperlink` are simply the grid path of the graphics object (usually just the name of the object is sufficient) and the URL that the object is going to link to. An example of how this function is used is shown below:

{% highlight rconsole %}
> # Loading gridSVG
> library(gridSVG)
Loading required package: grid
> 
> grid.text("SJP", name = "labeltext",
+           gp = gpar(fontsize = 144, col = "lightblue"))
> grid.hyperlink("labeltext", "http://sjp.co.nz/")
> 
> # Drawing to SVG
> gridToSVG("example.svg")
{% endhighlight %}

Here we are drawing a text label. Upon clicking this label our browser will load the address `http://sjp.co.nz/`.

Note that due to grouping of graphics objects (as described in Section 4.1.1 of my [honours report](/files/sjp-hons-report.pdf)), hyperlinking is applied to all sub graphics objects. Consequently, we are unable to apply hyperlinks to individual SVG elements, only a group of them. This is an area in which `grid.hyperlink` may be improved in future, perhaps by behaving similarly to [`grid.animate`](/projects/gridsvg/docs/grid-animate/).

The image produced by the example code is shown below:

<object data="/projects/gridsvg/docs/grid-hyperlink-example.svg" type="image/svg+xml" width="568" height="567"></object>

<script type="text/javascript" src="/scripts/gridsvg-modernizr.js"></script>
<script type="text/javascript" src="/scripts/svg-basic-detect.js"></script>
