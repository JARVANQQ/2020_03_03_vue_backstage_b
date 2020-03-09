/*状态对象*/
export default {
  userInfo: {},//用户信息
  leftMenuPermissions: {}, //左侧菜单权限
  userList: {}, //用户列表
  addUserVisible: false,//添加用户的弹窗状态
  modifyUserVisible: false,//修改用户信息的弹窗状态
  modifyUserInfo: {},//想要修改的用户信息
  rightList: [], //list权限列表
  roleList: [],//角色列表
  roleInfoChildren: {},//删除权限后返回的新的角色权限
  assignRightsVisible: false,//分配权限的弹窗状态
  rightTree: [],//tree权限列表
  assignRoleRightsStatus: 0,//记录分配权限的状态，0代表未重新分配权限，2代表已经重新分配权限并且数据成功提交给后台服务器
  assignRoleVisible: false,//分配角色的弹窗状态
}
