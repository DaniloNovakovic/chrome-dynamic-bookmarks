const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = async () => {
  const repoRoot = path.resolve(__dirname, "..");
  const manifestPath = path.resolve(repoRoot, "build", "manifest.json");

  if (process.env.SKIP_EXTENSION_BUILD === "1" && fs.existsSync(manifestPath)) {
    return;
  }

  execSync("yarn build", {
    cwd: repoRoot,
    stdio: "inherit",
  });
};
