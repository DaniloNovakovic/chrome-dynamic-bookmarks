const pjson = require("../package.json");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const commonPaths = require("./common-paths");

const fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2"
];

const options = {
  entry: {
    vendor: ["react", "react-dom"],
    popup: path.join(commonPaths.srcPath, "popup", "index.js"),
    options: path.join(commonPaths.srcPath, "options", "index.js"),
    background: path.join(commonPaths.srcPath, "background", "index.js"),
    bookmarkManager: path.join(
      commonPaths.srcPath,
      "bookmarkManager",
      "index.js"
    )
  },
  output: {
    path: commonPaths.outputPath,
    filename: "[name].bundle.js"
  },
  resolve: {
    modules: ["node_modules", commonPaths.srcPath]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: "vendor",
          name: "vendor",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
        loader: "file-loader?name=[name].[ext]",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(commonPaths.publicPath, "manifest.json"),
        transform: function(content) {
          // generates the manifest file using the package.json informations
          const contentJson = JSON.parse(content.toString());
          const newManifest = {
            ...contentJson,
            description: pjson.description,
            version: pjson.version
          };
          return JSON.stringify(newManifest);
        }
      },
      {
        from: "*",
        to: "[name].[ext]",
        test: /\.(png|ico)$/,
        context: commonPaths.publicPath
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(commonPaths.publicPath, "popup.html"),
      filename: "popup.html",
      excludeChunks: ["bookmarkManager", "background", "options"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(commonPaths.publicPath, "options.html"),
      filename: "options.html",
      chunks: ["options"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(commonPaths.publicPath, "background.html"),
      filename: "background.html",
      excludeChunks: ["bookmarkManager", "options", "popup"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(commonPaths.publicPath, "bookmarkManager.html"),
      filename: "bookmarkManager.html",
      excludeChunks: ["popup", "options", "background"]
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  watchOptions: {
    ignored: ["/node_modules/", "/doc/", "README.md", "/build/"]
  }
};

module.exports = options;
