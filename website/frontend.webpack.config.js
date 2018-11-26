const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./frontend.jsx",
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
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "frontend.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new CopyWebpackPlugin([{ from: "index.html", to: "index.html" }])]
};
