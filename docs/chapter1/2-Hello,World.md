## 🛴<font color='cornflowerblue'>Code</font>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../js/vue.js"></script>
</head>
<body>
<div id="root">
    <h1>插值语法：</h1>
    <h3>Hello,{{name}}</h3>
    <hr/>
    <h1>指令语法：</h1>
    <a href="www.baidu.com">百度1</a>
    <a href="www.baidu.com">百度2</a>
    <a v-bind:href="url">百度3</a>
</div>

<script>
    Vue.config.productionTip = false

    //创建一个vue实例
    const x = new Vue({
        el: "#root", //el指定当前vue实例为哪个容器服务，通常为css选择器字符串
        data: {//data用于存储数据，数据供el指定的容器使用，值暂时写成一个对象
            name: "Vue",
            url: "www.baidu.com"
        }
    })
</script>
</body>
</html>

```

## 🚩<font color='cornflowerblue'>总结</font>

1. Vue必须创建一个Vue实例，且需要传入一个配置对象
2. root容器里面的代码仍然遵循html规范，只不过混入了一些特殊的html语法
3. root容器里面的代码被称为Vue模板
4. 容器和Vue实例是一一对应的关系
5. {{xxx}}中可以是js表达式或者data中的属性一个data中的数据发生改变，页面中用到该数据的地方就会发生更新
