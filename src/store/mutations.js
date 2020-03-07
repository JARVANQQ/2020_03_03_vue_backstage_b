/*
* 直接跟新state的多个方法的对象
*/
import {
  RECEIVE_USER_INFO,
  RECEIVE_LEFT_MENU_PERMISSIONS,
  RECEIVE_USER_LIST,
  RECEIVE_MODIFY_USER_INFO
} from './mutation-types'

export default {
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RECEIVE_LEFT_MENU_PERMISSIONS] (state , {leftMenuPermissions}) {
    state.leftMenuPermissions = leftMenuPermissions
  },
  [RECEIVE_USER_LIST] (state, {userList}) {
    state.userList = userList
  },
  [RECEIVE_MODIFY_USER_INFO] (state, {modifyUserInfo}) {
    state.modifyUserInfo = modifyUserInfo
  }
}
