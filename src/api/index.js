// 调用封装的ajax方法，处理请求接口
import ajax from './ajax'
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>\   parmam传参
// 函数名redAddress   参数是()里面的内容，可变量，传给后面函数模板字符解析,根据封装方法默认get   parmar传值/id=1/name=wang   geohash是${geohash}里面geohash属性的值
 export const redAddress=(geohash)=>ajax(`/position/${geohash}`)


 // [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const redAddress=()=>ajax('/index_category')


// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>   query传参
export const redAddress=(latitude,longitude)=>ajax('/shops/',{latitude,longitude})
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
// [5、获取一次性验证码](#5获取一次性验证码)<br/>
// [6、用户名密码登陆](#6用户名密码登陆)<br/>
// [7、发送短信验证码](#7发送短信验证码)<br/>
// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
// [10、用户登出]