# <font color='cornflowerblue'>🛴mapState</font>

> 如果state中有多个属性一个组件需要使用，插值语法原则上不能写的过于复杂，如果用计算属性的方式写，会产生大量的功能一致的类似的代码，这时mapState就可以用来简化写法了

## 计算属性的写法

### index.js

```js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
//响应组件中的动作
const actions = {
    add(context,value){
        context.commit('ADD',value)
    },
    sub(context,value){
        context.commit('SUB',value)
    },
    addIfOdd(context,value){
        context.commit('ADD',value)
    }
}

//操作数据
const mutations = {
    ADD(state,value){
        state.sum += value
    },
    SUB(state,value){
        state.sum -= value
    },
}

//存储惧
const state = {
    sum: 0,
    book:"golang高级编程",
    game:"God of War:Ⅴ"
}
//加工数据
const getters = {
    bigSum(state){
        return state.sum * 10
    }
}
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
```

## Count.vue

```vue
<template>
<div>
  <h1>当前求和为：{{ $store.state.sum }}</h1>
  <h1>当前求和放大10倍为：{{ $store.getters.bigSum }}</h1>
  <h3>{{book}}</h3>
  <h3>{{game}}</h3>
  <select v-model.number="n">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
  <button @click="increment">+</button>
  <button @click="decrement">-</button>
  <button @click="incrementOdd">当前和为奇数的时候再加</button>
  <button @click="incrementWait">等一等再加</button>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Count",
  data(){
    return{
      n: 1,
    }
  },
  computed:{
    book(){
      return this.$store.state.book
    },
    game(){
      return this.$store.state.game
    },
  },
  methods:{
    increment(){
     this.$store.dispatch('add',this.n)
    },
    decrement(){
      this.$store.dispatch('sub',this.n)
    },
    incrementOdd(){
      if(this.$store.state.sum % 2){
        this.$store.dispatch('addIfOdd',this.n)
      }
    },
    incrementWait(){
      setTimeout(()=>{
        this.$store.dispatch('add',this.n)
      },500)
    }
  },
}
</script>

<style scoped>
button{
  margin-left: 10px;
}
</style>
```

## 使用mapState

```vue
<template>
<div>
  <h1>当前求和为：{{ $store.state.sum }}</h1>
  <h1>当前求和放大10倍为：{{ $store.getters.bigSum }}</h1>
  <h3>{{book}}</h3>
  <h3>{{game}}</h3>
  <select v-model.number="n">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
  <button @click="increment">+</button>
  <button @click="decrement">-</button>
  <button @click="incrementOdd">当前和为奇数的时候再加</button>
  <button @click="incrementWait">等一等再加</button>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Count",
  data(){
    return{
      n: 1,
    }
  },
  computed:{
    // book(){
    //   return this.$store.state.book
    // },
    // game(){
    //   return this.$store.state.game
    // },
    //对象写法
    ...mapState({book:'book',game:'game'}),
    //数组写法
    ...mapState(['book','game'])
  },
  methods:{
    increment(){
     this.$store.dispatch('add',this.n)
    },
    decrement(){
      this.$store.dispatch('sub',this.n)
    },
    incrementOdd(){
      if(this.$store.state.sum % 2){
        this.$store.dispatch('addIfOdd',this.n)
      }
    },
    incrementWait(){
      setTimeout(()=>{
        this.$store.dispatch('add',this.n)
      },500)
    }
  },
}
</script>

<style scoped>
button{
  margin-left: 10px;
}
</style>
```

# <font color='cornflowerblue'>🛴mapGetters</font>

> 用法与mapState一致

```vue
<template>
<div>
  <h1>当前求和为：{{sum }}</h1>
  <h1>当前求和放大10倍为：{{ bigSum }}</h1>
  <h3>{{book}}</h3>
  <h3>{{game}}</h3>
  <select v-model.number="n">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
  <button @click="increment">+</button>
  <button @click="decrement">-</button>
  <button @click="incrementOdd">当前和为奇数的时候再加</button>
  <button @click="incrementWait">等一等再加</button>
</div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
  name: "Count",
  data(){
    return{
      n: 1,
    }
  },
  computed:{
    // book(){
    //   return this.$store.state.book
    // },
    // game(){
    //   return this.$store.state.game
    // },
    //对象写法
    ...mapState({sum:'sum',book:'book',game:'game'}),
    //数组写法
    ...mapState(['sum','book','game']),
    ...mapGetters(['bigSum'])
  },
  methods:{
    increment(){
     this.$store.dispatch('add',this.n)
    },
    decrement(){
      this.$store.dispatch('sub',this.n)
    },
    incrementOdd(){
      if(this.$store.state.sum % 2){
        this.$store.dispatch('addIfOdd',this.n)
      }
    },
    incrementWait(){
      setTimeout(()=>{
        this.$store.dispatch('add',this.n)
      },500)
    }
  },
}
</script>

<style scoped>
button{
  margin-left: 10px;
}
</style>
```

