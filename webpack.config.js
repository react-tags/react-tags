var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: "./lib/ReactTags.js",
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'lib')
      }
    ]
  },
  devServer: {
    hot: true,
    port: 8090,
    inline: true,
    historyApiFallback: true,
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-dnd': 'ReactDnD'
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'ReactTags.min.js',
    libraryTarget: 'umd',
    library: 'ReactTags'
  }
};
