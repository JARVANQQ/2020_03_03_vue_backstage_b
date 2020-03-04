<template>
    <div id="login_container">
      <div class="login">
        <div class="logo">
          <img src="../../assets/images/duola.jpg">
        </div>
        <div class="login_form">
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="username">
              <el-input prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input prefix-icon="el-icon-s-cooperation" type="password" v-model="form.password"></el-input>
            </el-form-item>
          </el-form>
          <div class="login_btn">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符或数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符或数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // alert('submit!'+valid)
          const {form} = this
          this.$store.dispatch('getUserInfo', form)
          // this.$router.push('/home')
        } else {
          console.log('error submit!!');
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    userInfo () {
      this.$nextTick(() => {
        if (this.userInfo.token) {
          const userInfo = JSON.stringify(this.userInfo)
          this.$router.push('/home')
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          window.sessionStorage.setItem('userInfo', userInfo)
        }
      })
    }
  }
}

</script>

<style lang="less" scoped>
  #login_container{
    width: 100%;
    height: 100%;
    background-color: #2b4b6b;
    position: relative;
    .login{
      width: 450px;
      height: 300px;
      background-color: #fff;
      border-radius: 5px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .logo{
        width: 152px;
        height: 152px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        box-sizing: border-box;
        padding: 10px;
        overflow: hidden;
        box-shadow: 1px 1px 12px #ddd;
        position: absolute;
        top: -75px;
        left: 50%;
        transform: translateX(-50%);
        img{
          width: 100%;
          height: 100%;
          background-color: #eee;
          border-radius: 50%;
        }
      }
    }
    .login_form{
      width: 100%;
      box-sizing: border-box;
      padding: 0 30px;
      position: absolute;
      bottom: 20px;
    }
    .login_btn{
      text-align: right;
    }
  }
</style>
