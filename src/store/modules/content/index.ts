/*
 * @Author: hyman
 * @Date: 2023-06-15 11:33:52
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-18 13:34:01
 * @Description: 请填写简介
 */

import { defineStore } from "pinia"
import {Content} from './content'
import { getLocalStorage, setLocalStorage } from "./content"
import {api} from '@/api'
import {LyricFormatter, timeStampFormatter} from '@/utils/formatter'

export const useContentStore = defineStore('content-store',{
    state : () : Content => getLocalStorage(),

    actions : {
        async getContent(){
            const {songs } = await api.getMusicDetail(this.curr_MainID)
            console.log(this.curr_MainID)
            this.content = songs[0]
            const content_info = {
                name : songs[0]?.name,
                author : songs[0]?.ar.map((item : any)=>{
                    return item.name
                }) || '未知',
                album : songs[0]?.al,
                publishTime : timeStampFormatter(songs[0]?.publishTime,'yyyy-mm-dd'),
                id : songs[0]?.id
            }
            this.$state.content = content_info

            const lyricResponse =  await api.getLyric(this.curr_MainID)
            const lyricObj = LyricFormatter(lyricResponse.lrc?.lyric)
            
            if(lyricObj && lyricObj?.lyric){
                this.$state.lyric = lyricObj.lyric
            }else{
                this.$state.lyric = ''
            }

        },

        setCurrId(id : number){
            this.$state.curr_MainID = id || -1
        },

        setType(type : "songs" | "album"){
            this.$state.type = type
        },

        setContentStore(){
            setLocalStorage(this.$state)
            
        },

        getContentStore(){
            this.$state = getLocalStorage()
        },

    }
})

export * from './content'