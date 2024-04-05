const webpack = require('webpack');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: 'production',
  entry: {
    ReactTags: path.join(__dirname, 'src/components/ReactTags.tsx'),
  },
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
    // Allows error warnings but does not stop compiling.
    new webpack.NoEmitOnErrorsPlugin(),
    //new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      { test: /\.(ts|tsx|js)$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.js$/, // All .js files
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = config;
