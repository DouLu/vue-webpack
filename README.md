# vue-webpack
vue webpack template

###
webpack5 vue3 - https://juejin.cn/post/6978832288586924046 
webpack5 - https://juejin.cn/post/7006109696926941221
## init project
npm init -y  
npm install vue vue-router vuex

## webpack
### webpack package
npm install --save-dev webpack webpack-cli  
webpack.config.js
### babel package
https://juejin.cn/post/6999188157992271886

npm install core-js  
npm install --save-dev @babel/core @babel/preset-env babel-core babel-loader
- babel的版本要对应
- .babelrc
  ```
  {
    "presets": [
      ["@babel/preset-env", {
        "useBuiltIns": "usage", // 按需引入 corejs 中的模块 
        "corejs": 3, // 核心 js 版本
        "targets": "> 0.25%, not dead" // 浏览器支持范围
      }]
    ]
  }
  ```
### vue loader package
npm install vue-loader vue-template-compiler -D
### css image loader
npm install vue-style-loader css-loader file-loader url-loader -D  
### plugins CommonsChunkPlugin
todo 分包插件移除了？
### clean-webpack-plugin
