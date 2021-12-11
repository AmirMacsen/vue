# <font color='cornflowerblue'>🛴Vue脚手架安装</font>

> 参考官网

# <font color='cornflowerblue'>🛴Vue项目结构分析</font>

> vue-cli默认使用webpack构建项目

## .gitignore

- git提交代码时忽略的文件

## babel.config.js

- 编写vue会用到es6语法，但是浏览器不一定支持，所以使用这个插件进行将es6转换成es5

## package.json

- 项目的基本配置：名称、版本号
- 项目的启动配置：script对象中配置启动脚本
- 项目的依赖配置
- eslint代码检查规则配置
- ...

## README.md

- 项目的基本介绍

## src

- assets
  - 存放静态资源如图片、字体等
- components
  - 存放所有的子组件
- App.vue
  - 所有子组件的父组件，对子组件进行管理
- main.js
  - 项目的入口文件

```js
/*此文件是项目的入口文件*/
//引入vue
import Vue from 'vue'
//引入app组件，他是所有组件的父组件
import App from './App.vue'
//关闭vue的生产提示
Vue.config.productionTip = false
//创建vm对象
new Vue({
  render: h => h(App),
}).$mount('#app')
```

## public

- 存放html页面
  - index.html：配置el用到的容器

# <font color='cornflowerblue'>🛴cli的默认配置</font>

> 使用`vue inspect > output.js`命令生成一个js文件,此文件包含当前项目的所有vue相关的配置，只用于展示

可以在Vue-cli官网查看脚手架的配置方式。

- 注意需要在vue项目与package.json同级目录下创建一个vue.config.js文件，该文件采用的是common.js的模块化语法。
- 这个文件一旦修改，需要重新启动才生效

## 一个简单的示例

vue.config.js

```js
module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },
    lintOnSave:false, //关闭语法检查，代码提交之前一定要检查一下，我自己写的时候也会开启，这样比较有条不紊
}
```

