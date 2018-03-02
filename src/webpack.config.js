const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: "source-map", // enum
  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  // 牺牲了构建速度的 `source-map' 是最详细的。

  entry:fs.readdirSync(__dirname).reduce((entries, dir)=>{
      const fullDir = path.join(__dirname, dir);
      const entry = path.join(fullDir, 'app.js');
      if(fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)){
          entries[dir] = ['es6-promise/auto',entry]
      }
      console.log(entries);
      return entries;
  },{}),

  output: {
      path: path.join(__dirname, '__build__'),
      filename: '[name].js',
    //   chunckFilename:'[id].chunk.js',
      publicPath: '/__build__/'
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.vue$/, loader: 'vue-loader' }
    ]
  },

  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      'vue-router': path.join(__dirname, '..', 'src')
    }
  },

    // Expose __dirname to allow automatically setting basename.
    context: __dirname,
    node: {
      __dirname: true
    },

    plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
      ]
}