<template>
    <div class="listContainer">
        <div>
            <ul class="head" >
                <li v-for="(item, index) in head" :key="index" class="listItem">
                    <input type="checkbox" class="checkbox" v-model="item.check">
                    <div class="music-name">{{item.musicName}}</div>
                    <div class="singer">{{item.singer}}</div>
                    <div class="lenght">{{item.length}}</div>
                </li>
            </ul>
        </div>

        <div class="list">
            <ul class="dataList">
                <li 
                    v-for="(item, index) in musicList" :key="index" class="listItem"
                    @mouseenter="hoverEnterHandler(index)"
                    @mouseleave="hoverLeaveHandler(index)"
                >
                    <div class="menu-bar" v-show="index == currHover">
                        <div class="playBtn m-circle"  @click="playIndex(index)" ><i class="fa fa-play" ></i></div>
                         <div class="playBtn m-circle"  @click="deleteIndex(index)" ><i class="fa fa-trash-o" ></i></div>
                    </div>
                    <input type="checkbox" class="checkbox" v-model="item.check">
                    <div class="music-name" >{{item.musicName}}</div>
                    <div class="singer">{{item.author}}</div>
                    <div class="lenght">{{item.length}}</div>
                </li>
            </ul>
        </div>
        

        
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed , type ComputedRef, watch, watchEffect, isRef, ref, defineProps} from "vue"
import {useGeneralStore, useMusicStore, useEventStore} from '@/store'
import {eventBus} from '@/utils/general'

const generalStore = useGeneralStore()
const musicStore =  useMusicStore()
const bus = useEventStore()
const isAlbumDetail = ref(false)

const head = reactive([
    {
        check : false,
        musicName : '歌曲',
        singer : '歌手',
        length : '时长'
    },
])


const currHover = ref(null)

let musicList = ref([])

const props = defineProps({
    list : Object
})

//未解决如何计算属性接收异步函数的返回值，与下面watch一起监听播放器列表添加时候重加载
const dataListComputed = computed( async()=>{
    return await generalStore.getMusicListById(props.list)
})
watch(dataListComputed,async ()=>{
    musicList.value = await generalStore.getMusicListById(props.list)
})


//监听全选事件
watch(()=>head[0].check, ()=>{
    musicList.value.forEach(item=>{
        item.check = head[0].check
    })
})


//接收播放器删除按钮事件
eventBus.on('playDeleteSeleceted',()=>{
    musicList.value.forEach((item : any) =>{
        if(item.check){
            generalStore.removeSongListDetail(item.musicId)
        }
    })
    head[0].check = false
})

onMounted(async ()=>{
    musicList.value = await generalStore.getMusicListById(props.list)
})

const hoverEnterHandler = (index)=>{
    currHover.value = index
}

const hoverLeaveHandler = ()=>{
    currHover.value = -1
}

const playIndex = (index)=>{
    const id = musicList.value[index].musicId
    musicStore.changeMusicId(id)
    bus.addEvent('currentMusicChange',{})

    //当被专辑具体信息复用时，上述代码是不执行的，此时需要添加跳转事件,当songList不空的时候就是albumDetail调用了
    if(props.list){  
        generalStore.addIdListWithAtom(id)
        window.open('/play','player')
    }
}

const deleteIndex = (index) =>{
    
    const id = generalStore.musicList.id[index]
    generalStore.removeSongListDetail(id)
    generalStore.setgeneralStorage()
}


</script>

<style scoped lang="less">
@import url('@CSS/global.less');
.listContainer{
    width: 100%;
    height: 100%;
    background-color: transparent!important;
    overflow: hidden;

    .head{
        height: 8%;
        .listItem{
            display: flex;
            margin: 20px 0;
            .checkbox{
                appearance: none; /* 隐藏原生复选框 */
                background-color: hsla(0, 0%, 100%, .2); /* 默认背景颜色 */
                width: 16px; /* 设置宽度和高度 */
                height: 16px;
                cursor: pointer;
                text-align: center;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;

                &:checked::before{
                    position: absolute;
                    content: '';
                    width: 10px;
                    height: 10px;
                    background-color: #fff;
                }

                &:hover{
                    border: 1px solid #fff;
                }
            }

            .music-name{
                width: 55%;
                text-align: center;
            }
            .singer{
               width: 20%;
                text-align: center;
                margin-right: 4vw;
            }  
        }
    }

    .list{
        height: 90%;
        .dataList{
        overflow-y: auto;
        height: 100%;


        .listItem{
            display: flex;
            margin: 20px 0;
            position: relative;

            .checkbox{
                appearance: none; /* 隐藏原生复选框 */
                background-color: hsla(0, 0%, 100%, .2); /* 默认背景颜色 */
                width: 16px; /* 设置宽度和高度 */
                height: 16px;
                cursor: pointer;
                text-align: center;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;

                &:checked::before{
                    position: absolute;
                    content: '';
                    width: 10px;
                    height: 10px;
                    background-color: #fff;
                }

                &:hover{
                    border: 1px solid #fff;
                }
            }

            .music-name{
                width: 55%;
                text-align: center;
                cursor: pointer;
            }
            .singer{
               width: 20%;
                text-align: center;
                margin-right: 4vw;
                cursor: pointer;
            }

            .menu-bar{
                position: absolute;
                // left: 470px;
                left: 50%;
                z-index: 15;
                display: flex;
                .playBtn{
                    width: 30px;
                    height: 30px;
                    border: 1px solid @color-text-grey;
                    cursor: pointer;
                    margin-right: 10px;

                    .fa{  
                        font-size: 20px;

                        &:hover{
                            color:#fff;
                        }
                    }

                    .fa-play{
                        margin-left: 5px;
                    }

                    &:hover{
                        border: 1px solid white;
                    }
                }
            }
            

            
        }

        &::-webkit-scrollbar {
            width: 5px;
            border-radius: 5px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 5px;
        }

        &::-webkit-scrollbar-track {
            margin: 10px 0;
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }
    }
    }
    

}



</style>