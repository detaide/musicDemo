<template>
<div class="mainContainer" >
    <div class="mask"></div>
    <div class="bg" :style="{'background-image' : `url('${songDetail.album?songDetail.album.picUrl : ''}')`}"></div>
    <div class="player-mod">
        <div class="left">
            <div class="mod-songlist-toolbar">
                <div class="button m-button"><i class="fa fa-heart-o"></i> 收藏</div>
                <div class="button m-button"><i class="fa fa-plus-square-o"></i> 添加到</div>
                <div class="button m-button"><i class="fa fa-arrow-down"></i> 下载</div>
                <div class="button m-button" @click="deleteHandler"><i class="fa fa-trash-o" ></i> 删除</div>
                <div class="button m-button" @click="clearSongListHandler"><i class="fa fa-refresh"></i> 清空列表</div>
            </div>

            <div class="songlist-overview">
                <player-list/>
            </div>
        </div>

        <div class="song-info">
            <div class="song-info-cover">
                    <div class="song-info-pic" :style="{'background-image' : `url('${songDetail.album?songDetail.album.picUrl : ''}')`}"></div>
            </div>
            <div class="song-detail">  
                <div class="song-info-name">歌曲名：{{songDetail.musicName}}</div>
                <div class="song-info-singer">歌手：{{songDetail.author}}</div>
                <div class="song-info-album">专辑：{{songDetail.album?songDetail.album.name : ''}}</div>
            </div>
            <div class="lyric unselecetable" >
                <div class="lyric-box"  v-lyricDrag v-lyricAutoDrag="music.index" v-if="music.lyric" ref="lyricBox">
                     <div v-for="(item,index) in music.lyric" :key="index" :class="{on: index === generalStore.MusicState.lyricIndex}" >
                        {{item.lyric}}
                    </div>
                </div>
                <div class="lyric-box-none"  v-lyricDrag  v-if="!music.lyric">
                    <div class="lyricItem">暂无歌词</div>
                     
                </div>
            </div>
        </div>   
    </div>
    <audio-component class="audio" />
    
</div>
      
</template>

<script setup lang="ts">
import {api} from '@/api'
import {ref, onMounted, onBeforeMount, computed, reactive, watchEffect, watch, onUnmounted} from 'vue'
import audioComponent from '@Components/players/audioComponent.vue'
import {useGeneralStore, useMusicStore, useEventStore} from '@/store'
import {getLyricList} from '@/utils/formatter'
import playerList from '@/components/players/playerList.vue'
import {eventBus} from '@/utils/general'


const generalStore = useGeneralStore()
const musicStore = useMusicStore()
const bus = useEventStore()
const lyricBox = ref(null)
const music = reactive({
    lyric : null,
    index : null
})

onMounted(async ()=>{
    //初始化数据
    musicStore.getMusicSrc() 
    
    window.onbeforeunload = ()=>{
        //重载的时候就读取本地一次
        generalStore.getgeneralStorage()
        musicStore.getMusicInfoStorage()

         //当关闭的时候保存当前的音乐ID
        musicStore.setMusicInfoStorage()
        generalStore.setgeneralStorage()
        // console.log(generalStore.musicList)
    }
})


music.lyric = computed(()=>{
    return musicStore.lyric
})

music.index = computed(()=>{
    return generalStore.MusicState.lyricIndex
})

//从pinia中获取数据
const songDetail = computed(()=>{
    if(musicStore.songDetail.length){
        return {
            author: musicStore.songDetail[0].ar[0].name,
            musicName : musicStore.songDetail[0].name,
            album : musicStore.songDetail[0].al
        }
    }     
    else{
        return {}
    }
})

const clearSongListHandler = () =>{
    generalStore.clearIdList()
    generalStore.setgeneralStorage()
}

const deleteHandler = ()=>{
    // bus.addEvent('playDeleteSeleceted',{})
    eventBus.emit('playDeleteSeleceted','')
    // musicStore.setMusicInfoStorage()
    generalStore.setgeneralStorage()
}

</script>

<style scoped lang="less">
@import url('@CSS/global.less');

.lyric{
    width: 100%; 
    height: 20%;
    overflow: hidden;
}

.button{
    cursor: pointer;
    padding: 10px 30px;
    border: 1px solid @color-button-grey;
    margin-right: 10px;
}

.button:hover{
    border: 1px solid white;
}

.mainContainer{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    // padding: 7vh;
    color: @color-text-grep-light;
    background-color: @color-cyan;
    z-index: 4;
    
    // background-color: #fff;

    .mask{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .35);
        z-index: 2;
        position: absolute;
    }

    .bg{
        width: 100%;
        height: 100%;
        background-image: url('@Pictures/info-pic.png');
        background-size: cover;    
        z-index: -1;
        position: absolute;
        opacity: .2;
        filter: blur(60px);
    }

    .player-mod{
        display: flex;
        width: 100%;
        height: 70%;
        top: 7%;
        left: 8%;
        z-index: 5;
        position: absolute;

        .left{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: @color-text-grep-light;
            width: 60%;
            height: 100%;
            // border: 1px solid white;
            margin-right: 5vw;

            .mod-songlist-toolbar{
                display: flex;
                padding: 0 1vw;
                width: 100%;
                margin: 30px 0;
            }

            .songlist-overview{
                height: 100%;
                width: 100%;
                overflow: auto;
                // border:1px solid white;
            }
        }

        .song-info{
            // border: 1px solid white;
            padding: 20px;
            width: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .song-detail{
                line-height: 3vh;
                margin-top: 20px;
            }

            .song-info-cover{
                width: 180px;
                height:200px;
                // border: 1px solid white;
                .song-info-pic{
                    background-image: url('@Pictures/info-pic.png');
                    width: 100%;
                    height: 105%;
                    background-size: cover;
                    background-position: center center;

                }
            }

            .lyric{
                text-align: center;
                margin-top: 3vh;
                line-height: 35px;
                font-size: 20px;
                height: 20vh;
                cursor: grab;
                overflow: hidden;
                height: 180px;
                position: relative;
                box-shadow:  0px -15px 10px -5px rgba(0, 0, 0, 0.05);
                display: flex;
                
                .lyric-box{
                    position: absolute;
                    left: 9%;
                    transition: transform 1s ease;
                    // transition: all 1s ease;

                    .on{
                        color: @color-text-green;
                    }
                }

                .lyric-box-none{
                    position: absolute;
                    left: 30%;
                    
                }

                
            }

            
        }
        }

    .audio{
        width: 100%;
        height: 8%;
        position: absolute;
        bottom: 9%;
        left: 7%;
        z-index: 5;
    }

    
}



</style>