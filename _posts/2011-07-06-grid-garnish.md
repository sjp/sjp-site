---
layout: default
title: grid.garnish
permalink: /projects/gridsvg/docs/grid-garnish/
---

<p class="warning"><em>Note</em>: this documentation lags behind the latest version, use the documentation provided with the package for up to date information.</p>

The function `grid.garnish` allows a user to add arbitrary attributes to grid graphics objects. These attributes are then applied to the SVG element that the graphics object translates to. This is most useful for adding JavaScript event attributes to grid graphics objects. Examples of such attributes are `onmouseover`, `onmousemove`, `onclick` and `onmouseout`. The values of these attributes are often JavaScript functions that are called when the appropriate event is triggered. These functions can be defined and included with the use of [`grid.script`](/projects/gridsvg/docs/grid-script/).

The usage of the function is defined as follows (further parameters are available to be viewed via `?grid.garnish`):

{% highlight r %}
grid.garnish(grobname, attribute=VALUE)
{% endhighlight %}

The application of this function is going to be demonstrated with the use of the `onclick` event attribute on a graphics object.

{% highlight rconsole %}
> # Loading gridSVG
> library(gridSVG)
Loading required package: grid
> 
> # Drawing a solid black rectangle
> grid.rect(width = 0.25, height = 0.25, gp = gpar(fill = "black"))
> 
> # Determining the name of the rectangle
> grid.ls() # GRID.rect.1
GRID.rect.1
> 
> # Adding interactivity for the event where a mouse click occurs on GRID.rect.1
> grid.garnish("GRID.rect.1", onclick = "alert('Example of interactivity with gridSVG.');")
> 
> # Drawing to SVG
> gridToSVG("example.svg")
{% endhighlight %}

When gridSVG processes `GRID.rect.1`, it will now attach an additional attribute to it, `onclick`, holding the value of `alert(...);`. The resulting SVG image can then be loaded into a browser. Although it appears identical to what is shown in R's plotting window, upon clicking the rectangle we are shown a dialog box with some text. By using `grid.garnish` and `grid.script`, there is the possibility for complex interactive graphics being produced by gridSVG. The resulting image produced from the above example is shown below (try clicking on the rectangle):

<object data="/projects/gridsvg/docs/grid-garnish-example.svg" type="image/svg+xml" width="568" height="567"></object>

While knowledge of JavaScript is required to perform interactivity, it is not an uncommon language and fortunately there is plenty of documentation available to learn it. A good resource for interacting with SVG via JavaScript is available at [carto:net](http://www.carto.net/papers/svg/samples/#iact).

Also note that due to gridSVG's behaviour regarding the grouping of graphics objects (as described in Section 4.1.1 of my [honours report](/files/sjp-hons-report.pdf)), garnishing is applied to a group of graphics objects. As a result of this, garnishing cannot currently occur on a single graphical element. This is an area in which `grid.garnish` may be improved in future, perhaps by behaving similarly to [`grid.animate`](/projects/gridsvg/docs/grid-animate/). However, a child element of the group will trigger appropriate events that a group is handling. An example where this is demonstrated is the [Tooltips](/projects/gridsvg/demos/tooltips/) example where the SVG elements produced from the same graphics object cause the same text in a tooltip to appear.

<script type="text/javascript" src="/scripts/gridsvg-modernizr.js"></script>
<script type="text/javascript" src="/scripts/svg-basic-detect.js"></script>
