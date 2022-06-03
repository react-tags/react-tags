const webpack = require('webpack');
const path = require('path');

const config = {
  mode: 'development',
  // Entry points to the project
  entry: {
    ReactTags: path.join(__dirname, 'src/components/ReactTags.js'),
  },
  // Server Configuration options
  devServer: {
    contentBase: './', // Relative directory for base of server
    port: 8090, // Port Number
    host: 'localhost', // Change to '0.0.0.0' for external facing server
  },
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'), // Path of output file
    filename: '[name].min.js',
    libraryTarget: 'umd',
    library: 'ReactTags',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dnd': 'ReactDnD',
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
        use: [
          {
            // react-hot is like browser sync and babel loads jsx and es6-7
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};

module.exports = config;
