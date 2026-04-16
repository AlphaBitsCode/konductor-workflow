const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const packageJsonPath = path.join(repoRoot, "package.json");
const contractPaths = [
  path.join(repoRoot, "KONDUCTOR.md"),
  path.join(repoRoot, "blueprints", "KONDUCTOR.md"),
];

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;

for (const contractPath of contractPaths) {
  const content = fs.readFileSync(contractPath, "utf8");
  const nextContent = content.replace(
    /<framework_version>.*<\/framework_version>/,
    `<framework_version>${version}</framework_version>`,
  );
  fs.writeFileSync(contractPath, nextContent);
}
