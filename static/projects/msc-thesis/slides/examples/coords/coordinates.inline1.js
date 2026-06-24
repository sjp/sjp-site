
        var btn = document.getElementById("pointbtn");
        var addPoint = function() {
            var panel = document.getElementById("panelvp.1");

            // Creating an SVG circle element
            var c;
            var np = document.getElementById("newpoint");
            if (np) {
                c = np;
            } else {
                c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            }
            
            c.setAttribute("id", "newpoint");
            // Setting some SVG properties relating to the appearance
            // of the circle
            c.setAttribute("stroke", "rgb(255,0,0)");
            c.setAttribute("fill", "rgb(255,0,0)");
            c.setAttribute("fill-opacity", 1);
            
            var xv = document.getElementById("xval").value;
            var yv = document.getElementById("yval").value;

            // Setting the location and radius of our points
            // via the gridSVG conversion functions
            c.setAttribute("cx", viewportConvertX("panelvp.1", xv, "native"));
            c.setAttribute("cy", viewportConvertY("panelvp.1", yv, "native"));
            c.setAttribute("r", viewportConvertWidth("panelvp.1", 2, "mm", "svg"));

            // Adding the point to the same "viewport" as the existing points
            if (! np)
                panel.appendChild(c);
        };

        btn.addEventListener("click", addPoint);
    