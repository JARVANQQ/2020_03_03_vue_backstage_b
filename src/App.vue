<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    if (userInfo) {
      this.$store.state.userInfo = userInfo
      // console.log(userInfo)
    }
  }
}
</script>

<style lang="less" scoped>
  #app{
    width: 100%;
    height: 100%;
  }
</style>
