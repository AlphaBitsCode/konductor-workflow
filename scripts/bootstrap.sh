#!/usr/bin/env bash
set -euo pipefail

RAW_BASE="${RAW_BASE:-https://raw.githubusercontent.com/AlphaBitsCode/konductor-framework/main}"
TARGET_DIR="${TARGET_DIR:-$PWD}"
FORCE=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target)
      TARGET_DIR="$2"
      shift 2
      ;;
    --force)
      FORCE=1
      shift
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

FILES=(
  "AGENTS.md"
  "blueprints/HYPERAGENT_WORKFLOW.md"
  "blueprints/AGENT_MEMORY.md"
  "blueprints/AGENT_HISTORY.md"
  "blueprints/decisions/ADR_TEMPLATE.md"
  "blueprints/scripts/housekeeping.ts"
  "blueprints/scripts/package.json"
)

mkdir -p "$TARGET_DIR"

download_file() {
  local rel_path="$1"
  local dest_path="$TARGET_DIR/$rel_path"
  local dest_dir
  dest_dir="$(dirname "$dest_path")"

  mkdir -p "$dest_dir"

  if [[ -e "$dest_path" && "$FORCE" -ne 1 ]]; then
    echo "[skip] $rel_path already exists"
    return
  fi

  echo "[fetch] $rel_path"
  curl -fsSL "$RAW_BASE/$rel_path" -o "$dest_path"
}

for file in "${FILES[@]}"; do
  download_file "$file"
done

echo
echo "Konductor Framework files installed into: $TARGET_DIR"
echo "Next steps:"
echo "  1. Review AGENTS.md and blueprints/AGENT_MEMORY.md"
echo "  2. Customize blueprints/scripts/housekeeping.ts"
echo "  3. Run: cd blueprints/scripts && npm install && npm start"
