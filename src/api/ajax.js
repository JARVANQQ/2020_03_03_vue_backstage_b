/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
// import axios from 'axios'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css' 项目优化

export default function ajax (url, data={}, type='GET') {

  return new Promise(function (resolve, reject) {
    //axios请求拦截器
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    if (userInfo && userInfo.token) {
      axios.interceptors.request.use(config => {
        //头部进度条开启
        NProgress.start()
        // console.log('token:'+userInfo.token)
        //为请求头对象，添加token的验证Authorization字段
        config.headers.Authorization = userInfo.token
        // console.log('拦截器：'+userInfo.token)
        return config
      })
      //axios响应拦截器
      axios.interceptors.response.use(config => {
        //头部进度条关闭
        NProgress.done()
        return config
      })
    }
    // 执行异步ajax请求
    let promise
    if (type.toUpperCase() === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else if (type.toUpperCase() === 'PUT') {
      //发送put请求
      promise = axios.put(url, data)
    } else if (type.toUpperCase() === 'POST') {
      // 发送post请求
      promise = axios.post(url, data)
    } else if (type.toUpperCase() === 'DELETE') {
      // 发送delete请求
      promise = axios.delete(url)
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}
