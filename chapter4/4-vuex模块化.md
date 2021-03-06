# <font color='cornflowerblue'>ð´æ¨¡ååçä½ç¨</font>

> ä¸æææ¨¡åååºæ¬åè½ä¸æ ·ï¼vuexçæ¨¡ååå°±æ¯ä¸ºäºè§£å³ï¼åéãå½æ°ãå¯¹è±¡ç­åå­çå²çªæèå¨å±åéè¢«æ±¡æçé®é¢ï¼æ¨¡ååä¹å¯ä»¥ä½¿ä»£ç æäºç¼ååç»´æ¤

# <font color='cornflowerblue'>ð´ä¿®æ¹3çé¡¹ç®</font>

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
                    alert("è·åç¨æ·åç§°err: "+error.message)
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
        book:"golangé«çº§ç¼ç¨",
        game:"God of War:â¤",
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
  <h1>å½åæ±åä¸ºï¼{{sum }}</h1>
  <h1>å½åæ±åæ¾å¤§10åä¸ºï¼{{ bigSum }}</h1>
  <h2>Personsç»ä»¶çäººæ°ä¸ºï¼{{personList.length}}</h2>
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
  <button @click="incrementOdd(n)">å½ååä¸ºå¥æ°çæ¶ååå </button>
  <button @click="incrementWait(n)">ç­ä¸ç­åå </button>
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
    //å¯¹è±¡åæ³
    ...mapState('countAbout',{sum:'sum',book:'book',game:'game'}),
    //æ°ç»åæ³
    ...mapState('countAbout',['sum','book','game',]),
    ...mapState('personAbout',['personList',]),
    ...mapGetters('countAbout',['bigSum'])
  },
  methods:{

    //ä½¿ç¨mapActionsçædispatchç¸å³çæ¹æ³
    ...mapActions('countAbout',['incrementOdd','incrementWait']),
    ...mapActions('countAbout',{increment:'add', decrement:'sub'}),


    //ä½¿ç¨mapMutationsçææ¹æ³ï¼commit value
    //æ³¨æ@clickä¸ä¼ åé»è®¤ä¼ éçæ¯eventï¼ä¼ åçè¯ææ¯n
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
  <h1>Countç»ä»¶çè®¡ç®çsumä¸ºï¼{{sum}}</h1>
  <input type="text" v-model="name" @keyup.enter="addPerson">
  <button  @click="addPerson" >æ·»å ç¨æ·</button>
  <button  @click="addRandomPerson" >æ·»å éæºç¨æ·</button>
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

# <font color='cornflowerblue'>ð´axiosè¯·æ±é®é¢</font>

> è°è¯è¿ç¨ä¸­åç°ï¼å¦æaxiosè¯·æ±çurlåæ127.0.0.1åè¯·æ±å¯ä»¥æ­£å¸¸åéå°åç«¯æå¡å¨ï¼ä½æ¯æ¥æ¶è¿åå¼ä¸ç´æ¯network err,æååælocalhostæè§£å³é®é¢ï¼å·ä½åå æªç¥ã