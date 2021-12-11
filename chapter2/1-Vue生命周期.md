# <font color='cornflowerblue'>🛴生命周期概念</font>

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
    .root{
        width: 1000px;
        height: auto;
    }
</style>
<div id="root" class="root container" style="margin-top: 20px">
   <h2 :style="{opacity}">Hello,Vue</h2>
</div>
<script>
    Vue.config.productionTip = false
   new Vue({
        el:"#root",
        data:{
            opacity:1,
        },
        //Vue完成模板的解析，并把初始的真实DOM挂载到页面的时候调用
        mounted(){
            setInterval(()=>{
                console.log("mounted")
                this.opacity -= 0.01
                if (this.opacity <=0 ) this.opacity = 1
            },16)
        }
    })

</script>
</body>
</html>
```

> 像mounted这种在特定的时候由Vue调用的函数就被称为生命周期函数

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter2/lifecircle.png)

# <font color='cornflowerblue'>🚀总结</font>

- 常用的生命周期钩子
  - mounted：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】
  - beforeDestroy：清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】
- 关于销毁Vue实例
  - 销毁后借助Vue开发者工具看不到任何信息
  - 销毁后自定义事件会失效，但是原生DOM事件仍然有效
  - 一般不在beforeDestroy中操作数据，因为即便操作数据，也不会触发数据更新流程了
