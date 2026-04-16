const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..");
const packageJsonPath = path.join(repoRoot, "package.json");
const versionPath = path.join(repoRoot, "VERSION");
const blueprintVersionPath = path.join(
  repoRoot,
  "blueprints",
  "KONDUCTOR_VERSION.json",
);

function fail(message) {
  console.error(message);
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const rootVersion = fs.readFileSync(versionPath, "utf8").trim();
const blueprintVersion = JSON.parse(
  fs.readFileSync(blueprintVersionPath, "utf8"),
).installed_version;

if (packageJson.version !== rootVersion || packageJson.version !== blueprintVersion) {
  fail(
    `Version mismatch: package.json=${packageJson.version}, VERSION=${rootVersion}, blueprints/KONDUCTOR_VERSION.json=${blueprintVersion}`,
  );
}

if (!Array.isArray(packageJson.files) || !packageJson.files.includes("blueprints/.gitignore")) {
  fail('package.json files list must include "blueprints/.gitignore"');
}

const cliVersion = execFileSync(
  "bash",
  [path.join(repoRoot, "blueprints", "scripts", "meet-konductor.sh"), "--version"],
  { cwd: repoRoot, encoding: "utf8" },
).trim();

if (cliVersion !== packageJson.version) {
  fail(`CLI version mismatch: expected ${packageJson.version}, got ${cliVersion}`);
}

const packOutput = execFileSync("npm", ["pack", "--dry-run", "--json"], {
  cwd: repoRoot,
  encoding: "utf8",
});
const packEntries = JSON.parse(packOutput);
const packedFiles = new Set(
  (packEntries[0]?.files || []).map((entry) => entry.path),
);

for (const requiredLine of [
  "blueprints/.gitignore",
  "blueprints/KONDUCTOR.md",
  "blueprints/scripts/meet-konductor.sh",
]) {
  if (!packedFiles.has(requiredLine)) {
    fail(`npm pack --dry-run missing ${requiredLine}`);
  }
}

console.log(`Release verification passed for ${packageJson.name}@${packageJson.version}`);
