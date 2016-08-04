/**
 * learning-gulp - webpack.config.js
 * Created by mengdesen on 15/4/14.
 */

'use strict';
var path = require('path');

var glob = require('glob');
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

function entries (globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        basename = path.basename(entry, '.js');
        entries[path.join(dirname, basename)] = './' + entry;
    }
	/*
	{ 'src\detail\add': './src/detail/add.js',
	  'src\detail\index': './src/detail/index.js',
	  'src\index\index': './src/index/index.js',
	  'src\index\test': './src/index/test.js' }
	 */
    return entries;
}


module.exports = {
  entry: entries('src/**/index.js'), //index为主入口文件，如果打包所有：src/**/*.js
  output: {
    // path: __dirname + "/build/",
    // filename: "[name].js"
    path: path.join(__dirname, '..', 'build'),
    publicPath: './build/',
    filename: '[name].js'
  },
  resolve: {
  	//配置别名，在项目中可缩减引用路径
    alias: {
      // jquery: srcDir + "/js/lib/jquery.min.js",
      // core: srcDir + "/js/core",
      // ui: srcDir + "/js/ui"
    },
	extensions: ['', '.js', '.json', 'coffee']
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
  plugins: [
  	//提供全局的变量，在模块中使用无需用require引入
    // new webpack.ProvidePlugin({
    //   jQuery: "jquery",
    //   $: "jquery",
    //   // nie: "nie"
    // }),
    commonsPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ] //plugins: [commonsPlugin]
};
