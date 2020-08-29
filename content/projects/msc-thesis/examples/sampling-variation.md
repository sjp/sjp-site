+++
date = "2014-06-01"
title = "Sampling Variation Teaching Visualisation"
+++

The [VIT (Visual Inference Tools) package](https://www.stat.auckland.ac.nz/~wild/VIT/)
creates animations that are used for teaching statistical concepts such as
bootstrap confidence interval construction, permutation testing and confidence
intervals. One of the animations it can create is used for teaching the concept
of sampling variation.

This example differs from the [LOESS]({{< ref "projects/msc-thesis/examples/loess.md" >}}) and
[ARIMA]({{< ref "projects/msc-thesis/examples/arima.md" >}}) examples because it requires far more
coordination once data has been given to the browser. This additional
complexity is reduced immensely when the `animaker` package is used to describe
and apply the animation sequencing. This is a huge advantage that a gridSVG
implementation has over VIT. VIT has no way of keeping track of time because it
repeatedly draws as quickly as possible. This means that VIT animations vary in
length depending on how complex the grid scene is in addition to being
"choppy". These limitations are not present when animating SVG content because
we can declaratively say what, when and for how long graphical content is being
animated.

The following video demonstrates the `sampvar` example found in the
`sjpMScThesis` package, which can be downloaded at my [Master's Thesis]({{< ref "projects/msc-thesis.md" >}}) page.
To run this example yourself, open R and run the following
command: `library(sjpMScThesis) ; thesisExample("sampvar")`

{{< html >}}
<video controls>
  <source src="sampling-variation.mp4" type="video/mp4; codecs=avc1.64001E">
  <source src="sampling-variation.webm" type="video/webm; codecs=vp8">
  <source src="sampling-variation-iphone.mp4" type="video/mp4; codecs=avc1.42E01E">
</video>
{{</ html >}}

## Download

This video example is available in both MP4 (x264) and WebM formats:

* [MP4](sampling-variation.mp4)
* [WebM](sampling-variation.webm)