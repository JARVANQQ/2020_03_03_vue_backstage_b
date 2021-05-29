import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Login from '../pages/Login/Login'
import Admin from '../pages/Admin/Admin'
import Home from '../pages/Home/Home'
import Users from '../pages/Users/Users'
import Roles from '../pages/Roles/Roles'
import Rights from '../pages/Rights/Rights'
import Goods from '../pages/Goods/Goods'
import Params from '../pages/Params/Params'
import Categories from '../pages/Categories/Categories'
import Orders from '../pages/Orders/Orders'
import Reports from '../pages/Reports/Reports'

Vue.use(Router)

const router = new Router({
	//123456789
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/users',
          name: 'users',
          component: Users
        },
        {
          path: '/roles',
          name: 'roles',
          component: Roles
        },
        {
          path: '/rights',
          name: 'rights',
          component: Rights
        },
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },
        {
          path: '/params',
          name: 'params',
          component: Params
        },
        {
          path: '/categories',
          name: 'categories',
          component: Categories
        },
        {
          path: '/orders',
          name: 'orders',
          component: Orders
        },
        {
          path: '/reports',
          name: 'reports',
          component: Reports
        }
      ]
    },
    {
      path: '/',
      redirect: '/login'//重定向到login,输入'/'也会跳转到'/login'2021.5.29
    },

  ]
})
// const paths = ['/home']
router.beforeEach((to, from, next) => {
  // const path = to.path
 /* if (paths.indexOf(path) != -1 && !store.state.userInfo.token) {
    return next('/login')
  }*/
  if (to.path === '/login') {
    return next()
  }else if (!store.state.userInfo.token) {
    return next('/login')
  }
  next()
})
export default router
