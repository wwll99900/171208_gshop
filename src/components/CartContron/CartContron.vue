// 商家详情页点餐部分+  - 组件
<template>
    <div class="cartcontrol">
       <transition name="move">
         <!-- 必须阻止默认事件，否则点击+ -会跳出大的图片部分 -->
        <div class="iconfont icon-jian_c" v-if="food.count" @click.stop="updateFoodCount(false)"></div> 
       </transition>
        <div class="cart-count" v-if="food.count">{{food.count}}</div> 
        <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
    </div>
</template>
<script>
export default {
    props:{
        food:Object
    },
   methods:{
    //    是否增加
       updateFoodCount(isAdd){
        //    触发vuex存值   第一个参数：触发的方法   第二个参数过去的值
          this.$store.dispatch('updateFoodCount',{isAdd,food:this.food})
       }
   }
}
</script>


<style lang="stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-jian_c
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color:$green
</style>
