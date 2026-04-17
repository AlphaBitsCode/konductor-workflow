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

read_framework_version() {
  local contract_path="$1"
  sed -n 's|.*<framework_version>\([^<]*\)</framework_version>.*|\1|p' "$contract_path" | head -n1
}

FRAMEWORK_VERSION="$(read_framework_version "$PACKAGE_ROOT/blueprints/KONDUCTOR.md")"

if [[ -z "$FRAMEWORK_VERSION" ]]; then
  echo "ERROR: Missing <framework_version> tag in $PACKAGE_ROOT/blueprints/KONDUCTOR.md" >&2
  exit 1
fi

REQUIRED_NODE="18.0.0"
if ! command -v node >/dev/null 2>&1; then
  echo "⚠️  WARNING: Node.js is not installed. Konductor requires >= v$REQUIRED_NODE."
  echo "👉 We highly recommend using nvm: nvm install $REQUIRED_NODE && nvm use $REQUIRED_NODE"
  echo ""
else
  CURRENT_NODE=$(node -v | sed 's/v//')
  if [[ "$(printf '%s\n' "$REQUIRED_NODE" "$CURRENT_NODE" | tr -d ' ' | sort -V | head -n1)" == "$CURRENT_NODE" && "$CURRENT_NODE" != "$REQUIRED_NODE" ]]; then
    echo "⚠️  WARNING: Your Node.js version is v$CURRENT_NODE, but Konductor requires >= v$REQUIRED_NODE."
    echo "👉 We highly recommend using nvm: nvm install $REQUIRED_NODE && nvm use $REQUIRED_NODE"
    echo ""
  fi
fi

while [[ $# -gt 0 ]]; do
  case "$1" in
    --version|status|version)
      echo "$FRAMEWORK_VERSION"
      exit 0
      ;;
    hello|help|--help|-h)
      echo "🤖 Hello! I am Konductor, your AI Framework orchestrator."
      echo "My job is to give your AI assistants a persistent 'second brain' inside"
      echo "your repository via markdown memory logs, so they never lose context."
      echo ""
      echo "Usage: npx konductor-workflow [command] [options]"
      echo ""
      echo "Commands:"
      echo "  (none)            Install/upgrade framework files in the target directory"
      echo "  hello,  help      Show this introduction and help message"
      echo "  status, version   Print current framework version (v$FRAMEWORK_VERSION)"
      echo ""
      echo "Options:"
      echo "  --target <dir>    Specify installation directory (default: current directory)"
      echo "  --force           Overwrite existing framework files"
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
  "blueprints/memory/AGENT_BEHAVIOR.md:.konductor/memory/AGENT_BEHAVIOR.md"
  "blueprints/docs/CHECK_IN.md:docs/CHECK_IN.md"
  "blueprints/docs/KONDUCTOR_GUIDE.md:docs/KONDUCTOR_GUIDE.md"
  "blueprints/docs/PROJECT_SKILLS_WORKFLOW.md:docs/PROJECT_SKILLS_WORKFLOW.md"
  "blueprints/KONDUCTOR_WORKFLOW.md:.konductor/KONDUCTOR_WORKFLOW.md"
  "blueprints/memory/KONDUCTOR_MEMORY.md:.konductor/memory/KONDUCTOR_MEMORY.md"
  "blueprints/memory/KONDUCTOR_ADR_HISTORY.md:.konductor/memory/KONDUCTOR_ADR_HISTORY.md"
  "blueprints/.gitignore:.konductor/.gitignore"
)

mkdir -p "$TARGET_DIR"

should_replace_on_upgrade() {
  local rel_dest="$1"
  [[ "$rel_dest" == "KONDUCTOR.md" || "$rel_dest" == ".konductor/KONDUCTOR_WORKFLOW.md" ]]
}

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

  if [[ -e "$dest_path" && "$FORCE" -ne 1 ]] && ! should_replace_on_upgrade "$rel_dest"; then
    echo "[skip] $rel_dest already exists"
    return
  fi

  if [[ -e "$dest_path" && "$FORCE" -ne 1 ]] && should_replace_on_upgrade "$rel_dest"; then
    echo "[replace] $src_path -> $rel_dest"
  else
    echo "[copy] $src_path -> $rel_dest"
  fi
  cp "$src_full_path" "$dest_path"
}

for mapping in "${FILE_MAPPINGS[@]}"; do
  src_path="${mapping%%:*}"
  dest_path="${mapping#*:}"
  copy_file "$src_path" "$dest_path"
done

echo
echo "Konductor files installed into: $TARGET_DIR"
echo "Next steps:"
echo "  1. Review KONDUCTOR.md"
echo "  2. Keep AGENTS.md only if you need the compatibility shim"
echo "  3. Review .konductor/memory/KONDUCTOR_VISION_ROADMAP.md"
echo "  4. Review .konductor/memory/AGENT_BEHAVIOR.md"
echo "  5. (Optional) Read the docs/KONDUCTOR_GUIDE.md for cheat codes"
echo "  6. Review .konductor/memory/KONDUCTOR_MEMORY.md"
echo "  7. Use .konductor/memory/KONDUCTOR_MEMORY.md for long-term memory"
echo "  8. Use .konductor/memory/KONDUCTOR_ADR_HISTORY.md for critical architectural decisions"
echo "  9. First-time setup: copy & paste this into your AI assistant:"
echo "     \"Review this repository and reorganize project documentation into the Konductor workflow documentation format. Move all project documentation except README.md and KONDUCTOR.md into docs/, preserve durable project knowledge, consolidate long-term context into .konductor/memory/KONDUCTOR_MEMORY.md, and update the Konductor files to reflect the actual repository.\""
echo
echo "Installed framework version: $FRAMEWORK_VERSION (embedded in KONDUCTOR.md)"
