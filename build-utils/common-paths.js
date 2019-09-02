const path = require("path");
const PROJECT_ROOT = path.resolve(__dirname, "../");

module.exports = {
  projectRoot: PROJECT_ROOT,
  outputPath: path.join(PROJECT_ROOT, "build"),
  htmlEntry: path.join(PROJECT_ROOT, "src"),
  appEntry: path.join(PROJECT_ROOT, "src", "js")
};
