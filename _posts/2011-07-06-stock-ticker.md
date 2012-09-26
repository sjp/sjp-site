---
layout: default
title: Stock Ticker
permalink: /projects/gridsvg/demos/stock-ticker/
---

A demo I have produced is that of a stock ticker. It draws lines representing the stock prices of a few companies over one year. I sourced the pricing data for well-known tech companies from [Google Finance](http://www.google.com/finance). The idea behind this demonstration is to show how animation can be applied to time series data, in particular with line graphs.

<object data="/projects/gridsvg/demos/stock-ticker/stock-prices.svg" type="image/svg+xml" width="810" height="567"></object>

We can see how the lines appear to "draw" themselves over time. Although this is a basic demonstration, it might appear more engaging to a casual observer than a static plot.

* [Download the code](/projects/gridsvg/demos/stock-ticker/stock-ticker.zip)
* <a id="toggle" href="#">Show me the code and how it works</a>

{% capture hiddencontent %}
{% highlight r %}
library(gridSVG)
library(ggplot2)

aapl <- read.csv("aapl.csv")
aapl$X.Date <- as.Date(aapl$X.Date, format="%d-%b-%y")
names(aapl)[1] <- "Date"

goog <- read.csv("goog.csv")
goog$X.Date <- as.Date(goog$X.Date, format="%d-%b-%y")
names(goog)[1] <- "Date"

amzn <- read.csv("amzn.csv")
amzn$X.Date <- as.Date(amzn$X.Date, format="%d-%b-%y")
names(amzn)[1] <- "Date"

msft <- read.csv("msft.csv")
msft$X.Date <- as.Date(msft$X.Date, format="%d-%b-%y")
names(msft)[1] <- "Date"

stockprices.df <- rbind(aapl, amzn, goog, msft)
{% endhighlight %}

All that we're really doing so far is just loading required libraries and data for later use. The data that we're going to be using to construct this plot is stored in `stockprices.df`.

{% highlight r %}
qplot(Date, Close, data=stockprices.df, group=Code, geom="line", colour=Code, log="y")
{% endhighlight %}

Here we're just drawing a basic line graph using ggplot2's `qplot` function. The stock's closing price is plotted against its date, and to draw multiple lines we group by the stock's code (i.e. GOOG for Google). In order to get lines that are reasonably close together we apply a log transform to the closing stock prices using `log="y"`. Upon executing this `qplot` function, we should have a nice static plot visible in a plotting window.

{% highlight r %}
# Find out what the name of the polyline is
grid.ls()

# Get the polyline
g <- grid.get("GRID.polyline.1")
gx <- split(g$x, g$id)
gy <- split(g$y, g$id)
m <- matrix("", nrow=length(gx[[1]]), ncol=length(unique(g$id)))
{% endhighlight %}

Now that a plot has been drawn, we want to modify it to that the lines are drawn over time. We are required to inspect the display list to work out what the grid names of those lines are. In this example, the lines are defined in a single grid polyline named `GRID.polyline.1`.

Knowing that `GRID.polyline.1` defines 4 lines, we need to manipulate its `x` and `y` coordinates so that we can define them for each visible line. To do this we use a matrix to store coordinate information, where the number of columns is determined by how many unique lines we have, and the rows by how many point coordinates we have in the line (though we assume this number is fixed for all lines).

{% highlight r %}
for (i in 1:length(unique(g$id))) {
  xs <- as.numeric(gx[[i]])
  ys <- as.numeric(gy[[i]])

  for (j in 1:length(xs)) {
    m[j, i] <- paste(c(xs[1:j], rep(xs[j], length(xs) - j)), ",",
                     c(ys[1:j], rep(ys[j], length(ys) - j)), " ", sep="", collapse="")
  }
}
{% endhighlight %}

We now iterate through our matrix, and for each line that our polyline defines we build that line up over time. The general approach we take is:

{% highlight r %}
grid.animate("GRID.polyline.1", points=m, duration=30, rep=TRUE)
gridToSVG("stock-ticker.svg")
{% endhighlight %}

We now annotate the polyline graphics object with the point animation data. The animation is intended to last 30 seconds and repeat once the animation completes. Upon annotating the graphics object we finish by getting gridSVG to draw the graphics object, saving it to `stock-ticker.svg`.

{% endcapture %}

<div id="gridsvg-code" style="display: none;">
{{ hiddencontent | markdownify }}
</div>

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
<script type="text/javascript" src="/scripts/gridsvg-slider.js"></script>
<script type="text/javascript" src="/scripts/gridsvg-modernizr.js"></script>
<script type="text/javascript" src="/scripts/svg-smil-detect.js"></script>
