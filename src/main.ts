import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import { loadSVG } from './icons'
import 'element-plus/dist/index.css'

const app = createApp(App)

loadSVG(app)

app.use(ElementPlus)

app.mount('#app')
