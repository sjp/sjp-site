+++
date = "2014-06-01"
title = "LOESS Smoothing"
+++

This interactive LOESS smoothing example is one of the key motivating examples
in my thesis. LOESS smoothing is a commonly used technique that allows for a
trend to be made visible in a noisy dataset. The key parameter of interest is
the "span" parameter that determines the size of the spanning window used for
local regression. By setting a higher value of "span", more data points will be
used to construct the smoother at each point along the curve. This means the
LOESS curve will be more smooth than one constructed with a lower "span".

An HTML slider control allows us to change the value of the "span" parameter in
an easy manner. Setting "span" to a low value of 0.05 allows us to observe its
effect by transitioning the line to become more "noisy". Indeed, the spanning
window is so small that the LOESS curve is no longer a curve but a jagged line
that is drawn through each data point.

The following video demonstrates the `loess` example found in the
`sjpMScThesis` package, which can be downloaded at my [Master's Thesis]({{< ref "projects/msc-thesis.md" >}}) page.
To run this example yourself, open R and run the following
command: `library(sjpMScThesis) ; thesisExample("loess")`

{{< html >}}
<video controls>
  <source src="loess.mp4" type="video/mp4; codecs=avc1.64001E">
  <source src="loess.webm" type="video/mp4; codecs=vp8">
  <source src="loess-iphone.mp4" type="video/mp4; codecs=avc1.42E01E">
</video>
{{</ html >}}

## Download

This video example is available in both MP4 (x264) and WebM formats:

* [MP4](loess.mp4)
* [WebM](loess.webm)
