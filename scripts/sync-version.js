const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const packageJsonPath = path.join(repoRoot, "package.json");
const versionPath = path.join(repoRoot, "VERSION");
const blueprintVersionPath = path.join(
  repoRoot,
  "blueprints",
  "KONDUCTOR_VERSION.json",
);

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;

fs.writeFileSync(versionPath, `${version}\n`);

const blueprintVersion = JSON.parse(
  fs.readFileSync(blueprintVersionPath, "utf8"),
);
blueprintVersion.installed_version = version;
fs.writeFileSync(
  blueprintVersionPath,
  `${JSON.stringify(blueprintVersion, null, 2)}\n`,
);
