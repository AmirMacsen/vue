# <font color='cornflowerblue'>🛴改造哪个部分</font>

App.vue和MyItem.vue这是两个没有直接关系的组件，我们之前使用props获取数据，props还经过了MyList接收，实现颇为累赘，增加了多余的耦合，所以接下来改造这部分。

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
    this.$bus.$on("checkTodo",this.checkTodo)
    this.$bus.$on("deleteTodo",this.deleteTodo)
  },
  beforeDestroy() {
    this.$bus.$off(['checkTodo','deleteTodo'])
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
        this.$bus.$emit('deleteTodo',id)
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

# <font color='cornflowerblue'>🚀总结</font>

> 在编写过程中，发现在什么地方编写绑定事件、什么地方调用事件一直很模糊，所以需要提炼理清

- 谁需要数据就在谁身上编写绑定事件
  - 绑定事件用$on(eventName,callback)
- 谁要传递数据就在谁身上调用事件
  - 调用事件用$emit(eventName,params)
- 特别的，在组件销毁的时候，一定要解绑事件
  - `beforeDestory(){this.$bus.$off(eventName)}`

