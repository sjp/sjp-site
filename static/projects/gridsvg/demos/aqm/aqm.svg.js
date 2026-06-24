// Externalised from the inline <script> and inline onmouseover/onmouseout
// handlers in aqm.svg so the interactive plot complies with a script-src 'self'
// Content-Security-Policy (no 'unsafe-inline'). The highlight/dim logic is
// unchanged (original author: Paul Murrell, gridSVG); the per-point handlers
// are now wired from data-highlight attributes via addEventListener.
(function () {
  function highlight(i) {
    var point = document.getElementById("point." + i);
    var label = document.getElementById("label." + i);
    point.setAttribute("r", point.getAttribute("r") * 2);
    label.setAttribute("visibility", "visible");
  }

  function dim(i) {
    var point = document.getElementById("point." + i);
    var label = document.getElementById("label." + i);
    point.setAttribute("r", point.getAttribute("r") / 2);
    label.setAttribute("visibility", "hidden");
  }

  function wire() {
    var els = document.querySelectorAll("[data-highlight]");
    for (var n = 0; n < els.length; n++) {
      (function (el) {
        var i = el.getAttribute("data-highlight");
        el.addEventListener("mouseover", function () { highlight(i); });
        el.addEventListener("mouseout", function () { dim(i); });
      })(els[n]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire);
  } else {
    wire();
  }
})();
