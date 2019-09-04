const path = require("path");
const PROJECT_ROOT = path.resolve(__dirname, "../");

module.exports = {
  projectRoot: PROJECT_ROOT,
  outputPath: path.join(PROJECT_ROOT, "build"),
  publicPath: path.join(PROJECT_ROOT, "public"),
  srcPath: path.join(PROJECT_ROOT, "src")
};