# <font color='cornflowerblue'>🛴mapMutations</font>

> 如果在组件中直接commit数据而跳过actions，就可以使用mapMutations简化函数的写法

## index.js

```js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
//响应组件中的动作
const actions = {
    add(context,value){
        context.commit('ADD',value)
    },
    sub(context,value){
        context.commit('SUB',value)
    },
    addIfOdd(context,value){
        context.commit('ADD',value)
    }
}

//操作数据
const mutations = {
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
    }
}

//存储惧
const state = {
    sum: 0,
    book:"golang高级编程",
    game:"God of War:Ⅴ"
}
//加工数据
const getters = {
    bigSum(state){
        return state.sum * 10
    }
}
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
```

## Count.vue

```vue
<template>
<div>
  <h1>当前求和为：{{sum }}</h1>
  <h1>当前求和放大10倍为：{{ bigSum }}</h1>
  <h3>{{book}}</h3>
  <h3>{{game}}</h3>
  <select v-model.number="n">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
  <button @click="increment">+</button>
  <button @click="decrement">-</button>
  <button @click="multiplication(n)">*</button>
  <button @click="division(n)">/</button>
  <button @click="incrementOdd">当前和为奇数的时候再加</button>
  <button @click="incrementWait">等一等再加</button>
</div>
</template>

<script>
import {mapState,mapGetters,mapMutations} from 'vuex'
export default {
  name: "Count",
  data(){
    return{
      n: 1,
    }
  },
  computed:{
    // book(){
    //   return this.$store.state.book
    // },
    // game(){
    //   return this.$store.state.game
    // },
    //对象写法
    ...mapState({sum:'sum',book:'book',game:'game'}),
    //数组写法
    ...mapState(['sum','book','game']),
    ...mapGetters(['bigSum'])
  },
  methods:{
    increment(){
     this.$store.dispatch('add',this.n)
    },
    decrement(){
      this.$store.dispatch('sub',this.n)
    },
    incrementOdd(){
      if(this.$store.state.sum % 2){
        this.$store.dispatch('addIfOdd',this.n)
      }
    },
    incrementWait(){
      setTimeout(()=>{
        this.$store.dispatch('add',this.n)
      },500)
    },
    //使用mapMutations生成方法，commit value
    //注意@click不传参默认传递的是event，传参的话才是n
    ...mapMutations({multiplication:'MULTIPLICATION',division:'DIVISION'})
  },
}
</script>

<style scoped>
button{
  margin-left: 10px;
}
</style>
```

# <font color='cornflowerblue'>🛴mapActions</font>

> 使用mapActions时会自动生成dispatch，但是这时候之前写的奇数判断和延时逻辑在组件中存在就不合适了，所以这部分需要挪到index.js中

## index.js

```js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
//响应组件中的动作
const actions = {
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
}

//操作数据
const mutations = {
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
    }
}

//存储惧
const state = {
    sum: 0,
    book:"golang高级编程",
    game:"God of War:Ⅴ"
}
//加工数据
const getters = {
    bigSum(state){
        return state.sum * 10
    }
}
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
```

## Count.vue

```vue
<template>
<div>
  <h1>当前求和为：{{sum }}</h1>
  <h1>当前求和放大10倍为：{{ bigSum }}</h1>
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
    // book(){
    //   return this.$store.state.book
    // },
    // game(){
    //   return this.$store.state.game
    // },
    //对象写法
    ...mapState({sum:'sum',book:'book',game:'game'}),
    //数组写法
    ...mapState(['sum','book','game']),
    ...mapGetters(['bigSum'])
  },
  methods:{
    increment(){
     this.$store.dispatch('add',this.n)
    },
    decrement(){
      this.$store.dispatch('sub',this.n)
    },
    incrementOdd(){
      this.$store.dispatch('incrementOdd',this.n)
    },
    incrementWait(){
      this.$store.dispatch('incrementWait',this.n)
    },

    //使用mapActions生成dispatch相关的方法
    ...mapActions(['incrementOdd','incrementWait']),
    ...mapActions({increment:'add', decrement:'sub'}),


    //使用mapMutations生成方法，commit value
    //注意@click不传参默认传递的是event，传参的话才是n
    ...mapMutations({multiplication:'MULTIPLICATION',division:'DIVISION'})
  },
}
</script>

<style scoped>
button{
  margin-left: 10px;
}
</style>
```