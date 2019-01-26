const webpack = require('webpack');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: 'production',
  entry: {
    ReactTags: path.join(__dirname, 'src/components/ReactTags.js'),
  },
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: path.resolve(__dirname, 'dist'), // Path of output file
    filename: '[name].min.js', // Name of output file
    libraryTarget: 'umd',
    library: 'ReactTags',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dnd': 'ReactDnD',
    'react-dnd-html5-backend': 'ReactDnDHTML5Backend',
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoEmitOnErrorsPlugin(),
    //new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // All .js files
        use: [
          {
            // react-hot is like browser sync and babel loads jsx and es6-7
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
