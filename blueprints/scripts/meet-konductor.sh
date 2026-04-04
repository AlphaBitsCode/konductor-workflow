#!/usr/bin/env bash
set -euo pipefail

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do
  DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
SCRIPT_DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
PACKAGE_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
TARGET_DIR="${TARGET_DIR:-$PWD}"
FORCE=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --version|status|version)
      cat "$PACKAGE_ROOT/VERSION"
      exit 0
      ;;
    --target)
      TARGET_DIR="$2"
      shift 2
      ;;
    --ref)
      # Ignored when using NPM
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

FILE_MAPPINGS=(
  "blueprints/KONDUCTOR.md:KONDUCTOR.md"
  "blueprints/AGENTS.md:AGENTS.md"
  "blueprints/memory/KONDUCTOR_VISION_ROADMAP.md:.konductor/memory/KONDUCTOR_VISION_ROADMAP.md"
  "blueprints/KONDUCTOR_HANDOFF.md:.konductor/KONDUCTOR_HANDOFF.md"
  "blueprints/KONDUCTOR_WORKFLOW.md:.konductor/KONDUCTOR_WORKFLOW.md"
  "blueprints/memory/KONDUCTOR_MEMORY.md:.konductor/memory/KONDUCTOR_MEMORY.md"
  "blueprints/memory/KONDUCTOR_HISTORY.md:.konductor/memory/KONDUCTOR_HISTORY.md"
  "blueprints/KONDUCTOR_VERSION.json:.konductor/KONDUCTOR_VERSION.json"
  "blueprints/memory/decisions/ADR_TEMPLATE.md:.konductor/memory/decisions/ADR_TEMPLATE.md"
  "blueprints/scripts/housekeeping.ts:.konductor/scripts/housekeeping.ts"
  "blueprints/scripts/upgrade-konductor.ts:.konductor/scripts/upgrade-konductor.ts"
  "blueprints/scripts/package.json:.konductor/scripts/package.json"
  "blueprints/scripts/tsconfig.json:.konductor/scripts/tsconfig.json"
  "blueprints/scripts/.markdownlint-cli2.jsonc:.konductor/scripts/.markdownlint-cli2.jsonc"
)

mkdir -p "$TARGET_DIR"

copy_file() {
  local src_path="$1"
  local rel_dest="$2"
  local dest_path="$TARGET_DIR/$rel_dest"
  local src_full_path="$PACKAGE_ROOT/$src_path"
  local dest_dir

  if [[ ! -f "$src_full_path" ]]; then
    echo "Warning: Source file $src_full_path not found." >&2
    return
  fi

  dest_dir="$(dirname "$dest_path")"
  mkdir -p "$dest_dir"

  if [[ -e "$dest_path" && "$FORCE" -ne 1 ]]; then
    echo "[skip] $rel_dest already exists"
    return
  fi

  echo "[copy] $src_path -> $rel_dest"
  cp "$src_full_path" "$dest_path"
}

for mapping in "${FILE_MAPPINGS[@]}"; do
  src_path="${mapping%%:*}"
  dest_path="${mapping#*:}"
  copy_file "$src_path" "$dest_path"
done

FRAMEWORK_VERSION="$(cat "$PACKAGE_ROOT/VERSION")"
VERSION_FILE="$TARGET_DIR/.konductor/KONDUCTOR_VERSION.json"

if [[ -e "$VERSION_FILE" ]]; then
  sed -i.bak "s/INSTALL_TIME_UTC/$(date -u +"%Y-%m-%dT%H:%M:%SZ")/g" "$VERSION_FILE" || true
  rm -f "${VERSION_FILE}.bak" || true
fi

echo
echo "Konductor files installed into: $TARGET_DIR"
echo "Next steps:"
echo "  1. Review KONDUCTOR.md"
echo "  2. Keep AGENTS.md only if you need the compatibility shim"
echo "  3. Review .konductor/memory/KONDUCTOR_VISION_ROADMAP.md"
echo "  4. Review .konductor/memory/KONDUCTOR_MEMORY.md"
echo "  5. Customize .konductor/scripts/housekeeping.ts"
echo "  6. Run: cd .konductor/scripts && npm install && npm start"
echo
echo "Installed framework version: $FRAMEWORK_VERSION"
