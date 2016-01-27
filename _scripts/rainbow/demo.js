(function () {
    var inputEl = document.getElementById("rainbow-input");
    var themeEl = document.getElementById("rainbow-theme");
    var outEl = document.getElementById("rainbow-output");
    
    // Creating the link to the stylesheet
    var themeLinkEl = document.createElement("link");
    themeLinkEl.rel = "stylesheet";
    themeLinkEl.type = "text/css";
    themeLinkEl.href = "/projects/rainbow/themes/pastie.css";
    themeLinkEl.media = "screen,print";
    var h = document.querySelector("head");
    h.appendChild(themeLinkEl);
    
    var changeTheme = function () {
        var themeName = themeEl.value;
        var themeHref = "/projects/rainbow/themes/" + themeName + ".css";
        themeLinkEl.href = themeHref;
    };
    
    var applyColour = function (e) {
        var target = e ? e.target : window.event.srcElement;
        Rainbow.color(target.value, 'r', function(code) {
            outEl.innerHTML = code;   
        });
    };
    
    inputEl.addEventListener('blur', applyColour, false);
    inputEl.addEventListener('keyup', applyColour, false);
    themeEl.addEventListener('change', changeTheme, false);
    
    // Lets initialise this!
    outEl.textContent = inputEl.value;
    Rainbow.color();
})();
