# <font color='cornflowerblue'>🛴需求</font>

> 在删除按钮旁边加一个编辑按钮，点击后title变成input框，自动获取焦点，用户输入失去焦点后更新todo，还原span
>
> 为了总结之前学的知识，这里我详细记录一下思路

## 编辑按钮绑定点击事件

` <button class="btn btn-primary" @click="handleEdit(todo)">编辑</button>`

### 点击事件

> 实现点击后span标签隐藏并被input标签覆盖，input出现了则要获取到焦点。
>
> 因为要控制标签的显示和隐藏，所以增加一个isEdit属性，这样就可以用v-show控制元素了。
>
> isEdit属性要添加到todo对象上，todo整体又在被App维护，所以需要使用到Vue.$set()函数。
>
> 怎么控制焦点获取呢？button和input是两个独立的元素，所以这里要使用到ref帮助获取dom

#### 一个错误的示例

```js
handleEdit(todo){
    this.$set(todo,"isEdit",true)
    this.$refs.inputTitle.focus()
}
```

> 以上代码有几点问题：
>
> - 我们每次点击编辑都要重新给todo重新添加一个属性，这样虽然没有问题，但是没有必要，如果有这个属性，我们只需要修改即可
> - 焦点获取并没有生效，为什么？因为我们改变了数据，等这个方法结束后，才会进行dom渲染，此时已经获取了焦点的input会被刷新，处理这个问题，Vue提供了$nextTick函数，作用是：当下一次dom渲染出来后，vue会帮我们调用它里面定义的函数

#### 正确的写法

```js
handleEdit(todo){
    if(Object.hasOwnProperty.call(todo,"isEdit")){
    todo.isEdit = true
    }else{
    this.$set(todo,"isEdit",true)
    }
this.$nextTick(() => {
	this.$refs.inputTitle.focus()
})
},
```

> 注意$nextTick里面普通函数的this是null，所以写成箭头函数

#### html的写法

```vue
<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
      <span v-show="!todo.isEdit">{{todo.title}}</span>
      <input type="text"
             :value="todo.title"
             v-show="todo.isEdit"
             @blur="todoBlur(todo,$event)"
             ref="inputTitle">
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    <button class="btn btn-primary" @click="handleEdit(todo)">编辑</button>
  </li>
</template>
```

## 焦点失去保存数据

> 对于todo的操作都在App中，所以App中需要一个updateTodo方法并给$bus绑定一个事件供MyItem调用

## App.vue

```vue
<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo"></MyHeader>
        <MyList :todos="todos"></MyList>
        <MyFooter
            :todos="todos"
            @checkAllTodo="checkAllTodo"
            :clearDoneTodos="clearDoneTodos">
        </MyFooter>
      </div>
    </div>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
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
      todos:JSON.parse(localStorage.getItem('todos')) || []
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
    deleteTodo(_,id){
      console.log("app 执行deletetodo")
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
    },
    //编辑todo
    updateTodo(id,title){
      this.todos.forEach((todo)=>{
        if(todo.id === id) todo.title = title
      })
    },
  },
  watch:{
    todos:{
      deep:true,
      handler(value){
        localStorage.setItem('todos',JSON.stringify(value))
      }
    }
  },
  mounted() {
    console.log("app 执行 mounted")
    this.$bus.$on("checkTodo",this.checkTodo)
    // this.$bus.$on("deleteTodo",this.deleteTodo)
    this.token = pubsub.subscribe('deleteTodo',this.deleteTodo)
    //绑定todo的edit方法
    this.$bus.$on('updateTodo',this.updateTodo)
  },
  beforeDestroy() {
    this.$bus.$off(['checkTodo','deleteTodo'])
    //取消订阅
    pubsub.unsubscribe(this.token)
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
  .btn-primary {
    color: #fff;
    background-color: skyblue;
    border: 1px solid #2f7fbd;
    margin-right: 5px;
  }
  .btn-primary:hover {
    color: #fff;
    background-color: #2f76bd;
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

## 给input绑定@blur

```vue
<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
      <span v-show="!todo.isEdit">{{todo.title}}</span>
      <input type="text"
             :value="todo.title"
             v-show="todo.isEdit"
             @blur="todoBlur(todo,$event)"
             ref="inputTitle">
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    <button class="btn btn-primary" @click="handleEdit(todo)">编辑</button>
  </li>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "MyItem",
  props:['todo'],
  methods:{
    handleCheck(id){
      //勾选or取消勾选
      // this.checkTodo(id)
      this.$bus.$emit('checkTodo',id)
    },
    handleDelete(id){
      //删除
      if(confirm("确定删除吗？")){
        // this.deleteTodo(id)
        // this.$bus.$emit('deleteTodo',id)
        pubsub.publish("deleteTodo",id)
      }
    },
    handleEdit(todo){
      if(Object.hasOwnProperty.call(todo,"isEdit")){
        todo.isEdit = true
      }else{
        this.$set(todo,"isEdit",true)
      }
      this.$nextTick(() => {
        this.$refs.inputTitle.focus()
      })
    },
    //编辑的时候，失去焦点修改isEdit
    //因为点击编辑之后，todo上已经有isEdit属性了，所以可以直接使用
    todoBlur(todo,e){
      if(e.target.value.trim().length === 0) return alert("事件名不能为空")
      todo.isEdit = false
      this.$bus.$emit('updateTodo',todo.id,e.target.value)
    }
  },
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

