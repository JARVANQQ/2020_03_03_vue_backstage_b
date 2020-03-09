<template>
    <div id="right_container">
      <!--头部面包屑导航-->
      <BreadCrumb :menuName="menuName" />
      <!--权限列表-->
      <el-card class="right_card">
        <el-table class="right_table" :data="rightListData" stripe border>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="authName" label="权限名称"></el-table-column>
          <el-table-column prop="path" label="路径"></el-table-column>
          <el-table-column label="权限等级">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.level === '0'">一级</el-tag>
              <el-tag v-if="scope.row.level === '1'" type="success">二级</el-tag>
              <el-tag v-if="scope.row.level === '2'" type="warning">三级</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
export default {
  data () {
    return {
      menuName: {
        oneName: '权限管理',
        twoName: '权限列表'
      },
      rightListData:[]
    }
  },
  computed: {
    ...mapState(['rightList'])
  },
  mounted () {
    this._getRightList ('list')
  },
  methods: {
    //发送请求获取权限列表
    _getRightList (type) {
      this.$store.dispatch('getRightList', type)
    }
  },
  watch: {
    //监视权限列表的变化，实时渲染到页面
    rightList (newValue) {
      this.rightListData = newValue
    }
  },
  components: {
    BreadCrumb
  }
}

</script>

<style lang="less" scoped>
  #right_container{
    .right_card{
      box-shadow: 0 2px 1px rgba(0, 0, 0, .1);
      .right_table{
        margin-top: 20px;
      }
    }
  }
</style>
