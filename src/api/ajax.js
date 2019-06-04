// ajax请求函数模块 1.第一步判断axios请求形式2.在外层再套一个promise执行axios请求，请求出来的就直接是data，没有其他别的东西，相当于对后端返回数据进行处理
import axios from 'axios'

// 函数传参调用直接得到返回值，成功返回值，失败返回值，这样写不写type默认就是get请求方式
export default function ajax(url,data={},type='GET'){
    return new Promise(function(resolve,reject){
        let promise
        if (type === 'GET') {
            // 准备url query参数数据
            let dataStr = '' //数据拼接字符串
    
            // 把数据对象k和value值以?k=value$k=value&形式拼接，以&结尾，下面好截取
            Object.keys(data).forEach(key => {
              dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                // indexof在字符串第一次出现的位置，lastindexof最后一次出现的位置；substring(n,m),截取从n到m-1的字符串片段,相当于去掉了最后一位&
              dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
              url = url + '?' + dataStr
            }
            // 发送get请求
            promise = axios.get(url)
          } else {
            // 发送post请求
            promise = axios.post(url, data)
          }
          promise.then(function(response){
            resolve(response.data)//成功之后输出结果是response.data
          }).catch(function(error){
            reject(error)
          })
    })

}