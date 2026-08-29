
    var VIT_FRAME_MIN = 22;
    var VIT_FRAME_MAX = 69;
    var vitFrameCounter = 22;
    var decrVitFrame = function() {
        if (vitFrameCounter > VIT_FRAME_MIN)
            vitFrameCounter -= 1;
        var newURL = "images/vit-frame-" + vitFrameCounter +
                     ".png";
        d3.select("#vit-frame-img")
            .attr("src", newURL);
    };
    var incrVitFrame = function() {
        if (vitFrameCounter < VIT_FRAME_MAX)
            vitFrameCounter += 1;
        var newURL = "images/vit-frame-" + vitFrameCounter +
                     ".png";
        d3.select("#vit-frame-img")
            .attr("src", newURL);
    };
    d3.select("#vit-frame-prev")
        .on("click", decrVitFrame);
    d3.select("#vit-frame-next")
        .on("click", incrVitFrame);
  