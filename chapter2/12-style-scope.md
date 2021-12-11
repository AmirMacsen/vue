# <font color='cornflowerblue'>🛴scoped的作用</font >

> scoped用在style标签上，目的是防止vue中样式的冲突，被scoped修饰的style只能在当前组件生效

## 演示样式冲突

```vue
// TestSoped.vue
<template>
  <div class="demo">
    <h2 >Hello， world</h2>
  </div>
</template>

<script>
export default {
  name: "TestScoped"
}
</script>

<style>
 .demo{
   background-color: orange;
 }
</style>

```

```vue
//Student.vue
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

<style>
 .demo{
   background-color: gray;
 }
</style>
```

```vue
//App.vue,注意组件的引入顺序
<template>
  <div id="app">
    <h2 class="demo">你好，Vue</h2>
    <Student name="amir"></Student>
    <School ref="sch"></School>
    <TestPlugins></TestPlugins>
    <TestScoped></TestScoped>

  </div>
</template>

<script>
import School from "./components/School";
import Student from "@/components/Student";
import TestPlugins from "@/components/TestPlugins";
import TestScoped from "@/components/TestScoped";

export default {
  name: 'App',
  components: {
    School,
    Student,
    TestPlugins,
    TestScoped
  },
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

> 发现最终被demo样式修饰的都会变成orange，这是因为
>
> - vue中所有没有加scoped的样式最终都会汇总到一起
> - 后面写的会覆盖前面的
>   - 这个先后是组件import的先后，并不是在template标签中组件使用的先后
>   - 如果与App.vue中的有冲突，最终会以App.vue中的为准

## 演示scoped

> scope本身单词的意思就是局部的

```vue
<template>
  <div class="demo">
    <h2 >Hello， world</h2>
  </div>
</template>

<script>
export default {
  name: "TestScope"
}
</script>

<style scoped>
 .demo{
   background-color: orange;
 }
</style>
```

# <font color='cornflowerblue'>🛴有关less的引入</font>

```vue
<style lang="less" scoped>
 .demo{
   background-color: orange;
 }
</style>
```

但是vue中没有不能直接使用less，需要安装一个插件：less-loader，less-loader版本更新较快，它对webpack5.x进行了兼容，但是我们使用的是webpack4.x，所以在less-loader要使用7.x版本的会好一点

`yarn add less-loader@7`

`yarn add less`
