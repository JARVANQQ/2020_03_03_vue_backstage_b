/*
* 通过mutation间接更新state的多个方法的对象
*/
import {
  reqUserInfo
} from '../api'
import {
  RECEIVE_USER_INFO
} from './mutation-types'

export default {
  //异步获取用户信息
  async getUserInfo ({commit, state}, form) {
    const {username, password} = form
    const result = await reqUserInfo(username, password)
    if (result.meta.status===200) {
      const userInfo = result.data
      commit (RECEIVE_USER_INFO, {userInfo})
    }else {
      console.log('登录失败')
    }
  }
}
