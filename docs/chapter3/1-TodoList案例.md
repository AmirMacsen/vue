# <font color='cornflowerblue'>🛴组件化编码流程</font>

- 实现静态组件：抽取组件、使用组件实现静态页面效果
- 展示动态数据
  - 数据的类型、名称
  - 数据保存在哪个文件
- 交互：从绑定事件监听开始

# <font color='cornflowerblue'>🛴需求分析</font>

## 原型图

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter2/todolist.png)

- 功能
  - input中输入文字，点击enter生成一个新的li，形式保持一致（包含一个checkbox和一个字符串），checkbox默认为未勾选状态
  - li上面有一个删除按钮，点击可以删除该事项
  - 点击勾选在表示已经完成该事项，最下面显示勾选的数量和全部数量
  - 点击清除已经完成任务按钮，删除勾选的事项，如果没有勾选任何事项，则提示用户需要勾选
- 按照组件化编码流程实现
  - 分析需要的子组件包括：Header、List、Item、Footer（这里注意，组件的名称不能与html内置标签冲突，所以本次都在前面加一个My）
  - 静态页面创建完成后考虑动态数据的绑定，编写data
    - 这里要考虑的是事项用什么类型存储、一个事项包含哪些字段。特别的因为涉及逆序操作，所以需要key来定义元素的唯一标识
  - 上面步骤完成后，开始编写事件完成功能

# <font color='cornflowerblue'>🛴初步实现</font>

## MyHeader.vue

```vue
<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="add"/>
  </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
  name: "MyHeader",
  props:['addTodo'],
  data(){
    return {
      title:''
    }
  },
  methods:{
    add(){
      if (!this.title.trim()){
        return alert('输入不能为空')
      }
      //将用户输入包装成一个todo对象
      const todoObj = {id:nanoid(),title:this.title,done:false}
      this.addTodo(todoObj)
      this.title =""
    }
  }
}
</script>

<style scoped>
  /*header*/
  .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
  }

</style>
```

## MyList.vue

```vue
<template>
  <ul class="todo-main">
    <MyItem v-for="todo in todos" :key="todo.id" :todo="todo"></MyItem>
  </ul>
</template>

<script>
import MyItem from "@/components/MyItem";
export default {
  name: "MyList",
  components:{
    MyItem
  },
  props:['todos']
}
</script>

<style scoped>
  /*main*/
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
}
</style>
```

## MyItem.vue

```html
<template>
  <ul class="todo-main">
    <MyItem v-for="todo in todos" :key="todo.id" :todo="todo"></MyItem>
  </ul>
</template>

<script>
import MyItem from "@/components/MyItem";
export default {
  name: "MyList",
  components:{
    MyItem
  },
  props:['todos']
}
</script>

<style scoped>
  /*main*/
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
}
</style>
```

## MyFooter.vue

```vue
<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox"/>
    </label>
    <span>
          <span>已完成0</span> / 全部2
        </span>
    <button class="btn btn-danger">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter"
}
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
```

## App.vue

```vue
<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox"/>
    </label>
    <span>
          <span>已完成0</span> / 全部2
        </span>
    <button class="btn btn-danger">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter"
}
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
```

> 这里有一个点需要特别注意，我们是在header中创建的todoObj，那怎么实现组件间的数据通信呢？
>
> 其实Vue支持组件间的数据通信，但是本次因为我们的知识结构还没有涉及到，所以先用最基本的方式实现：
>
> - todos数据放到App.vue中，其他组件使用的时候用props接收
> - 往todos中增加todoObj的函数也放在App.vue中通过父组件给子组件传值的方式写在子组件的标签上，子组件通过props接收使用
>
> 至此，还有勾选与数据交互、footer和删除的功能没有实现

# <font color='cornflowerblue'>🛴实现勾选和删除</font>

> 勾选和删除都会改变todos，有一个原则就是数据在哪里，方法就在哪里，所以勾选和删除的方法都得写到App.vue中，继续通过props的方式向下传递

## App.vue

```vue
<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :addTodo="addTodo"></MyHeader>
        <MyList :todos="todos" :checkTodo="checkTodo" :deleteTodo="deleteTodo"></MyList>
        <MyFooter></MyFooter>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import MyList from "@/components/MyList";
import MyFooter from "@/components/MyFooter";

export default {
  name: 'App',
  components: {
    MyHeader,
    MyList,
    MyFooter
  },
  data(){
    return {
      todos:[
        {id:'0001',title:'Reading',done:true},
        {id:'0002',title:'dancing',done:false},
        {id:'0003',title:'playing',done:true},
      ]
    }
  },
  methods:{
    //添加一个todo
    addTodo(todoObj){
      this.todos.unshift(todoObj)
    },
    //勾选或者取消勾选todo
    checkTodo(id){
      this.todos.forEach((todo)=>{
        if(todo.id === id) todo.done = !todo.done
      })
    },
    //删除todo
    deleteTodo(id){
      this.todos = this.todos.filter((todo)=>{
        return todo.id !== id
      })
    }
  }
}
</script>

<style>
  /*base*/
  body {
    background: #fff;
  }

  .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  .btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
  }

  .btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
  }

  .btn:focus {
    outline: none;
  }

  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
```

