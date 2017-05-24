+++
date = "2011-07-06"
title = "Stock Ticker"
+++

A demo I have produced is that of a stock ticker. It draws lines representing
the stock prices of a few companies over one year. I sourced the pricing data
for well-known tech companies from [Google Finance](https://www.google.com/finance).
The idea behind this demonstration is to show how animation can be applied to
time series data, in particular with line graphs.

<img src="stock-prices.svg" alt="Stock Prices Example Figure" class="span-90pc">

We can see how the lines appear to "draw" themselves over time. Although this
is a basic demonstration, it might appear more engaging to a casual observer
than a static plot.

* [Download the code](stock-ticker.zip)
* <a id="gridsvg-code-toggle" href="#">Show me the code and how it works</a>

<div id="hidden-gridsvg-code">

{{< highlight r >}}
library(gridSVG)
library(grid)
library(scales)
library(ggplot2)

aapl <- read.csv("aapl.csv")
aapl$Date <- as.Date(aapl$Date, format = "%d-%b-%y")

goog <- read.csv("goog.csv")
goog$Date <- as.Date(goog$Date, format = "%d-%b-%y")

amzn <- read.csv("amzn.csv")
amzn$Date <- as.Date(amzn$Date, format = "%d-%b-%y")

msft <- read.csv("msft.csv")
msft$Date <- as.Date(msft$Date, format = "%d-%b-%y")

stockprices.df <- rbind(aapl, amzn, goog, msft)
{{< /highlight >}}

All that we're really doing so far is just loading required libraries and data
for later use. The data that we're going to be using to construct this plot is
stored in `stockprices.df`.

{{< highlight r >}}
qplot(Date, Close, data = stockprices.df, group = Code, geom = "line",
      colour = Code) +
    scale_y_log10(breaks = trans_breaks('log10', function(x) 10^x),
                  labels = trans_format('log10', math_format(10^.x)))
{{< /highlight >}}

Here we're just drawing a basic line graph using `ggplot2`'s `qplot()`
function. The stock's closing price is plotted against its date, and to draw
multiple lines we group by the stock's code (i.e. "GOOG" for Google). In order to
get lines that are reasonably close together we apply a log transform to the
closing stock prices using the `scale_y_log10()` function. Upon executing this
`qplot()` function, we should have a nice static plot visible in a plotting
window.

{{< highlight r >}}
# Find out what the name of the polyline is
grid.force()
grid.ls()

# Get the polyline
g <- grid.get("GRID.polyline.1")
gx <- split(g$x, g$id)
gy <- split(g$y, g$id)
nTimeIntervals <- length(gx[[1]])
nPointsOverTime <- nTimeIntervals^2
nGroups <- length(unique(g$id))
{{< /highlight >}}

Now that a plot has been drawn, we want to modify it to that the lines are
drawn over time. We are required to inspect the display list to work out what
the grid names of those lines are. In this example, the lines are defined in a
single grid polyline named `GRID.polyline.1`.

Knowing that `GRID.polyline.1` defines 4 lines, we need to manipulate its `x`
and `y` coordinates so that we can define them for each visible line. To do
this we use matrices to store coordinate information, where the number of
columns is determined by how many unique lines we have, and the rows by how
many point coordinates we have in the line (though we assume this number is
fixed for all lines). The way we do that in gridSVG is by using the
`animUnit()` function. We want to describe how the `x` and the `y` units
animate over time for each of the lines.

{{< highlight r >}}
# Preallocating vectors
animid <- rep(1:4, each = nPointsOverTime)
animx <- numeric(nPointsOverTime * nGroups)
animy <- numeric(nPointsOverTime * nGroups)

for (i in seq_len(nGroups)) {
  xs <- as.numeric(gx[[i]])
  ys <- as.numeric(gy[[i]])

  indexRange <- (i - 1) * (length(xs) * length(xs)) +
                seq_along(rep(xs, length(xs)))
  newxs <- numeric(length(indexRange))
  newys <- numeric(length(indexRange))

  for (j in seq_along(xs)) {
    innerIndexRange <- (j - 1) * length(xs) + seq_along(xs)
    newxs[innerIndexRange] <- c(xs[seq_len(j)], rep(xs[j], length(xs) - j))
    newys[innerIndexRange] <- c(ys[seq_len(j)], rep(ys[j], length(ys) - j))
  }

  animx[indexRange] <- newxs
  animy[indexRange] <- newys
}
{{< /highlight >}}

The key idea of what is happening here is that we want to build up to a
complete definition of an `x` or `y` coordinate for a line. However, for time
period 1, we want the last value (i.e. the first value in this case) to pad the
rest of the vector. For time period 2, this means that we have the first two
values defined, then the rest are just repeating the second value (and so on). To
illustrate, see the matrix below. 

{{< highlight rconsole >}}
   x1 x2 x3 x4 x5
t1  1  1  1  1  1
t2  1  2  2  2  2
t3  1  2  3  3  3
t4  1  2  3  4  4
t5  1  2  3  4  5
{{< /highlight >}}

See how at time period 3 the third value is repeated? We want to repeat this
process for each `x` and each `y` over all time periods. Moreover, we want to
do this for each of the four lines. This is the purpose of the `for` loop
earlier.

{{< highlight r >}}
unitxs <- animUnit(unit(animx, "native"),
                   timeid = rep(seq_len(nTimeIntervals),
                                nTimeIntervals * nGroups),
                   id = rep(seq_len(nGroups),
                            each = nPointsOverTime))
unitys <- animUnit(unit(animy, "native"),
                   timeid = rep(seq_len(nTimeIntervals),
                                nTimeIntervals * nGroups),
                   id = rep(seq_len(nGroups),
                            each = nPointsOverTime))
{{< /highlight >}}

The entire purpose of the for loop earlier was so that we could describe our
animation in terms of `animUnit`s. An `animUnit` allows us to animate a unit
over time. What we are doing in this code fragment is describing how the units
are going to be distributed across time, and also the four sub-lines that the
polyline defines.

Given that `animUnit`s describe the positions of units in our animation, we can
now apply it to the polyline that we want to animate.

{{< highlight r >}}
grid.animate("GRID.polyline.1", x = unitxs, y = unitys,
             duration = 30, rep = TRUE)
grid.export("stock-ticker.svg")
{{< /highlight >}}

We now annotate the polyline graphics object with the `animUnit`s using
[`grid.animate()`]({{< ref "projects/gridsvg/docs/grid-animate.md" >}}). The
animation is intended to last 30 seconds and repeat once the animation
completes. Upon annotating the graphics object we finish by getting gridSVG to
draw the graphics object, saving it to `stock-ticker.svg`.

</div>

<script async src="/scripts/gridsvg-scripts.js"></script>
