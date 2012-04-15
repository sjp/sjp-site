(function() {
    if (!(Modernizr.svg && Modernizr.svgclippaths)) {
        var firstpar = document.getElementsByTagName('p')[0];
        var newnode = document.createElement('p');
        newnode.className = 'warning';
        newnode.innerHTML = '<strong>Warning:<\/strong> Your browser does not appear to support all of the features necessary to display this demo. As a result, the demonstration may not work as intended. The latest versions of <a href="http://www.google.com/chrome">Google Chrome<\/a>, <a href="http://www.mozilla.org/firefox/">Mozilla Firefox<\/a> or <a href="http://www.opera.com/browser/">Opera<\/a> should support all of the features required to view these demonstrations.';
        firstpar.parentNode.insertBefore(newnode, firstpar);
    }
})();
