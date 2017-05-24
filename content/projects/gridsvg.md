+++
date = "2011-07-06"
title = "gridSVG"
+++

[gridSVG](https://r-forge.r-project.org/projects/gridsvg/) is a package for
[R](https://www.r-project.org/) that turns a
[grid](https://www.stat.auckland.ac.nz/~paul/grid/grid.html) plot into an SVG
image. Under the supervision of [Dr. Paul
Murrell](https://www.stat.auckland.ac.nz/~paul/) I undertook both an honours
project, and a [Masters thesis](/projects/msc-thesis) developing gridSVG. A
basic illustration of how gridSVG differs from the built-in SVG device is shown
below.

<img src="images/gridsvg-diagram.png" width="380" height="304" alt="Instead of using grDevices to create an SVG image for a grid plot, gridSVG creates the image directly.">

The key advantage of using gridSVG is that new animated, interactive graphics
can be produced more easily and transparently than by using the Cairo-based SVG
device (see [SVGAnnotation](http://www.omegahat.org/SVGAnnotation/) for an
alternative approach that uses the SVG device). Because the
[lattice](https://r-forge.r-project.org/projects/lattice/) and
[ggplot2](http://ggplot2.tidyverse.org) packages use grid, gridSVG can add these
features to plots produced by these packages. gridSVG only works with grid
plots, to create animated and interactive plots from R's base graphics engine
see [SVGAnnotation](http://www.omegahat.org/SVGAnnotation/).

## Features

Here are a list of some key features that gridSVG is able to provide:

* Animation (`grid.animate()`)
* Hyperlinking (`grid.hyperlink()`)
* Interactivity (via JavaScript), see `grid.garnish()` and `grid.script()`
* SVG-specific features including:
    * Clipping paths (`grid.clipPath()`)
    * Custom fonts (`getSVGFonts()` and `setSVGFonts()`)
    * Gradients (`grid.gradientFill()`)
    * Masking (`grid.mask()`)
    * Patterns (`grid.patternFill()`)
    * Filters, e.g. blurring, lighting effects, drop shadows. (`grid.filter()`)
    * Custom elements, enabling content such as `<foreignObject>` elements to be included in a gridSVG image. (`grid.element()`)

## Download

* [Download gridSVG via CRAN](https://cran.r-project.org/package=gridSVG). To install gridSVG simply run `install.packages("gridSVG")` from within R.
* [Download development version of gridSVG via R-Forge](https://r-forge.r-project.org/projects/gridsvg/) (not recommended)

## Documentation

<p class="notice">This documentation may lag behind the latest version and is not intended to be canonical. Use the documentation provided with the package for up to date documentation.</p>

Some documentation of the behaviour of gridSVG is available below. This is
provided to give visual demonstrations as well as functioning as documentation.

* [`grid.animate`]({{< ref "projects/gridsvg/docs/grid-animate.md" >}})
* [`grid.garnish`]({{< ref "projects/gridsvg/docs/grid-garnish.md" >}})
* [`grid.hyperlink`]({{< ref "projects/gridsvg/docs/grid-hyperlink.md" >}})
* [`grid.script`]({{< ref "projects/gridsvg/docs/grid-script.md" >}})
* [`(get|set)SVGFonts`]({{< ref "projects/gridsvg/docs/get-set-svgfonts.md" >}})

## Demonstrations

Demonstrations of the potential of gridSVG are linked below. A modern web
browser is required to view these images. [Google Chrome](https://www.google.com/chrome/browser/),
[Mozilla Firefox](https://www.mozilla.org/firefox) and [Apple Safari](https://www.apple.com/safari)
are all capable of viewing these examples. More recently, web browsers on
Android and iOS have become capable of viewing the examples.

* [Tooltips]({{< ref "projects/gridsvg/demos/tooltips.md" >}})
* [arrayQualityMetrics Figure]({{< ref "projects/gridsvg/demos/aqm.md" >}})
* [Teaching Example]({{< ref "projects/gridsvg/demos/wildanim.md" >}})
* [Stock Ticker]({{< ref "projects/gridsvg/demos/stock-ticker.md" >}})
* [Gapminder --- Single Panel]({{< ref "projects/gridsvg/demos/gapminder-single.md" >}})
* [Gapminder --- Multi Panel]({{< ref "projects/gridsvg/demos/gapminder-multi.md" >}})
* [HTML5 Interactivity]({{< ref "projects/gridsvg/demos/html5.md" >}})

Further examples of gridSVG have been created as part of my
[Masters Thesis]({{< ref "projects/msc-thesis.md" >}}) (see 'Examples' in the
previous link). In particular these can be run via the `sjpMScThesis` package
that is a companion package to my thesis. The key difference that these
examples offer is that the content of the gridSVG image is being updated via an
R web server, enabling reactive statistical graphics.
