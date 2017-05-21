var htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        build: './es6/index.js',
    },
    output: {
        path: './build_es6/',
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
                loaders: ['babel?presets[]=es2015'],//要指定转换成es2015
            }
        ]
    },
    devServer:{
        contentBase: './build_es6/'
    },
    plugins: [
        new htmlWebpackPlugin({
            title: '首页',
            chunks: ['build']//指定引用那个模块， 不指定则都引用
        }),
    ]
}

