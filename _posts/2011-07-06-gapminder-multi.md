---
layout: default
title: Gapminder - Multi Panel
permalink: /projects/gridsvg/demos/gapminder-multi/
---

A type of animated, interactive graphics was famously presented to the world by [Hans Rosling](http://en.wikipedia.org/wiki/Hans_Rosling) of the [Gapminder Foundation](http://www.gapminder.org/) in a [TED talk](http://www.ted.com/talks/hans_rosling_shows_the_best_stats_you_ve_ever_seen.html). The bubble plots that were presented clearly showed changes for several variables over time. [Paul Murrell](http://www.stat.auckland.ac.nz/~paul/) produced an animated `ggplot2` plot based on the Gapminder bubble plots. This demonstration is perhaps more informative as it separates countries into different continents and draws a separate panel for each continent. In doing so we can more easily see the variation within continents.

<object data="/projects/gridsvg/demos/gapminder-multi/gapminderMultiPanel.svg" type="image/svg+xml" width="810" height="567"></object>

We can see that over time, for all continents, the general trend is that as the number of children per woman decreases, it is associated with an increase in life expectancy. What is interesting is how it is possible to observe significant events such as wars occurring within each continent.

* [Download the code](/projects/gridsvg/demos/gapminder-multi/gapminder-multi.zip)

<script type="text/javascript" src="/scripts/gridsvg-modernizr.js"></script>
<script type="text/javascript" src="/scripts/svg-smil-detect.js"></script>