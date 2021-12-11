# 🛴<font color='cornflowerblue'>MVVM简介</font>

- M：model，负责业务逻辑以及和服务端进行交互
- V：view，模板template，转化数据模型通过UI展示
- VM：视图模型，Vue对象实例，用来连接model和view

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter1/mvvm.png)

# 🚩<font color='cornflowerblue'>总结</font>

- data中所有的属性，最终都出现在了VM身上
- VM上所有的属性，以及Vue原型上所有的属性，在Vue模板中都可以直接使用
