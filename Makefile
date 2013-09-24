build:
	jekyll
	compass compile
	mv ./_site/styles/rainbow-print.css ./_site/projects/rainbow/print.css
	mv ./_site/styles/rainbow-style.css ./_site/projects/rainbow/style.css
	rm ./_site/Makefile ./_site/rsync-remote.sh
	find ./_site -type f -print0 | xargs -0 chmod 644
	find ./_site -type d -print0 | xargs -0 chmod 777

clean:
	-rm -rf ./_site/*

.PHONY: build clean
