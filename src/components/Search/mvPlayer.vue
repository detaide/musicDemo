<template>
<!--  需要传入src，mvid， brList， width -->
    <div class="videoContainer" :style="{'width' : `${props.width}px`}" ref="container">
        <video :width="props.width" preload="metadata" @click="isPause  = !isPause" ref="video" class="videoPlayer">
            <source :src="src" v-if="src"> 
        </video>
        <div class="player-bar">
            <div class="top">
                <video-process class="processes"  :playerRadio="playerRadio" :bufferRadio="bufferRadio" @update="playerRadioHandler"/>
            </div>
            <div class="bottom-bar">
                <div class="play" @click="isPause  = !isPause">
                    <i class="fa fa-play-circle-o" v-show="isPause"></i>
                    <i class="fa fa-pause-circle-o" v-show="!isPause"></i>
                </div>
                <div class="processTime">
                    {{timeFormatter(processTime)}} / {{timeFormatter(duration)}}
                </div>
                <div class="bottom-right-bar">
                    <div class="volume" >
                        <i class="fa fa-volume-up" @click="volumeShow = !volumeShow"></i>
                        <video-process class="volumeProcess" :playerRadio="volume" @update="volumeRadioHandler" v-show="volumeShow"/>
                    </div>
                    <div class="resolution">
                        <div class="currbr" @click="resolutionShow = !resolutionShow">{{brsName[currbrs]}}</div> 
                        <ul class="resolution-list" v-show="resolutionShow">
                            <li v-for="(item,index) in brs" :key="index" @click="resolutionChange(index)">
                                {{brsName[item]}}{{item}}P
                            </li>

                        </ul>
                    </div>
                    <div class="fullscreen" @click="fullScreenHandler">
                        <i class="fa fa-arrows-alt"></i>
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>

</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch, computed, reactive } from "vue";
import videoProcess from "@Components/Search/videoProcess.vue"
import {eventBus} from '@/utils/general'
import { timeFormatter } from "@/utils/formatter";
import {api} from '@/api'


const props =  defineProps({
    width : Number,
    id: String
})



const brsName = {
    240 : '清晰',
    360 : '标清',
    480 : '高清',
    720 : '超清',
    1080 : '超高清'
}

const currbrs = ref(1080)
const resolutionShow = ref(false)
const volumeShow = ref(false)
const width = ref(null)
const isPause = ref(true)
const video = ref(null)
const container = ref(null)
const playerRadio = ref(0)
const bufferRadio = ref(0)
const processTime =ref(0)
const duration = ref(0)
const src = ref(null)
const volume = ref(null)
const brs = ref(null)
let videoHeight


watch(isPause,()=>{
    if(!isPause.value){
        video.value.play()
    }else{
        video.value.pause()
    }
})

const getRadio = (currTime, length) : number=>{
    return parseFloat((+currTime / length).toFixed(2))
}

const radioToFloat =(radio:number,length:number) =>{
    return parseFloat((radio * length / 100).toFixed(2)) 
}

//重新获取mv数据
const getnweMvData = async ()=>{
    const {data} = await api.getMvData(props.id,currbrs.value)
    src.value = data.url
}

//接收动态条比例
const playerRadioHandler = (radio : number) =>{
    video.value.currentTime = radioToFloat(radio, video.value.duration)
}

//音量变化，改变volume是为了让进度条也变
const volumeRadioHandler = (radio : number) =>{
    volume.value = radio /100
    video.value.volume  =volume.value
}


const resolutionChange = (index) =>{
    resolutionShow.value = false
    currbrs.value = brs.value[index] as number
    //更新数据源
    getnweMvData()
    video.value.load()
    // isPause.value = false
    setTimeout(() => {
        isPause.value = false
    }, 1000);
}


const fullScreenHandler = () =>{
    video.value.requestFullscreen()   
}

const getDataByMvID = async () =>{
    
    const {data} = await api.getMVDetail(props.id)
    
    brs.value = data.brs.map((item:any) =>{
        return item.br
    })
    const urlResponse = await api.getMvData(props.id,1080)
    src.value = urlResponse.data.url
}

onMounted(async ()=>{
    await getDataByMvID()
    
    videoHeight = video.value.offsetHeight
    container.value.style.setProperty('height', `${videoHeight}px`)
    width.value = props.width
    
    video.value.addEventListener('canplay',()=>{
        duration.value = video.value.duration
    })

    video.value.ontimeupdate = () =>{
        playerRadio.value = getRadio(video.value.currentTime, video.value.duration)
        processTime.value = video.value.currentTime
    }
    
})

</script>

<style scoped lang="less">
@import url('@CSS/global.less');

.videoContainer{
    position: relative;
    height: var(--container-height, 0%);

    &:hover .player-bar .top .processes{
        opacity: 1;
    }

    &:hover .player-bar {
        opacity: 1;
    }

    // overflow: hidden;
    .videoPlayer{
        position: absolute;
        left: 0;
        top: 0;
        cursor: pointer;
    }

    .player-bar{
        width: 100%;
        height: 10%;
        position: absolute;
        left: 1%;
        bottom: -10%;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        
        .top{
            position: relative;
            .processes{
                height: 5px;
                width: 98%;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
                top: 0;
                left: 0;
                
            }
        }

        .bottom-bar{
            color: #fff;
            // position: absolute;
            // top: 20px;
            // left: 10px;
            position: relative;
            margin: 20px 10px;
            display: flex;
            display: flex;
            align-items: center;


            .play{
                font-size: 30px;
                cursor: pointer;
            }

            .processTime{
                margin-left: 20px;
                
            }

            .bottom-right-bar{
                display: flex;
                align-items: center;
                position: absolute;
                right: 3%;
                .volume{
                    font-size: 30px;
                    cursor: pointer;
                    display: flex;
                    position: relative;


                    &:hover{
                        color: @color-text-green;
                    }

                    .volumeProcess{
                        height: 3px;
                        position: absolute;
                        transform: rotate(-90deg);
                        width: 100px;
                        left: -60px;
                        top: -80px;
                    }
                }
                .resolution{
                    font-size: 20px;
                    margin-left: 20px;
                    position: relative;

                    .currbr{
                        cursor: pointer;
                        border: 2px solid white;
                        padding: 2px 10px;
                        border-radius: 15px;
                        width: 100px;
                        text-align: center;

                        &:hover{
                            color: @color-text-green;
                        }
                    }
                    .resolution-list{
                        position: absolute;
                        top: -120px;
                        text-align: center;
                        border: 1px solid @color-text-grey;
                        padding: 2px 20px;
                        left: -20px;
                        font-size: 17px;
                        white-space: nowrap;

                        li:hover{
                            color: @color-text-green;
                            cursor: pointer;
                        }
                    }

                    
                }

                .fullscreen{
                    font-size: 30px;
                    margin-left: 20px;
                    cursor: pointer;

                    &:hover{
                         color: @color-text-green;
                    }
                }
            }

            
        }
    }

}



</style>