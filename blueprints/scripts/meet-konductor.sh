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

REQUIRED_NODE="22.11.0"
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
      cat "$PACKAGE_ROOT/VERSION"
      exit 0
      ;;
    hello|help|--help|-h)
      echo "🤖 Hello! I am Konductor, your AI Framework orchestrator."
      echo "My job is to give your AI assistants a persistent 'second brain' inside"
      echo "your repository via markdown memory logs, so they never lose context."
      echo ""
      echo "Usage: npx the-konductor [command] [options]"
      echo ""
      echo "Commands:"
      echo "  (none)            Install/upgrade framework files in the target directory"
      echo "  hello,  help      Show this introduction and help message"
      echo "  doctor            Check system setup and necessary environment variables"
      echo "  read,   parse     Read and understand a file (PDF, PPTX, image, etc.) using Groq LLM"
      echo "  status, version   Print the current framework version (v$(cat "$PACKAGE_ROOT/VERSION"))"
      echo ""
      echo "Options:"
      echo "  --target <dir>    Specify installation directory (default: current directory)"
      echo "  --force           Overwrite existing framework files"
      exit 0
      ;;
    doctor)
      echo "🩺 Running Konductor setup checks..."
      echo ""
      
      echo -n "Checking Node.js... "
      if command -v node >/dev/null 2>&1; then
        echo "✅ Installed ($(node -v))"
      else
        echo "❌ NOT installed (Node >= v20.12.0 recommended)"
      fi
      
      echo -n "Checking Git... "
      if command -v git >/dev/null 2>&1; then
        echo "✅ Installed"
      else
        echo "❌ NOT installed"
      fi
      
      echo -n "Checking API Configuration... "
      if [[ -f "$TARGET_DIR/.env" ]] && (grep -q -i "API_KEY" "$TARGET_DIR/.env" || grep -q "AI_LLM" "$TARGET_DIR/.env"); then
        echo "✅ Relevant keys found in '$TARGET_DIR/.env'"
      elif [[ -n "${AI_LLM_API_KEY:-}" || -n "${OPENAI_API_KEY:-}" || -n "${ANTHROPIC_API_KEY:-}" ]]; then
         echo "✅ Global AI keys found in the active shell environment"
      else
         echo "⚠️  WARNING: No local .env file or global AI environment keys found!"
         echo "   Tip: You will need a configured LLM provider to operate AI workflows."
      fi

      echo -n "Checking GROQ API Configuration... "
      if [[ -f "$TARGET_DIR/.env" ]] && grep -q -i "GROQ_API_KEY" "$TARGET_DIR/.env"; then
        echo "✅ GROQ keys found in '$TARGET_DIR/.env'"
      elif [[ -n "${GROQ_API_KEY:-}" ]]; then
         echo "✅ Global Groq keys found in the active shell environment"
      else
         echo "⚠️  WARNING: No local .env file or global GROQ_API_KEY environment keys found!"
         echo "   Tip: For the 'read' and 'parse' document capabilities, sign up for Groq (https://console.groq.com/keys)"
         echo "   and add GROQ_API_KEY to your .env file."
      fi
      
      echo ""
      echo "Diagnosis complete!"
      exit 0
      ;;
    read|parse)
      FILE="${2:-}"
      if [[ -z "$FILE" ]]; then
          echo "Usage: npx the-konductor read <file>"
          exit 1
      fi
      
      # Try locally load .env variables if present
      if [[ -f "$TARGET_DIR/.env" ]]; then
        # shellcheck disable=SC2046
        export $(grep -v '^#' "$TARGET_DIR/.env" | sed 's/\r$//' | awk '/=/ {print $1}' | xargs) 2>/dev/null || true
      fi

      npx --yes tsx "$SCRIPT_DIR/read-file.ts" "$FILE"
      exit $?
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
  "blueprints/scripts/read-file.ts:.konductor/scripts/read-file.ts"
  "blueprints/.gitignore:.konductor/.gitignore"
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
