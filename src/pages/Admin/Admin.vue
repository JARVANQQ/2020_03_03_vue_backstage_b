<template>
    <div id="admin_container">
      <el-container class="admin">
        <!--头部-->
        <el-header>
          <div class="header_title">
            <img src="../../assets/images/duola.jpg" alt="logo">
            <span>咻咻后台管理</span>
          </div>
          <el-button type="primary" @click="loginOut">退出</el-button>
        </el-header>
        <!--左侧菜单-->
        <el-container>
          <el-aside :width="isCollapse?'64px':'200px'" class="aside">
            <div class="toggle_nav_menu" :label="isCollapse" @click="toggleNavMenu">|||</div>
            <el-menu
              router
              unique-opened
              :collapse="isCollapse"
              :collapse-transition="false"
              :default-active="$route.path"
              background-color="#001529"
              text-color="#fff"
              active-text-color="#409EFF">
              <!--一级菜单-->
              <el-submenu :index="menus.id+''" v-for="menus in leftMenuPermissions" :key="menus.id">
                <template slot="title">
                  <i :class="icon[menus.id]" style="margin-right: 5px"></i>
                  <span>{{menus.authName}}</span>
                </template>
                <!--二级菜单-->
                <el-menu-item v-if="menus.children" :index="'/'+menu.path" v-for="(menu) in menus.children"
                              :key="menu.id">
                  <i class="el-icon-menu"></i>
                  <span>{{menu.authName}}</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
          <!--内容-->
          <el-container class="main_container">
            <el-main>
              <router-view></router-view>
            </el-main>
            <el-footer class="footer_container">咻咻后台管理系统</el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import '../../assets/fonts/iconfont.css'
export default {
  // @click="handleRoute(menu.id)"
  data () {
    return {
      isCollapse: false,
      icon: {
        '125':'iconfont icon-user',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-lock_fill',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao',
      },
      /*routers: {
        '110':'/users',
        '111':'/roles',
        '112':'/authority',
        '104':'/products',
        '115':'/classifications',
        '121':'/categories',
        '107':'/orders',
        '146':'/data',
      },*/
      activeId: ''
    }
  },
  computed: {
    ...mapState(['leftMenuPermissions'])
  },
  mounted () {
    this.$store.dispatch('getLeftMenuPermissions')
  },
  methods: {
    loginOut () {
      window.sessionStorage.removeItem('userInfo')
      this.$store.state.userInfo = {}
      this.$router.replace('/login')
    },
    toggleNavMenu () {
      this.isCollapse = !this.isCollapse
    },
    /*handleRoute (path) {
      const {routers} = this
      this.$router.push(routers[path])
      this.activeId = path
    }*/
  }
}

</script>

<style lang="less" scoped>
  #admin_container{
    height: 100%;
    .admin{
      height: 100%;
      .el-header{
        /*background-color: #47917d;*/
        background-color: #002141;
        align-items: center;
        padding: 0 15px 0 1px;
        display: flex;
        justify-content: space-between;
        .header_title{
          display: flex;
          align-items: center;
          img{
            width: 61px;
            height: 56px;
          }
          span{
            color: #fff;
            font-size: 20px;
            margin-left: 15px;
          }
        }
      }
      .el-container{
        .aside{
          background-color: #001529;
          overflow: hidden;
          .el-menu{
            border-right: 1px solid #001529;
            .el-submenu{
              .el-menu-item{
                min-width: 0;
                /*padding-left: 50px !important;*/
              }
            }
          }
          .toggle_nav_menu{
            width: 100%;
            height: 24px;
            background-color: #4A5064;
            font-size: 12px;
            color: #fff;
            letter-spacing: 0.2em;
            text-align: center;
            line-height: 24px;
            cursor: pointer;
          }
        }
        .main_container{
          background-color: #EAEDF1;
        }
        .footer_container{
          font-size: 16px;
          text-align: center;
          line-height: 60px;
          color: #c9cfd2;
          background-color: #F0F2F6;
        }
      }
    }
  }
</style>
