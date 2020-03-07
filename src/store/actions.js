/*
* 通过mutation间接更新state的多个方法的对象
*/
import { Message } from 'element-ui';
import {
  reqUserInfo,
  reqLeftMenuPermissions,
  reqUserList,
  reqUserStatus,
  reqToAddUser,
  reqModifyUserInfo,
  reqModifyAfterUserInfo,
  reqDeleteUserInfo
} from '../api'
import {
  RECEIVE_USER_INFO,
  RECEIVE_LEFT_MENU_PERMISSIONS,
  RECEIVE_USER_LIST,
  RECEIVE_MODIFY_USER_INFO
} from './mutation-types'

export default {
  //异步获取用户信息
  async getUserInfo ({commit, state}, form) {
    const {username, password} = form
    const result = await reqUserInfo(username, password)
    if (result.meta.status===200) {
      const userInfo = result.data
      commit (RECEIVE_USER_INFO, {userInfo})
      messageSuccess('登录成功')
    }else {
      messageError('登录失败了哦')
    }
  },
  //异步获取左侧菜单权限
  async getLeftMenuPermissions ({commit}) {
    const result = await reqLeftMenuPermissions ()
    if (result.meta.status===200) {
      const leftMenuPermissions = result.data
      commit (RECEIVE_LEFT_MENU_PERMISSIONS, {leftMenuPermissions})
    }
  },
  //异步获取用户列表
  async getUserList ({commit}, userListParam) {
    const result = await reqUserList (userListParam)
    if (result.meta.status===200) {
      const userList = result.data
      commit (RECEIVE_USER_LIST, {userList})
    }
  },
  //异步修改用户状态
  async modifyStatus ({commit}, {uId, type}) {
    const result =  await reqUserStatus(uId, type)
    if (result.meta && result.meta.status === 200) {
      messageSuccess(result.meta.msg)
    }else {
      messageError('修改失败了哦')
    }
  },
  //异步添加用户
  async toAddUser ({commit}, addUserForm) {
    const result =  await reqToAddUser (addUserForm)
    if (result.meta.status === 201) {
      messageSuccess(result.meta.msg)
    }else {
      messageError('添加用户失败了哦')
    }
  },
  //异步获取想要修改的用户信息
  async getModifyUserInfo ({commit}, id) {
    const result =  await reqModifyUserInfo (id)
    if (result.meta && result.meta.status === 200) {
      const modifyUserInfo = result.data
      commit (RECEIVE_MODIFY_USER_INFO, {modifyUserInfo})
    }
  },
  //异步提交修改后的用户信息
  async getModifyAfterUserInfo ({commit}, newUserInfo) {
    const result =  await reqModifyAfterUserInfo (newUserInfo)
    if (result.meta && result.meta.status === 200) {
      messageSuccess(result.meta.msg)
    }else {
      messageError('跟新失败了哦')
    }
  },
  //异步删除用户信息
  async deleteUserInfo ({commit}, id) {
    const result =  await reqDeleteUserInfo (id)
    if (result.meta && result.meta.status === 200) {
      messageSuccess('删除成功!')
    }else {
      messageError('删除失败！')
    }
  },
}

function messageSuccess (success) {
  Message.success({
    message: success,
    type: 'success'
  })
}
function messageError (error) {
  Message.error({
    message: error,
    type: 'error'
  })
}
