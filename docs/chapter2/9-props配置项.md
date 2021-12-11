# <font color='cornflowerblue'>🛴为什么要用props</font >

> 如果一个子组件的数据要动态获取而不是写在data中，props就可以接收父组件传递过来的数据

## App.vue

```vue
<template>
  <div id="app">

    <Student name="amir" age="18"></Student>
    <School ref="sch"></School>

  </div>
</template>

<script>
import School from "./components/School";
import Student from "@/components/Student";

export default {
  name: 'App',
  components: {
    School,
    Student
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

## Student.vue

```Vue
<template>
  <div class="demo">
    <h1>欢迎学习Vue</h1>
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
  </div>
</template>

<script>
export default {
  name: "Student",
  props:['name',"age"]
}
</script>

<style scoped>
 .demo{
   background-color: gray;
 }
</style>
```

# <font color='cornflowerblue'>🛴props的三种写法</font>

## 数组--只接收

> 见上面的代码

## 对象--限制类型

```vue
<template>
  <div class="demo">
    <h1>欢迎学习Vue</h1>
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
  </div>
</template>

<script>
export default {
  name: "Student",
  props:{
    name:String,
    age:Number
  }
}
</script>

<style scoped>
 .demo{
   background-color: gray;
 }
</style>
```

- 上面的代码age要求是数字类型，但是我们之前传的是一个字符串，虽然页面上会正常显示，但是调试工具打开会报错，所以我们需要传递一个数字过来
- 可以使用v-bind简写的形式传递一个数字过去

```vue
<template>
  <div id="app">

    <Student name="amir" :age="18"></Student>
    <School ref="sch"></School>

  </div>
</template>

<script>
import School from "./components/School";
import Student from "@/components/Student";

export default {
  name: 'App',
  components: {
    School,
    Student
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

## 多个对象的写法--限制类型、限制必要性、指定默认值

```vue
<template>
  <div class="demo">
    <h1>欢迎学习Vue</h1>
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>
 .demo{
   background-color: gray;
 }
</style>
```

> 注意：props的优先级是高于vc的methods的，也就是说如果props中接收了一个add函数，methods中不能定义同样名称的函数了
>
> props中的东西原则上不允许修改，因为有些情况Vue监测到修改会报错，而有些情况Vue检测不到
>
> - let obj = {a:1,b:2}  obj.a=666，这种修改检测不到
> - let obj = {a:1,b:2} obj = {x:100,y:200}, 这种修改能监测到，会报错
