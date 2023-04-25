import { createPinia } from 'pinia'
import type {App} from 'vue'

export const store = createPinia()

export function setupPinia(app : App){
    app.use(store)
}

export * from './modules'