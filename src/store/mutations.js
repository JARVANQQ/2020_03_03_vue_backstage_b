/*
* 直接跟新state的多个方法的对象
*/
import {
  RECEIVE_USER_INFO,
  RECEIVE_LEFT_MENU_PERMISSIONS,
  RECEIVE_USER_LIST,
  RECEIVE_MODIFY_USER_INFO,
  RECEIVE_RIGHT_LIST,
  RECEIVE_ROLE_LIST,
  RECEIVE_ROLE_INFO_CHILDREN,
  RECEIVE_RIGHT_TREE,
  RECEIVE_GOODS_CATE,
  RECEIVE_PARENT_GOODS_CATE
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
  },
  [RECEIVE_RIGHT_LIST] (state, {rightList}) {
    state.rightList = rightList
  },
  [RECEIVE_ROLE_LIST] (state, {roleList}) {
    state.roleList = roleList
  },
  [RECEIVE_ROLE_INFO_CHILDREN] (state, {roleInfoChildren}) {
    state.roleInfoChildren = roleInfoChildren
  },
  [RECEIVE_RIGHT_TREE] (state, {rightTree}) {
    state.rightTree = rightTree
  },
  [RECEIVE_GOODS_CATE] (state, {goodsCate, goodsCateTotal}) {
    state.goodsCate = goodsCate
    state.goodsCateTotal = goodsCateTotal
  },
  [RECEIVE_PARENT_GOODS_CATE] (state, {parentGoodsCate}) {
    state.parentGoodsCate = parentGoodsCate
  },
}
