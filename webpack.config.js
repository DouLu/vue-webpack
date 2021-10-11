const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve(dir) {
	return path.join(__dirname, './', dir)
}
// 这是 packet.json 中 dependencies 下的
const VENOR = [
	"axios",
	"core-js",
	"vue",
	"vue-router",
	"vuex"
]
module.exports = {
	// entry: './src/app.js', // 入口文件
	entry: {
		// bundle 和 vendor 都是自己随便取名的，会映射到 [name] 中
		bundle: './src/app.js',
		vendor: VENOR
	},
	output: {
		// path: path.resolve(__dirname, 'build'), // 必须使用绝对地址，输出文件夹
		// filename: 'bundle.js' // 打包后输出文件的文件名
		path: path.join(__dirname, 'dist'),
		// 既然我们希望缓存生效，就应该每次在更改代码以后修改文件名
		// [chunkhash]会自动根据文件是否更改而更换哈希
		filename: '[name].[chunkhash].js'
	},
	mode: 'development',
	devtool: 'eval-cheap-module-source-map', 
	devServer: {
		// todo 具体参数看文档
		// contentBase: path.resolve(__dirname, 'dist'),
		open: true,
		port: 8888,     
		hot: true,
		// hotOnly: true,
	},
	resolve: {
		// 文件扩展名，写明以后就不需要每个文件写后缀
		extensions: ['.vue', '.js', '.css', '.json'],
		// 路径别名，比如这里可以使用 css 指向 static/css 路径
		alias: {
			'@': resolve('src'),
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			// 它会应用到普通的 `.css` 文件，以及 `.vue` 文件中的 `<style>` 块
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
				// js 文件才使用 babel
				test: /\.js$/,
				// 使用哪个 loader
				use: 'babel-loader',
				// 不包括路径
				exclude: /node_modules/
			},
			{
				// 图片格式正则
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						// 配置 url-loader 的可选项
						options: {
							esModule: false, // 启用CommonJS语法 解决图片地址问题
							// 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
							limit: 10000,
							// 超出限制，创建的文件格式
							// build/images/[图片名].[hash].[图片格式]
							name: 'images/[name].[hash].[ext]'
						}
					}
				]
			},
			// {
			// 	test: /\.css$/i,
			// 	use: [MiniCssExtractPlugin.loader, 'css-loader']
			// }
		]
	},
	// 插件列表
	plugins: [
		// 输出的文件路径
		// new MiniCssExtractPlugin({
		// 	filename: 'css/[name].[hash].css'
		// })
		// new MiniCssExtractPlugin('css/[name].[hash].css')
		new VueLoaderPlugin(),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	// vendor 的意义和之前相同
		// 	// manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度
		// 	names: ['vendor', 'manifest'],
		// 	// 配合 manifest 文件使用
		// 	minChunks: Infinity
		// }),
		// 只删除 dist 文件夹下的 bundle 和 manifest 文件
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPatterns: ['dist/bundle.*.js', 'dist/vendor.*.js'],
			// 打印 log
			verbose: true,
			// 删除文件
			dry: false
		}),
		// 我们这里将之前的 HTML 文件当做模板
		// 注意在之前 HTML 文件中请务必删除之前引入的 JS 文件
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'index.html'),
			filename: 'index.html'
		})
	]
};
