import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import { loadSVG } from './icons'
import router from './router'
import pinia from './stores'
import 'element-plus/dist/index.css'

const app = createApp(App)

loadSVG(app)

app.use(ElementPlus)
app.use(router)
app.use(pinia)

app.mount('#app')
