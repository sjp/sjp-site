+++
date = "2014-06-01"
title = "Hexagonal Binning"
+++

Hexagonal binning is a technique used to show the density of a large number of
points. We can encode the density of the data in two ways. The first of which
is by colour, this means that more dense areas of the plot are encoded with
darker hexagons. The second is where we set the area of each hexagon to
correspond to the density within its locality. This means that more dense
regions have larger hexagons.

This example is a simple one which enables transitions between the two encodings.

The following video demonstrates the `hexbin` example found in the
`sjpMScThesis` package, which can be downloaded at my [Master's Thesis]({{< ref "projects/msc-thesis.md" >}}) page.
To run this example yourself, open R and run the following
command: `library(sjpMScThesis) ; thesisExample("hexbin")`

{{< html >}}
<video controls>
  <source src="hexagonal-binning.mp4" type="video/mp4; codecs=avc1.64001E">
  <source src="hexagonal-binning.webm" type="video/webm; codecs=vp8">
  <source src="hexagonal-binning-iphone.mp4" type="video/mp4; codecs=avc1.42E01E">
</video>
{{</ html >}}

## Download

This video example is available in both MP4 (x264) and WebM formats:

* [MP4](hexagonal-binning.mp4)
* [WebM](hexagonal-binning.webm)
