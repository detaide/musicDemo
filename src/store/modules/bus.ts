import { defineStore } from "pinia";

export const useEventStore = defineStore('bus-store',{
    state:() =>({
        events : [] as any
    }),
    actions:{
        addEvent(event : Function){
            this.events.push(event)
        },
        removeEvent(index : number){
            this.events.splice(index, 1)
        },
        clearEvent(){
            this.events = []
        }
    },
    getters:{
        getEventByType : (state) =>(type : string) =>{
            return state.events.filter((event : any)=>event.type === type)
        },
        getAllEvents(state) {
            return state.events
        }
    }
})