# <font color='cornflowerblue'>🛴总结</font>

- 作用：在插入、更新或者移除DOM元素时，在合适的时候给元素添加样式类名
- 图示

![](https://note-1302735599.cos.ap-guangzhou.myqcloud.com/VueBase/chapter3/transition.png)

- 样式的写法
  - 进入的效果
    - .name-enter
    - .name-enter-active
    - .name-enter-to
  - 离开的效果
    - .name-leave
    - .name-leave-active
    - .name-leave-to
- 标签的写法
  - 单个元素：`<transition name="xxx">[dom]</transition>`
  - 多个元素：`<transition-group name="xxx">[dom key=value ]</transition-group>`

# <font color='cornflowerblue'>🛴集成第三方动画</font>

选择使用animate.css

## 安装

`yarn add animate.css`

## 导入

`import "animate.css"`

## 使用

```vue
<template>
  <div>
    <button @click="isShow = !isShow">显示隐藏</button>
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

