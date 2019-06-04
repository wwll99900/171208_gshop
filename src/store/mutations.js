
// 直接更新state的多个方法对象
 import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS,
    CHANGE_MAP
} from './mutation-types'
import Vue from 'vue';

export default{
    [RECEIVE_ADDRESS] (state,{address}){
        state.address=address
    },
    [RECEIVE_CATEGORYS] (state,{categorys}){
        state.categorys=categorys
    },
    [RECEIVE_SHOPS] (state,{shops}){
        state.shops=shops
    },
    [RECEIVE_USER_INFO] (state,{userInfo}){
        state.userInfo=userInfo
    },
    [RESET_USER_INFO] (state){
        // state里面的userInfo变为{}
        state.userInfo={}
    },


    // 商家详情页数据保存
    [RECEIVE_GOODS] (state,{goods}){
        state.goods=goods
    },
    [RECEIVE_RATINGS] (state,{ratings}){
        state.ratings=ratings
    },
    [RECEIVE_INFO] (state,{info}){
        state.info=info
    },

    // 点餐右边列表+ -,中间数量变化；点击+ -,往购物车数组添加一条条对象
    [INCREMENT_FOOD_COUNT] (state,{food}){
        if(!food.count){//food里面期初没有count属性，点击第一次变成1
            // food.count=1  不会更改视图上数据
            // Vue上方法  参一：对象  参二：属性名 参三：属性值
            Vue.set(food,'count',1)//让新增的属性也有数据绑定，原本food里面没有这个属性，这里是新增
            // 将数据添加到购物车数组
            state.cartFoods.push(food)
        }else{
            food.count++//这里不需要重复push,因为food在cartFoods这个数组，直接对food操作就可以改变数组内值
        }
    },
    [DECREMENT_FOOD_COUNT] (state,{food}){
        if(food.count){//只有>0，才会-
             food.count--
           if(food.count===0){
        // 当去掉点餐 将food从cartFoods中移除   
            state.cartFoods.splice(state.cartFoods.indexOf(food),1)
           }
        }
    },
    // 同步清空购物车
    [CLEAR_CART] (state){
        //先清空数组里面被引用的对象值，不然清空数组也没用
       state.cartFoods.forEach(food=>food.count=0)
        // 清空数组
       state.cartFoods=[]
    },
    // 获取搜索商家列表
    [RECEIVE_SEARCH_SHOPS] (state,{searchShops}){
        state.searchShops=searchShops
    },
    // 修改经纬度
    [CHANGE_MAP] (state,{latitude,longitude}){
        state.latitude=latitude
        state.longitude=longitude
    },
}