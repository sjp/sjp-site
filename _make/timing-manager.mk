TIMING_MANAGER_JS := _scripts/timing-manager/js/timing.js
TIMING_MANAGER_MIN_JS := _site/projects/timing-manager/timing.min.js

$(TIMING_MANAGER_MIN_JS): $(TIMING_MANAGER_JS)
	mkdir -p "_site/projects/timing-manager"
	jshint "$<"
	uglifyjs "$<" -c -m -o "$@"

timing-docs:
	cd _scripts/timing-manager && yuidoc --norecurse
	mv _scripts/timing-manager/docs _site/projects/timing-manager/
	cp -f "$(TIMING_MANAGER_JS)" "_site/projects/timing-manager/timing.js"

timing-manager: $(TIMING_MANAGER_MIN_JS) timing-docs

