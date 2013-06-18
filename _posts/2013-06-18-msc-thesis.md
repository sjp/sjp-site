---
layout: default
title: Masters Thesis
category: projects
---

Much of the content demonstrated in my Masters Thesis (to be made
available at a later date) displays animated and interactive content
that are not adequately captured in printed form. Furthermore, many of
the examples also demonstrate the use of R as a web server, which is
central to the core idea of my thesis.

I have made the examples shown in my thesis (and others) available as
an R package. This package is called `sjpMScThesis`, and the examples
within the package depend on a few packages being available on an R
installation. The following R command will install some of these
packages:

{% highlight r %}
install.packages(c("ggplot2", "selectr", "hexbin", "shiny", "Rook"))
{% endhighlight %}

There are further packages that require installation that are not
(yet) available on CRAN. These packages are the latest version (1.2-0)
of `gridSVG`, a custom build of the `XML` package, along with
`animaker` and the companion package to my thesis
`sjpMScThesis`. These are available below:

## Download

### XML

A custom version of the `XML` package is required because of a couple
of issues that can cause segfaults. An attempt to fix this issue has
been made and is available below. However, it must be noted that this
is a temporary workaround until `XML` incorporates these changes,
which should later be pushed to CRAN (and thus available via
`install.packages()`).

* Windows Binary: *not yet available*

* Package Source: [XML_3.97-0.tar.gz](/projects/msc-thesis/XML_3.97-0.tar.gz)

### gridSVG (1.2-0)

This version of `gridSVG` should be more readily available, but it
depends upon the fixes made to `XML`. Consequently, the latest version
of the package is available here instead of on CRAN. This will
hopefully be corrected at a later date.

* Windows Binary: [gridSVG_1.2-0.zip](/projects/msc-thesis/gridSVG_1.2-0.zip)

* Package Source: [gridSVG_1.2-0.tar.gz](/projects/msc-thesis/gridSVG_1.2-0.tar.gz)

### animaker

`animaker` is developed on GitHub and is not (yet) available on
CRAN. The following links are simply builds from the latest revision
of the GitHub repository.

* Windows Binary: [animaker_0.1.zip](/projects/msc-thesis/animaker_0.1.zip)

* Package Source: [animaker_0.1.tar.gz](/projects/msc-thesis/animaker_0.1.tar.gz)

### sjpMScThesis

The `sjpMScThesis` package is developed on GitHub. The following
links, like `animaker` are builds from the latest revision of the
GitHub repository.

* Windows Binary: [sjpMScThesis_1.0-0.zip](/projects/msc-thesis/sjpMScThesis_1.0-0.zip)

* Package Source: [sjpMScThesis_1.0-0.tar.gz](/projects/msc-thesis/sjpMScThesis_1.0-0.tar.gz)

## Usage

Each of the examples in the `sjpMScThesis` package are designed not
only to be easy to use, but also to be easily modified or examined. If
you inspect the `examples` folder where the package was installed, you
will find each of the examples. They should all run outside of the
package with minimal modification (only relating to `source()` usage
and `Rook` port selection).

To run the "LOESS Smoother Example", all that is required is the
following code:

{% highlight R %}
library(sjpMScThesis)
thesisExample("loess")
{% endhighlight %}

To stop an example, simply call `stopThesisExample()`.

For a list of the available examples, see `listThesisExamples()`.

{% highlight rconsole %}
> listThesisExamples()
 arima: Interactive ARIMA Model Diagnostics
 hexbin: Hexagonal Binning Comparisons
 hexbinClean: 'hexbin' with no explanatory paragraphs
 loess: Interactive LOESS Smoothing
 ...
{% endhighlight %}

Examples can be configured using the `getExampleOptions()` and
`setExampleOptions()` functions. Consult the `sjpMScThesis` package
documentation via `?setExampleOptions` for more information.
