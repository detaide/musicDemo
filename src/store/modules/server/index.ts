import {defineStore} from 'pinia'
import {getLocalStorage, setLocalStorage, type Server} from './server'

export const useServerStore = defineStore('server-store',{
    state : () : Server => getLocalStorage(),

    actions : {
        setServerStore(){
            setLocalStorage(this.$state)
        },

        getServerStore(){
            this.$state = getLocalStorage()
        },

        async setLogin(isLogin  : Boolean, username : string){
            console.log('123')
            this.$state.isLogin = isLogin;
            this.$state.username = username;

            // setServerStore(this.$state)
        },

        

    }
})