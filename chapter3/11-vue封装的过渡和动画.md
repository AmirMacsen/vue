# <font color='cornflowerblue'>ð´æ»ç»</font>

- ä½ç¨ï¼å¨æå¥ãæ´æ°æèç§»é¤DOMåç´ æ¶ï¼å¨åéçæ¶åç»åç´ æ·»å æ ·å¼ç±»å
- å¾ç¤º

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter3/transition.png)

- æ ·å¼çåæ³
  - è¿å¥çææ
    - .name-enter
    - .name-enter-active
    - .name-enter-to
  - ç¦»å¼çææ
    - .name-leave
    - .name-leave-active
    - .name-leave-to
- æ ç­¾çåæ³
  - åä¸ªåç´ ï¼`<transition name="xxx">[dom]</transition>`
  - å¤ä¸ªåç´ ï¼`<transition-group name="xxx">[dom key=value ]</transition-group>`

# <font color='cornflowerblue'>ð´éæç¬¬ä¸æ¹å¨ç»</font>

éæ©ä½¿ç¨animate.css

## å®è£

`yarn add animate.css`

## å¯¼å¥

`import "animate.css"`

## ä½¿ç¨

```vue
<template>
  <div>
    <button @click="isShow = !isShow">æ¾ç¤ºéè</button>
     <transition-group
         name="animate__animated animate__bounce"
         enter-active-class="animate__fadeInDown"
         leave-active-class="animate__fadeOut"
         appear>
       <h1 v-show="isShow"  key="1">Hello, Vue</h1>
       <h1 v-show="!isShow" class="come" key="2">Hello, Python</h1>
     </transition-group>
  </div>
</template>

<script>
import 'animate.css'
export default {
  name: "TestAnimation",
  data(){
    return {
      isShow: true
    }
  }
}
</script>

<style scoped>
  h1 {
    background-color: #da4f49;
  }

</style>
```

