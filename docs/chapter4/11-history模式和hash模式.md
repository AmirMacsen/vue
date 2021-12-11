# <font color='cornflowerblue'>🛴路由器的两种工作模式</font>

- 对于一个url来说,什么是hash值? ---#及其后面的内容就是hash值
- hash值不会包在http请求中,即hash不会带给服务器
- hash模式
  - 地址中永远带#号,不美观
  - 如果以后将地址通过第三方手机App分享,若App校验严格,则地址会被标记为不合法
  - 兼容性好
- history模式
  - 地址干净\美观
  - 兼容性比hash略差
  - 应用部署上线后,需要后端人员支持,解决刷新页面服务404的问题

## vue中模式的配置

### router/indx.js

```js
//该文件专门用于创建应用的路由器
import VueRouter from "vue-router"
import About from "@/pages/About";
import Home from "@/pages/Home";
import News from "@/pages/News";
import Message from "@/pages/Messages";
import Detail from "@/pages/Detail";

//创建一个路由器
const router =  new VueRouter({
    mode:"history",
    // mode:"hash", //默认的
    routes:[
        {
            name:"about",
            path:'/about',
            component:About,
            meta:{isAuth:false,title:"关于"}
        },
        {
            path:'/home',
            component:Home,
            meta:{isAuth:false,title:"首页"},
            children:[
                {
                    name:"news",
                    path:'news',
                    component:News,
                    meta:{isAuth:true,title:"新闻"},
                },
                {
                    name:"massages",
                    path:'message',
                    component:Message,
                    meta:{isAuth:true,title:"信息"},
                    children:[
                        {
                            name:"detail",
                            path:'detail',
                            component:Detail,
                            meta:{isAuth:true,title:"信息列表"},
                            //第一种写法：props为值对象，该对象所有的的k-v最终都会通过props传递给Detail组件
                            // props:{id:100,title:"amir"}
                            //第二种写法：props为布尔值，路由收到的所有params参数通过props传递给Detail组件
                            // props:true
                            //第三种写法：props值为函数，该函数返回对象中每一组k-v都会通过props传递给Detail组件
                            props($route){
                                return {
                                    id:$route.query.id,
                                    title:$route.query.title
                                }
                            },
                            beforeEnter(to,from,next){
                                if(localStorage.getItem('password')==='123'){
                                    next()
                                }else {
                                    alert("权限不足")
                                }
                            }
                        }
                    ]
                }
            ]
        },
    ]
})

//前置路由守卫
router.beforeEach((to,from,next)=>{
    console.log(from)

    if(!to.meta['isAuth']){
        next()
    }else{
        if(localStorage.getItem('name')==="amir"){
            next()
        }else{
            alert("权限不足")
        }
    }

})

//后置路由守卫
router.afterEach((to,from)=>{
    console.log(from)
    document.title = to.meta['title'] || "用户管理系统"
})

export default router
```