## MyList.vue

```vue
<template>
  <ul class="todo-main">
    <MyItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :checkTodo="checkTodo"
        :deleteTodo="deleteTodo">
    </MyItem>
  </ul>
</template>

<script>
import MyItem from "@/components/MyItem";
export default {
  name: "MyList",
  components:{
    MyItem
  },
  props:['todos',"checkTodo","deleteTodo"]
}
</script>

<style scoped>
  /*main*/
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
}
</style>
```

## MyItem.vue

```vue
<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
  </li>
</template>

<script>
export default {
  name: "MyItem",
  props:['todo','checkTodo','deleteTodo'],
  methods:{
    handleCheck(id){
      //勾选or取消勾选
      this.checkTodo(id)
    },
    handleDelete(id){
      //删除
      if(confirm("确定删除吗？")){
        this.deleteTodo(id)
      }
    }

  }
}
</script>

<style scoped>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
  li:hover {
    background-color: #ddd;
  }

  li:hover button {
    display: inline-block;
  }
</style>
```

> 注意这里修改了button的样式

# <font color='cornflowerblue'>🛴实现Footer</font>

## App.vue

```vue
<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :addTodo="addTodo"></MyHeader>
        <MyList
            :todos="todos"
            :checkTodo="checkTodo"
            :deleteTodo="deleteTodo">
        </MyList>
        <MyFooter
            :todos="todos"
            :checkAllTodo="checkAllTodo"
            :clearDoneTodos="clearDoneTodos">
        </MyFooter>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import MyList from "@/components/MyList";
import MyFooter from "@/components/MyFooter";

export default {
  name: 'App',
  components: {
    MyHeader,
    MyList,
    MyFooter
  },
  data(){
    return {
      todos:[
        {id:'0001',title:'Reading',done:true},
        {id:'0002',title:'dancing',done:false},
        {id:'0003',title:'playing',done:true},
      ]
    }
  },
  methods:{
    //添加一个todo
    addTodo(todoObj){
      this.todos.unshift(todoObj)
    },
    //勾选或者取消勾选todo
    checkTodo(id){
      this.todos.forEach((todo)=>{
        if(todo.id === id) todo.done = !todo.done
      })
    },
    //删除todo
    deleteTodo(id){
      this.todos = this.todos.filter((todo)=>{
        return todo.id !== id
      })
    },
    //全选或者全不选
    checkAllTodo(done){
      this.todos.forEach((todo)=>{
        todo.done=done
      })
    },
    //清除选中
    clearDoneTodos(){
     this.todos =  this.todos.filter((todo)=>{
        return !todo.done
      })
    }
  }
}
</script>

<style>
  /*base*/
  body {
    background: #fff;
  }

  .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  .btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
  }

  .btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
  }

  .btn:focus {
    outline: none;
  }

  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
```

## MyFooter.vue

```vue
<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox" v-model="isAll"/>
    </label>
    <span>
          <span>已完成{{totalDone}}</span> / 全部{{total}}
        </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ['todos',"checkAllTodo","clearDoneTodos"],
  computed: {
    totalDone() {
      return this.todos.reduce((pre, current) => pre + (current.done ? 1 : 0), 0)
    },
    total(){
      return this.todos.length
    },
    isAll:{
      get(){
        return this.totalDone === this.total && this.total > 0
      },
      set(val){
        this.checkAllTodo(val)
      }
    }
  },
  methods:{
    // checkAll(e){
    //   this.checkAllTodo(e.target.checked)
    // }
    clearAll(){
      this.clearDoneTodos()
    }
  }
}
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
```

# <font color='cornflowerblue'>🚀总结TodoList案例</font>

- 组件化编码流程
  - 拆分静态组件：组件要按照功能点拆分，命名不能与html元素冲突
  - 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用
    - 一个组件在用，放在组件自身即可
    - 一些组件在用，放在他们共同的父组件上（状态提升）
  - 实现交互：从绑定事件开始
- props适用于
  - 父组件===》子组件通信
  - 子组件===》父组件通信（要求父给子一个函数）
- 使用v-model时注意：v-model值不能是props传过来的，props不能修改
- props传过来的值如果是对象类型的数据，修改对象中属性的值vue不会报错，但是不推荐这样做

