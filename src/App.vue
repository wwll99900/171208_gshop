<template>
  <div id="app">
    <router-view/>
    <!--通过路由设置 控制底部显现和隐藏 $route显示的页面路由-->
    <FootGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FootGuide from "./components/FooterGuide/FooterGuide.vue";
// vuex中处理映射关系方法，通过...mapActions把actions方法拿到这个vue实例
// 引入地图
import BMap from "BMap";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      // 百度地图
      localCity: "",
    };
  },
  created() {
    // 定位到城市
    this.city();
  },
  watch:{
    // 当city方法把state的localCity改变为经纬度对象是触发，把触发地址请求的命令作为对象的一个参数，达到回调函数异步实现的效果
    localCity(){
      let localCity=this.localCity
      let that=this
      that.$store.dispatch('changeAddress',{latitude:localCity.latitude,longitude:localCity.longitude,
      callback(){
           that.$store.dispatch('getAddress')
      }})
    },
  },
  mounted() {
    // 在store的actions里面的方法因为在main.js挂载,在全局都可以直接用
    // this.$store.dispatch('getAddress')//不引人mapAction这种方法触发
     //使用拿过来的方法，触发actions里面方法，用于存值
    this.getUserInfo(); //触发获取用户信息方法，保存到state
  },
  components: {
    FootGuide
  },
  methods: {
    // 把store里面方法拿到这个vue实例
    ...mapActions(["getAddress", "getUserInfo"]),
    // 触发地图获取经纬度
    city() {
      //定义获取城市方法  实现定位功能
      // 1.创建查询对象
      const geolocation = new BMap.Geolocation();
      var _this = this;
      // 2.调用查询对象里面的函数方法，这是百度api用promise方法封装，第一个函数在定位查询成功是执行，第二个在失败时执行
      geolocation.getCurrentPosition(
        position => {
          let latitude = position.latitude;
          let longitude = position.longitude;
          this.localCity = { latitude, longitude };
        },
        function(e) {
          _this.LocationCity = "定位失败";
        },
        { provider: "baidu" }
      );
    }
  }
};
</script>


<style lang="stylus" scoped>
.app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
