const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    path: __dirname + "/dist/assets",
    filename: "bundle.js",
    publicPath: "assets"
  },
  devServer: {
    inline: true,
    contentBase: "./dist",
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "env",
              "react",
              "stage-2"
            ]
          }
        }
      }
    ]
  }
}
