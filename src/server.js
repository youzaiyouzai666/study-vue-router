const express = require('express');
const rewrite = require('express-urlrewrite');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');//是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 
const WebpackConfig = require('./webpack.config.js');

const app = express();

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  }))

const fs = require('fs');
const path = require('path');

fs.readdirSync(__dirname).forEach(file => {
    if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
      app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
    }
  })
// fs.readdirSync(__dirname).forEach(file => {
//     if(fs.statSync(path.join(__dirname,file)).isDirectory()){
//         app.use(rewrite('/'+file + '/*'), '/' + file + '/index.html')
//     }
// })

app.use(express.static(__dirname))

const port = process.env.RORT || 3001;
module.exports = app.listen(port,()=>{
    console.log(`Server listening on http://localhost:${port}`);
})
