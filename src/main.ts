import { createApp } from 'vue'
import App from './App.vue'


import './assets/css/main.css'

import vLazy from "@/directives/imglazy"


createApp(App).directive("lazy", vLazy).mount('#app')

