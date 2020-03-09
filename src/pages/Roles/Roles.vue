<template>
    <div id="roles_container">
      <!--头部面包屑导航-->
      <BreadCrumb :menuName="menuName" />
      <!--角色列表-->
      <el-card class="roles_card">
        <el-button type="primary">添加角色</el-button>
        <el-table class="roles_table" :data="roleListData" stripe border size="small">
          <el-table-column  type="expand">
            <!--表格下拉权限列表-->
            <template slot-scope="scope">
              <el-row :class="['border_bottom',index===0? 'border_top': '']" v-for="(fitstLevel, index) in scope.row.children" :key="fitstLevel.id">
                <el-col :span="5">
                   <el-tag closable @close="deleteLevel(scope.row, fitstLevel.id)">
                     {{fitstLevel.authName}}
                   </el-tag>
                </el-col>
                <el-col :span="19">
                  <el-row :class="[index===0? '': 'border_top']" v-for="(secondLevel, index) in fitstLevel.children" :key="secondLevel.id">
                    <el-col :span="5">
                      <el-tag type="success" closable @close="deleteLevel(scope.row, secondLevel.id)">
                        {{secondLevel.authName}}
                      </el-tag>
                    </el-col>
                    <el-col :span="19">
                      <el-tag type="warning" closable @close="deleteLevel(scope.row, thirdLevel.id)"
                              v-for="(thirdLevel) in secondLevel.children" :key="thirdLevel.id">
                        {{thirdLevel.authName}}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="roleName" label="角色名称"></el-table-column>
          <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
          <el-table-column prop="operating"label="操作">
            <template slot-scope="scope">
              <!--修改按钮-->
              <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
              <!--删除按钮-->
              <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
              <!--分配角色按钮-->
              <el-button type="warning" icon="el-icon-setting" size="small" @click="assignRights(scope.row)">分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!--分配权限的弹窗-->
      <roleDialog :_getRolesList="_getRolesList" :defaultCheckedRightArr="defaultCheckedRightArr" :roleId="roleId"/>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
  import roleDialog from '../../components/roleDialog/roleDialog'
  export default {
    data () {
      return {
        menuName: {
          oneName: '权限管理',
          twoName: '角色列表'
        },
        roleListData: [],
        roleInfo:{},//当前的角色信息
        defaultCheckedRightArr: [],//默认勾选的id数组
        roleId: 0//需要授权的角色id
      }
    },
    mounted () {
      this._getRolesList()
    },
    computed: {
      ...mapState(['roleList', 'roleInfoChildren']),
    },
    methods: {
      //发送请求获取角色列表
      _getRolesList () {
        this.$store.dispatch('getRoleList')
      },
      //计算每一行权限的授权的id，合并成一个数组
      _gteLeafKeys (item, arr) {
        if (!item.children) {
          return arr.push(item.id)
        }
        item.children.forEach(item => this._gteLeafKeys(item, arr))
      },
      //删除权限
      deleteLevel (role, rightId) {
        this.roleInfo = role
        const roleId = role.id
        const deleteId = {roleId, rightId}
        this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          //解决弹窗显示页面抖动
          lockScroll: false
        }).then(() => {
          this.$store.dispatch('deleteRoleRight', deleteId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //分配权限
      assignRights (role) {
        //获取树状权限图
        this.$store.dispatch('getRightList', 'tree')
        this.$store.state.assignRightsVisible = true
        //计算每一行权限的授权的id，合并成一个数组
        this.defaultCheckedRightArr = []//计算前把数组清空，以防止多个角色累加
        this._gteLeafKeys (role, this.defaultCheckedRightArr)
        //获取角色授权的角色id值
        this.roleId = role.id
      }
    },
    watch: {
      roleList (newValue) {
        this.roleListData = newValue
      },
      roleInfoChildren (newValue) {
        this.roleInfo.children = newValue
      }
    },
    components: {
      BreadCrumb,
      roleDialog
    }
  }

</script>

<style lang="less" scoped>
  #roles_container{
    .roles_card{
      box-shadow: 0 2px 1px rgba(0, 0, 0, .1);
      .roles_table{
        margin-top: 15px;
      }
    }
  }
  .border_top{
    border-top: 1px solid #eee;
  }
  .border_bottom{
    border-bottom: 1px solid #eee;
  }
  .el-row{
    display: flex;
    align-items: center;
  }
  .el-tag {
    margin: 8px;
  }
</style>
