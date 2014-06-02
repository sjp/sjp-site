---
layout: default
title: Sampling Variation Teaching Visualisation
permalink: /projects/msc-thesis/examples/sampling-variation/
---

The [VIT (Visual Inference Tools) package](https://www.stat.auckland.ac.nz/~wild/VIT/)
creates animations that are used for teaching statistical concepts such as
bootstrap confidence interval construction, permutation testing and confidence
intervals. One of the animations it can create is used for teaching the concept
of sampling variation.

This example differs from the [LOESS]({% post_url 2014-06-01-loess %}) and
[ARIMA]({% post_url 2014-06-01-arima %}) examples because it requires far more
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
`sjpMScThesis` package, which can be downloaded at my [Master's Thesis]({% post_url 2013-06-18-msc-thesis %}) page.
To run this example yourself, open R and run the following
command: `library(sjpMScThesis) ; thesisExample("sampvar")`

<video controls class="span-90pc">
  <source src="/projects/msc-thesis/examples/sampling-variation/sampling-variation.mp4" type="video/mp4">
  <source src="/projects/msc-thesis/examples/sampling-variation/sampling-variation.webm" type="video/webm">
</video>

This video is best viewed in full-screen.

## Download

This video example is available in both MP4 (x264) and WebM formats:

* [MP4](/projects/msc-thesis/sampling-variation/sampling-variation.mp4)
* [WebM](/projects/msc-thesis/sampling-variation/sampling-variation.webm)

<script type="text/javascript" src="/scripts/video-detect.min.js"></script>
