<template>
    <div class="video">
        <input 
            type="range" min='0' max="100" step="0.1" 
            v-model="radio" class="process" 
            @mousemove="handler" 
            ref="currProcess"
            @click="positionHandler"
        >
        
    </div>
</template>

<script setup lang="ts">
import {processDrag} from '@/utils/useUnits/useDrag.ts'
import { onMounted, ref, watch , defineProps} from "vue";
import {eventBus} from '@/utils/general'

const currProcess = ref(null)

const isDrag = ref(null)
const radio = ref(0)
const bufferRadio = ref(10)

interface Emit{
    (e : 'update', radio : number): void
}

const emit = defineEmits<Emit>()


const setWidthProperty = () =>{
    currProcess.value.style.setProperty('--process-width',`${radio.value}%`)
    // currProcess.value.style.setProperty('--buffer-width',`${(props.bufferRadio * 100) || 0}%`)
}

//进度条变化，发送给父组件
const positionHandler = () =>{
    // eventBus.emit('positionHandler',radio.value)
    emit('update', radio.value as number)
}

const props = defineProps({
    playerRadio : Number,
    bufferRadio : Number
})


onMounted(()=>{
    // 初始设置一次
    setWidthProperty()
})

//进度条的值来源于父组件的playerRadio
watch(props,()=>{
    radio.value = props.playerRadio * 100
    setWidthProperty()
})


</script>

<style scoped lang="less">
@import url('@CSS/global.less');

//进度条
.process{
    width: 100%;
    height: 100%;
    appearance: none;
    background-color: @color-text-grey;
    position: relative;
    border-radius: 5px;
    
    &:hover::-webkit-slider-thumb{
        opacity: 1;
    }

    &:hover::before, &:hover::after{
        transition: none;
    }

    // 小圆点
    &::-webkit-slider-thumb{
        appearance: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid black;
        position: relative;
        z-index: 10; 
        transition: opacity  0.2s linear;
        opacity: 0;
    }

    

    //当前进度条
    &::before{
        content: '';
        height: 100%;
        // width: var(10%);
        width: var(--process-width,0%);
        // background: linear-gradient(to right, #33ccff, #ff99cc);
        background-color: @color-text-green;
        left: 0;
        position: absolute;
        z-index: 2;
        border-radius: 5px;
        transition: width 1s ease;
    }

    &::after{
        content: '';
        // width: 40%;
        width: var(--buffer-width, 0%);
        height: 100%;
        background-color: @color-cyan;
        position: absolute;
        left: 0;
        border-radius: 5px;
        transition: width 1s ease;
    }


    

}


</style>