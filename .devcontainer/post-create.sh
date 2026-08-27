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
# Claude Code stores its config in $CLAUDE_CONFIG_DIR (see devcontainer.json),
# falling back to $HOME: the directory itself plus a .claude.json inside it.
# Pointing CLAUDE_CONFIG_DIR at the named volume keeps both across rebuilds.
claude_dir=${CLAUDE_CONFIG_DIR:-$HOME/.claude}
claude_json=${CLAUDE_CONFIG_DIR:-$HOME}/.claude.json

# The volume is root-owned on first creation.
mkdir -p "$claude_dir"
if [ "$(stat -c %u "$claude_dir")" != "$(id -u)" ]; then
    sudo chown -R "$(id -u):$(id -g)" "$claude_dir"
fi

# Skip onboarding and the per-folder trust dialog. Merge rather than overwrite so
# anything the claude-code feature already wrote survives.
claude_config=$(jq -n --arg dir "$PWD" '{
    hasCompletedOnboarding: true,
    projects: { ($dir): { hasTrustDialogAccepted: true } }
}')
if [ -f "$claude_json" ]; then
    jq --argjson add "$claude_config" '. * $add' "$claude_json" > "$claude_json.tmp"
else
    printf '%s\n' "$claude_config" > "$claude_json.tmp"
fi
mv "$claude_json.tmp" "$claude_json"

# The claude-code feature installs as root, leaving the package root-owned, so
# in-place auto-updates fail with "no_permissions". Hand it to the container user.
npm_root=$(npm root -g)
if [ -d "$npm_root/@anthropic-ai" ]; then
    sudo chown -R "$(id -u):$(id -g)" "$npm_root/@anthropic-ai"
fi
