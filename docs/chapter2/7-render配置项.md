# <font color='cornflowerblue'>🛴main.js</font>

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

从上面代码发现，vue-cli创建的项目，使用的是render渲染模板，能否在main.js中使用template呢

## 使用template替换render

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
  template:`<App/>`,
  components:{
    App
  }
}).$mount('#app')
```

这时候启动项目访问页面，会发现有一个报错：

> vue.runtime.esm.js?2b0e:619 [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

- 以上报错简单说就是我们引用了一个不完整的Vue，所以不支持template，解决方案有两种
  - 使用render函数预编译
  - 使用完整版的Vue

## 使用完整版的Vue修改main.js

首先看一下node_modules中提供的所有Vue版本

- vue/dist
  - vue.common.xxx.js：es6有common.js的模块化方式，这些文件是为common.js做项目模块化准备的
  - vue.esm.xxx.js：es6有modules模块化方式，这些文件是为这种模块化准备的
  - vue.runtime.xxx.js：在Vue源码上没有模板解析器，缩小了体积
  - vue.js：完整的vue源码
  - 项目import的默认的Vue版本在Vue源码的package.json中module定义

### 使用完全版的Vue对main.js进行改造

```js
/*此文件是项目的入口文件*/
//引入vue
import Vue from 'vue/dist/vue'
//引入app组件，他是所有组件的父组件
import App from './App.vue'
//关闭vue的生产提示
Vue.config.productionTip = false
//创建vm对象
new Vue({
  template:`<App/>`,
  components:{
    App
  }
}).$mount('#app')
```

启动项目发现运行成功，App可以正常展示

那么为什么cli要默认使用esm呢？

> 实际上Vue源码包含两个部分：Vue核心和Vue模板解析器
>
> 我们使用Vue.js开发的时候没有什么问题，但是项目最终使用webpack打包，它已经把Vue代码翻译成了浏览器可以识别的js文件，此时模板解析器还被打包到项目中是没有必要的，况且这部分占据了Vue源码的1/3。所以Vue官方提供了esm这样的版本。

# <font color='cornflowerblue'>🛴render函数</font>

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
 render:function (createElement){
  return createElement(App)
 }
}).$mount('#app')
```

render函数没有使用到this（实际上它的this是一个proxy对象），所以可以简写成箭头函数的样子

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
 render:createElement=> createElement(App)
}).$mount('#app')
```

