// 调用封装的ajax方法，处理请求接口  以/api开头的被config文件夹的index.js识别拦截被代理，其他的接口是mockServer.js的接口
import ajax from './ajax'
const BASE_URL='/api'
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>\   parmam传参
// 函数名redAddress   参数是()里面的内容，可变量，传给后面函数模板字符解析,根据封装方法默认get   parmar传值/id=1/name=wang   geohash是${geohash}里面geohash属性的值
 export const reqAddress=(geohash)=>ajax(`${BASE_URL}/position/${geohash}`)


 // [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqFoodCategorys=()=>ajax(BASE_URL+'/index_category')


// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>   query传参
export const reqShops=(latitude,longitude)=>ajax(BASE_URL+'/shops/',{latitude,longitude})
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
export const reqSearchShop=(geohash,keyword)=>ajax(BASE_URL+'/search_shops',{geohash,keyword})
// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqPwdLogin=({name,pwd,captcha})=>ajax(BASE_URL+'/login_pwd',{name,pwd,captcha},'POST')
// [7、发送短信验证码](#7发送短信验证码)<br/>   get方法query传参
export const reqSendCode=(phone)=>ajax(BASE_URL+'/sendcode',{phone})
// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqSmsLogin=(phone,code)=>ajax(BASE_URL+'/login_sms',{phone,code},'POST')
// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqUserInfo=()=>ajax(BASE_URL+'/userinfo')
// [10、用户登出]
export const reqLogout=()=>ajax(BASE_URL+'/logout')


// 以下mock数据接口   默认get方式
// 获取商家信息
export const reqShopInfo=()=>ajax('/info')
// 获取商家评价数组
export const reqShopRatings=()=>ajax('/ratings')
// 获取商家商品数组
export const reqShopGoods=()=>ajax('/goods')
