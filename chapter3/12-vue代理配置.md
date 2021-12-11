# <font color='cornflowerblue'>🛴axios</font>

> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

## 安装

yarn add axios

## 引用

import axios from "axios"

## 基本使用

```js
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 上面的请求也可以这样做
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

# <font color='cornflowerblue'>🛴使用axios编写业务</font>

> 通过发起一个后端请求，获取学生数据

## TestGet.vue

```vue
<template>
  <button @click="getStudent">点击获取学生信息</button>
</template>

<script>
import axios from "axios"
export default {
  name: "TestGet",
  methods:{
    getStudent(){
      axios.get("http://localhost:8080/getStudent").then(
          response => {
            console.log(response.data)
          },
          error =>{}
      )
    }
  }
}
</script>

<style scoped>

</style>
```

## 后端代码--通过flask实现

> 默认端口启动5000
>
> 个人跟随自己的技术栈写，不必局限于python

```python
from flask import Flask

app = Flask(__name__)


class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age


@app.route('/getStudent')
def hello_world():
    student = Student('amir', 18)
    return {
        "name": student.name,
        "age": student.age
    }


if __name__ == '__main__':
    app.run()
```

## 请求中的跨域问题

> 请求源和服务器保证协议、域名、端口一致就不存在跨域问题，如果三者有一个不一致就无法跨域
>
> 解决方案包括：后端处理、jsonp、服务代理，vue-cli就提供了一个代理服务器

## vue.config.js

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
    lintOnSave:false, //关闭语法检查，代码提交之前一定要检查一下
    //开启代理服务器
    devServer:{
        proxy: "http://localhost:5000"
    }
}
```

> 原理：我们前端代码中给这个代理服务器发送请求，然后它会把请求转发给后端。值得注意的是：
>
> - 这个代理服务器的端口与vue项目的端口一致，因此我们的axios.get的url端口号是8080
> - 发送的请求首先会在public目录下查找，如果正好匹配到了，就不会走后端了，直接返回

还有一种配置能解决向多个后端服务器发送请求

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
    lintOnSave:false, //关闭语法检查，代码提交之前一定要检查一下
    //开启代理服务器
 /*   devServer:{
        proxy: "http://localhost:5000"
    }*/
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                ws: true, //支持socket
                //修改请求源，设置为true，则后端认为是从5000端口发出的请求，设置为false，则后端认为是从当前服务的端口发送的请求
                changeOrigin: true,
                //修改请求路径
                pathRewrite: {
                    '^/api': ''   //需要rewrite的,
                }
            },
        }
    }
}
```

> 注意：修改vue.config.js后，项目重启才能生效