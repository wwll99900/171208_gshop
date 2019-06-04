// 包含多个基于state的getter计算属性的对象
export default{
    totalCount(state){
        // [].reduce((a,b)=>{return a*b},1)
        // 数组Reduce方法，如果数组里面有这个值按索引值一个个往下运算，如果为空，返回
        // 这段代码理解：当前值0，就是计算的第一位是0；preTotal是cartFoods数组里面原来的值，food是推进cartFoods这个数组的一条条对象，每点一次，count+1;因为food可能是不同对象，用reduce累加，把每条food数据里面的count都加起来返回
        return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count,0)
    },
    totalPrice(state){
        return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count*food.price,0)        
    },
    // 对state里面的ratings的数据进行统计，0+（数据里面rateType=0的时候+1，否则不加） 返回的结果是满意的评论条数
    positiveSize(state){
        return state.ratings.reduce((preTotal,rating)=>preTotal+(rating.rateType===0 ? 1:0),0)
    }
}