(function() {
    if (!Modernizr.video) {
        var firstpar = document.querySelector('article p');
        var newnode = document.createElement('p');
        newnode.className = 'notice';
        newnode.innerHTML = 'Your browser does not appear to support video playback. Download the video using the links provided below.';
        firstpar.parentNode.insertBefore(newnode, firstpar);
    }
})();
