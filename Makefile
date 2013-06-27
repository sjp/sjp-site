build:
	jekyll
	compass compile
	mv ./_site/styles/rainbow-print.css ./_site/projects/rainbow/print.css
	mv ./_site/styles/rainbow-style.css ./_site/projects/rainbow/style.css
	rm ./_site/Makefile ./_site/rsync-remote.sh

clean:
	-rm -rf ./_site/*

