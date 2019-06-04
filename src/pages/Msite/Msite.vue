// 点击外卖显示的页面
<template>
  <section class="msite">
    <!--首页头部   引入模块HeaderTop-->
    <HeaderTop :title="address.name">
      <!-- slot对应插槽 -->
      <router-link tag="span" class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <!-- 根据vuex中的保存登录成功的值判断是否已经登录 进入不同页面-->
      <router-link tag="span" class="header_login" slot="right" :to="userInfo._id ? '/userinfo':'/login'">
        <!-- 登录未登录显示不同状态 -->
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </span>
          <span class="header_login_text" v-else>
          <i class="iconfont icon-yonghu"></i>
        </span>
      </router-link>
    </HeaderTop>

    <!--首页导航 swiper方法定义class 显示轮播-->
    <nav class="msite_nav">
      <!-- 请求到数据显示 -->
      <div class="swiper-container" v-if="categorys.length">
        <!-- 多少页 -->
        <div class="swiper-wrapper">
          <!-- 一页里面的内容放在一个swiper-slider -->
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(category,index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="baseImageUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination 分页效果-->
        <div class="swiper-pagination"></div>
      </div>
      <!-- 没请求到数据  v-else -->
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>

    <!--首页附近商家-->
    <!-- 附近商家字样 -->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-santiaoxian"></i>
        <span class="shop_header_title">附近商家</span>
      </div>

      <!-- 商家组件 -->
      <Shoplist></Shoplist>
    </div>
  </section>
</template>


<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import Shoplist from "../../components/Shoplist/Shoplist";
// 从store取值
import { mapState } from "vuex";

export default {
  data() {
    return {
      // 分类部分图片基础地址
      baseImageUrl: "https://fuss10.elemecdn.com",
    };
  },
  mounted() {
    // 触发actions方法，在actions里面发送请求并把值存入store
    this.$store.dispatch("getCategorys");
    this.$store.dispatch("getShops");
  },
  computed: {
    //  把state里面address变量拿到这个vue，相当于放在data，直接用
    ...mapState(["address", "categorys","userInfo"]),
    // categorys由一维数组变成二维数组,小数组长度最大是8
    categorysArr() {
      // 相当于把这个实例上的categorys数组作为值赋给了前面对象的属性，相当于保存到这个函数
      const { categorys } = this;
      const arr = [];
      let minArr = [];
      //categorys这个对象分成两个数组，每个数组最多八个对象，下面的categorys是请求得到的数组
      categorys.forEach(c => {
        if (minArr.length === 8) {
          minArr = [];
        }
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        minArr.push(c);
      });
      return arr;
    }
  },
  watch: {
    categorys(value) {
      //请求的数据push到这里触发
      // 确保轮播图生效在上面数据渲染到图上之后，watch结合this.$nextTick作用就是监听的这个categorys数据，被渲染到dom上this.$nextTick函数内容才会触发
      this.$nextTick(() => {
        // swiper轮播实现js部分
        new Swiper(".swiper-container", {
          loop: true, //支持循环轮播
          // 分页器
          pagination: {
            el: ".swiper-pagination"
          }
        });
      });
    },
  },
  components: {
    HeaderTop,
    Shoplist
  }
};
</script>


<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>