// 这是详情页点餐页面模块
<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!-- current动态class 左侧选中样式变化 -->
          <li
            class="menu-item"
            :class="{current:index===currentIndex}"
            v-for="(good,index) in goods"
            :key="index"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
          <li class="menu-item">
            <span class="text bottom-border-1px">
              <img
                class="icon"
                src="https://fuss10.elemecdn.com/b/91/8cf4f67e0e8223931cd595dc932fepng.png"
              >
              优惠
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <!-- 点餐路由右侧部分 showFood点击放大触发 把这个food对应的对象保存到data的food中，传给子组件food.vue-->
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <!-- 右侧每一个类别下面的一条条对象对应的数据渲染，每一个li绑定一个事件，把这条数据保存到data,传给点击出现的大图部分 -->
              <li
                class="food-item bottom-border-1px"
                v-for="(food,index) in good.foods"
                :key="index"
                 @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <!-- 把每条失误对象传过去 调用组件-->
                  <div class="cartcontrol-wrapper"><CartControl :food="food"/></div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 底部购物车模块 -->
      <ShopCart></ShopCart>
    </div>
    <Food :food="food" ref="food"></Food>
  </div>
</template>


<script>
import { mapState } from "vuex";
// 引入better-scroll实现移动端局部滚动
import BScroll from "better-scroll";
// 引入+ -子模块
import CartControl from '../../../components/CartContron/CartContron'
// 引入点击放大子模块
import Food from '../../../components/Food/Food'
// 引入底部购物车子模块
import  ShopCart  from '../../../components/ShopCart/ShopCart'
export default {
  data() {
    return {
      scrollY: 0, //右侧滑动的Y轴坐标（滑动过程实时变化）
      tops: [], //右侧分类li的top组成的数据（列表第一次显示后就不再变化）
      food:{},//点击放大需要的数据
    };
  },
  mounted() {
    // 触发vue请求，存值
    this.$store.dispatch("getShopGoods", () => {
      // 放在这个函数里面表示vuex里面的值被请求数据更新里面内容执行
      this.$nextTick(() => {
        // 更新的数据被渲染到Dom创建滚动
          this._initScroll()
          this._initTops()
      });
    });
  },
  methods: {
    //   初始化滚动条
    _initScroll() {
      // 单纯实现滚动一行就可以
      new BScroll(".menu-wrapper",{
        click:true//解决better-scroll默认阻止点击事件
      });
      this.foodsScroll = new BScroll(".foods-wrapper", {
        probeType: 2 ,//滚动过程中实时派发，触发滚动绑定的函数，手指离开后不会触发，0不触发；3惯性滑动也会触发
        click:true
      });
      // 绑定滚动触发事件
      this.foodsScroll.on("scroll", ({ x, y }) => {
        //x,y就是滚动上下距离的负值
        //   取绝对值
      this.scrollY = Math.abs(y);
      });
      // 绑定滚动结束触发事件,处理惯性滚动到某一位置，高度值没获取到
      this.foodsScroll.on("scrollEnd", ({ x , y }) => {
        this.scrollY = Math.abs(y);
      });
    },
    _initTops(){
    // 初始化tops  右边每一个li的高度
     const tops=[]
     let top=0
     tops.push(top)
     //   找到所以分类的li   缩小范围this.$refs.foodsUl这个下面找，不是全局
     //  Array.prototype.slice.call(lis)将lis中的每一项取出来放到一个新的数组
     const lis=this.$refs.foodsUl.getElementsByClassName('food-list-hook')
     Array.prototype.slice.call(lis).forEach(li=>{
      //  这里叠加是关键
        top+=li.clientHeight
        tops.push(top)
     })
     // 更新数据
     this.tops=tops
     console.log(this.tops)
    },
    // 点击左侧分类触发事件
    clickMenuItem(index){
      // 获取这个分类对应的li和之前li累积的高度  300滚动到指定位置所需时间
        const scrollY=this.tops[index]
        // 这一步不影响效果
        this.scrollY=scrollY
        this.foodsScroll.scrollTo(0,-scrollY,300)
     },
    //  显示点击的food
     showFood(food){
      // 设置food
      this.food=food
      // 显示food组件    调用子组件里面方法,ref获取即可
      this.$refs.food.toggleShow()
     }
  },
  computed: {
    ...mapState(["goods"]),
    // 计算得到当前分类的下标
    currentIndex() {
      // 得到相关条件数据
       const {scrollY,tops}=this
      // 根据条件计算产生一个结果  ()=>a等于()=>{return a}  findindex遍历数组，形参也是函数，返回true停止遍历，把index返回
       const index=tops.findIndex((top,index)=>{
        //  scrollY>=当前top && scrollY<下一个top ,用滚动距离和tops里面值匹配，在这个区间的返回top对应的索引
         return  scrollY>=top && scrollY<tops[index+1] 
       })
      // 返回结果
       return index
    }
  },
  components:{
    CartControl,
    Food,
    ShopCart,
  }
};
</script>

<style lang="stylus" scoped>
@import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
