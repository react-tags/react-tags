const webpack = require("webpack");
const path = require("path");
const buildPath = path.resolve(__dirname, "dist");

const config = {
  mode: 'production',
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
  optimization: {
    minimize: true,
  },
};

module.exports = config;
