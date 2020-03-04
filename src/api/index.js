/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = 'http://127.0.0.1:8888/api/private/v1'

export const reqUserInfo = (username, password) => ajax(BASE_URL+'/login', {username, password}, 'POST')
