# 🛴<font color='cornflowerblue'>一个现象</font>

> 需求：通过一个按钮点击事件修改data中一个对象数组的数据
>

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
        width: 500px;
        height: auto;
    }
</style>

<div id="root" class="root container" style="margin-top: 20px">
    <button  class="btn-primary" @click="updateAmir">修改amir数据</button>
    <hr>
    <ul class="list-group">
        <li class="list-group-item" v-for="p in persons" :key="p.id">{{p.name}}--{{p.age}}</li>
    </ul>

</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el:"#root",
        data:{
            persons:[
                {id:'0001',name:"amir",age:"30"},
                {id:'0002',name:"joker",age:"19"},
                {id:'0003',name:"leo",age:"21"},
            ],
        },
        methods:{
            updateAmir(){
                this.persons[0].age = 18 //生效的写法
                this.persons[0] = {id:'0001',name:"amir",age:"18"}
            } //不生效的写法
        },
    })
</script>
</body>
</html>
```

# <font color='cornflowerblue'>🛴js手动实现对数据的监视</font>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<script !src="">
    let data ={
        name:"amir",
        address:"shenzhen"
    }
    const obs = new Observer(data)
    let vm = {}
    vm._data = data = obs

    function Observer(obj){
        const keys = Object.keys(obj)
        keys.forEach((k)=>{
            Object.defineProperty(this,k,{
                get() {
                    return obj[k]
                },
                set(val){
                    console.log(`${k}被改变了`)
                    obj[k] = val
                }

            })
        })
    }

</script>

</body>
</html>
```

> vue其实在set中做了很多事情，比如，只要修改值就会重新进行template解析，然后进行diff对比虚拟DOM和真实DOM，最后生成真实DOM，在页面渲染出来

# <font color='cornflowerblue'>🛴Vue.set()的使用</font>

## 能否为data中的对象新增一个属性

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
        width: 500px;
        height: auto;
    }
</style>

<div id="root" class="root container" style="margin-top: 20px">
    <ul>
        <h3>学校名称:  {{Student.school}}</h3>
        <h3>学校地址:  {{Student.schoolAddress}}</h3>
    </ul>
    <hr>
    <ul class="list-group">
        <li class="list-group-item" v-for="(stu, index) in Student.base">{{index}}:&nbsp;&nbsp;{{stu}}</li>
    </ul>

</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el:"#root",
        data:{
            Student:{
                base:{
                    name:"jack",
                    age:18,
                    address:"shenzhen"
                },
                school:"清华",
                schoolAddress:"北京"
            }
        },
    })
</script>
</body>
</html>
```

能否直接通过console给`Student.base`添加一个gender属性并展示在列表中？

### 错误的示例

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter1/change_obj_in_console.gif)

- 无法通过直接赋值的方式为`Student.base`添加属性并展示在页面上

### 正确的示例

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter1/change_obj_in_console_right.gif)

- 使用了`Vue.set()`函数添加就会成功，因为其检测了数据的变化，就会重新渲染template


#### `Vue.set()`的局限

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
        width: 500px;
        height: auto;
    }
</style>

<div id="root" class="root container" style="margin-top: 20px">
    <ul>
        <button @click="addLeader" class="btn-primary btn-lg">点击添加校长</button>
        <hr>
        <h3>学校名称:  {{Student.school}}</h3>
        <h3>学校地址:  {{Student.schoolAddress}}</h3>
        <h3>学校校长:  {{leader}}</h3>
    </ul>
    <hr>
    <ul class="list-group">
        <li class="list-group-item" v-for="(stu, index) in Student.base">{{index}}:&nbsp;&nbsp;{{stu}}</li>
    </ul>

</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el:"#root",
        data:{
            Student:{
                base:{
                    name:"jack",
                    age:18,
                    address:"shenzhen"
                },
                school:"清华",
                schoolAddress:"北京"
            }
        },
        methods:{
            addLeader(){
                //不能给Vue的data直接添加一个响应式的属性，只能给data中对象添加
                //[Vue warn]: Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option.
                Vue.set(this._data,"leader","leo")
            }
        }
    })
</script>
</body>
</html>
```

# <font color='cornflowerblue'>🛴Vue监测数组的改变</font>

> Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。

## 示例对数组的修改

### 使用vue封装的js操作函数

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
        width: 500px;
        height: auto;
    }
</style>

