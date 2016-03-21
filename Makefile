build-site:
	@jekyll build
	@gulp

build:: build-site setperms
	@echo
	@echo "*** SITE BUILD SUCCESSFUL ***"
	@echo

setperms:
	@find _site -type f -print0 | xargs -0 chmod 644
	@find _site -type d -print0 | xargs -0 chmod 777

clean:
	-rm -rf _site/*

all: build

.PHONY: build clean build-site setperms
.DEFAULT_GOAL: all
