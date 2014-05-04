RAINBOW_SCRIPTS := $(patsubst _scripts/rainbow/%.js, _site/projects/rainbow/js/%.min.js, $(filter-out %.min.js, $(wildcard _scripts/rainbow/*.js)))
RAINBOW_SCRIPTS := $(RAINBOW_SCRIPTS) $(patsubst _scripts/rainbow/language/%.js, _site/projects/rainbow/js/language/%.min.js, $(filter-out %.min.js, $(wildcard _scripts/rainbow/language/*.js)))
RAINBOW_MIN_SCRIPTS := $(patsubst _scripts/rainbow/%.min.js, _site/projects/rainbow/js/%.min.js, $(wildcard _scripts/rainbow/*.min.js))
RAINBOW_STYLES := $(patsubst _styles/rainbow/%.css, _site/projects/rainbow/themes/%.min.css, $(filter-out %.min.css, $(wildcard _styles/rainbow/*.css)))
RAINBOW_DEMO_SCRIPT := _site/projects/rainbow/js/rainbow-demo.min.js

_site/projects/rainbow/themes/%.min.css: _styles/rainbow/%.css
	mkdir -p "_site/projects/rainbow/themes/"
	cleancss "$<" -o "$@"

_site/projects/rainbow/js/language/%.min.js: _scripts/rainbow/language/%.js
	mkdir -p "_site/projects/rainbow/js/language/"
	jshint "$<"
	uglifyjs "$<" -o "$@"

_site/projects/rainbow/js/%.min.js: _scripts/rainbow/%.js
	mkdir -p "_site/projects/rainbow/js/"
	jshint "$<"
	uglifyjs "$<" -o "$@"

_site/projects/rainbow/js/rainbow.min.js: _scripts/rainbow/rainbow.min.js
	mkdir -p "_site/projects/rainbow/js/"
	cp "$<" "$@"

$(RAINBOW_DEMO_SCRIPT): $(RAINBOW_SCRIPTS) $(RAINBOW_MIN_SCRIPTS)
	cat _site/projects/rainbow/js/rainbow.min.js _site/projects/rainbow/js/language/*.min.js _site/projects/rainbow/js/demo.min.js > "$@".tmp
	rm -rf _site/projects/rainbow/js/*.min.js _site/projects/rainbow/js/language
	mv "$@".tmp "$@"

rainbow: $(RAINBOW_DEMO_SCRIPT) $(RAINBOW_STYLES)
	@echo "Completed Rainbow"
	@echo "scripts: $(RAINBOW_SCRIPTS)"
	@echo "final script: $(RAINBOW_DEMO_SCRIPT)"
	@echo "styles: $(RAINBOW_STYLES)"
