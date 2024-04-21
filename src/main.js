import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import vant from 'vant'
import 'vant/lib/index.css';




createApp(App).use(router).use(vant).use(createPinia()).mount('#app')

