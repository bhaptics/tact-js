'use strict';

let path = require('path');
var webpack = require('webpack')

module.exports = {
    entry: {
        main: path.resolve('./src/main.js')
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve('./public/dist')
    },

    devtool: '#cheap-source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
