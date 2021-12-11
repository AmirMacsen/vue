# <font color='cornflowerblue'>🛴vuex是什么</font>

> 专门在vue中实现集中式的状态管理的一个Vue插件，对vue应用中多个组件间的共享数据进行集中式管理（读/写），也是一种组件间的通信方式，适用于任意组件。
>
> vuex的使用场景：
>
> - 组件间有共享数据

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter4/vuex.svg)

# <font color='cornflowerblue'>🛴$bus和vuex对比</font>

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter4/%24bus%E6%80%BB%E7%BA%BF%E5%AE%9E%E7%8E%B0%E5%A4%9A%E7%BB%84%E4%BB%B6%E4%BA%8B%E4%BB%B6%E5%85%B1%E4%BA%AB%E6%95%B0%E6%8D%AE%E8%AF%BB%E5%86%99.png)

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter4/vuex%E5%AE%9E%E7%8E%B0%E7%BB%84%E4%BB%B6%E9%97%B4%E6%95%B0%E6%8D%AE%E5%85%B1%E4%BA%ABpng.png)

# <font color='cornflowerblue'>🛴Vuex环境配置</font>

## 安装

yarn add vuex

## 使用

- 在src目录创建一个store文件夹，里面新建一个index.js
- 引入Vuex插件
- 创建三个对象：actions、mutations、state
- 导出这三个对象

## index.js

```js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
//响应组件中的动作
const actions = {

}

//操作数据
const mutations = {

}

//存储数据
const state = {
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
})

```

## main.js

```js
/*此文件是项目的入口文件*/
//引入vue
import Vue from 'vue'
//引入app组件，他是所有组件的父组件
import App from './App.vue'
//关闭vue的生产提示
Vue.config.productionTip = false

import store from './store'
//创建vm对象
new Vue({
 render:createElement=> createElement(App),
 store,
 beforeCreate() {
  Vue.prototype.$bus = this
 }

}).$mount('#app')
```

# <font color='cornflowerblue'>🛴实现一个需求</font>

> dom结构中有一个select组件，可选1，2，3三个数字，提供一个加法、减法、只有选中奇数的时候才加、延时加四个方法，和sum由vuex管理

## index.js

```js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
//响应组件中的动作
const actions = {
    add(context,value){
        context.commit('ADD',value)
    },
    sub(context,value){
        context.commit('SUB',value)
    },
    addIfOdd(context,value){
        context.commit('ADD',value)
    }
}

//操作数据
const mutations = {
    ADD(state,value){
        state.sum += value
    },
    SUB(state,value){
        state.sum -= value
    },
}

//存储惧
const state = {
    sum: 0,
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
})
```

## Count.vue

```vue
<template>
<div>
  <h1>当前求和为：{{ $store.state.sum }}</h1>
  <select v-model.number="n">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
  <button @click="increment">+</button>
  <button @click="decrement">-</button>
  <button @click="incrementOdd">当前和为奇数的时候再加</button>
  <button @click="incrementWait">等一等再加</button>
</div>
</template>

<script>
export default {
  name: "Count",
  data(){
    return{
      n: 1,
    }
  },
  methods:{
    increment(){
     this.$store.dispatch('add',this.n)
    },
    decrement(){
      this.$store.dispatch('sub',this.n)
    },
    incrementOdd(){
      if(this.$store.state.sum % 2){
        this.$store.dispatch('addIfOdd',this.n)
      }
    },
    incrementWait(){
      setTimeout(()=>{
        this.$store.dispatch('add',this.n)
      },500)
    }
  }
}
</script>

<style scoped>
button{
  margin-left: 10px;
}
</style>
```

> 上面代码奇数判断和定时器最好写在index.js中，这样规范一点。因为正常的业务需求一般不会这么简单，对共享数据的操作必须封装的好一点可以减少代码量，提升复用性

# <font color='cornflowerblue'>🛴getters</font>

> getters是store的一个可选配置，用来对stat中的数据进行加工

## index.js

```js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
//响应组件中的动作
const actions = {
    add(context,value){
        context.commit('ADD',value)
    },
    sub(context,value){
        context.commit('SUB',value)
    },
    addIfOdd(context,value){
        context.commit('ADD',value)
    }
}

//操作数据
const mutations = {
    ADD(state,value){
        state.sum += value
    },
    SUB(state,value){
        state.sum -= value
    },
}

//存储惧
const state = {
    sum: 0,
}
//加工数据
const getters = {
    bigSum(state){
        return state.sum * 10
    }
}
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
```

## Count.vue

```vue
<template>
<div>
  <h1>当前求和为：{{ $store.state.sum }}</h1>
  <h1>当前求和放大10倍为：{{ $store.getters.bigSum }}</h1>
  <select v-model.number="n">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
  <button @click="increment">+</button>
  <button @click="decrement">-</button>
  <button @click="incrementOdd">当前和为奇数的时候再加</button>
  <button @click="incrementWait">等一等再加</button>
</div>
</template>

<script>
export default {
  name: "Count",
  data(){
    return{
      n: 1,
    }
  },
  methods:{
    increment(){
     this.$store.dispatch('add',this.n)
    },
    decrement(){
      this.$store.dispatch('sub',this.n)
    },
    incrementOdd(){
      if(this.$store.state.sum % 2){
        this.$store.dispatch('addIfOdd',this.n)
      }
    },
    incrementWait(){
      setTimeout(()=>{
        this.$store.dispatch('add',this.n)
      },500)
    }
  }
}
</script>

<style scoped>
button{
  margin-left: 10px;
}
</style>
```

> getters特别像计算属性