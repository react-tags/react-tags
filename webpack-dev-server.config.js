const webpack = require("webpack");
const path = require("path");
const buildPath = path.resolve(__dirname, "dist");

const config = {
  mode: 'development',
  // Entry points to the project
  entry: [
    "webpack/hot/only-dev-server",
    path.join(__dirname, "/lib/ReactTags.js"),
  ],
  // Server Configuration options
  devServer: {
    contentBase: ".", // Relative directory for base of server
    hot: true, // Live-reload
    inline: true,
    port: 8090, // Port Number
    host: "localhost", // Change to '0.0.0.0' for external facing server
  },
  devtool: "cheap-module-source-map",
  output: {
    path: buildPath, // Path of output file
    filename: "ReactTags.min.js",
    libraryTarget: "umd",
    library: "ReactTags",
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "react-dnd": "ReactDnD",
  },
  plugins: [
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warnings but does not stop compiling.
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // All .js files
        use: [{ // react-hot is like browser sync and babel loads jsx and es6-7
          loader: 'babel-loader',
        }],
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
