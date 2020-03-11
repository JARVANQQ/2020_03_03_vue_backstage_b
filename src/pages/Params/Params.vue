<template>
    <div id="params_container">
      <BreadCrumb :menuName="menuName"/>
      <el-card class="params_card">
        <el-alert
          title="注意：只允许为第三级分类设置相关参数！"
          type="warning"
          show-icon
          :closable="false">
        </el-alert>
        <div class="params_cascader">
          选择商品分类：
          <el-cascader
            style="width: 280px"
            v-model="selectParamKeys"
            :options="parentGoodsCate"
            :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name', children: 'children', clearable: true }"
            @change="handleChange">
          </el-cascader>
          <el-tabs v-model="activeName" @tab-click="handleClickTab">
            <el-tab-pane label="动态参数" name="many">
              <el-button type="primary" size="mini" :disabled="isDisabled">添加参数</el-button>
              <!--表格组件-->
              <ParamsTable :activeName="activeName"/>
            </el-tab-pane>
            <el-tab-pane label="静态参数" name="only">
              <el-button type="primary" size="mini" :disabled="isDisabled">添加属性</el-button>
              <!--表格组件-->
              <ParamsTable/>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
  import ParamsTable from './ParamsTable/ParamsTable'
  export default {
    data () {
      return {
        menuName: {
          oneName: '商品管理',
          twoName: '参数列表'
        },
        selectParamKeys: [],//与handleChange中的value值一样，故selectParamKeys没用到
        activeName: 'many',
        paramId: ''
      }
    },
    computed: {
      ...mapState(['parentGoodsCate']),
      isDisabled () {
        if (this.selectParamKeys.length===3) {
          return false
        }
        return true
      }
    },
    mounted () {
      this._getParentGoodsCate()
    },
    methods: {
      _getParentGoodsCate () {
        this.$store.dispatch('getParentGoodsCate', {type: 3})//type为3
      },
      _getParamsList () {
        const paramsInfo = {id: this.paramId, sel: this.activeName}
        this.$store.dispatch('getParamsList', paramsInfo)
      },
      //选择商品分类改变时候
      handleChange(value) {
        this.paramId = value[value.length-1]
        this._getParamsList()
      },
      handleClickTab(tab, event) {
        console.log(tab, event);
        this.activeName = tab.paneName
        this._getParamsList()
      }
    },
    components: {
      BreadCrumb,
      ParamsTable
    }
  }

</script>

<style lang="less" scoped>
  #params_container{
    .params_card{
      box-shadow: 0 2px 1px rgba(0, 0, 0, .1);
      .params_cascader{
        margin: 15px 0;
        .el-cascader{
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
