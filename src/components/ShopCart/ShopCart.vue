// 详情页面点餐路由底部购物车子模块
<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <!-- highlight控制购物车图标样式，高亮显示 -->
            <div class="logo" :class="{highlight:totalCount}">
              <i class="iconfont icon-qicheqianlian-" :class="{highlight:totalCount}"></i>
            </div>
            <!-- 购物车商品数量 -->
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price highlight" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}} 元</div>
        </div>
        <div class="content-right">
          <!-- 还差多少元起送部分 -->
          <div class="pay" :class="payClass">{{payText}}</div>
        </div>
      </div>

      <transition name="move">
        <!-- 点餐在购物车上方显示 -->
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <!-- 点击情况购物车 -->
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <!-- 实现滚动 -->
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food,index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <div class="cartcontrol">
                    <!-- +   - 子模块 -->
                    <CartContron :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!-- 遮罩层  -->
    <div class="list-mask" style="display: none;" @click="toggleShow" v-show="listShow"></div>
  </div>
</template>



<script>
import { mapState, mapGetters } from "vuex";
// 引入+  -子模块
import CartContron from "../CartContron/CartContron";
// 点餐购物车上面出现列表也能滑动
import BScroll from "better-scroll";
// 点击清空购物车出现提示框，mint ui组件
import { MessageBox } from "mint-ui";
export default {
  methods: {
    toggleShow() {
      if (this.totalCount > 0) {
        //只有点餐数量大于0，才会切换
        this.isShow = !this.isShow;
      }
    },
    clearCart() {//这个组件必须传两个函数，不需要的返回空，否则报错
      MessageBox.confirm("确定清空购物车吗？").then(action => {
        this.$store.dispatch('clearCart')
      },()=>{});
    }
  },
  data() {
    return {
      // 控制购物车列表显示隐藏
      isShow: false
    };
  },
  computed: {
    // 取出在vuex里面的购物车数据，info在商家信息里面，起送价
    ...mapState(["cartFoods", "info"]),
    // 总数量，总价格  触发getters里面方法
    ...mapGetters(["totalCount", "totalPrice"]),
    // 还差多少元起送样式变化
    payClass() {
      const { totalPrice } = this; //购商品总价格
      const { minPrice } = this.info; //最低起送价
      //    价格大于起送价class为enough,否则not-enough
      return totalPrice >= minPrice ? "enough" : "not-enough";
    },
    payText() {
      const { totalPrice } = this;
      const { minPrice } = this.info;
      if (totalPrice == 0) {
        return `￥${minPrice}元起送`;
      } else if (totalPrice < minPrice) {
        //总价格小于起送价
        return `还差￥${minPrice - totalPrice}元起送`;
      } else {
        return "结算";
      }
    },
    // 控制点餐列表和遮罩层显现隐藏
    listShow() {
      if (this.totalCount === 0) {
        //没有点餐的时候不显示
        this.isShow = false; //相当于初始化
        return false;
      } //有点餐的时候切换显示，点击出现，再点击消失
      if (this.isShow) {
        this.$nextTick(() => {
          if (!this.scroll) {
            //防止每次都出现一个滚动对象，点击添加或减少food里面count值出错，这个click是better-scroll的事件，一个对象触发一次，多个对象，点击一次，事件触发多次
            this.scroll = new BScroll(".list-content", {
              click: true
            });
          } else {
            this.scroll.refresh(); //滚动条存在让页面刷新一下，解决第一次点击不滑动问题
          }
        })
      }
      return this.isShow;
    }
  },
  components: {
    CartContron
  }
};
</script>


<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: $green;
          }

          .icon-qicheqianlian- {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: #fff;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -45px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: #fff;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: $green;
        transition: all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%); // 向上平移，-的距离,结合v-show使用，前面是出现效果，后面是消失后果

    &.move-enter-active, &.move-leave-active {
      transition: transform 0.3s;
    }

    &.move-enter, &.move-leave-to {
      transform: translateY(0);
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        bottom-border-1px(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>
