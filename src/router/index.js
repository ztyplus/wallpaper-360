import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
      name: 'index',
      path: '/',
      component: () => import('@/components/ImgPage'),
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
  })


export default router