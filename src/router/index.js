// 路由器模块
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 一级路由
// import Order from '../pages/Order/Order.vue'
// import Msite from '../pages/Msite/Msite.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Search from '../pages/Search/Search.vue'
// 在开发环境中并不需要一开始就把这些全部加载完,路由触发才会加载相关模块
const Msite=()=>import('../pages/Msite/Msite.vue')
const Order=()=>import('../pages/Order/Order.vue')
const Profile=()=>import('../pages/Profile/Profile.vue')
const Search=()=>import('../pages/Search/Search.vue')


import Login from '../pages/Login/login.vue'

// 商家详情部分路由
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRating from '../pages/Shop/ShopRating/ShopRating.vue'
export default new VueRouter({
    routes:[
        // 第三个值用于控制底部导航栏是否显现，不设置默认undefined
        {path:'/',redirect:'/msite',meta:{ showFooter:true}},
        {path:'/msite',component:Msite,meta:{ showFooter:true}},
        {path:'/order',component:Order,meta:{ showFooter:true}},     
        {path:'/profile',component:Profile,meta:{ showFooter:true}},
        {path:'/search',component:Search,meta:{ showFooter:true}},
        // 不设置undefined,v-show='false'
        {path:'/login',component:Login},
        // 商家详情一级路由下三个二级路由
        {path:'/shop',component:Shop,
        children:[
            {path:'/shop/goods',component:ShopGoods},
            {path:'/shop/ratings',component:ShopRating},
            {path:'/shop/info',component:ShopInfo},
            // 请求/shop/,默认/shop/goods子路由
            {path:'',redirect:'/shop/goods'}
        ]},
    ]
})