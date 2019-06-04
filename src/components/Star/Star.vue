<template>
<!-- 把五角星单独做成组件  根据评分确定选用样式里面哪一个-->
  <div class="star" :class="'star-'+size">
    <!-- 小图标未显示 -->
    <span class="star-item" v-for="(sc,index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>


<script>
 // 类名常量
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'
export default {
    props:{
        score:Number,
        size:Number
    },
    computed:{
        starClasses(){
            // 3.2:3(三个满星)+0(0个半星)+2(2个灰星)
            // 3.5:3(三个满星)+1(1个半星)+1(1个灰星)   因为评分从0开始
            const {score}=this
            const scs=[]//总个数5个
            // 向scs中添加n个CLASS_ON   整数位多少就添加几个全星
              const scoreInteger=Math.floor(score)
               for (let i = 0; i < scoreInteger; i++) {
                   scs.push(CLASS_ON)
               }
            // 向scs中添加0或1个CLASS_HALF   小数相减不够精确，小数大于等于5添加半星
            if(score*10-scoreInteger*10>=5){
                scs.push(CLASS_HALF)
            }      
            // 向scs中添加n个CLASS_OFF
              while(scs<5){//最多五位，满分5分
                scs.push(CLASS_HALF)
              }            
            return scs
        }
    }
};
</script>


<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';
.star { // 2x图 3x图
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/star48_on');
      }

      &.half {
        bg-image('./images/star48_half');
      }

      &.off {
        bg-image('./images/star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/star36_on');
      }

      &.half {
        bg-image('./images/star36_half');
      }

      &.off {
        bg-image('./images/star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/star24_on');
      }

      &.half {
        bg-image('./images/star24_half');
      }

      &.off {
        bg-image('./images/star24_off');
      }
    }
  }
}
</style>
