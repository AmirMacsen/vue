# <font color='cornflowerblue'>🛴组件本质是什么</font>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <script src="https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/vue.js"></script>
</head>
<body>
<div id="root">
  <ul class="list-group">
    <school/>
    <hr>
  </ul>
  <button  @click="showInfo">点我提示信息</button>
</div>
<script !src="">
  //创建school组件
  const school = Vue.extend({
    //没有el配置项，因为最终所有组件都会被一个vm管理，由vm决定服务哪个节点
    template:`
          <div>
              <li class="list-group-item">学校名称：{{schoolName}}</li>
              <li class="list-group-item">学校地址：{{address}}</li>
          </div>`,
    data(){
      return {
        schoolName: "北大",
        address:"北京"
      }
    }
  })

  new Vue({
    el:"#root",
    //注册组件
    components:{
      school:school,
    },
    methods:{
      showInfo(){
        alert(school)
      }

    }
  })
</script>
</body>
</html>
```

- 通过点击按钮发现，school本质上是一个构造函数，既然是构造和函数，调用时就要用new关键词
- 这个函数不是程序员定义的，而是`Vue.extend`生成的
- 当在页面使用组件的时候，Vue解析时就会创建组件的实例对象，即调用`new VueComponent(options)`
- 每次调用`Vue.extend`返回的都是一个全新的VueComponent

```js
//Vue.js源码
Vue.extend = function (extendOptions) {
   //略去影响分析的代码
    var Sub = function VueComponent (options) {
        this._init(options);
    };
   //略去影响分析的代码
    return Sub
};
```

- this的指向
  - 组件配置中
    - data函数、methods函数、watch函数、computed函数，他们的this均指向VueComponent对象
  - new Vue配置中
    - data函数、methods函数、watch函数、computed函数，他们的this均指向Vue实例对象
- VueComponent实例对象，简称VC
- 可以通过`vm.$children`查看被vm管理的组件,返回是一个数组

