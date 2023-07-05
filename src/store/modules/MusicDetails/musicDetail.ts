import { reactive ,ref, type Ref} from "vue"
import {ss} from "@/utils/storage";
const LOCAL_NAME = 'musicInfo'

export interface MusicInfo{
    id: Ref<number> | number,
    src? : string,
    author? : string,
    album? : string,
    lyric : string,
    time? : number[],
    name? : string,
    songDetail? : any,
    level : 'standard' | 'higher' | 'exhigh' | 'loseless' | 'hires'
}


export function defaultMusicInfo() : MusicInfo{
     return {
        id : ref(33894312),
        src : '',
        author : '',
        album : '',
        level : 'exhigh',
        lyric:'',
        songDetail :reactive({})
     }
}

export function setLocalStorage(MusicInfo : MusicInfo){
    ss.set(LOCAL_NAME, MusicInfo)
}

export function getLocalStorage() : MusicInfo{
    const musicInfo : MusicInfo = ss.get(LOCAL_NAME)
    return {...defaultMusicInfo(),...musicInfo}
}
