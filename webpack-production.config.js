const webpack = require('webpack');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: 'production',
  entry: {
    ReactTags: path.join(__dirname, 'src/components/ReactTags.js'),
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
      {
        test: /\.js$/, // All .js files
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};

module.exports = config;
