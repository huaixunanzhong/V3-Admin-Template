import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'

export * from './modules/routes'

const pinia = createPinia()
pinia.use(persistedstate)

export default pinia
