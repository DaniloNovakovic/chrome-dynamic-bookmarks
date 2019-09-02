const commonPaths = require("./common-paths");
const webpack = require("webpack");

const options = {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: false }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: commonPaths.outputPath,
    compress: false,
    hot: true
  }
};

module.exports = options;
