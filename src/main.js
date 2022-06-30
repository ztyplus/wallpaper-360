import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from '@/utils/element'
import 'element-plus/dist/index.css'
import router from '@/router'
import vue3PhotoPreview from 'vue3-photo-preview';
import 'vue3-photo-preview/dist/index.css';


const app = createApp(App)
ElementPlus(app)

app.use(router).use(vue3PhotoPreview).mount('#app')




