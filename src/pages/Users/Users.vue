<template>
  <div id="user_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="user_card">
      <div class="search">
        <el-input placeholder="请输入内容" v-model="userListParam.query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchUsers"></el-button>
        </el-input>
        <el-button type="primary" class="search_btn" @click="addUser">添加用户</el-button>
      </div>
      <el-table :data="tableData" border class="table_container" stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="120">
          <!--作用域插槽-->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="modifyStatus(scope.row.id, scope.row.mg_state)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="operating" label="操作" width="220">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button type="primary" icon="el-icon-edit" @click="modifyUserInfo(scope.row.id)"></el-button>
            <!--删除按钮-->
            <el-button type="danger" icon="el-icon-delete" @click="deleteUserInfo(scope.row.id)"></el-button>
            <!--分配角色按钮-->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[2, 4, 8]"
          :page-size="userListParam.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
    <!--弹窗信息-->
    <Dialog :updateUserList="_getUserList" />
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import Dialog from '../../components/Dialog/Dialog'
  export default {
    data () {
      return {
        userListParam: {
          query: '',
          pagenum: 1,
          pagesize: 2,
        },
        tableData: [],
        total: 0,
        dialogVisible: false,
        currentPage: 1
      }
    },
    mounted () {
      this._getUserList()
    },
    computed: {
      ...mapState(['userList'])
    },
    methods: {
      //发送请求获取用户列表
      _getUserList () {
        const {userListParam} = this
        this.$store.dispatch('getUserList', userListParam)
      },
      handleSizeChange (val) {
        //每页几条
        this.userListParam.pagesize = val
        this._getUserList ()
      },
      handleCurrentChange (val) {
        //当前页多少
        this.userListParam.pagenum = val
        this.currentPage = val
        this._getUserList ()
      },
      //修改用户状态
      modifyStatus (uId, type) {
        //发送请求修改用户状态
        this.$store.dispatch('modifyStatus', {uId, type})
      },
      searchUsers () {
        this.currentPage = 1
        this.userListParam.pagenum = 1
        this._getUserList ()
      },
      //添加用户信息
      addUser () {
        //更改state中弹窗的状态
        this.$store.state.addUserVisible = true
      },
      //修改用户信息
      modifyUserInfo (id) {
        this.$store.dispatch('getModifyUserInfo', id)
        this.$store.state.modifyUserVisible = true
      },
      //删除用户信息
      deleteUserInfo (id) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteUserInfo', id)
          this._getUserList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    watch: {
      userList (newValue) {
        this.tableData = newValue.users
        this.total = newValue.total
      }
    },
    components: {
      Dialog
    }
  }

</script>

<style lang="less" scoped>
  #user_container {
    .el-breadcrumb {
      margin-bottom: 15px;
      font-size: 12px;
    }
    .user_card {
      box-shadow: 0 2px 1px rgba(0, 0, 0, .1);
      .search {
        margin-top: 5px;
        width: 360px;
        display: flex;
        padding-bottom: 15px;
        .search_btn {
          margin-left: 15px;
        }
      }
      .table_container{
        width: 100%;
        margin-bottom: 15px;
      }
    }
  }
</style>
