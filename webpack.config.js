var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: "./lib/reactTags.js",
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: path.join(__dirname, 'lib')
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-dnd': 'ReactDnD'
    },
    output: {
        filename: "dist/ReactTags.min.js",
        libraryTarget: 'umd',
        library: 'ReactTags'
    }
};
