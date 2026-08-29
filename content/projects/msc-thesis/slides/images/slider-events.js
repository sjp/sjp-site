// Wires the slider's mouse handlers via addEventListener (originally inline
// onmousedown/onmousemove/onmouseup attributes) so sliderplot-complete.svg
// complies with a script-src 'self' Content-Security-Policy (no 'unsafe-inline').
// thumbDown/mMove/mUp are defined in slider.js, loaded earlier in this SVG.
(function () {
  function wire() {
    var thumb = document.getElementById("thumb");
    var bg = document.getElementById("background.1-5-6-1");
    if (thumb) {
      thumb.addEventListener("mousedown", function (e) { thumbDown(e); });
      thumb.addEventListener("mousemove", function (e) { mMove(e, 4); });
      thumb.addEventListener("mouseup", function (e) { mUp(e); });
    }
    if (bg) {
      bg.addEventListener("mousemove", function (e) { mMove(e, 4); });
      bg.addEventListener("mouseup", function (e) { mUp(e); });
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire);
  } else {
    wire();
  }
})();
