/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = 'http://127.0.0.1:8888/api/private/v1'
//获取登录信息
export const reqUserInfo = (username, password) => ajax(BASE_URL+'/login', {username, password}, 'POST')
//获取左侧列表权限
export const reqLeftMenuPermissions = () => ajax(BASE_URL+'/menus')
//获取用户信息
export const reqUserList = ({query, pagenum, pagesize}) => ajax(BASE_URL+'/users', {query, pagenum, pagesize})
//修改用户状态
export const reqUserStatus = (uId, type) => ajax(BASE_URL+`/users/${uId}/state/${type}`, {}, 'PUT')
//添加用户
export const reqToAddUser = ({username, password, email, mobile}) => ajax(BASE_URL+'/users', {username, password, email, mobile}, 'POST')
// 根据 ID 查询用户信息
export const reqModifyUserInfo = (id) => ajax(BASE_URL+`/users/${id}`)
//提交修改后的用户信息
export const reqModifyAfterUserInfo = ({id, email, mobile}) => ajax(BASE_URL+`/users/${id}`,{email, mobile}, 'PUT')
//删除用户信息
export const reqDeleteUserInfo = (id) => ajax(BASE_URL+`/users/${id}`,{}, 'DELETE')
