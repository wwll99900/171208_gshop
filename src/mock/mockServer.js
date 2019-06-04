// 用于mockjs提供mock数据接口
import Mock from 'mockjs'
import data from './data.json'
// mock通过浏览器输入接口访问不了，必须发ajax请求
// 返回goods接口   第一个参数接口，第二个参数返回的形式内容
Mock.mock('/goods',{code:0,data:data.goods})
// 返回ratings接口
Mock.mock('/ratings',{code:0,data:data.ratings})
// 返回info接口
Mock.mock('/info',{code:0,data:data.info})