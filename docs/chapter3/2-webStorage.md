# <font color='cornflowerblue'>🛴webStorage</font>

- 存储内容一般支持5M左右（不同浏览器可能不一样）
- 浏览器端通过window.sessionStorage和window.localStorage属性来实现本地存储
- sessionStorage随着浏览器窗口的关闭而消失
- localStorage存储的内容，需要手动删除或者过期后才消失
- getItem如果对应key的value获取不到，返回值就是null

## localStorage

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
<h2>测试localStorage</h2>
<button onclick="addInfo()">点我存储</button>
<button onclick="getInfo()">点我获取</button>
<button onclick="deleteInfo()">点我删除</button>
<button onclick="clearInfo()">点我删除全部</button>
<script>
    function addInfo() {
        const student = {
            name: 'jack',
            age: 99
        }
        let userName = "amir"
        localStorage.setItem("user", JSON.stringify(student))
        localStorage.setItem("userName", userName)
    }
    function getInfo() {
        console.log(localStorage.getItem('user'))
        console.log(localStorage.getItem('userName'))
    }
    function deleteInfo() {
        localStorage.removeItem('user')
    }
    function clearInfo() {
       localStorage.clear()
    }
</script>
</body>

</html>
```

## sessionStorage

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
<h2>测试sessionStorage</h2>
<button onclick="addInfo()">点我存储</button>
<button onclick="getInfo()">点我获取</button>
<button onclick="deleteInfo()">点我删除</button>
<button onclick="clearInfo()">点我删除全部</button>
<script>
    function addInfo() {
        const student = {
            name: 'jack',
            age: 99
        }
        let userName = "amir"
        sessionStorage.setItem("user", JSON.stringify(student))
        sessionStorage.setItem("userName", userName)
    }
    function getInfo() {
        console.log(sessionStorage.getItem('user'))
        console.log(sessionStorage.getItem('userName'))
    }
    function deleteInfo() {
        sessionStorage.removeItem('user')
    }
    function clearInfo() {
       sessionStorage.clear()
    }
</script>
</body>

</html>
```

# <font color='cornflowerblue'>🛴TodoList本地化存储</font>

> 使用localStorage存储todos

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

