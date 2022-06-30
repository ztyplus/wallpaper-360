import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
      name: 'index',
      path: '/',
      component: () => import('@/App.vue'),
      children: [
        {
          title: '壁纸库',
          name: 'images',
          path: '/',
          component: () => import('@/components/ImgPage'),
        },
      ] 
    },
]
  

const router = createRouter({
    history: createWebHistory(),
    routes
  })


export default router