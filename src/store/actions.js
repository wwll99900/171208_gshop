//通过mutation 间接更新state的多个方法的对象   映射     让api里面mutation-types方法一一对应并传值
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

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods,
  reqSearchShop
} from '../api'


export default {
  // 异步获取地址
  async getAddress({ commit, state }) {
    // 发送异步ajax请求   获取state里面的属性值，发送请求
    console.log(state.latitude)
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if (result.code === 0) {
      const address = result.data
      //  commit 触发数据存入state
      commit(RECEIVE_ADDRESS, { address })
    }
  },
  // 异步获取食品分类列表
  async getCategorys({ commit }) {
    // 发送异步ajax请求
    const result = await reqFoodCategorys()
    // 提交一个mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, { categorys })
    }
  },
  // 异步获取商家列表
  async getShops({ commit, state }) {
    // 发送异步ajax请求   state里面longitude, latitude的值赋给前面
    const { longitude, latitude } = state
    const result = await reqShops(longitude, latitude)
    // 提交一个mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },
  // 存入登录成功的用户名信息   同步记录用户信息
  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },
  // 异步获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code == 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, { userInfo })
    }
  },
  // 异步退出
  async logout({ commit }) {
    const result = await reqLogout()
    if (result.code == 0) {//退出成功返回result.code==0
      // 重置请求
      commit(RESET_USER_INFO)
    }
  },


  // 商家详情页部分
  // 获取商家信息列表
  async getShopInfo({ commit }) {
    const result = await reqShopInfo()
    if (result.code == 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },
  // 异步获取商家评价列表
  async getShopRatings({ commit }, callback) {
    const result = await reqShopRatings()
    if (result.code == 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      callback && callback()
    }
  },
  // 异步获取商家商品列表
  async getShopGoods({ commit }, callback) {
    const result = await reqShopGoods()
    if (result.code == 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
      // 到这里数据已经改变了，通知一下组件，在实例就不需要watch监听了
      // 传过来的函数触发  也可能不会传
      callback && callback()
    }
  },
  // 同步更新food中的count值
  updateFoodCount({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, { food })
    } else {
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  },
  // 同步清空购物车
  clearCart({ commit }) {
    commit(CLEAR_CART)
  },
  // 异步获取商家商品列表
  async searchShops({ commit, state }, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, { searchShops })
    }
  },
  // 更新state里面经纬度
  changeAddress({ commit }, { latitude, longitude ,callback}) {//这里回调函数作为对象的一个属性，如果有第三个参数是不正确的
    commit(CHANGE_MAP, { latitude, longitude })
    callback && callback()
  },
}