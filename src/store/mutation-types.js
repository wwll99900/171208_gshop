// 包含多个mutation的type名称常量

export const RECEIVE_ADDRESS='receive_address'//接受地址
export const RECEIVE_CATEGORYS='receive_categorys'//接受食品分类数组
export const RECEIVE_SHOPS='receive_shops'//接受商家数组
export const RECEIVE_USER_INFO='receive_user_info'//接受用户信息
export const RESET_USER_INFO='reset_user_info'//重置用户信息

// 商家详情页
export const RECEIVE_GOODS = 'receive_goods' // 接收商品数组
export const RECEIVE_RATINGS = 'receive_ratings' // 接收商家评价数组
export const RECEIVE_INFO = 'receive_info' // 接收商家信息

// 购物车 +  -触发
export const INCREMENT_FOOD_COUNT = 'increment_food_count' // 增加food中count值
export const DECREMENT_FOOD_COUNT = 'decrement_food_count' //减少food中count值

// 同步清空购物车
export const CLEAR_CART='clear_cart'

// 接收搜索的商家数组
export const RECEIVE_SEARCH_SHOPS='receive_search_shops'

// 修改经纬度
export const CHANGE_MAP='change_map'