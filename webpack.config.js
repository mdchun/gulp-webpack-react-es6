/**
 * learning-gulp - webpack.config.js
 * Created by mengdesen on 15/4/14.
 */

'use strict';
var path = require('path');

var glob = require('glob');
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
// 项目的样式能不要被打包到脚本中，而是独立出来作为.css
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function entries(globPath) {
  var files = glob.sync(globPath);
  var entries = {},
    entry, dirname, basename;

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
  // './src/app/app.js', // 单页应用入口
  // entries('src/**/index.js') // 多应用入口
  entry: entries('src/app/**/*.js'), //index为主入口文件，如果打包所有：src/**/*.js
  output: {
    // path: __dirname + "/build/",
    // filename: "[name].js"
    /*多应用入口*/
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
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['', '.js', '.json', 'coffee']
  },
  module: {
    loaders: [{
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }, // use ! to chain loaders
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }, // inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.jsx?$/,
        loader: "jsx-loader?harmony",
        exclude: /node_modules/
      }, 
    ]
  },
  plugins: [
    //提供全局的变量，在模块中使用无需用require引入
    // new webpack.ProvidePlugin({
    //   React:'react',
    //   ReactDOM:'react-dom'
    //   // jQuery: "jquery",
    //   // $: "jquery",
    //   // nie: "nie"
    // }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //       NODE_ENV: 'development'
    //   }
    // }),
    commonsPlugin,
    new ExtractTextPlugin("[name].css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ], //plugins: [commonsPlugin]
  externals: {
    'React': 'react',
    'ReactDOM': 'react-dom',
    '$': 'jQuery',
    'Zepto': 'Zepto'
  }
};