---
layout: default
title: GOMstreamer
category: projects
---

<p class="warning">Note: This project is now <a href="/posts/retiring-gomstreamer">inactive</a>. Visit <a href="http://www.gomtv.net/">GOMtv</a> to watch GSL streams from now on.</p>

The GOMstreamer tool is used to allow Windows, OSX and Linux users to watch the [GOMtv GSL](http://www.gomtv.net/) via [VLC](https://www.videolan.org/vlc/). GOMstreamer was originally based on the prior work of [Tomas Herman](https://github.com/tomasherman) but has been updated to work on newer seasons' streams, along with the addition of new features. *Note: This requires a [GOMtv](http://www.gomtv.net/) account to work and the account must solely authenticate with GOMtv and not via a third party (e.g. Twitter, Facebook).*

There are two separate releases of GOMstreamer, one works in OSX and Linux while the other works solely on Windows.

* <a href="#gom-windows">Windows</a>
* <a href="#gom-osx">OSX</a>
* <a href="#gom-linux">Linux</a>

<h2 id="gom-windows">Windows</h2>

This release is called GOMstreamer.NET and requires .NET Framework 2.0 (or greater) to be installed. Any computer running XP, Vista or 7 should be able to run this fine.

### Download

{% gomnet v0.10.1 GOMstreamer.NET can be downloaded from my website %}. Because this is a binary release, the source has been made available on {% ghr sjp GOMstreamer.NET GitHub %}.

### Usage

Usage of GOMstreamer.NET is reasonably straightforward. Enter in the email address and password associated with your GOMtv account and select the location of VLC. If you want to watch the stream, set the mode to 'Play' to get VLC to play the GSL stream.

In order to schedule playback, follow the same instructions as for playing a stream, but set the mode to 'Scheduled Play'. This will allow you to set a time at which playback should start. The time is specified in *Korean* time (HH:MM 24H). GOMstreamer.NET will minimise to the system tray until 1 minute prior to the recording starts in order to stay out of the way.

Note: `GOMstreamer.exe` must reside in the same directory as `wget.exe` in order to execute correctly.

Example usage of GOMstreamer.NET is shown below:

[![Example of GOMstreamer.NET with a GSL stream.](/images/ss-gomstreamer-net.png =395x378)](/images/ss-gomstreamer-net.png)

<h2 id="gom-osx">OSX</h2>

### Download

The latest version of GOMstreamer for OSX can be {% gomtar v0.10.0 downloaded via GitHub %}.

### Usage

To use GOMstreamer, enter your GOMtv email and password into the `play.command` script, along with the stream quality you wish to use out of `SQTest`, `SQ` and `HQ` (*Note: only `SQTest` will be available unless your GOMtv account has a premium ticket*). Execute the script when the GSL stream is live.

Streams can be scheduled to play at a specific time. This is accomplished via the use of the `scheduled-play.command` script. Follow the same instructions as if you were playing the stream, but set the time at which the stream playback should begin in *Korean* time (HH:MM 24H).

<h2 id="gom-linux">Linux</h2>

### Download

The latest version of GOMstreamer for Linux can be {% gomtar v0.10.0 downloaded via GitHub %}.

### Usage

To use GOMstreamer, enter your GOMtv email and password into the `play.sh` script, along with the stream quality you wish to use out of `SQTest`, `SQ` and `HQ` (*Note: only `SQTest` will be available unless your GOMtv account has a premium ticket*). Execute the script when the GSL stream is live.

Streams can be scheduled to play at a specific time. This is accomplished via the use of the `scheduled-play.sh` script. Follow the same instructions as if you were play the stream, but set the time at which the stream playback should begin in *Korean* time (HH:MM 24H).

Here is an example of GOMstreamer in action:

[![Example of GOMstreamer with a GSL stream.](/images/ss-gomstreamer.png =683x920)](/images/ss-gomstreamer.png)
