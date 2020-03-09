<template>
  <div id="assign_rights_container" v-if="$store.state.assignRightsVisible">
    <el-dialog
      :lock-scroll="false"
      title="分配权限"
      :visible.sync="$store.state.assignRightsVisible"
      width="45%">
      <el-tree
        ref="roleRightTree"
        :data="rightTree"
        :props="defaultProps"
        node-key="id"
        :default-checked-keys="defaultCheckedRightArr"
        show-checkbox
        default-expand-all>
      </el-tree>
      <span slot="footer">
        <el-button @click="cancelAssignRights">取 消</el-button>
        <el-button type="primary" @click="determineAssignRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    props: {
      _getRolesList: Function,
      defaultCheckedRightArr: Array,//默认勾选的id数组
      roleId: Number//需要授权的角色id
    },
    data () {
      return {
        defaultProps: {
          children: 'children',
          label: 'authName'
        }
      }
    },
    mounted () {

    },
    methods: {
      //取消权限分配
      cancelAssignRights () {
        this.$store.state.assignRightsVisible = false
      },
      //确认权限分配
      determineAssignRights () {
        //获取版选中节点
        const halfCheckedKeys = this.$refs.roleRightTree.getHalfCheckedKeys()
        //获取全选中节点
        const checkedKeys = this.$refs.roleRightTree.getCheckedKeys()
        const ridsArr = [...halfCheckedKeys, ...checkedKeys]
        const ridsString = ridsArr.join(',')
        const needRoleRightKeys = {roleId: this.roleId, rids: ridsString}
        this.$store.state.assignRightsVisible = false
        //发送请求分配新的权限
        this.$store.dispatch('roleRights', needRoleRightKeys)
      }
    },
    computed: {
      ...mapState(['rightTree', 'assignRoleRightsStatus'])
    },
    watch: {
      //assignRoleRightsStatus的值发生变化，则调用getRoleList重新加载页面
      assignRoleRightsStatus (newVlue) {
        if (newVlue === 2) {
          this._getRolesList()
          //刷新完界面后重置为0
          this.$store.state.assignRoleRightsStatus = 0
        }
      }
    }
  }

</script>

<style lang="less" scoped>

</style>
