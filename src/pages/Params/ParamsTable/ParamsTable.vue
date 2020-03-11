<template>
    <div>
      <el-table class="table_container" :data="tableData" border stripe>
        <el-table-column type="expand"></el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="attr_name" :label="activeName==='only'?'参数名称':'属性名称'"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
            <!--删除按钮-->
            <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    props: {
      activeName: String
    },
    data () {
      return {
        tableData: []
      }
    },
    computed: {
      ...mapState(['paramsList'])
    },
    watch: {
      paramsList (newValue) {
        this.tableData = newValue
      }
    }
  }

</script>

<style lang="less" scoped>
  .el-table{
    margin-top: 15px;
  }
</style>
