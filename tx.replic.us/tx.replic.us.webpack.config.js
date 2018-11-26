const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./tx.replic.us.jsx",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  },
  output: {
    filename: "tx.replic.us.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new CopyWebpackPlugin([{ from: "index.html", to: "index.html" }])]
};
