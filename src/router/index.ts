import { createRouter, createWebHistory } from 'vue-router'
import { RoutesNames } from './constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: RoutesNames.OrderBook,
      component: () => import('@/pages/order-book'),
      path: '/'
    },
    {
      name: RoutesNames.Settings,
      component: () => import('@/pages/settings'),
      path: '/settings'
    },
  ],
})

export default router
