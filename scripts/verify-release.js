const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..");
const packageJsonPath = path.join(repoRoot, "package.json");
const rootContractPath = path.join(repoRoot, "KONDUCTOR.md");
const blueprintContractPath = path.join(repoRoot, "blueprints", "KONDUCTOR.md");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readFrameworkVersion(contractPath) {
  const content = fs.readFileSync(contractPath, "utf8");
  const match = content.match(/<framework_version>([^<]+)<\/framework_version>/);
  if (!match) {
    fail(`Missing <framework_version> tag in ${path.relative(repoRoot, contractPath)}`);
  }
  return match[1].trim();
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const rootVersion = readFrameworkVersion(rootContractPath);
const blueprintVersion = readFrameworkVersion(blueprintContractPath);

if (packageJson.version !== rootVersion || packageJson.version !== blueprintVersion) {
  fail(
    `Version mismatch: package.json=${packageJson.version}, KONDUCTOR.md=${rootVersion}, blueprints/KONDUCTOR.md=${blueprintVersion}`,
  );
}

if (
  !Array.isArray(packageJson.files) ||
  !packageJson.files.includes("blueprints/.gitignore")
) {
  fail('package.json files list must include "blueprints/.gitignore"');
}

for (const forbiddenPath of ["VERSION", "blueprints/KONDUCTOR_VERSION.json"]) {
  if (packageJson.files.includes(forbiddenPath)) {
    fail(`package.json files list must not include "${forbiddenPath}"`);
  }
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
