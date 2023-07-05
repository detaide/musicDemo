import {defineStore} from 'pinia'
import {type MusicInfo, getLocalStorage, setLocalStorage} from './musicDetail'
import {api} from '@/api'
import {LyricFormatter} from '@/utils/formatter'

export const useMusicStore = defineStore('musicInfo-store',{
    state : () : MusicInfo => getLocalStorage(),
    getters:{

    },
    actions : {
        //解析当前id
        async getMusicSrc(){
            const {data} =  await api.getMusicUrlNew(this.id, this.level)
            this.src = data[0].url
            const lyricResponse =  await api.getLyric(this.id)
            const lyricObj = LyricFormatter(lyricResponse.lrc.lyric)
            //歌曲详细信息
            const {songs} = await api.getMusicDetail(this.id)
            this.songDetail = songs
            if(lyricObj.lyric &&  lyricObj.lyric.length && lyricObj.time.length){
                this.lyric = lyricObj.lyric
                this.time = lyricObj.time
            }else{
                this.lyric = ''
                
            }  
        },

        
        //更换当前音乐ID
        async changeMusicId(id : number){
            this.id = id
            await this.getMusicSrc()
        },
        setMusicInfoStorage(){
            setLocalStorage(this.$state)
        },
        getMusicInfoStorage(){
            this.$state =  getLocalStorage() as any
        }
        
    }
})

export * from './musicDetail'