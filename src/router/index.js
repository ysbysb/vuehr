import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Chat from '@/components/chat/Chat'
import Register from '@/components/Register'
import Edit from '@/pages/editPages3/editPages3'
import EditHome from '@/pages/chartComponent/Home'
import UserInfo from '@/pages/user/userInfo'
import xiazai from '@/pages/editPages3/xiazai'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden: true
    }, {
      path: '/Register',
      name: 'Register',
      component: Register,
      hidden: true
    },{
      path: '/Edit',
      name: 'Edit',
      component: Edit,
      hidden: true,
    },
    {
      path: '/xiazai',
      name: 'xiazai',
      component: xiazai,
      hidden: true,
    },{
      path: '/EditHome',
      name: 'EditHome',
      component: EditHome,
      hidden: true,
    },{
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo,
      hidden: true,
    },{
      path: '/home',
      name: '主页',
      component: Home,
      hidden: true,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/chat',
          name: '消息',
          component: Chat,
          hidden: true,
          meta: {
            keepAlive: false,
            requireAuth: true
          }
        }
      ]
    }
  ]
})
