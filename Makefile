CHROMA_LIGHT_STYLE ?= pastie
CHROMA_DARK_STYLE  ?= onedark
CHROMA_SCSS         = themes/hyde-hyde/assets/scss/hyde-hyde/_code-highlight.scss

build-site:
	@hugo

build:: build-site setperms
	@echo
	@echo "*** SITE BUILD SUCCESSFUL ***"
	@echo

setperms:
	@find public -type f -print0 | xargs -0 chmod 644
	@find public -type d -print0 | xargs -0 chmod 755

clean:
	-rm -rf public/*

# Regenerate the chroma CSS variable region in $(CHROMA_SCSS) from the
# upstream chroma themes shipped with the Hugo binary.  Output is committed
# to the repo; run this after upgrading Hugo to pick up any palette changes.
#
#   make chroma-styles                          # use defaults above
#   make chroma-styles CHROMA_DARK_STYLE=nord   # try a different dark theme
chroma-styles:
	@bash scripts/gen-chroma-scss.sh \
	  --light $(CHROMA_LIGHT_STYLE) \
	  --dark  $(CHROMA_DARK_STYLE) \
	  --file  $(CHROMA_SCSS)

all: build

.PHONY: build clean build-site setperms chroma-styles
.DEFAULT_GOAL: all
