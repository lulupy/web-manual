'use strict';
const path = require('path');
const  glob = require('glob');

const rootPath = __dirname;


function getEntries(rFilename){
    let entries = {};
    let matchFiles = glob.sync(rFilename);
    let rDemo = /[\w|-]+\/demo[0-9]{2}/;
    matchFiles.forEach(function(filename, i){
        var chunk = filename.match(rDemo)[0];
        if(!chunk){
            throw new Error(filename + '不符合命名规则');
        }
        entries[chunk] = filename;
    });
    return entries;
}


let entries = getEntries('./src/**/demo*/index.jsx');




module.exports = {
    entry: entries,
    output: {
        path: rootPath+'/build/',
        filename: '[name]/build.js',

    },
    devtool: 'cheap-module-source-map',
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader'
                ]
            },
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                //在webpack@2中, 没有preLoaders这个配置项了
                enforce: 'pre',
                loaders: [
                    'eslint-loader'
                ]    
            },
            {
                test: /\.css$/,
                loaders: [ 'style-loader','css-loader']
            }
        ],
        
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    plugins: [
       
    ],
    devServer: {
        contentBase: './src/',
        host: '192.168.116.131',
        clientLogLevel: 'error'
    }
}