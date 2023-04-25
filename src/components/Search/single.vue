<template>
    <div class="singleContainer">
        <ul class="single-toolbar">
            <li class="play-all on "><i class="fa fa-play-circle-o"></i> 播放全部</li>
            <li class="add-to" @click="addListToPlay"><i class="fa  fa-plus-square-o" ></i> 添加到</li>
            <li class="download"><i class="fa fa-download"></i> 下载</li>
            <li class="bulk-btn" @click="bulkHandler"><i class="fa fa-ellipsis-h"></i> 批量操作</li>
        </ul>
        <ul class="single-list-head">
            <li v-for="(item,index) in head" :key="index" class="listItem">
                <input type="checkbox" class="m-checkbox"  v-show="isBulk" v-model="item.check">
                <div class="music-name">{{item.musicName}}</div>
                <div class="singer">{{item.singer}}</div>
                <div class="album">{{item.album}}</div>
                <div class="length">{{item.length}}</div>
            </li>
        </ul>
        <ul class="single-list-data">
            <li v-for="(item,index) in data" 
                :key="index" class="listItem"
                @mouseenter="hoverEnterHandler(index)"
                @mouseleave="hoverLeaveHandler(index)"
            >
                <div class="playBtn m-circle"  @click="addToPlay(index)" v-show="index == currHover"><i class="fa fa-play" ></i></div>
                <input type="checkbox" class="m-checkbox"  v-show="isBulk" v-model="item.check" >
                <div class="index">{{index +1}}</div>
                <div class="music-name" @click="addToPlay(index)">{{item.musicName}}</div>
                <div class="singer">{{item.singer}}</div>
                <div class="album">{{item.album.name}}</div>
                <div class="length">{{item.lengthFormatter}}</div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineProps, watch, watchEffect, computed} from "vue";
import {api} from '@/api'
import {getSearchSingleData} from '@/utils/useUnits'
import {useEventStore} from '@/store'
import { useRouter } from "vue-router"
import {useGeneralStore, type MusicState, useMusicStore} from '@/store'
import {eventBus} from '@/utils/general'


export interface searchList{
    MusicName: string,
    singer? : string,
    album ?: string,
    length ?: string,
}

export interface searchListType{
    search: string,
    searchType : number
}

const props = defineProps({
    search : String
})

const currHover = ref(null)
const isBulk = ref(false)
const event = useEventStore()
const router = useRouter()
const musicStore = useMusicStore()
const generalStore = useGeneralStore()

const head = reactive([
    {
        check : false,
        musicName : '歌曲',
        singer : '歌手',
        length : '时长',
        album : '专辑'
    },
])

const data = ref(null)

const bulkHandler = ()=>{
    //复选框事件
    isBulk.value = !isBulk.value
    head[0].check = isBulk.value
    data.value.forEach(item=>{
        item.check = isBulk.value
    })
}

//全选事件
watch(()=>head[0].check,()=>{
    data.value.forEach(item=>{
        item.check = head[0].check
    })
})

//添加入歌单且播放当前音乐
const addToPlay = (index)=>{
    generalStore.addIdListWithAtom(data.value[index].musicId, true)
    window.open('/play', 'player')

}

const hoverEnterHandler = (index)=>{
    currHover.value = index
}

const hoverLeaveHandler = ()=>{
    currHover.value = -1
}

//批量添加
const addListToPlay = ()=>{
    generalStore.getgeneralStorage()
    musicStore.getMusicInfoStorage()

    data.value.forEach(item =>{
        if(item.check){
            //添加进入pinia状态
            generalStore.addMusicListId(item.musicId)
        }
    })
    head[0].check = false
    isBulk.value = false
    generalStore.setgeneralStorage()
    musicStore.changeMusicId(data.value[0].musicId)
    musicStore.setMusicInfoStorage()
    window.open('/play', 'player')

}



//事件监听
const searchClick = computed(()=>{
    return event.getEventByType('searchClick')
})
watch(searchClick, async ()=>{
    const ret = await getSearchSingleData(props.search)
    data.value = ret 
})

const modChange = computed(()=>{
    return event.getEventByType('modChange')
})
watch(modChange,async ()=>{
    const ret = await getSearchSingleData(props.search)
    data.value = ret 
})

onMounted( async ()=>{
    const ret = await getSearchSingleData(props.search)
    data.value = ret

})


</script>

<style scoped lang="less">
@import url('@CSS/global.less');
.singleContainer{
    // background-color: red;
    .single-toolbar{
        display: flex;
        li{
            padding: 8px 20px;
            border: 1px solid @color-button-grey;
            margin-right: 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: transform 0.4s ease;

            &:hover{
                background-color: @color-text-grey-light;
            }

            &:active{
                transform: scale(0.8);
            }

            .fa{
                color: @color-text-grey;
                font-size: 20px;
            }

            &.on{
                color: white;
                background-color: @color-background-green;

                .fa{
                    color: white;
                }
            }
        }
    }

    .single-list-head{
        margin: 30px 0;
        .listItem{
            display: flex;
            color: @color-text-grey;
            
            .m-checkbox{
                width: 16px;
                height: 16px;
                border: 1px solid @color-button-grey;

                &:hover{
                    border: 1px solid black;
                }

                &:checked::before{
                    position: absolute;
                    content: '';
                    width: 10px;
                    height: 10px;
                    background-color: @color-button-grey;
                }
            }

            .music-name{
                width: 40%;
                margin-left: 25px;
                text-align: center;
            }
            .singer{
               width: 20%;
                text-align: center;
                margin-right: 4vw;
            } 

            .album{
                width: 20%;
            }
        }

    }
    .single-list-data{
            .listItem{
            display: flex;
            margin: 25px 0;
            position: relative;
            .m-checkbox{
                width: 16px;
                height: 16px;
                border: 1px solid @color-button-grey;

                &:hover{
                    border: 1px solid black;
                }

                &:checked::before{
                    position: absolute;
                    content: '';
                    width: 10px;
                    height: 10px;
                    background-color: @color-button-grey;
                }
            }

            .music-name{
                width: 40%;
                text-align: center;
                color: @color-text-green;
            }
            .singer{
               width: 20%;
                text-align: center;
                margin-right: 4vw;
            } 

            .album{
                width: 20%;
            }

            .index{
                color: @color-text-grey;
                margin: 0 5px;
                width: 15px;
            }

            .length{
                color: @color-text-grey;
                cursor: auto;
            }

            *{
                cursor: pointer;
            }

            .playBtn{
                position: absolute;
                left: 550px;
                color: @color-text-grey;
                font-size: 20px;
                border: 1px solid @color-text-grey;
                width: 30px;
                height: 30px;

                .fa{
                    margin-left: 4px;
                }
            }
        }
    }


}
</style>