const presets = [["@babel/preset-env", {
       useBuiltIns: "usage",
       corejs: 3,
   }], "@babel/preset-react"];

const plugins = [
  "react-hot-loader/babel",
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-transform-async-to-generator",
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/core",
      // Use "'libraryDirectory': ''," if your bundler does not support ES modules
      libraryDirectory: "esm",
      camel2DashComponentName: false
    },
    "core"
  ],
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/icons",
      // Use "'libraryDirectory': ''," if your bundler does not support ES modules
      libraryDirectory: "esm",
      camel2DashComponentName: false
    },
    "icons"
  ]
];

module.exports = { presets, plugins };
