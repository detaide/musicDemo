<template>
    <div class="audioPlayer">
        <audio class="audio" :src="songDetail.src" ref="audio"  >
            <source  type="audio/mpeg"> 
        </audio>
        <div class="audioControl">
            <div class="btn_behavor">  
                <div class="btn-prev m-button">
                    <el-icon :size="btnSize" @click="prevHandler"><DArrowLeft /></el-icon>
                </div>
                <div class="btn-play m-button" v-show="pause" @click="pause = ! pause">
                    <el-icon :size="btnSize"><VideoPlay /></el-icon>
                </div>
                <div class="btn-play m-button" v-show="!pause" @click="pause = ! pause">
                    <el-icon :size="btnSize"><VideoPause /></el-icon>
                </div>
                <div class="btn-next m-button" @click="nextHandler"><el-icon :size="btnSize"><DArrowRight /></el-icon></div>
            </div>
            <div class="processBar">
                <div class="music-info">
                    <div class="player-music-info">
                        <div>{{songDetail.Musicname}} - {{songDetail.author}}</div>
                    </div>
                    <div class="music-time">{{currentTime}} / {{timeFormatter(generalStore.MusicState.length)}}</div>
                </div>
                
                <process initRadio="0" pid="player" @update="processHandler" />
                
            </div>

            <div class="general-behavor">
                <!-- 循环播放，随机播放 -->
                <div class="loop m-button" @click="isRandom = !isRandom">
                    <el-icon :size="btnSize" v-show="!isRandom"><Refresh /></el-icon>
                    <div class="random" v-show="isRandom"><i class="fa fa-random"></i></div>
                </div>
                <div class="like m-button">
                    <i class="fa fa-heart-o"></i>
                </div>
                <div class="down m-button">
                    <el-icon :size="btnSize"><Download /></el-icon>
                </div>
                <div class="chat m-button">
                    <el-icon :size="btnSize"><ChatDotSquare /></el-icon>
                </div>
                <div class="mode-change m-button">

                </div>
                <div class="vulumn">
                    <div class="vulumnIcon">
                        <i class="fa fa-volume-up"></i>
                    </div>
                    <div class="vulumnProcess"><process initRadio="0.5" pid="volume" @update="vulumnHandler"/></div>
                </div>
            </div>
        </div>
    </div>   
</template>

<script setup lang="ts">
import {ref, onMounted, defineProps, getCurrentInstance, computed, watchEffect, watch, reactive} from 'vue'
import process from './process.vue'
import {useGeneralStore, type MusicState, useMusicStore, useEventStore} from '@/store'
import {timeFormatter} from '@/utils/formatter'
import {lyricMatchTime} from '@/utils/useUnits'


const generalStore = useGeneralStore()
const bus =  useEventStore()

const audio = ref(null)
const pause = ref(true)
const btnSize = ref(40)
const isRandom = ref(null)
const musicStore = useMusicStore()
const songDetail = computed(()=>{
    if(musicStore.songDetail.length){
        return {
            author: musicStore.songDetail[0].ar[0].name,
            src : musicStore.src,
            Musicname : musicStore.songDetail[0].name
        }
    }     
    else{
        return {}
    }
})

const currentTime = computed(()=>{
    return timeFormatter(generalStore.MusicState.currentTime)
})

/**拖动获取进度条 */
const processHandler = (radio : number) =>{
    const currTime = (radio * generalStore.MusicState.length).toFixed(2)
    generalStore.setMode('currentTime', currTime)
    audio.value.currentTime = currTime
    generalStore.setMode('lyricIndex',lyricMatchTime(generalStore.MusicState.currentTime, musicStore.time))
}

/**获取音量 */
const vulumnHandler = (radio : number) =>{
    generalStore.setMode('volume', radio)
}

const getRandomIndex = (length : number) =>{
    return Math.floor(Math.random() * length).toString()
}
 
 //下一曲
