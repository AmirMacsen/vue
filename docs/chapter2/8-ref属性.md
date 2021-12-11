# <font color='cornflowerblue'>🛴使用Id在vue项目中获取元素</font>

```vue
<template>
  <div id="app">
    <h2 v-text="msg" id="title"></h2>
    <button @click="showH2">点我输出上方的dom元素</button>
    <School id="sch"></School>
    <button @click="showSch">点我输出上方的dom元素</button>
  </div>
</template>

<script>
import School from "./components/School";

export default {
  name: 'App',
  components: {
    School,
  },
  data(){
    return {
      msg:"欢迎学习Vue"
    }
  },
  methods:{
    showH2(){
      console.log(document.getElementById('title'))
    },
    showSch(){
      console.log(document.getElementById('sch'))
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

- 上面的获取方式有两个问题
  - Vue不推荐直接用js操作DOM元素
  - vc的获取是真实DOM，但是往往我们想要一个vc对象

# <font color='cornflowerblue'>🛴ref属性</font>

> ref属性被用来给元素或者子组件注册引用信息（id的替代者）
>
> 应用在html标签上是真实的DOM元素，应用在组件标签上是组件实例对象vc

```vue
<template>
  <div id="app">
    <h2 v-text="msg" ref="title"></h2>
    <button @click="showH2">点我输出上方的dom元素</button>
    <School ref="sch"></School>
    <button @click="showSch">点我输出上方的dom元素</button>
  </div>
</template>

<script>
import School from "./components/School";

export default {
  name: 'App',
  components: {
    School,
  },
  data(){
    return {
      msg:"欢迎学习Vue"
    }
  },
  methods:{
    showH2(){
      console.log(this.$refs.title)
    },
    showSch(){
      console.log(this.$refs.sch)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

