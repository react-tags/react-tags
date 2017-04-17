const webpack = require("webpack");
const path = require("path");
const buildPath = path.resolve(__dirname, "dist");
const nodeModulesPath = path.resolve(__dirname, "node_modules");

const config = {
  entry: [path.join(__dirname, "/lib/ReactTags.js")],
  // Render source-map file for final build
  devtool: "source-map",
  // output config
  output: {
    path: buildPath, // Path of output file
    filename: "ReactTags.min.js", // Name of output file
    libraryTarget: "umd",
    library: "ReactTags",
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "react-dnd": "ReactDnD",
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppresses warnings, usually from module minification
        warnings: false,
      },
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All .js files
        loaders: ["babel-loader"], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath],
      },
    ],
  },
};

module.exports = config;
