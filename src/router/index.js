import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/',
      redirect: '/login'//重定向到login,输入'/'也会跳转到'/login'
    }
  ]
})
const paths = ['/home']
router.beforeEach((to, from, next) => {
  const path = to.path
  if (paths.indexOf(path) != -1 && !store.state.userInfo.token) {
    return next('/login')
  }
  next()
})
export default router
