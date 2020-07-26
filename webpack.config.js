const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // connect plugin

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // set up plugin
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};