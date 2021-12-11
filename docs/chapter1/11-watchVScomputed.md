# 🛴<font color='cornflowerblue'>效果</font>

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter1/v_model_bind.gif)

## watch实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../js/vue.js"></script>
    <link href="../js/bootstrap.min.css"/>
</head>
<body>
<style>
    *{
        margin-top: 20px;
    }
    .demo{
        height: 50px;
    }
    .div1{
        padding: 50px;
        background-color: aqua;
    }

</style>

<div id="root" class="container">
    姓：<input type="text" v-model:value="firstName">
    <hr>
    名：<input type="text" v-model:value="lastName">
    <div>{{fullName}}</div>
</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el:"#root",
        data:{
            firstName:"张",
            lastName:"三",
            fullName:"张——三"
        },
        methods:{

        },
        watch:{
            firstName(newValue,oldValue){
                setTimeout(()=>{
                    this.fullName = newValue + "——" + this.lastName
                },1000)
            },
            lastName(newValue,oldValue){
                setTimeout(()=>{
                    this.fullName = this.firstName + '——' + this.lastName
                },1000)
            }
        }

    })

</script>
</body>
</html>


```

## computed实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../js/vue.js"></script>
    <link href="../js/bootstrap.min.css"/>
</head>
<body>
<style>
    *{
        margin-top: 20px;
    }
    .demo{
        height: 50px;
    }
    .div1{
        padding: 50px;
        background-color: aqua;
    }

</style>

<div id="root" class="container">
    姓：<input type="text" v-model:value="firstName">
    <hr>
    名：<input type="text" v-model:value="lastName">
    <div>{{fullName}}</div>
</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el:"#root",
        data:{
            firstName:"张",
            lastName:"三",
        },
        methods:{

        },
        computed:{
            fullName(){
                return this.firstName + '-' + this.lastName
            }
        }

    })

</script>
</body>
</html>
```

## 等待1s返回需求实现

见watch实现code

计算属性无法实现，因为computed不支持异步请求，它拿的是函数return的结果，这个结果会被缓存。

# <font color='cornflowerblue'>🚩总结</font>

- computed能完成的功能，watch都可以完成
- watch能完成的功能，computed不一定能完成，比如异步请求

