// Externalised from an inline <script> in html5.md so the demo complies with a
// script-src 'self' Content-Security-Policy (no 'unsafe-inline').

// Grabbing all of the checkbox elements so that
// we can inspect whether they are checked or not
var aaplshow = document.getElementById("aaplcheck");
var amznshow = document.getElementById("amzncheck");
var googshow = document.getElementById("googcheck");
var msftshow = document.getElementById("msftcheck");

// Defining a function that checkes whether a checkbox is checked
// in order to toggle the visibility of a line in our SVG image
function togglefn(svgId) {
    return function () {
        var svgEl = document.getElementById(svgId);
        if (this.checked) {
            svgEl.style.visibility = "visible";
        } else {
            svgEl.style.visibility = "hidden";
        }
    };
}

// Going to be binding to the 'change' instead of the click event
// because we can ignore IE as it can't load the SVG image anyway
aaplshow.addEventListener('change', togglefn('GRID.polyline.1.1.1'), false);
amznshow.addEventListener('change', togglefn('GRID.polyline.1.1.2'), false);
googshow.addEventListener('change', togglefn('GRID.polyline.1.1.3'), false);
msftshow.addEventListener('change', togglefn('GRID.polyline.1.1.4'), false);
