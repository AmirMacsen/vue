# <font color='cornflowerblue'>🛴模块化的作用</font>

> 与所有模块化基本功能一样，vuex的模块化就是为了解决，变量、函数、对象等名字的冲突或者全局变量被污染的问题，模块化也可以使代码易于编写和维护

# <font color='cornflowerblue'>🛴修改3的项目</font>

## store/personCount.js

```js
import {nanoid} from "nanoid";
import axios from "axios";

export default {
    namespaced: true,
    actions:{
        addRandomPerson(context){
            axios.get('http://localhost:8080/api/getUserName').then(
                response => {
                    const person = {id:nanoid(),name:response.data.username}
                    console.log(person)
                    context.commit('addPerson',person)
                },
                error =>{
                    alert("获取用户名称err: "+error.message)
                }
            )
        }

    },
    mutations:{
        addPerson(state,value){
            state.personList.push(value)
        }
    },
    state:{
        personList:[]
    },
    getters:{

    }
}
```

## src/countAbout.js

```js
export default {
    namespaced:true,
    actions:{
        add(context,value){
            context.commit('ADD',value)
        },
        sub(context,value){
            context.commit('SUB',value)
        },
        addIfOdd(context,value){
            context.commit('ADD',value)
        },
        incrementOdd(context,value){
            if(context.state.sum % 2){
                context.state.sum += value
            }
        },
        incrementWait(context,value){
            setTimeout(()=>{
                context.state.sum += value
            })
        },
    },
    mutations:{
        ADD(state,value){
            state.sum += value
        },
        SUB(state,value){
            state.sum -= value
        },
        MULTIPLICATION(state,value){
            console.log(value)
            state.sum *= value
        },
        DIVISION(state,value){
            state.sum /= value
        },
    },
    state:{
        sum: 0,
        book:"golang高级编程",
        game:"God of War:Ⅴ",
    },
    getters:{
        bigSum(state){
            return state.sum * 10
        }
    }

}
```

## src/index.js

```js
import Vue from "vue";
import Vuex from "vuex";
import countAbout from "@/store/countAbout";
import personAbout from "@/store/personAbout";

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        countAbout,
        personAbout
    }
})
```

## Count.vue

```vue
<template>
<div>
  <h1>当前求和为：{{sum }}</h1>
  <h1>当前求和放大10倍为：{{ bigSum }}</h1>
  <h2>Persons组件的人数为：{{personList.length}}</h2>
  <h3>{{book}}</h3>
  <h3>{{game}}</h3>
  <select v-model.number="n">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
  <button @click="increment(n)">+</button>
  <button @click="decrement(n)">-</button>
  <button @click="multiplication(n)">*</button>
  <button @click="division(n)">/</button>
  <button @click="incrementOdd(n)">当前和为奇数的时候再加</button>
  <button @click="incrementWait(n)">等一等再加</button>
</div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: "Count",
  data(){
    return{
      n: 1,
    }
  },
  computed:{
    //对象写法
    ...mapState('countAbout',{sum:'sum',book:'book',game:'game'}),
    //数组写法
    ...mapState('countAbout',['sum','book','game',]),
    ...mapState('personAbout',['personList',]),
    ...mapGetters('countAbout',['bigSum'])
  },
  methods:{

    //使用mapActions生成dispatch相关的方法
    ...mapActions('countAbout',['incrementOdd','incrementWait']),
    ...mapActions('countAbout',{increment:'add', decrement:'sub'}),


    //使用mapMutations生成方法，commit value
    //注意@click不传参默认传递的是event，传参的话才是n
    ...mapMutations('countAbout',{multiplication:'MULTIPLICATION',division:'DIVISION'})
  },
}
</script>

<style scoped>
button{
  margin-left: 10px;
}
</style>
```

## Person.vue

```vue
<template>
<div>
  <h1>Count组件的计算的sum为：{{sum}}</h1>
  <input type="text" v-model="name" @keyup.enter="addPerson">
  <button  @click="addPerson" >添加用户</button>
  <button  @click="addRandomPerson" >添加随机用户</button>
  <ol>
    <li v-for="p in personList" :key="p.id">{{p.name}}</li>
  </ol>
</div>
</template>

<script>
import {nanoid} from "nanoid"
export default {
  name: "Persons",
  data(){
    return {
      name:'',
    }
  },
  computed:{
    personList(){
      return this.$store.state.personAbout.personList
    },
    sum(){
      return this.$store.state.countAbout.sum
    }
  },
  methods:{
    addPerson(){
      let person = {id:nanoid(),name:this.name}
      this.$store.commit('personAbout/addPerson',person)
      this.name = ''
    },
    addRandomPerson(){
      this.$store.dispatch('personAbout/addRandomPerson')
    }
  },
}
</script>

<style scoped>

</style>
```

# <font color='cornflowerblue'>🛴axios请求问题</font>

> 调试过程中发现，如果axios请求的url写成127.0.0.1则请求可以正常发送到后端服务器，但是接收返回值一直是network err,最后写成localhost才解决问题，具体原因未知。