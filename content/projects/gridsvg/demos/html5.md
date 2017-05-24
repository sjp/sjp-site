+++
date = "2011-07-06"
title = "HTML5 Interactivity"
+++

With the addition of the `<svg>` element to the HTML language in HTML5, we can
provide even more ways of interacting with an SVG image. Here I will be
demonstrating how the [Stock Ticker]({{< ref "projects/gridsvg/demos/stock-ticker.md" >}})
example can be modified to provide useful interactivity via HTML5.

The first step involved is to simply copy the SVG output from gridSVG, and
insert it directly into your HTML document. This method means we treat the SVG
image as part of the HTML document as the SVG image is contained entirely
within the `<svg>` HTML element.

The reason why this is used instead of of the `<object>` element snippet
produced by gridSVG is because web browsers treat the content within the
`<object>` element as being separate from the HTML document. This stops any
form of interaction between the contents of the HTML document and contents of
the `<object>` element (in this case, our SVG image).

After including the SVG image into an HTML document, we find that we are able
to modify the appearance and behaviour of the SVG image because it exists
within the same namespace as our HTML document. This means that we can use the
same CSS rules to apply styles to SVG images as we do with paragraphs and
headers. We also have the ability to modify the SVG image using JavaScript in a
similar manner to modifying any HTML element (i.e. we can use
`document.getElementById("...")` on the contents of SVG elements).

Below we have the [Stock Ticker]({[< ref "projects/gridsvg/demos/stock-ticker.md" >}})
example, but it is modified so that we can select which companies we wish to
show.

{{< html >}}
<div>
</div>

Select companies to be shown:

<label for="aaplcheck"><input type="checkbox" value="on" checked="checked" id="aaplcheck"> AAPL (Apple Inc.)</label>
<label for="amzncheck"><input type="checkbox" value="on" checked="checked" id="amzncheck"> AMZN (Amazon.com Inc.)</label>
<label for="googcheck"><input type="checkbox" value="on" checked="checked" id="googcheck"> GOOG (Google Inc.)</label>
<label for="msftcheck"><input type="checkbox" value="on" checked="checked" id="msftcheck"> MSFT (Microsoft Corporation)</label>
<script type="text/javascript">
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
</script>
{{< /html >}}

We can see that we are able to toggle the display of animated SVG lines by
binding their visibility to the value of HTML checkboxes. This demonstrates
that HTML elements can affect that appearance and behaviour of SVG images. It
is also the case that SVG images can affect that appearance and behaviour of
HTML. This may be useful in this stock ticker example because you could insert
additional information into an HTML page about a given company. For example,
you could click the line or perhaps the associated key in the legend in order
to insert into the HTML document a list of recent prices and recent news about
the company.

The stock ticker with HTML interactivity was accomplished using a relatively
small amount of code. After directly inserting the SVG content into this HTML
page I added a little bit of HTML to display checkboxes that will be used to
toggle visibility.

{{< highlight html >}}
<p>Select companies to be shown:</p>
<label for="aaplcheck">
    <input type="checkbox" value="on" checked="checked" id="aaplcheck"> AAPL (Apple Inc.)
</label>
<label for="amzncheck">
    <input type="checkbox" value="on" checked="checked" id="amzncheck"> AMZN (Amazon.com Inc.)
</label>
<label for="googcheck">
    <input type="checkbox" value="on" checked="checked" id="googcheck"> GOOG (Google Inc.)
</label>
<label for="msftcheck">
    <input type="checkbox" value="on" checked="checked" id="msftcheck"> MSFT (Microsoft Corporation)
</label>
{{< /highlight >}}

The next step was to bind the values of the checkboxes (i.e. checked or
unchecked) to the visibility of the appropriate SVG lines. I first inserted a
`<script>` element to declare that I will be doing this via JavaScript. Within
this `<script>` element I wrote the following code.

{{< highlight js >}}
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

// We're binding to the 'change' event
aaplshow.addEventListener('change', togglefn('GRID.polyline.1.1.1'), false);
amznshow.addEventListener('change', togglefn('GRID.polyline.1.1.2'), false);
googshow.addEventListener('change', togglefn('GRID.polyline.1.1.3'), false);
msftshow.addEventListener('change', togglefn('GRID.polyline.1.1.4'), false);
{{< /highlight >}}

The general steps I took were to first grab the checkbox elements so that I can
see whether they are checked or not. I then added event listeners to then to
run some code whenever the checkbox toggled between being checked or unchecked.
The code that would be run passes the name of the SVG line to be toggled (which
I knew in advance from the SVG image) to a function called `togglefn`. This
function grabs the SVG line and observes the value of the checkbox. If the
checkbox is checked, the line is visible, otherwise if the checkbox is not
checked, the line is set to be hidden.

Although this is a reasonably simple example, it demonstrates that gridSVG can
be used (along with some knowledge of HTML, CSS and JS) to produce highly
interactive graphics and documents.

<script async src="/scripts/gridsvg-scripts.js"></script>