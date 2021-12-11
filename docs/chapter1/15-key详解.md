# 🛴<font color='cornflowerblue'>一个现象</font>

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter1/vue_key.gif)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="../js/vue.js"></script>
</head>
<body>
<style>
   * {
       padding: 10px;
    }
</style>

<div id="root">

    <button @click="Add" class="btn-primary" >点我添加老刘</button>
    <hr>
    <div class="input-group mb-3" v-for="p in persons">
        <div class="input-group-prepend">
            <span class="input-group-text">{{p.name}}-{{p.age}}</span>
        </div>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" style="margin-top: 10px">
    </div>

</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el:"#root",
        data:{
            name:'jack',
            n:0,
            persons:[
                {id:'0001',name:"amir",age:"18"},
                {id:'0002',name:"joker",age:"19"},
                {id:'0003',name:"leo",age:"20"},
            ],
            leo:{
                id:"1001",
                name:"leo",
                age:"100",
            }
        },
        methods:{
            Add(){
                this.persons.splice(0,0,{id:"0004",name:"laoliu",age:"20"})
            }
        }

    })
</script>
</body>
</html>
```

## 原理

如果在v-for的时候没有写key，那么vue会把遍历的时候的索引值自动写成key，此时如果破坏顺序，就会产生上图的问题。一般的，这个key最好是唯一标识、从数据库传递过来的数据中指定。

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter1/key_principle.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="../js/vue.js"></script>
</head>
<body>
<style>
   * {
       padding: 10px;
    }
</style>

<div id="root">

    <button @click="Add" class="btn-primary" >点我添加老刘</button>
    <hr>
    <div class="input-group mb-3" v-for="p in persons" :key="p.id">
        <div class="input-group-prepend">
            <span class="input-group-text">{{p.name}}-{{p.age}}</span>
        </div>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" style="margin-top: 10px">
    </div>

</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el:"#root",
        data:{
            name:'jack',
            n:0,
            persons:[
                {id:'0001',name:"amir",age:"18"},
                {id:'0002',name:"joker",age:"19"},
                {id:'0003',name:"leo",age:"20"},
            ],
            leo:{
                id:"1001",
                name:"leo",
                age:"100",
            }
        },
        methods:{
            Add(){
                this.persons.splice(0,0,{id:"0004",name:"laoliu",age:"20"})
            }
        }

    })
</script>
</body>
</html>
```

# <font color='cornflowerblue'>🚩总结</font>

- 虚拟DOM中key的作用
  - key是虚拟DOM对象的标识，当数据发生改变时，Vue会根据新的数据生成新的虚拟DOM，随后vue进行新的虚拟DOM和旧的虚拟DOM之间的差异比较（diff算法），规则如下：
    - 在旧的虚拟DOM中找到了与新的虚拟DOM相同的key
      - 如果虚拟DOM的内容没有发生变化，直接使用之前的真实DOM
      - 如果虚拟DOM中内容发生变化，则生成新的真实DOM，随后替换掉之前页面中真实的DOM
    - 如果旧的虚拟DOM中没有找到与新的虚拟DOM相同的key
      - 创建新的真实DOM，随后渲染到页面
  - 用index作为key可能引发的问题
    - 如果对数据进行逆序添加、逆序删除等破坏数据顺序的操作
      - 会产生没有必要的DOM更新，效率低
    - 如果结构中还包含输入类的DOM
      - 会产生错误的DOM更新，界面产生问题
  - 开发中如何选择key
    - 最好使用带有唯一标识的作为key
    - 如果不存在逆序操作等，可以使用index作为key
