build-site:
	@hugo

build:: build-site setperms
	@echo
	@echo "*** SITE BUILD SUCCESSFUL ***"
	@echo

setperms:
	@find public -type f -print0 | xargs -0 chmod 644
	@find public -type d -print0 | xargs -0 chmod 777

clean:
	-rm -rf public/*

deploy:
	-rsync -avh public/ sjp.co.nz:/var/www/sjp.co.nz/ --delete

all: build

.PHONY: build clean build-site setperms
.DEFAULT_GOAL: all
