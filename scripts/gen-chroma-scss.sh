#!/usr/bin/env bash
# Regenerate the chroma CSS variable region in _code-highlight.scss.
#
# Runs `hugo gen chromastyles` for both themes, parses the output, and rewrites
# the BEGIN/END sentinel region in the target SCSS file in place.  Output is
# idempotent: running it twice produces no further diff.
#
# Usage:
#   bash scripts/gen-chroma-scss.sh \
#       --light pastie --dark onedark \
#       --file themes/hyde-hyde/assets/scss/hyde-hyde/_code-highlight.scss

set -euo pipefail

LIGHT_STYLE=pastie
DARK_STYLE=onedark
SCSS_FILE=

usage() { echo "Usage: $0 --light STYLE --dark STYLE --file PATH" >&2; exit 1; }

while [[ $# -gt 0 ]]; do
    case $1 in
        --light) LIGHT_STYLE=$2; shift 2 ;;
        --dark)  DARK_STYLE=$2;  shift 2 ;;
        --file)  SCSS_FILE=$2;   shift 2 ;;
        *)       usage ;;
    esac
done

[[ -n $SCSS_FILE ]] || usage

printf 'Fetching chroma styles: light=%s, dark=%s\n' "$LIGHT_STYLE" "$DARK_STYLE"

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

hugo gen chromastyles --style="$LIGHT_STYLE" > "$WORK/light.css" \
    || { echo "ERROR: hugo gen chromastyles --style=$LIGHT_STYLE failed" >&2; exit 1; }
hugo gen chromastyles --style="$DARK_STYLE"  > "$WORK/dark.css"  \
    || { echo "ERROR: hugo gen chromastyles --style=$DARK_STYLE failed"  >&2; exit 1; }

# ---------------------------------------------------------------------------
# Parse both CSS outputs and generate the SCSS sentinel region.
#
# awk processes light.css (file_idx=1) then dark.css (file_idx=2), building:
#   - token_names[]: ordered list of token names (CamelCase)
#   - token_cls[]:   CSS class suffix for each token ("k", "err", "")
#   - struct_v[]:    structural (layout/reset) prop values
#   - light_v[]:     per-token themeable prop values from the light theme
#   - dark_v[]:      per-token themeable prop values from the dark theme
#   - theme_seen[]:  union of (token,prop) pairs that are themeable in either theme
# ---------------------------------------------------------------------------
echo "Parsing and generating SCSS region…"

awk -v light_style="$LIGHT_STYLE" -v dark_style="$DARK_STYLE" '
BEGIN {
    n = split("lnlinks lntd lntable line", a)
    for (i = 1; i <= n; i++) struct_sel[a[i]] = 1

    n = split("color background-color font-weight font-style text-decoration", b)
    for (i = 1; i <= n; i++) theme_prop[b[i]] = 1

    neutral["color"]            = "var(--chroma-color)"
    neutral["background-color"] = "transparent"
    neutral["font-weight"]      = "normal"
    neutral["font-style"]       = "normal"
    neutral["text-decoration"]  = "none"

    prop_order[1] = "color"
    prop_order[2] = "background-color"
    prop_order[3] = "font-weight"
    prop_order[4] = "font-style"
    prop_order[5] = "text-decoration"

    # Manual overrides: override[theme, varname] = value
    override["light" SUBSEP "--chroma-color"] = "var(--body-color)"

    file_idx = 0
    n_tokens  = 0
}

FNR == 1 { file_idx++ }

/\/\* / {
    line = $0

    # Token name: text between "/* " and " */"
    s = index(line, "/* ")
    if (!s) next
    rest = substr(line, s + 3)
    e    = index(rest, " */")
    if (!e) next
    name = substr(rest, 1, e - 1)
    gsub(/ /, "", name)          # collapse "Line Numbers" -> "LineNumbers"
    if (name == "Background") next

    # Last CSS class before "{"
    brace = index(line, "{")
    if (!brace) next
    cls = ""
    tmp = substr(line, 1, brace - 1)
    while ((match(tmp, /\.[[:alnum:]]+/)) > 0) {
        cls = substr(tmp, RSTART + 1, RLENGTH - 1)
        tmp = substr(tmp, RSTART + RLENGTH)
    }
    if (cls == "bg")     next
    if (cls == "chroma") cls = ""    # root .chroma selector

    if (!(name in token_idx)) {
        token_idx[name]       = ++n_tokens
        token_names[n_tokens] = name
        token_cls[name]       = cls
    }

    # Properties from "{ ... }"
    bclose = index(line, "}")
    if (!bclose || bclose <= brace) next
    propstr = substr(line, brace + 1, bclose - brace - 1)

    n = split(propstr, parts, ";")
    for (i = 1; i <= n; i++) {
        gsub(/^[[:space:]]+|[[:space:]]+$/, "", parts[i])
        if (parts[i] == "") continue
        colon = index(parts[i], ":")
        if (!colon) continue
        k = substr(parts[i], 1, colon - 1)
        v = substr(parts[i], colon + 1)
        gsub(/^[[:space:]]+|[[:space:]]+$/, "", k)
        gsub(/^[[:space:]]+|[[:space:]]+$/, "", v)

        is_theme = (k in theme_prop) && !(k == "color" && v == "inherit")

        if ((cls in struct_sel) || !is_theme) {
            struct_v[name, k] = v
            if (!((name, k) in struct_seen)) {
                struct_seen[name, k] = 1
                struct_ord[name, ++struct_n[name]] = k
            }
        } else {
            if (file_idx == 1) light_v[name, k] = v
            else               dark_v[name, k]  = v
            theme_seen[name, k] = 1
        }
    }
}

