import { reactive, ref } from "vue"
import {ss} from "@/utils/storage";

const LOCAL_NAME = 'general'

export interface MusicState {
    length?: number,
    currentTime? : number,
    volumeRadio? : number,
    playerRadio? : number,
    isProcess? : boolean,
    lyricIndex? : number
}

export interface musicList {
    id : Number[],
    
}

export interface general {
    MusicState : MusicState,
    musicList : musicList
}

export function defaultParam() : general {
    return {
        MusicState: reactive({
            length : 0,
            volumeRadio: 0,
            playerRadio: 0,
            lyricIndex : 0
        }),
        musicList : reactive({
            id : [33894312, 405998841, 347230, 347233]
        })
    }
}

export function setLocalStorage(general : general){
    ss.set(LOCAL_NAME, general)
}

export function getLocalStorage() : general{
    const general :general = ss.get(LOCAL_NAME)
    return {...defaultParam(), ...general}
}




