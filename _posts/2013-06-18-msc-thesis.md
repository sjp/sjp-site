---
layout: default
title: Masters Thesis
category: projects
---

During my Masters year I worked on a thesis entitled "Dynamic,
Interactive and Reactive Statistical Graphics for the Web". The
product of my thesis is a cohesive link between the powerful
interactive and graphical capabilities of a web browser, and the
statistical graphics and computing engine provided by
[R](http://www.r-project.org/). My thesis is available on
[ResearchSpace](http://hdl.handle.net/2292/20660) or on this website
by clicking the thumbnail below:

[![Masters Thesis](/projects/msc-thesis/msc-thesis.png =230x313)](/projects/msc-thesis/msc-thesis.pdf)

The basic idea is that while R is great for statistics, its graphics
engine does not support dynamic and interactive graphics such as those
created using [D3](http://d3js.org/). Additionally, while D3 is great
for dynamic and interactive graphics, we have to get statistical
information from elsewhere to visualise anything more than the most
basic of statistical models. To get the best of both approaches, I
further developed the `gridSVG` package to be a bridge between the
graphics provided by R and the interactivity and animation provided by
a web browser.

To cite this thesis, use the following BibTeX entry:

{% highlight bibtex %}
@MastersThesis{SJP2013,
    author = {Simon Potter},
    title  = {Dynamic, Interactive and Reactive Statistical Graphics for the Web},
    school = {The University of Auckland},
    year   = 2013
}
{% endhighlight %}

## Seminar

On the 27th of June 2013 I gave a seminar presentation at the
University of Auckland in the Department of Statistics. The slides can
be viewed by clicking the thumbnail below:

[![Seminar](/projects/msc-thesis/seminar.png =430x341)](/projects/msc-thesis/slides/seminar.html)

Some of the examples in the seminar were R web applications that were
running from my laptop. To view these examples, you will need to use
the `sjpMScThesis` package, which is available later in this page. The
examples I used were the following:

1. `loessStatic` on slide 11.
2. `loess` (or `loessShiny`, the effect is the same) on slide 34.
3. `arima` on slide 44.
4. `sampvarClean` on slide 54.

## Examples

Much of the content demonstrated in my Masters Thesis displays
animated and interactive content that are not adequately captured in
printed form. Furthermore, many of the examples also demonstrate the
use of R as a web server, which is central to the core idea of my
thesis.

I have made the examples shown in my thesis (and others) available as
an R package. This package is called `sjpMScThesis`, and the examples
within the package depend on a few packages being available on an R
installation. The following R command will install some of these
packages:

{% highlight r %}
install.packages(c("gridSVG", "ggplot2", "selectr",
                   "hexbin", "shiny", "Rook"))
{% endhighlight %}

There are further packages that require installation that are not
(yet) available on CRAN. These packages are `animaker` and the
companion package to my thesis `sjpMScThesis`. These are available
below:

## Download

### animaker

`animaker` is developed on {% ghr pmur002 animaker GitHub %} and is
not (yet) available on CRAN. The following links are simply builds
from the latest revision of the GitHub repository.

* Windows Binary: [animaker_0.1.zip](/projects/msc-thesis/animaker_0.1.zip)

* Package Source: [animaker_0.1.tar.gz](/projects/msc-thesis/animaker_0.1.tar.gz)

### sjpMScThesis

The `sjpMScThesis` package is developed on {% ghr sjp sjpMScThesis GitHub %}. The following links, like `animaker` are builds from the
latest revision of the GitHub repository.

* Windows Binary: [sjpMScThesis_1.1-0.zip](/projects/msc-thesis/sjpMScThesis_1.1-0.zip)

* Package Source: [sjpMScThesis_1.1-0.tar.gz](/projects/msc-thesis/sjpMScThesis_1.1-0.tar.gz)

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
