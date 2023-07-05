import {Directive} from 'vue'

//导入emelentUI
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import { App } from 'vue';
import {directives} from '@/directives'


export function setupElement(app : App){   
    app.use(ElementPlus)
    for(const [key, component]  of Object.entries(ElementPlusIconsVue)){
        app.component(key, component)
    }
}


//导入自定义指令
export function setupDirectives(app : App){
    for(let [name, directive] of Object.entries(directives)){
        app.directive(name, directive as any)
    }
}

export * from './EventBus'







