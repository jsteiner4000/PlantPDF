#!/bin/bash
# Installs graphify (CLI + Claude skill) in Claude Code cloud sessions
# and refreshes the committed code graph in graphify-out/.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

if ! command -v graphify >/dev/null 2>&1; then
  uv tool install graphifyy >/dev/null 2>&1
fi

if [ ! -f "$HOME/.claude/skills/graphify/SKILL.md" ]; then
  "$HOME/.local/bin/graphify" install --platform claude >/dev/null 2>&1
fi

# Code-only update (AST, no LLM). Docs are only re-extracted via /graphify --update.
# A failure here must not block the session.
cd "$CLAUDE_PROJECT_DIR"
if [ -f graphify-out/graph.json ]; then
  before=$(git hash-object graphify-out/graph.json)
  if "$HOME/.local/bin/graphify" update . >/dev/null 2>&1; then
    if [ "$before" != "$(git hash-object graphify-out/graph.json)" ] || [ ! -f graphify-out/graph-standalone.html ]; then
      python3 .claude/hooks/graphify-standalone.py graphify-out >/dev/null 2>&1 \
        || echo "graphify: graph-standalone.html could not be rebuilt" >&2
    fi
  else
    echo "graphify: code graph update failed" >&2
  fi
fi
