<template>
  <div>
    <BreadCrumb :menuName="menuName" />
    <!--商品分类-->
    <el-card class="goods_cate_card">
      <el-button type="primary" @click="addGoodsCate">添加分类</el-button>
      <tree-table class="tree_table"
        :data="goodsCateData"
        stripe
        border
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        index-text="#"
        show-index
        :show-row-hover="false">
        <template slot="cat_deleted" slot-scope="scope">
          <i class="el-icon-success" style="color: lightgreen" v-if="!scope.row.cat_deleted"></i>
          <i class="el-icon-error" style="color: lightcoral" v-else></i>
        </template>
        <template slot="cat_level" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level===0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <template slot="cat_option" slot-scope="scope">
          <!--修改按钮-->
          <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
          <!--删除按钮-->
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteGoodsCate(scope.row.cat_id)">删除</el-button>
        </template>
      </tree-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="parmas.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="parmas.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <CategoriesDialog :updateGoodsCate="_getGoodsCate"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import CategoriesDialog from '../../components/CategoriesDialog/CategoriesDialog'
export default {
  data () {
    return {
      menuName: {
        oneName: '商品管理',
        twoName: '商品分类'
      },
      goodsCateData: [],
      total: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          prop: 'cat_deleted',
          type: 'template',
          template: 'cat_deleted',
        },
        {
          label: '排序',
          prop: 'cat_level',
          type: 'template',
          template: 'cat_level',
        },
        {
          label: '操作',
          type: 'template',
          template: 'cat_option',
        },
      ],
      parmas: {//获取商品分类数据列表携带的数据
        type: 3,
        pagenum: 1,//当前页码值
        pagesize: 5//每页显示多少条数据
      }
    }
  },
  mounted () {
    this._getGoodsCate()
  },
  computed: {
    ...mapState(['goodsCate', 'goodsCateTotal'])
  },
  methods: {
    // 获取商品分类数据列表
    _getGoodsCate () {
      this.$store.dispatch('getGoodsCate', this.parmas)
    },
    //获取打开添加分类弹窗后的1级和2数据
    _getParentGoodsCate () {
      const type = 2
      this.$store.dispatch('getParentGoodsCate', type)
    },
    //添加分类
    addGoodsCate () {
      this.$store.state.addGoodsCateVisible = true
      this._getParentGoodsCate()
    },
    //每一页显示几条信息
    handleSizeChange(val) {
      this.parmas.pagesize = val
      this._getGoodsCate()
    },
    //当前页
    handleCurrentChange(val) {
      this.parmas.pagenum = val
      this._getGoodsCate()
    },
    //删除分类
    deleteGoodsCate (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        lockScroll: false,
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteGoodsCate',id)
        setTimeout(() => {
          this._getGoodsCate()
        },100)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  watch: {
    goodsCate (newValue) {
      this.goodsCateData = newValue
    },
    goodsCateTotal (newValue) {
      this.total = newValue
    }
  },
  components: {
    BreadCrumb,
    CategoriesDialog
  }
}

</script>

<style lang="less" scoped>
  .goods_cate_card{
    box-shadow: 0 2px 1px rgba(0, 0, 0, .1);
    .tree_table{
      margin-top: 15px;
      margin-bottom: 15px;
    }
  }
</style>
