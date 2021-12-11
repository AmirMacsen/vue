# <font color='cornflowerblue'>🛴Mixin</font >

> 混合是一种设计模式，可以极大的提高代码的复用性。
>
> 如果Vue中两个组件在某个方面（函数或者数据等）一致，就可以使用混合模式提炼代码

## mixin.js

```js
export const mixin = {
    data(){
        return{
            x:1001
        }
    },
    methods:{
        showInfo(){
            console.log(this.name)
        }
    },
    mounted() {
        console.log("hello,vue")
    }
}
```

## Student.vue

```vue
<template>
  <div class="demo">
    <h1>欢迎学习Vue</h1>
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <button @click="showInfo">点击</button>
    <button @click="showX">点击提示x</button>
  </div>
</template>

<script>
import {mixin} from "@/mixin";
export default {
  name: "Student",
  props:{
    name:{
      type:String,
      required: true
    },
    age:{
      type:Number,
      default:99
    }
  },
  mixins:[mixin],
  methods:{
    showX(){
      alert(this.x)
    }
  },
  mounted() {
    console.log("hello,student")
  }
}
</script>

<style scoped>
 .demo{
   background-color: gray;
 }
</style>
```

## School.vue

```vue
<template>
  <div class="demo">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="showInfo">点击</button>
  </div>
</template>

<script>
import {mixin} from "@/mixin";
export default {
  name: "School",
  data(){
    return{
      name:"北大",
      address:"shenzhen"
    }
  },
  mixins:[mixin]
}
</script>

<style scoped>
 .demo{
   background-color: gray;
 }
</style>
```

- 混合的使用方式
  - 通过es6的语法定义和引入
  - 使用`mixins:[mixinName]`在vc中注册使用
- 混合js中可以定义哪些
  - vc中可以定义的，混合中都可以定义，并且和vc中定义一样
  - 如果vc中和混合中有冲突（重名），则优先使用vc中的
  - 特别的，所有Vue中提供的钩子函数，如果混合中和vc中都有定义，则都会执行

# <font color='cornflowerblue'>🛴Mixin的全局定义</font>

## mixin.js

```js
export const mixin = {
    data(){
        return{
            x:1001
        }
    },
    methods:{
        showInfo(){
            console.log(this.name)
        }
    },
    mounted() {
        console.log("hello,vue")
    }
}

export const mixin_another = {
    data(){
        return{
            global_x:"全局混合"
        }
    },
    mounted() {
        console.log(this.global_x)
    }
}
```

## main.js

```js
/*此文件是项目的入口文件*/
//引入vue
import Vue from 'vue'
//引入app组件，他是所有组件的父组件
import App from './App.vue'
//引入全局混合
import {mixin_another} from "@/mixin";
//关闭vue的生产提示
Vue.config.productionTip = false
//注册全局混合
Vue.mixin(mixin_another)
//创建vm对象
new Vue({
 render:createElement=> createElement(App)
}).$mount('#app')
```

- 全局配置对所有组件都生效（包括Root、App、子组件）
