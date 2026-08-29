// Externalised from an inline <script> in timing-manager.html so the page
// complies with a script-src 'self' Content-Security-Policy (no 'unsafe-inline').
var tm = new TimingManager(simpleAnim, "s");
var redAction = function (info) {
  d3.select("#redsq")
    .transition()
    .duration(info.durn * 1000)
    .attr("x", 400)
    .transition()
    .delay(info.durn * 1000)
    .attr("fill", "black");
};
var greenAction = function (info) {
  d3.select("#greensq")
    .transition()
    .duration(info.durn * 1000)
    .attr("x", 100)
    .transition()
    .delay(info.durn * 1000)
    .attr("fill", "black");
};
var blueAction = function (info) {
  d3.select("#bluesq")
    .transition()
    .duration(info.durn * 1000)
    .attr("x", 250)
    .transition()
    .delay(info.durn * 1000)
    .attr("fill", "black");
};
var finalAction = function (info) {
  d3.selectAll("#redsq, #greensq, #bluesq")
    .transition()
    .duration(info.durn * 1000)
    .attr({
      x: 250,
      y: 250,
      fill: "white",
    });
};

tm.register({
  red: redAction,
  green: greenAction,
  blue: blueAction,
  final: finalAction,
});

var figwrap = d3.select("#simple-ex").append("figure");
var controlDiv = figwrap.append("div").attr("class", "control-btns");
var playButton = controlDiv
  .append("button")
  .text("Play")
  .on("click", function (d) {
    d3.select("#redsq").attr({
      x: 100,
      y: 100,
      fill: "red",
    });
    d3.select("#greensq").attr({
      x: 400,
      y: 250,
      fill: "green",
    });
    d3.select("#bluesq").attr({
      x: 100,
      y: 400,
      fill: "blue",
    });
    tm.play();
  });

var plot = d3.select("#simple-ex figure").append("svg").attr({
  width: 500,
  height: 500,
});

var redsq = plot.append("rect").attr({
  id: "redsq",
  x: 100,
  y: 100,
  width: 20,
  height: 20,
  fill: "red",
  stroke: "none",
});

var greensq = plot.append("rect").attr({
  id: "greensq",
  x: 400,
  y: 250,
  width: 20,
  height: 20,
  fill: "green",
  stroke: "none",
});

var bluesq = plot.append("rect").attr({
  id: "bluesq",
  x: 100,
  y: 400,
  width: 20,
  height: 20,
  fill: "blue",
  stroke: "none",
});
