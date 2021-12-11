# <font color='cornflowerblue'>🛴学习目标</font>

> - axios发起get请求，以及请求后response的处理
> - 复习组件间的通信技术
> - 实现loading加载的效果

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter4/target_github.gif)

# <font color='cornflowerblue'>🛴编写过程</font>

## 组件拆分

- App.vue
- List.vue
- Search.vue

## 数据安排

- List.vue：存储列表数据
- Search：提供查询关键词

## 方法

- Search.vue：点击查询发起ajax请求，然后通过全局总线调用List绑定的函数，把数据传递给List
- List.vue：负责数据渲染，向全局总线绑定一个函数，供Search调用

## coding

### App.vue

```vue
<template>
  <div class="container">
    <Search></Search>
    <List></List>
  </div>
</template>

<script>
import Search from "@/components/Search";
import List from "@/components/List";
export default {
  name: 'App',
  components:{
    Search,
    List
  }
}
</script>

<style>

</style>
```

### Search.vue

```vue
<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text"
             placeholder="enter the name you search"
             v-model="keyword"/>&nbsp;
      <button @click="getUsers">Search</button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Search",
  data(){
    return {
      keyword:"",
    }
  },
  methods:{
    getUsers(){
      //请求前更新list数据
      this.$bus.$emit('updateListData',{isLoading:true,errMsg:'',users:[],isFirst:false})
      if(!this.keyword.trim()) {
        return alert("请输入查新条件")
      }
      axios.get(`https://api.github.com/search/users?q=${this.keyword}`).then(
          response=>{
            this.$bus.$emit('updateListData',{isLoading:false,errMsg:'',users:response.data.items})
          },
          error=> {
            //请求错误更新list
            this.$bus.$emit('updateListData', {isLoading: false, errMsg: error.message, users: []})
          }
      )
    }
  }
}
</script>

<style scoped>

</style>
```

### List.vue

```vue
<template>
  <div >
    <div class="row">
      <div class="card" v-show="info.users.length"  v-for="item in info.users" :key="item.login">
        <a :href="item.html_url" target="_blank">
          <img :src="item.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{item.login}}</p>
      </div>
      <div v-show="info.isFirst">
        <h2>欢迎使用</h2>
      </div>
      <div v-show="info.isLoading">
        <h2>加载中</h2>
      </div>
      <div v-show="info.errMsg">
        <p>{{info.errMsg}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data(){
    return {
      info:{
            isFirst:true,
            isLoading:false,
            errMsg:"",
            users:[]
      }
    }
  },
  mounted() {
    this.$bus.$on('updateListData',(dataObj)=>{
       this.info = {...this.info,...dataObj}
    })
  }
}
</script>

<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
```

> 需要注意的是：在public下的index.html中引入了bootstrap.css

### index.html

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
<!--针对ie浏览器的配置，让ie以最高的渲染级别渲染页面-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
<!--      开启移动端的理想视口-->
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
<!--      引入bootstrap-->
    <link rel="stylesheet" href="<%= BASE_URL %>css/bootstrap.css">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
<!--  当浏览器不支持js，这个标签中的元素就会渲染-->
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
<!--容器-->
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

