import { createApp } from 'vue'
import App from './App.vue'
import {setupRouter} from '@/router'
import {setupElement, setupDirectives} from '@/utils/general'
import {setupPinia} from '@/store'
import 'element-plus/dist/index.css'
import "font-awesome/css/font-awesome.min.css"
import {eventBus}  from '@/utils/general'


async function bootstrap() {
    const app = createApp(App)
    
    await setupRouter(app)

    await setupElement(app)

    await setupDirectives(app)

    setupPinia(app)
    
    app.mount('#app')


}



bootstrap()
