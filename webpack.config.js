const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/index.js",
        pathinfo: true
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
        loaders: [{
            test: /\.tsx?$/,
            loader: "ts-loader?" + JSON.stringify({
                transpileOnly: true
            }),
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({comments: false, beautify: true}),
        new CleanWebpackPlugin(['build'])
    ]
};