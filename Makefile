SITE_STYLES := $(patsubst _styles/%.scss, _site/styles/%.min.css, $(wildcard _styles/*.scss))
SITE_MIN_SCRIPTS := $(patsubst _scripts/%.min.js, _site/scripts/%.min.js, $(wildcard _scripts/*.min.js))
SITE_SCRIPTS := $(patsubst _scripts/%.js, _site/scripts/%.min.js, $(filter-out %.min.js, $(wildcard _scripts/*.js)))

# Add sub-project dependencies (e.g. Rainbow, TimingManager)
include _make/*.mk

_site/styles/%.min.css: _styles/%.scss
	@mkdir -p "_site/styles/"
	@sass --style compressed "$<" > "$@"

styles: $(SITE_STYLES)

_site/scripts/%.min.js: _scripts/%.min.js
	@mkdir -p "_site/scripts/"
	@cp "$<" "$@"

_site/scripts/%.min.js: _scripts/%.js
	@mkdir -p "_site/scripts/"
	@jshint "$<"
	@uglifyjs "$<" -c -m -o "$@"

_site/scripts/site.min.js: _site/scripts/mail.min.js _site/scripts/ga.min.js
	@cat _site/scripts/mail.min.js _site/scripts/ga.min.js > "$@"
	@rm _site/scripts/mail.min.js _site/scripts/ga.min.js

_site/scripts/gridsvg-scripts.min.js: _site/scripts/gridsvg-modernizr.min.js _site/scripts/gridsvg-slider.min.js _site/scripts/svg-full-detect.min.js
	@cat _site/scripts/gridsvg-modernizr.min.js _site/scripts/gridsvg-slider.min.js _site/scripts/svg-full-detect.min.js > "$@"
	@rm _site/scripts/gridsvg-modernizr.min.js _site/scripts/gridsvg-slider.min.js _site/scripts/svg-full-detect.min.js

scripts: _site/scripts/site.min.js _site/scripts/gridsvg-scripts.min.js

compiled-content: styles scripts rainbow timing-manager

jekyll:
	@jekyll build

build:: jekyll compiled-content setperms
	@echo
	@echo "*** SITE BUILD SUCCESSFUL ***"
	@echo

setperms:
	@find _site -type f -print0 | xargs -0 chmod 644
	@find _site -type d -print0 | xargs -0 chmod 777

clean:
	-rm -rf _site/*

all: build

.PHONY: build clean jekyll compiled-content rainbow styles scripts setperms
.DEFAULT_GOAL: all
.INTERMEDIATE: $(RAINBOW_SCRIPTS) $(RAINBOW_MIN_SCRIPTS)
