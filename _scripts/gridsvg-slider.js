(function() {
    var toggleEl = document.getElementById("gridsvg-code-toggle");
    var hiddenContentEl = document.getElementById("hidden-gridsvg-code");

    var toggleFn = function(evt) {
        // Toggling between Show/Hide text on link
        var str = toggleEl.textContent;
        if (str.charAt(0) === 'S') {
            toggleEl.textContent = 'Hide' + str.substring(7);
        } else {
            toggleEl.textContent = 'Show me' + str.substring(4);
        }
        
        hiddenContentEl.classList.toggle("is-visible");
    
        // Stopping the browser from loading the URL
        evt.preventDefault();
    };

    if (toggleEl && hiddenContentEl)
        toggleEl.addEventListener("click", toggleFn, false);
})();
