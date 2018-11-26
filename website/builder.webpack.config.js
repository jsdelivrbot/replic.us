const path = require("path");

module.exports = {
  entry: "./builder.js",
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
    filename: "builder.js",
    path: path.resolve(__dirname, "dist")
  }
};
