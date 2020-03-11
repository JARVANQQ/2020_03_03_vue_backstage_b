<template>
  <div class="categories_dialog_container" v-if="$store.state.addGoodsCateVisible">
    <el-dialog
      ref="goodCateDialogRef"
      :lock-scroll="false"
      title="添加分类"
      :visible.sync="$store.state.addGoodsCateVisible"
      width="45%"
      @close="goodCateDialogClose">
      <el-form ref="goodCateRef" :model="goodCateForm" label-width="100px" :rules="goodCateRules">
        <el-form-item label="分类名称：" prop="cat_name" >
          <el-input v-model="goodCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <el-cascader
            clearable
            v-model="addGoodsCatekeys"
            :options="parentGoodsCate"
            :props="{expandTrigger: 'hover', checkStrictly: true, value: 'cat_id', label: 'cat_name', children: 'children'}"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="cancelGoodsCate">取 消</el-button>
        <el-button type="primary" @click="determineGoodsCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    props: {
      updateGoodsCate: Function
    },
    data () {
      return {
        goodCateForm: {
          cat_pid: 0,
          cat_name: '',
          cat_level: 0
        },
        goodCateRules: {
          cat_name:[
            { required: true, message: '请输入类名', trigger: 'blur' }
          ]
        },
        addGoodsCatekeys: []
      }
    },
    computed: {
      ...mapState(['goodsCate', 'parentGoodsCate'])
    },
    methods: {

      //取消添加分类
      cancelGoodsCate () {
        this.$store.state.addGoodsCateVisible = false
        this.goodCateDialogClose()
      },
      //确定添加分类
      determineGoodsCate () {
        this.$store.dispatch('getAddGoodCate', this.goodCateForm)
        this.$store.state.addGoodsCateVisible = false
        setTimeout(() => {
          this.updateGoodsCate()
        },100)
      },
      //监视父级分类的id变化
      handleChange (addGoodsCatekeys) {
        if (addGoodsCatekeys.length > 0) {
          this.goodCateForm.cat_level = addGoodsCatekeys.length
          this.goodCateForm.cat_pid = addGoodsCatekeys[addGoodsCatekeys.length-1]
        }else {
          this.goodCateForm.cat_level = 0
          this.goodCateForm.cat_pid = 0
        }
      },
      //当dialog关闭时重置操作
      goodCateDialogClose () {
        this.$refs.goodCateRef.resetFields()
        this.goodCateForm.cat_level = 0
        this.goodCateForm.cat_pid = 0
        this.addGoodsCatekeys = []
      }
    }
  }

</script>

<style lang="less" scoped>
  .el-cascader{
    width: 100%;
    height: 40px;
  }
</style>
