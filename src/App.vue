<template>
    <div id="app">
        <router-view/>
        <!--通过路由设置 控制底部显现和隐藏 $route显示的页面路由-->
        <FootGuide v-show="$route.meta.showFooter" />
    </div>
</template>

<script>
import FootGuide from './components/FooterGuide/FooterGuide.vue'
export default {
    components:{
        FootGuide,
    }
}
</script>


<style lang="stylus" scoped>
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
