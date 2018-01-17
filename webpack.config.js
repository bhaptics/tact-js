'use strict';

let path = require('path');
var webpack = require('webpack')
var PROD = process.argv.indexOf('-p') !== -1;
console.log(PROD)

module.exports = {
    entry: {
        main: path.resolve('./index.js')
    },

    output: {
        path: path.resolve('./dist'),
        filename: PROD ? 'tact.min.js' : 'tact.js'
    },

    devtool: '#source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    externals: {
        window: 'window'
    }
};
