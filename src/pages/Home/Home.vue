<template>
    <div>
      home组件////
      <el-button type="primary" @click="loginOut">退出</el-button>
    </div>
</template>

<script>

export default {
  methods: {
    loginOut () {
      window.sessionStorage.removeItem('userInfo')
      this.$store.state.userInfo = {}
      this.$router.replace('/login')
    }
  }
}

</script>

<style lang="less" scoped>

</style>
