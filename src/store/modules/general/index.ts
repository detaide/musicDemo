import { defineStore } from "pinia";
import {general, getLocalStorage, MusicState, setLocalStorage} from './general'
import {api} from '@/api'
import { timeFormatter } from "@/utils/formatter";
import { useMusicStore } from "../MusicDetails";

export const useGeneralStore = defineStore('general-store',{
    state : () : general => getLocalStorage(),
    getters : {
        getMusicState() : MusicState {
            return this.MusicState
        },
        getMusicListLength() : number {
            return this.musicList.id.length 
        }
        
    },
    actions: {
        setMusicState(MusicState : MusicState){
            this.MusicState = MusicState
        },
        
        /**
         * 根据输入的参数进行设置相应的属性
         */
        setMode(mode : string, param : number){
            switch (mode){
                case "player": this.MusicState.playerRadio = param;break;
                case "volume" : this.MusicState.volumeRadio = param;break;
                case "currentTime" : this.MusicState.currentTime = param; break;
                case "length" : this.MusicState.length = param; break;
                case "lyricIndex" : this.MusicState.lyricIndex = param; break;
                default: break;
            }  
        },

        //利用pinia中的id列表获取集合,当传递的时候就获取列表的
        async  getMusicListById(musicList? : number[]){
            const musicIdList = musicList?.length ? musicList : this.musicList.id
            if(musicIdList.length <= 0){
                return []
            }
            let {songs} = await api.getMusicDetail(musicIdList)
            const dataList = songs.map((item : any)=>{
                return {
                    musicName : item.name,
                    musicId : item.id,
                    length : timeFormatter(item.dt >> 10),
                    author : item.ar[0].name,
                    authorId : item.ar[0].id
                }
            })
            return dataList
        },
        //添加歌曲的id
        addMusicListId(id : number | number[]){
            if(Array.isArray(id)){
                id.forEach((item : number)=>{
                    if(this.musicList.id.indexOf(item) === -1)
                        this.musicList.id.push(item)
                })  
            }else{
                if(this.musicList.id.indexOf(id) === -1)
                this.musicList.id.push(id)
            }
        },
        // 移出列表
        removeSongListDetail(idList : number[] | number){
            if(Array.isArray(idList)){
                idList.forEach((item)=>{
                    const index = this.musicList.id.indexOf(item)
                    if(index > -1){
                        this.musicList.id.splice(index,1) 
                    }
                    return
                        
                })
            }
            const index = this.musicList.id.indexOf(idList as number)
            if(index > -1)
                this.musicList.id.splice(index, 1)
        },
        clearIdList(){
            this.musicList.id = [] as any
        },


        getCurrentMusicListIndex(id : number) : number{
            return this.musicList.id.indexOf(id)
        },

        setgeneralStorage(){
            setLocalStorage(this.$state)
        },
        getgeneralStorage(){
            this.$state =  getLocalStorage()
        },

        addIdListWithAtom(id :number | number[], currId? : boolean){
            // 此时添加数据一般需要将play的状态一起改变
            const musicStore = useMusicStore()

             //需要先获取当前的列表项再变值，因为其他动作也会更新表
            this.getgeneralStorage()
            this.addMusicListId(id)
            this.setgeneralStorage()

            musicStore.getMusicInfoStorage()
            //当不改变当前ID的时候就直接返回
            if(!currId) {return}
            //添加进入pinia状态
            if(Array.isArray(id)){
                musicStore.changeMusicId(id[0])
            }else{
                musicStore.changeMusicId(id)
            }
            
            musicStore.setMusicInfoStorage()
        },

        

        
        


    }

})

export * from './general'