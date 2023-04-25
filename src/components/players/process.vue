<template>
    <div class="barProcess button" ref="processParent" @click="clickHandler">
        <div class="processOn" ref="process"></div>
        <!-- <div class="process-dot button" v-processDrag="{processObject}" ref="processDot"></div> -->
        <div class="process-dot m-button" @mousemove="dragHandler()"  ref="processDot"></div>
    </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, defineProps, watch, watchEffect, isReactive} from 'vue'
import {processDrag} from '@/utils/useUnits/useDrag.ts'
import {useGeneralStore,type MusicState, useMusicStore} from '@/store'
import {lyricMatchTime} from '@/utils/useUnits'

const generalStore = useGeneralStore()
const musicStore = useMusicStore()

interface Emit {
  (e: 'update', radio:number): void
}

interface Iprocess{
    process : any,
    processParent: any
}

const process = ref(null)
const processDot = ref(null)
const processParent = ref(null)
let isDrag = false 

const emit = defineEmits<Emit>()

const processObject : Iprocess = {
    process ,
    processParent
}

const props = defineProps({
    initRadio : String,
    pid : String
})

//进度条拖动
const dragHandler =  () =>{
    const radio = processDrag(processDot.value, process.value, processParent.value) as number
    //仅当点击的时候行为
    if(isDrag && radio >= 0){
        emit('update',radio as number)
    }
}

// 进度条点击更新radio
const clickHandler = (e)=>{
    if(!e.target.classList.contains('process-dot')){
        const leftOffset = (+e.clientX -  (+e.target.getBoundingClientRect().left)).toFixed(2)
        const radio  = Number(((+leftOffset) / processParent.value.offsetWidth).toFixed(2))
        //当前根据props.pid选择声音还是进度条
        generalStore.setMode(props.pid, radio)
        if(props.pid === 'player'){
            generalStore.setMode('currentTime', Number((radio * generalStore.MusicState.length).toFixed(2)))
            generalStore.MusicState.isProcess = true
            generalStore.setMode('lyricIndex',lyricMatchTime(generalStore.MusicState.currentTime, musicStore.time))
        }else{
            generalStore.setMode('volume', (radio))
        }
    }
    
}


onMounted(() => {
    processDrag(processDot.value, process.value, processParent.value, props.initRadio)
    // 处理进度条
    if(props.pid === 'player'){
        generalStore.setMode('player', props.initRadio)
        watchEffect(()=>{
            updateProcess(generalStore.MusicState.playerRadio)
        })
    }
    //处理音量
    else{     
        watchEffect(()=>{
            updateProcess(generalStore.MusicState.volumeRadio)
        })
        generalStore.setMode('volume', props.initRadio)
    }

    processDot.value.addEventListener('mousedown',()=>{
        isDrag = true
    })

    processDot.value.addEventListener('mouseup',()=>{
        isDrag = false
        processDot.value.onmousemove = null
    })

})  

// 更新进度条
const updateProcess = (radio : number) =>{
    const MaxWidth = processParent.value.offsetWidth
    const currLeft = radio * MaxWidth
    process.value.style.width = `${currLeft}px`
    processDot.value.style.left = `${currLeft}px`
}

</script>

<style lang="less" scoped>
@import url('@CSS/global.less');
.barProcess{
    height: 0.3vh;
    width: 100%;
    background-color: @color-progressBar-line;
    margin-top: 5px;
    position: relative;
    cursor: pointer;

    .process-dot{
        width: 7px;
        height: 7px;
        background-color: #fff;
        border-radius: 50%;
        z-index: 10;
        position: absolute;
        transform: translate(-50%,-40%);
        // transition: left 3s linear;
    }

    .processOn{
        background-color: #fff;
        height: 0.3vh;
        display: block;
        position: absolute;
        // transition: left 3s linear;
    }
}
</style>