<div id="root" class="root container" style="margin-top: 20px">
    <ul>
        <button @click="addLeader" class="btn-primary btn-lg">点击添加校长</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button @click="changeReading" class="btn-primary btn-lg">点击添加flying</button>
        <hr>
        <h3>学校名称:  {{Student.school}}</h3>
        <h3>学校地址:  {{Student.schoolAddress}}</h3>
        <h3>学校校长:  {{leader}}</h3>
    </ul>
    <hr>
    <ul class="list-group">
        <li class="list-group-item" v-for="(stu, index) in Student.base">{{index}}:&nbsp;&nbsp;{{stu}}</li>
        <li class="list-group-item" v-for="(val,index) in hobbies">&nbsp;&nbsp;&nbsp;&nbsp;{{val}}</li>
    </ul>

</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el:"#root",
        data:{
            Student:{
                base:{
                    name:"jack",
                    age:18,
                    address:"shenzhen"
                },
                school:"清华",
                schoolAddress:"北京"
            },
            hobbies:["reading","dancing","writing"]
        },
        methods:{
            addLeader(){
                //不能给Vue的data直接添加一个响应式的属性，只能给data中对象添加
                //[Vue warn]: Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option.
                Vue.set(this._data,"leader","leo")
            },
            changeReading(){
                this.hobbies.splice(0,0,"flying")
            }
        }
    })
</script>
</body>
</html>
```

### 使用`Vue.set`修改

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
        width: 500px;
        height: auto;
    }
</style>

<div id="root" class="root container" style="margin-top: 20px">
    <ul>
        <button @click="addLeader" class="btn-primary btn-lg">点击添加校长</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button @click="changeReading" class="btn-primary btn-lg">点击修改flying</button>
        <hr>
        <h3>学校名称:  {{Student.school}}</h3>
        <h3>学校地址:  {{Student.schoolAddress}}</h3>
        <h3>学校校长:  {{leader}}</h3>
    </ul>
    <hr>
    <ul class="list-group">
        <li class="list-group-item" v-for="(stu, index) in Student.base">{{index}}:&nbsp;&nbsp;{{stu}}</li>
        <li class="list-group-item" v-for="(val,index) in hobbies">&nbsp;&nbsp;&nbsp;&nbsp;{{val}}</li>
    </ul>

</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el:"#root",
        data:{
            Student:{
                base:{
                    name:"jack",
                    age:18,
                    address:"shenzhen"
                },
                school:"清华",
                schoolAddress:"北京"
            },
            hobbies:["reading","dancing","writing"]
        },
        methods:{
            addLeader(){
                //不能给Vue的data直接添加一个响应式的属性，只能给data中对象添加
                //[Vue warn]: Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option.
                Vue.set(this._data,"leader","leo")
            },
            changeReading(){
                Vue.set(this.hobbies,0,"flying")
            }
        }
    })
</script>
</body>
</html>
```

### 强制刷新

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
        width: 500px;
        height: auto;
    }
</style>

<div id="root" class="root container" style="margin-top: 20px">
    <ul>
        <button @click="addLeader" class="btn-primary btn-lg">点击添加校长</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button @click="changeReading" class="btn-primary btn-lg">点击修改flying</button>
        <hr>
        <h3>学校名称:  {{Student.school}}</h3>
        <h3>学校地址:  {{Student.schoolAddress}}</h3>
        <h3>学校校长:  {{leader}}</h3>
    </ul>
    <hr>
    <ul class="list-group">
        <li class="list-group-item" v-for="(stu, index) in Student.base">{{index}}:&nbsp;&nbsp;{{stu}}</li>
        <li class="list-group-item" v-for="(val,index) in hobbies">&nbsp;&nbsp;&nbsp;&nbsp;{{val}}</li>
    </ul>

</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el:"#root",
        data:{
            Student:{
                base:{
                    name:"jack",
                    age:18,
                    address:"shenzhen"
                },
                school:"清华",
                schoolAddress:"北京"
            },
            hobbies:["reading","dancing","writing"]
        },
        methods:{
            addLeader(){
                //不能给Vue的data直接添加一个响应式的属性，只能给data中对象添加
                //[Vue warn]: Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option.
                Vue.set(this._data,"leader","leo")
            },
            changeReading(){
                this.hobbies[0] = "flying"
                //实际上数据已经修改了，只需要重新渲染一下
                vm.$forceUpdate()
            }
        }
    })
</script>
</body>
</html>
```

- 注意如果数组中存储的是对象类型，这些对象也会被生成setter和getter，此时修改这个对象中的属性如`this.hobbies[0].name="reading"`会修改成功
