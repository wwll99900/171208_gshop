// 入口js
import Vue from 'vue'
import App from './App'
// 引入路由只需要引入这个文件夹就可以
import router from './router'

new Vue({
    el:'#app',
    render:h=>h(App),
    router,
})