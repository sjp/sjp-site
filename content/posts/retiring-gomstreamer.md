+++
date = "2013-01-07"
title = "Retiring GOMstreamer"
+++

For the past couple of years I have been maintaining [GOMstreamer]({{< ref "projects/gomstreamer.md" >}}) so that those who wanted to watch the [GSL](http://www.gomtv.net/) could do so without the need for the GOM Player.

This was particularly useful for those on Linux or OSX who could not install the GOM Player (which only somewhat reliably worked on Windows).

After a short while I realised that Windows users would also find value in avoiding the installation of yet another media player. To this end I developed [GOMstreamer.NET](https://github.com/sjp/GOMstreamer.NET) in C#.

A lot of people have emailed me to thank me for developing GOMstreamer, I appreciate your support. I would also like to thank the code contributions and suggestions that others have given me.

Anyway, the main point of this post is that recent changes by GOMtv are such that GOMstreamer cannot adapt. As a result, I am making GOMstreamer inactive.

Fortunately the platforms I supported have access to Flash, which is all that is required to watch the GSL streams now. This is probably more convenient to most people than having to run a script and load VLC.

The main reason why GOMstreamer cannot adapt is the case is because stream is no longer a true stream. It is a series of chunks of a stream that are serviced by Akamai. Previously what happened was the GOM Player would manage to extract a valid stream URL which just happened to be a simple HTTP video stream. GOMstreamer's task was to collect this stream URL and get VLC to play it.

GOMstreamer cannot collect any of chunks of the new stream format and even if it could, it would not be able to continue collecting future chunks.

I'm glad that GOMtv have provided a convenient and accessible means of watching the GSL, allowing GOMstreamer to no longer be necessary. However, I am willing to revive this project *if* it becomes possible to fix GOMstreamer. If such a circumstance arises, please contact me.