function make_var(name, prop,    stem, suf) {
    if (name == "PreWrapper") {
        if (prop == "color")            return "--chroma-color"
        if (prop == "background-color") return "--chroma-bg-color"
    }
    stem = camel_to_kebab(name)
    suf  = (prop == "background-color") ? "bg" : prop
    return "--chroma-" stem "-" suf
}

function camel_to_kebab(s,    res, i, c) {
    res = ""
    for (i = 1; i <= length(s); i++) {
        c = substr(s, i, 1)
        if (c ~ /[A-Z]/ && i > 1) res = res "-"
        res = res tolower(c)
    }
    return res
}

function emit_mixin(theme,    ti, name, cls, has_theme, oi, p, vname, val) {
    for (ti = 1; ti <= n_tokens; ti++) {
        name = token_names[ti]
        cls  = token_cls[name]
        if (cls in struct_sel) continue
        has_theme = 0
        for (oi = 1; oi <= 5; oi++) {
            if ((name, prop_order[oi]) in theme_seen) { has_theme = 1; break }
        }
        if (!has_theme) continue
        for (oi = 1; oi <= 5; oi++) {
            p = prop_order[oi]
            if (!((name, p) in theme_seen)) continue
            vname = make_var(name, p)
            if ((theme, vname) in override) {
                val = override[theme, vname]
            } else if (theme == "light" && ((name, p) in light_v)) {
                val = light_v[name, p]
            } else if (theme == "dark" && ((name, p) in dark_v)) {
                val = dark_v[name, p]
            } else {
                val = neutral[p]
            }
            print "    " vname ": " val ";"
        }
    }
}

END {
    # \342\200\224 = UTF-8 octal for em dash (—)
    print "/* BEGIN generated chroma styles \342\200\224 run `make chroma-styles`; do not edit by hand */"
    print ""

    print "/* Structural rules (layout/reset \342\200\224 theme-invariant) */"
    for (ti = 1; ti <= n_tokens; ti++) {
        name = token_names[ti]
        cls  = token_cls[name]
        if (!(cls in struct_sel)) continue
        if (!struct_n[name]) continue
        out = ""
        for (pi = 1; pi <= struct_n[name]; pi++) {
            p   = struct_ord[name, pi]
            out = out p ": " struct_v[name, p] "; "
        }
        print "/* " name " */ .chroma ." cls " { " out "}"
    }
    print ""

    print "/* Theme-sensitive rules (values set via CSS vars in the mixins below) */"
    for (ti = 1; ti <= n_tokens; ti++) {
        name = token_names[ti]
        cls  = token_cls[name]
        if (cls in struct_sel) continue
        has_struct = (struct_n[name] > 0)
        has_theme  = 0
        for (oi = 1; oi <= 5; oi++) {
            if ((name, prop_order[oi]) in theme_seen) { has_theme = 1; break }
        }
        if (!has_struct && !has_theme) continue
        out = ""
        for (pi = 1; pi <= struct_n[name]; pi++) {
            p   = struct_ord[name, pi]
            out = out p ": " struct_v[name, p] "; "
        }
        for (oi = 1; oi <= 5; oi++) {
            p = prop_order[oi]
            if (!((name, p) in theme_seen)) continue
            out = out p ": var(" make_var(name, p) "); "
        }
        sel = (cls == "") ? ".chroma" : ".chroma ." cls
        print "/* " name " */ " sel " { " out "}"
    }
    print ""

    print "@mixin light-theme-code-variables {"
    print "    /* Generated from chroma style: " light_style " */"
    emit_mixin("light")
    print "}"
    print ""

    print "@mixin dark-theme-code-variables {"
    print "    /* Generated from chroma style: " dark_style " */"
    emit_mixin("dark")
    print "}"
    print ""

    print "/* END generated chroma styles */"
}
' "$WORK/light.css" "$WORK/dark.css" > "$WORK/region.scss"

# ---------------------------------------------------------------------------
# Replace the sentinel-delimited region in the target SCSS file.
# ---------------------------------------------------------------------------
echo "Updating $SCSS_FILE…"

awk -v region_file="$WORK/region.scss" '
BEGIN {
    # \342\200\224 = em dash (—)
    begin_s = "/* BEGIN generated chroma styles \342\200\224 run `make chroma-styles`; do not edit by hand */"
    end_s   = "/* END generated chroma styles */"
    while ((getline line < region_file) > 0)
        region = region line "\n"
    in_region   = 0
    found_begin = 0
}
index($0, begin_s) > 0 {
    printf "%s", region
    in_region   = 1
    found_begin = 1
    next
}
index($0, end_s) > 0 && in_region {
    in_region = 0
    next
}
!in_region { print }
END {
    if (!found_begin) {
        print "ERROR: BEGIN sentinel not found in " FILENAME > "/dev/stderr"
        exit 1
    }
}
' "$SCSS_FILE" > "$WORK/new_scss.scss"

cp "$WORK/new_scss.scss" "$SCSS_FILE"
echo "Updated $SCSS_FILE"
echo "Done. Review with: git diff $SCSS_FILE"