const nextHandler = async() =>{
    let currId
    // 是否随机
    if(isRandom.value){
        currId = getRandomIndex(Object.keys(generalStore.musicList.id).length )
    }else{
        currId =  generalStore.getCurrentMusicListIndex(musicStore.id) as number
        currId = ++currId <= -1 ?  generalStore.getMusicListLength -1 : currId
        currId = currId > generalStore.getMusicListLength -1 ? 0 : currId
    }
    musicStore.id = generalStore.musicList.id[currId]
    musicStore.getMusicSrc()
    musicStatusToInit()
}

// 上一曲
const prevHandler = async () =>{
    let currId 
     // 是否随机
    if(isRandom.value){
        currId = getRandomIndex(Object.keys(generalStore.musicList.id).length )
    }else{
        currId =  generalStore.getCurrentMusicListIndex(musicStore.id) as number
        currId = --currId <= -1 ?  generalStore.getMusicListLength -1 : currId
        currId = currId > generalStore.getMusicListLength -1 ? 0 : currId
    }
    musicStore.id = generalStore.musicList.id[currId]
    musicStore.getMusicSrc()
    musicStatusToInit()

}
//初始化状态集
const musicStatusToInit = () =>{
    generalStore.setMode('currentTime',0)
    generalStore.setMode('playerRadio',0)   
}


watch(pause,()=>{
    if(pause.value) audio.value.pause()
    else audio.value.play()
})

//监听切换当前页面
const currentMusicChange = computed(()=>{
    return bus.getEventByType('currentMusicChange')
})
watch(currentMusicChange,()=>{
    if(!audio.value.paused){
            audio.value.pause()
        }

})




onMounted(async ()=>{

    audio.value.addEventListener('canplay',()=>{
        setTimeout(() => {
            pause.value = false
            audio.value.play()
        }, 1000);
        
    })

    audio.value.addEventListener('canplaythrough', () => {
        generalStore.setMode('length',audio.value.duration)
    })

    audio.value.addEventListener('ended',async ()=>{
        await nextHandler()
        
    })

    audio.value.addEventListener('error',()=>{
        console.log('error')
    })
    

    // 当播放的时候更新
    audio.value.ontimeupdate = () =>{
        generalStore.setMode('currentTime',audio.value.currentTime)
        generalStore.setMode('player',(audio.value.currentTime /audio.value.duration).toFixed(2))
        generalStore.setMode('lyricIndex',lyricMatchTime(generalStore.MusicState.currentTime, musicStore.time))
    }

    watchEffect(()=>{    
        if(generalStore.MusicState.volumeRadio && generalStore.MusicState.currentTime >= 0 ){
            audio.value.volume = generalStore.MusicState.volumeRadio
            if(generalStore.MusicState.isProcess){
                audio.value.currentTime = generalStore.MusicState.currentTime
                generalStore.MusicState.isProcess = false
            }
        }
            
    })


})

</script>

<style scoped lang="less">
@import url('@CSS/global.less');

.audioPlayer{
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    .audioControl{
        width: 100%;
        height: 100%;
        display: flex;

        .btn_behavor{
            display: flex;
            width: 12%;
            justify-content: space-between; 
        }

        
    }

    .processBar{
        width: 40vw;
        height: 0.5vh;
        width: 50%;
        height: 90%;
        color: @color-progressBar-line;
        // margin-top: 5px;
        padding: 0 4vw;

        .music-info{
            display: flex;
            position: relative;
            margin-bottom: 10px;

            .music-time{
                position: absolute;
                top: 5%;
                right: 2%;
            }
        }


    }

    .general-behavor{
        width: 25%;
        height: 40%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 10px;

        .vulumn{
            display: flex;
            align-items: center;
            margin-left: -20px;
            cursor: pointer;
            
            .vulumnProcess{
                width: 80px;
                margin-left: 10px;
                margin-top: -5px;
            
            }
        }

        .loop{
            &.active{
                color: @color-text-green;
            }
        }
    }
    
    .fa{
        font-size: 4vh;
    }

}

</style>