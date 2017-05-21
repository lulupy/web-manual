var htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry: {
		build: './app/index.js',
		build2: './app/abc.js'
	},
	output: {
		path: './build/',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css']
			}
		]
	},
	//webpack-dev-server 配置参数
	//有两个参数比较特殊，必须在命令行里敲才有效hot inline
	devServer: {
		//服务器访问跟目录
		contentBase: './build/',//默认就是当前文件夹
	},

	plugins: [
		new htmlWebpackPlugin({
			title: '首页',
			chunks: ['build']//指定引用那个模块， 不指定则都引用
		}),
		new htmlWebpackPlugin({
			title: 'abc',
			filename: 'index2.html',//不指定默认就是index.html
			chunks: ['build2'],
		})
	]
}

