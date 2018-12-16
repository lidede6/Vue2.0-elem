import Vue from 'vue'
import Router from 'vue-router'
import app from '../App'
import goods from '@/components/goods'
import seller from '@/components/seller'
import ratings from '@/components/ratings'

Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: app
    },
    {
      path: '/goods',
      name: 'goods',
      component: () => import('@/components/goods')
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import('@/components/seller')
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: () => import('@/components/ratings')
    }
  ]
})
