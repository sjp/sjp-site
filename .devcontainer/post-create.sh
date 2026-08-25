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

# Configure Claude Code so a fresh container starts without prompts.
# ~/.claude is a named volume (see devcontainer.json) and is root-owned on first
# creation; ~/.claude.json lives in the container FS and is recreated on rebuild.
mkdir -p ~/.claude
if [ "$(stat -c %u ~/.claude)" != "$(id -u)" ]; then
    sudo chown -R "$(id -u):$(id -g)" ~/.claude
fi

# Skip onboarding and the per-folder trust dialog. Merge rather than overwrite so
# anything the claude-code feature already wrote survives.
claude_config=$(jq -n --arg dir "$PWD" '{
    hasCompletedOnboarding: true,
    installMethod: "npm",
    projects: { ($dir): { hasTrustDialogAccepted: true } }
}')
if [ -f ~/.claude.json ]; then
    jq --argjson add "$claude_config" '. * $add' ~/.claude.json > ~/.claude.json.tmp
else
    printf '%s\n' "$claude_config" > ~/.claude.json.tmp
fi
mv ~/.claude.json.tmp ~/.claude.json

# The claude-code feature installs as root, leaving the package root-owned, so
# in-place auto-updates fail with "no_permissions". Hand it to the container user.
npm_root=$(npm root -g)
if [ -d "$npm_root/@anthropic-ai" ]; then
    sudo chown -R "$(id -u):$(id -g)" "$npm_root/@anthropic-ai"
fi
