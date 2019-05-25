// 路由器模块
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 一级路由
import Order from '../pages/Order/Order.vue'
import Msite from '../pages/Msite/Msite.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/login.vue'
export default new VueRouter({
    routes:[
        // 第三个值用于控制底部导航栏是否显现，不设置默认undefined
        {path:'/',redirect:'/msite',meta:{ showFooter:true} },
        {path:'/msite',component:Msite,meta:{ showFooter:true}},
        {path:'/order',component:Order,meta:{ showFooter:true}},     
        {path:'/profile',component:Profile,meta:{ showFooter:true}},
        {path:'/search',component:Search,meta:{ showFooter:true}},
        // 不设置undefined,v-show='false'
        {path:'/login',component:Login}
    ]
})