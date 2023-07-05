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
<<<<<<< HEAD
    },
    {
        path:'/demo',
        name : 'demo',
        component: () => import("@Components/demo/demo.vue")
    },
    {
        path:'/login',
        name : 'login',
        component: () => import("@Components/server/login.vue")
    },{
        path:'/contents',
        name : 'contents',
        component: () => import("@Components/contents/contents.vue")
    },{
        path:'/user',
        name : 'user',
        component: () => import("@Components/server/userMain.vue"),
        redirect:{name : 'collect'},
        children:[
            {
                path:'collect',
                name:'collect',
                component : () => import("@Components/server/collect.vue")
            },
            {
                path:'follower',
                name:'follower',
                component : () => import("@Components/server/follower.vue")
            },
            {
                path:'followed',
                name:'followed',
                component : () => import("@Components/server/followed.vue")
            }
        ]
=======
>>>>>>> 4d91cab52acf8870f29b2b64b25fc8cb27d1d99b
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