#!/usr/bin/env bash
set -euo pipefail

# Pinned to match the Dart Sass version installed in CI (.github/workflows/ci.yml)
DART_SASS_VERSION=1.100.0

# Install Dart Sass, required by Hugo's css.Sass "dartsass" transpiler
# (themes/hyde-hyde/layouts/partials/header/styles.html).
case "$(dpkg --print-architecture)" in
    amd64) SASS_ARCH=linux-x64 ;;
    arm64) SASS_ARCH=linux-arm64 ;;
    *) echo "Unsupported architecture for Dart Sass install: $(dpkg --print-architecture)" >&2; exit 1 ;;
esac
curl -fsSL "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-${SASS_ARCH}.tar.gz" \
    | sudo tar -xz -C /usr/local/lib
sudo ln -sf /usr/local/lib/dart-sass/sass /usr/local/bin/sass
