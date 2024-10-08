+++
date = "2014-06-01"
title = "Multidimensional Scaling"
+++

This example starts off by showing a plot of european cities.  Each of the
cities are positioned so that the distances between each of them approximate
the distances between them by road. The source of the data comes from the
"eurodist" dataset, distributed with R. The positions of the cities are
calculated using multidimensional scaling. The `cmdscale` function was used to
perform this task.

A consequence of multidimensional scaling is that distances between points are
approximated and no longer represent their true distances. As a result, the
distances between cities can be distorted from their true distances.
Significant examples of distances which are inaccurate are Athens --- Rome, and
Cologne --- Geneva. This visualisation demonstrates this effect by showing the
true distances between a reference city and all other cities.

This example is an R-based re-implementation of a similar visualisation created
by Simon Barthelmé at [https://bl.ocks.org/4482115](https://bl.ocks.org/4482115).

The following video demonstrates the `mds` example found in the
`sjpMScThesis` package, which can be downloaded at my [Master's Thesis]({{< ref "projects/msc-thesis.md" >}}) page.
To run this example yourself, open R and run the following
command: `library(sjpMScThesis) ; thesisExample("mds")`

{{< html >}}
<video controls>
  <source src="multidimensional-scaling.mp4" type="video/mp4; codecs=avc1.64001E">
  <source src="multidimensional-scaling.webm" type="video/webm; codecs=vp8">
  <source src="multidimensional-scaling-iphone.mp4" type="video/mp4; codecs=avc1.42E01E">
</video>
{{</ html >}}

## Download

This video example is available in both MP4 (x264) and WebM formats:

* [MP4](multidimensional-scaling.mp4)
* [WebM](multidimensional-scaling.webm)
