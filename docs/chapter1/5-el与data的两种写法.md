# 🛴<font color='cornflowerblue'>el的写法</font>

## 在创建Vue实例的时候绑定

```html
<div id="root"></div>
<script>
	new Vue({
        el:"#root",
    })
</script>
```

## 使用Vue原型对象绑定

```html
<div id="root"></div>
<script>
	const vm = new Vue({
        data:{
            name:"jack"
        }
    })
    vm.$mount("#root")
</script>
```



# 🛴<font color='cornflowerblue'>data的写法</font>

## 对象式

```html
<script>
	const vm = new Vue({
        data:{
            name:"jack",
            age:"18",
        }
    })
</script>
```

## 函数式

> 函数必须有返回值，返回值是一个对象，谁调用这个函数？函数的this为vue对象，所以是vue帮我们调用这个函数。
>
> 一般的，建议所有vue中的函数不要写成箭头函数，因为箭头函数的this是window

```html
<script>
	//写法1
    data:function(){
        return {
            name:"jack"
        }
    }
    //写法2
    data(){
		return{
            name:"jack"
        }
    }
</script>
```
