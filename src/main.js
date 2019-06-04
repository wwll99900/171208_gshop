// 入口js
import Vue from 'vue'
import App from './App'
// 引入路由只需要引入这个文件夹就可以
import router from './router'
// 引入vuex管理文件
import store from './store'
// 按需加载mint-ui组件button
import {Button} from 'mint-ui'
Vue.component(Button.name,Button)
// 引入mock假数据机制   这个地方要引入到js这一层
import './mock/mockServer'
// 安装vue-lazyload并引入
import VueLazyload from 'vue-lazyload'
// 加载过滤器
import './filters'
// 使用懒加载
import loading from './common/imgs/loading.gif'//图片没出来默认这周
Vue.use(VueLazyload, {
    loading,
  })



new Vue({
    el:'#app',
    render:h=>h(App),
    router,//使用vue-router
    store,//使用vuex
})