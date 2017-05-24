+++
date = "2014-06-01"
title = "Interactive ARIMA Model Diagnostics"
+++

This example is a tool created to ease model diagnostics when building ARIMA
time series models. There are three key parameters of interest: AR(p),
Differencing (d), and MA(q). When building models that have been constructed
using these parameters, plots showing the autocorrelation (ACF) and partial
autocorrelation (PACF) functions are very useful for assessing whether the
constructed models are a good fit.

This tool assists with the process of selecting an adequate ARIMA because it
not only shows what the ACF and PACF plots look like, but also transitions the
error lines in each plot to new positions. This allows easy comparison between
two models because the human eye is very good at detecting movement. Therefore,
we can more easily observe differences between two models when there are
transitions present than when comparing static images.

The following video demonstrates the `arima` example found in the
`sjpMScThesis` package, which can be downloaded at my [Master's Thesis]({{< ref "projects/msc-thesis.md" >}}) page.
To run this example yourself, open R and run the following
command: `library(sjpMScThesis) ; thesisExample("arima")`

<video controls class="span-90pc">
  <source src="arima.mp4" type="video/mp4; codecs=avc1.64001E">
  <source src="arima.webm" type="video/webm; codecs=vp8">
  <source src="arima-iphone.mp4" type="video/mp4; codecs=avc1.42E01E">
</video>

This video is best viewed in full-screen.

## Download

This video example is available in both MP4 (x264) and WebM formats:

* [MP4](arima.mp4)
* [WebM](arima.webm)

<script async src="/scripts/video-detect.js"></script>
