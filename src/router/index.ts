import {RouteRecordRaw} from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import {App} from 'vue'

const routes : RouteRecordRaw[] = [
    {
        path:'/play',
        name: 'play',
        component:()=>import('@Components/players/player.vue'),
    },
    {
        path:'/albumDetail',
        name : 'albumDetail',
        component : () => import('@Components/Search/albumDetail.vue'),
    },
    {
        path:'/mvPlayer',
        name : 'mvPlayer',
        component : () => import('@Components/Search/mvPlayer.vue'),
    },{
        path:"/search",
        name : 'search',
        component: () => import("@Components/Search/search.vue"),
        redirect:{name : 'single'},
        children: [
            {
                path : 'single',
                name:'single',
                component: ()=>import('@Components/Search/single.vue')
            },
            {
                path : 'album',
                name:'album',
                component: ()=>import('@Components/Search/album.vue')
            },
            {
                path : 'mv',
                name:'mv',
                component: ()=>import('@Components/Search/mv.vue')
            },
            {
                path : 'playlist',
                name:'playlist',
                component: ()=>import('@Components/Search/playlist.vue')
            },
            {
                path : 'singer',
                name:'singer',
                component: ()=>import('@Components/Search/singer.vue')
            }
        ]
    },
    {
        path:'/mv',
        name : 'mvVideo',
        component : () => import("@Components/Search/mvVideo.vue")
    }
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})

export async function setupRouter(app:App) {
    app.use(router)
    await router.isReady()
}