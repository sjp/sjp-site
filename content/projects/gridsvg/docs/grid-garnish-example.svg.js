// Externalised from an inline onclick="alert(...)" handler in
// grid-garnish-example.svg so the example complies with a script-src 'self'
// Content-Security-Policy (no 'unsafe-inline'). The click target now carries a
// data-alert attribute and the handler is wired via addEventListener.
(function () {
  function wire() {
    var els = document.querySelectorAll("[data-alert]");
    for (var n = 0; n < els.length; n++) {
      (function (el) {
        var msg = el.getAttribute("data-alert");
        el.addEventListener("click", function () { alert(msg); });
      })(els[n]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire);
  } else {
    wire();
  }
})();
