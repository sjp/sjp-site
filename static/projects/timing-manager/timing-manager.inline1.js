// Externalised from an inline <script> in timing-manager.html so the page
// complies with a script-src 'self' Content-Security-Policy (no 'unsafe-inline').
// Adding timing plots
timingPlot(timingData, "#declarative-timing", {
  width: 500,
  height: 500,
  caption: "A timing plot generated from exported timing information",
});

framePlot(timingData, "#frame-ex", {
  width: 500,
  height: 200,
  caption: "A frame-based animation",
});
