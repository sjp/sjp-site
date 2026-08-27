+++
date = "2026-08-27"
title = "Using Claude Code in devcontainers"
+++

I run Claude Code inside a [development container](https://containers.dev/), for the simple reason that the container is a sandbox. I can let Claude Code loose on a project and know that whatever it does, it does not escape the sandbox.

Devcontainers are a good fit for this. They're declarative, repeatable, and [Visual Studio Code](https://code.visualstudio.com/) picks them up automatically through the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers). This post isn't intended to talk about how great devcontainers are, but instead covers the documentation gap between Anthropic's [instructions for running Claude Code in one](https://code.claude.com/docs/en/devcontainer) and the setup that I use daily.

## What you need

Anthropic's instructions get Claude Code installed in the devcontainer. To make it usable, you need two more things:

* A named volume mounted at `~/.claude`, so your config survives a devcontainer rebuild.
* A `postCreateCommand` script that fixes file ownership and pre-answers the setup prompts.

Both files are shown and documented below.

## Three ways to share config

Before we configure anything, first decide where you would like configuration to live. There are three obvious options:

* Share the host's configuration into the devcontainer.
* Share one configuration across all your devcontainers.
* Give each devcontainer its own isolated configuration.

The first is possible with a bind mount, but pushing changes back and forth between host and devcontainer gets awkward because of file ownership. The other two are the same setup with a one-line difference, which I'll get to.

## What's missing from the default setup

Following Anthropic's documented setup, here is what I ran into:

* Claude Code walks you through onboarding, including login, on every devcontainer rebuild.
* It asks whether you trust the current workspace, every time.
* Auto-updates fail, so a devcontainer rebuild is the only way to pick up a new version.
* Configuration files can't be written at all, because of folder permissions.

None of these are difficult to fix but they're not covered in the Anthropic documentation.

## The devcontainer config

Create `.devcontainer/devcontainer.json`:

```json
{
  "name": "Claude Code devcontainer",
  "image": "mcr.microsoft.com/devcontainers/base:trixie",
  "features": {
    "ghcr.io/devcontainers/features/node:2": {
      "version": "26"
    },
    "ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
  },
  "mounts": [
    "source=claude-code-config,target=/home/vscode/.claude,type=volume"
  ],
  "remoteUser": "vscode",
  "containerEnv": {
    "CLAUDE_CONFIG_DIR": "/home/vscode/.claude"
  },
  "postCreateCommand": "bash .devcontainer/post-create.sh"
}
```

That config does four things:

* Installing Claude Code and `node` through the official features. Claude Code requires `node`, which is not available on the `base:trixie` image.
* Mounting a named volume at `~/.claude` for the `vscode` user. Alter the path if your `remoteUser` is different to `vscode`.
* Pointing `CLAUDE_CONFIG_DIR` at that directory, so `.claude.json` lands in the volume too.
* Running a script after the devcontainer is created to clean up the rest.

That config shares settings across every devcontainer using the same named volume of `claude-code-config`. If you'd rather each devcontainer get its own settings, change a single line:

```diff
- "source=claude-code-config,target=/home/vscode/.claude,type=volume"
+ "source=claude-code-config-${devcontainerId},target=/home/vscode/.claude,type=volume"
```

## The post-create script

This is where the problems get fixed. Save it to `.devcontainer/post-create.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

claude_dir=${CLAUDE_CONFIG_DIR:-$HOME/.claude}
claude_json=${CLAUDE_CONFIG_DIR:-$HOME}/.claude.json

# The volume is root-owned on first creation, update to the container user.
mkdir -p "$claude_dir"
if [ "$(stat -c %u "$claude_dir")" != "$(id -u)" ]; then
    sudo chown -R "$(id -u):$(id -g)" "$claude_dir"
fi

# Skip onboarding and the per-folder trust dialog. Merge rather than overwrite.
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

# The claude-code feature installs the package as root-owned, so
# in-place auto-updates fail with "no_permissions". Hand it to the container user.
npm_root=$(npm root -g)
if [ -d "$npm_root/@anthropic-ai" ]; then
    sudo chown -R "$(id -u):$(id -g)" "$npm_root/@anthropic-ai"
fi
```

The first block is why configuration writes fail. A fresh named volume is owned by `root` and the container user can't write to it. Assigning to the container user fixes this, including across rebuilds.

The second block writes the two flags that stop the prompts, merging into any existing `.claude.json` rather than replacing it.

The third block is the auto-update fix. The `claude-code` feature installs the `npm` package as `root`, leaving `@anthropic-ai/claude-code` root-owned inside the global `node_modules` directory. Claude Code auto-updates by shelling out to `npm install -g @anthropic-ai/claude-code@<version>`, and without write access that fails with `no_permissions` and "Insufficient permissions for global npm install".

Handing over that one directory is enough because the `node` feature has already given the rest of the tree to the container user. Both `$(npm root -g)` and the sibling `bin` directory end up owned by `vscode`. If your `node` comes from somewhere else, e.g. a distro package under `/usr/lib/node_modules`, the package directory alone won't be enough.

## Wrapping up

I use this setup in every project and it has remained stable across Claude Code updates. This setup sandboxes the filesystem access, but if you'd also like to sandbox network access, Anthropic's [reference devcontainer](https://github.com/anthropics/claude-code/tree/main/.devcontainer) includes a firewall script that restricts outbound traffic to an allowlist.
