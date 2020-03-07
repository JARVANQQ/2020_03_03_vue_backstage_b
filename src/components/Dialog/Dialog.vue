<template>
  <div>
    <div id="add_user_container">
      <el-dialog
        title="添加用户"
        :visible.sync="$store.state.addUserVisible"
        width="40%"
        :before-close="handleClose">
        <el-form ref="addUseRef" :model="addUserForm" label-width="70px" :rules="addUserRules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUserForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addUserForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="NoToAddUser">取 消</el-button>
        <el-button type="primary" @click="toAddUsers">确 定</el-button>
      </span>
      </el-dialog>
    </div>
    <div id="modify_user_info_container">
      <el-dialog
        title="修改用户信息"
        :visible.sync="$store.state.modifyUserVisible"
        width="40%">
        <el-form ref="modifyUserRef" :model="newUserInfo" label-width="70px" :rules="addUserRules">
          <el-form-item label="用户名">
            <el-input v-model="modifyUserUsername" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="newUserInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="newUserInfo.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="cancelModify">取 消</el-button>
        <el-button type="primary" @click="confirmModify">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props:{
      updateUserList: Function
    },
    data() {
      let checkMobile = (rule, value, callback) => {
        const regMobile = /^[1]([3-9])[0-9]{9}$/
        if (!regMobile.test(value)) {
          return callback(new Error('手机号码错误，请重新填写'))
        } else {
          return callback()
        }
      }
      let checkEmail = (rule, value, callback) => {
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (!regEmail.test(value)) {
          return callback(new Error('邮箱有误，请重新填写'))
        }else {
          return callback()
        }
      }
      return {
        addUserForm: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        addUserRules: {
          username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符或数字', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符或数字', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkMobile, trigger: 'blur' }
          ]
        },
        newUserInfo: {//修改后的用户信息
          id: '',
          email: '',
          mobile: '',
        },
        modifyUserUsername: ''
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
           this.NoToAddUser ()
          })
          .catch(erro => {

          })
      },
      //取消添加用户
      NoToAddUser () {
        this.$store.state.addUserVisible = false
        this.$refs.addUseRef.resetFields()
      },
      //确认添加用户
      toAddUsers () {
        this.$refs.addUseRef.validate((valid) => {
          if (valid) {
            const {addUserForm} = this
            //表单验证成功，发送ajax向后台服务器添加用户
            this.$store.dispatch('toAddUser', addUserForm)
            this.$store.state.addUserVisible = false
            this.$refs.addUseRef.resetFields()
            this.updateUserList ()
          }
        })
      },
      //取消修改用户信息
      cancelModify () {
        this.$store.state.modifyUserVisible = false
        this.$refs.modifyUserRef.resetFields()
      },
      //确定修改用户信息
      confirmModify () {
        this.$refs.modifyUserRef.validate(valid => {
          if (valid) {
            this.$store.dispatch('getModifyAfterUserInfo', this.newUserInfo)
            this.$store.state.modifyUserVisible = false
            this.$refs.modifyUserRef.resetFields()
            this.updateUserList()
          }
        })
      }
    },
    computed: {
      ...mapState(['addUserVisible', 'modifyUserVisible', 'modifyUserInfo'])
    },
    watch: {
      // modifyUserVisible (newValue) {
      //   if (newValue) {
      //     console.log(newValue)
      //   }
      // },
      modifyUserInfo (newValue) {
        this.newUserInfo.id = newValue.id
        this.newUserInfo.email = newValue.email
        this.newUserInfo.mobile = newValue.mobile
        this.modifyUserUsername = newValue.username
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
