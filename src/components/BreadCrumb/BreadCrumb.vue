<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{oneName}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{twoName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>

  export default {
    props: {
      menuName: Object
    },
    data () {
      return {
        oneName: this.menuName.oneName,
        twoName: this.menuName.twoName
      }
    }
  }

</script>

<style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 15px;
    font-size: 14px;
  }
</style>
