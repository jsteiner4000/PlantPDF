#!/bin/bash
# Installs graphify (CLI + Claude skill) in Claude Code cloud sessions.
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
