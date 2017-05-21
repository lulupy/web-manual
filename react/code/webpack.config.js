'use strict';
const path = require('path');
const  glob = require('glob');

const rootPath = __dirname;


function getEntries(rFilename){

    let entries = {};
    let matchFiles = glob.sync(rFilename);
    let rDemo = /src\/((\w|\W|\/|\-)+)\/main\.js(x)?$/;
    matchFiles.forEach(function(filename, i){
        const match = filename.match(rDemo);
        if(!match){
            throw new Error(filename + '不符合命名规则');
        }

        const chunk = match[1];

        entries[chunk] = filename;
    });

    console.log(entries);
    return entries;
}


function getIPAdress(){
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
          var iface = interfaces[devName];
          for(var i=0;i<iface.length;i++){
               var alias = iface[i];
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                     return alias.address;
               }
          }
    }
}

const entries = getEntries('./src/**/main.js*');

const host = getIPAdress();


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
                test: /\.css$/,
                loaders: [ 'style-loader','css-loader']
            },
            {
                test: /\.less$/,
                loaders: [ 'style-loader','css-loader', 'less-loader']
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
        host: host,
        clientLogLevel: 'error'
    }
}
