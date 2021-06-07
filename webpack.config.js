const path = require('path');

module.exports = {
  entry: "./src/entry.js",
  output: {
    path: path.resolve(__dirname, "dist", "javascripts"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", "*"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
    ],
  },
};