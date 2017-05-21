var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        build: './react/index.js',
    },
    output: {
        path: './build_react/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.js$/,
                loaders: ['babel?presets[]=es2015&presets[]=react'],
                include: path.resolve(__dirname, 'react'),
                exclude: '/node_modules/'
            }
        ]
    },
    devServer:{
        contentBase: './build_react/'
    },
    plugins: [
        new htmlWebpackPlugin({
            title: '首页',
            chunks: ['build']//指定引用那个模块， 不指定则都引用
        }),
    ]
}

