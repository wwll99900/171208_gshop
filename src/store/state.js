// 
export default {
    // 对应形式空值，避免数据没请求到.属性报错，对应形式就算undefined也不会报错
    latitude: '', // 纬度
    longitude: '', // 经度
    address:{},//地址相关信息
    categorys: [], // 食品分类数组
    shops:[],//外卖路由附近商家数组
    userInfo:{},//用户信息
    // 商家详情页面三个数据
    goods:[],//商家列表
    ratings:[],//商家评价列表
    info:{},//商家信息


    cartFoods:[],//购物车食物的列表
    searchShops:[],//搜索得到的商家列表
}


