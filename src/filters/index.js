import Vue from 'vue'
// import moment from 'moment'
// 优化代码
import format from 'date-fns/format'
// 自定义过滤器
Vue.filter('date-format',function(value,formatStr='YYYY-MM-DD HH:mm:ss'){
//    不传值的话默认就是当前时间，value根据时间戳来转化为过滤之后形式
    return format(value,formatStr)
})