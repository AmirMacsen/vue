# <font color='cornflowerblue'>🛴需求</font>

> 在News组件中添加一行文字,让其不opacity样式动态变化

```vue
<template>
  <ul>
    <h4 :style="{opacity}">欢迎学习router</h4>
    <input>news001
    <input>news002
    <input>news003
  </ul>
</template>

<script>
export default {
  name: "News",
  data(){
    return{
      opacity:1
    }
  },
  mounted() {
    this.timer = setInterval(()=>{
      console.log("定时器被执行了")
      this.opacity -= 0.01
      if(this.opacity <= 0) this.opacity = 1
    },2000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
input {
  display: block;
}
</style>

```

> 问题是,我们已经在Home组件中给News设置了keep-alive,所以不会销毁定时器了,这样就会造成资源的浪费,使用vue-router提供的生命周期钩子可以解决这个问题

```vue
<template>
  <ul>
    <h4 :style="{opacity}">欢迎学习router</h4>
    <input>news001
    <input>news002
    <input>news003
  </ul>
</template>

<script>
export default {
  name: "News",
  data(){
    return{
      opacity:1
    }
  },
  activated() {
    this.timer = setInterval(()=>{
      console.log("定时器被执行了")
      this.opacity -= 0.01
      if(this.opacity <= 0) this.opacity = 1
    },)
  },
  deactivated() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
input {
  display: block;
}
</style>
```

# <font color='cornflowerblue'>🚀总结</font>

- activated,在组件呈现在用户眼前的时候生效
- deactivated,在组件在界面消失的时候生效