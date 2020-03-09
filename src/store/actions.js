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
  reqDeleteUserInfo,
  reqRightList,
  reqRoleList,
  reqDeleteRoleRight,
  reqRoleRights,
  reqAssignUserRole
} from '../api'
import {
  RECEIVE_USER_INFO,
  RECEIVE_LEFT_MENU_PERMISSIONS,
  RECEIVE_USER_LIST,
  RECEIVE_MODIFY_USER_INFO,
  RECEIVE_RIGHT_LIST,
  RECEIVE_ROLE_LIST,
  RECEIVE_ROLE_INFO_CHILDREN,
  RECEIVE_RIGHT_TREE
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
  //异步获取权限列表
  async getRightList ({commit}, type) {
    if (type === 'list') {
      const result =  await reqRightList (type)
      if (result.meta && result.meta.status === 200) {
        const rightList = result.data
        commit (RECEIVE_RIGHT_LIST, {rightList})
      }
    }else {
      const result =  await reqRightList (type)
      if (result.meta && result.meta.status === 200) {
        const rightTree = result.data
        commit (RECEIVE_RIGHT_TREE, {rightTree})
      }
    }

  },
  //异步获取角色列表
  async getRoleList ({commit}) {
    const result =  await reqRoleList ()
    if (result.meta && result.meta.status === 200) {
      const roleList = result.data
      commit (RECEIVE_ROLE_LIST, {roleList})
    }
  },
  //异步删除角色指定权限
  async deleteRoleRight ({commit}, deleteId) {
    const result =  await reqDeleteRoleRight (deleteId)
    if (result.meta && result.meta.status === 200) {
      messageSuccess(result.meta.msg)
      const roleInfoChildren = result.data
      commit (RECEIVE_ROLE_INFO_CHILDREN, {roleInfoChildren})
    }else {
      messageError('删除失败！')
    }
  },
  //异步给指定的角色授权
  async roleRights ({commit, state}, needRoleRightKeys) {
    const result =  await reqRoleRights (needRoleRightKeys)
    if (result.meta && result.meta.status === 200) {
      state.assignRoleRightsStatus = 2//更改state中assignRoleRightsStatus的状态，并且下一步调用getRoleList重新加载页面
      messageSuccess('分配权限成功')
    }else {
      messageError('分配权限失败')
    }
  },
  //异步分配用户角色
  async assignUserRole ({commit}, idInfo) {
    const result =  await reqAssignUserRole (idInfo)
    if (result.meta && result.meta.status === 200) {
      messageSuccess(result.meta.msg)
    }else {
      messageError('分配角色失败')
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
