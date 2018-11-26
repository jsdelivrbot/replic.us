const path = require("path");

module.exports = {
  entry: "./server.js",
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
    filename: "server.js",
    path: path.resolve(__dirname, "dist")
  },
  target: "node",
  node: {
    __dirname: false
  }
};
