var webpack = require('webpack');

module.exports = {
    entry: "./lib/ReactTags.js",
    module: {
        loaders: [
            { test: /\.js$/, loader: 'jsx-loader?harmony', exclude: /node_modules/ }
        ]
    },
    externals: {
        'react': 'React',
        'react-dnd': 'ReactDND'
    },
    output: {
        filename: "dist/ReactTags.min.js",
        libraryTarget: 'umd',
        library: 'ReactTags'
    }
};
