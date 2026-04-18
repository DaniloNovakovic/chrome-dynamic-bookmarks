const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage",
      corejs: 3,
    },
  ],
  "@babel/preset-react",
  "@babel/preset-typescript",
];

const plugins = [
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-transform-async-to-generator",
  ["@babel/plugin-proposal-private-methods", { loose: true }],
  ["@babel/plugin-proposal-class-properties", { loose: true }],
  ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/core",
      // Use "'libraryDirectory': ''," if your bundler does not support ES modules
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "core",
  ],
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/icons",
      // Use "'libraryDirectory': ''," if your bundler does not support ES modules
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "icons",
  ],
];

module.exports = { presets, plugins };
