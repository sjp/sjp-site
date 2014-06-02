(function() {
    if (!(Modernizr.inlinesvg && Modernizr.smil && Modernizr.svg && Modernizr.svgclippaths)) {
        var firstpar = document.querySelector('article p');
        var newnode = document.createElement('p');
        newnode.className = 'notice';
        newnode.innerHTML = 'Your browser does not appear to support all of the features necessary to display this demo. As a result, the demonstration may not work as intended. The latest versions of <a href="https://www.google.com/chrome/browser/">Google Chrome<\/a>, <a href="https://www.mozilla.org/firefox/">Mozilla Firefox<\/a> or <a href="https://www.apple.com/safari/">Safari<\/a> should support all of the features required to view these demonstrations.';
        firstpar.parentNode.insertBefore(newnode, firstpar);
    }
})();
