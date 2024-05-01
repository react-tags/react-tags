const webpack = require('webpack');
const path = require('path');

const config = {
  mode: 'development',
  // Entry points to the project
  entry: {
    ReactTags: path.join(__dirname, 'src/components/ReactTags.js'),
    bundle: './example/main.js',
  },
  // Server Configuration options
  devServer: {
    static: {
      directory: path.join(__dirname, './example/public'),
    },
    port: 8090, // Port Number
    host: 'localhost',
    hot: true,
    compress: true,
  },
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'example/public'), // Path of output file
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
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // Since the project is side effects free, for some reason webpack drops the imported scss files if side effects not set to true for sass loaders
        // https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free
        sideEffects: true,
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
};

module.exports = config;
