<template>
    <div class="albumDetailContaienr">
        <div class="user"></div>
        <div class="albumInfo">
            <div class="img" :style="{'background-image' : `url('${data?.picUrl? data.picUrl : ''}')`}"></div>
            <div class="info">
                <div class="title">{{data?.albumName}}</div>
                <div class="singer">
                    <i class="fa fa-user-o"></i>
                    {{data?.singer}}
                </div>
                <ul class="data-info">
                    <li class="data-info-item">流派：PoP流派</li>
                    <li class="data-info-item">发行时间：{{data?.publishTime}}</li>
                    <li class="data-info-item">公司：{{data?.company ? data.company : '--'}}</li>
                    <li class="data-info-item">类型：{{data?.subType}}</li>
                </ul>

                <ul class="menu-bar">
                    <li class="m-button bar on" @click="playAlbumAll"><i class="fa fa-play"></i> 播放全部</li>
                    <li class="m-button bar"><i class="fa fa-heart-o"></i> 收藏</li>
                    <li class="m-button bar"><i class="fa fa-commenting-o"></i> 评论</li>
                    <li class="m-button bar"><i class="fa fa-ellipsis-h"></i> 更多</li>
                </ul>

            </div>
        </div>
        <playerList class="palyerList" :list="route.query.songsList"/>
        <div class="bottom"></div>
    </div>
    
</template>

<script setup lang="ts">
import playerList from '@Components/players/playerList.vue'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from "vue-router";
import {getAlbumById} from '@/utils/useUnits'
import {useGeneralStore, type MusicState, useMusicStore} from '@/store'
const route = useRoute()
const generalStore = useGeneralStore()
const musicStore = useMusicStore()

const data = ref(null)

onMounted(async ()=>{
    data.value = await getAlbumById(route.query.albumId)
})

const playAlbumAll = () =>{
    generalStore.addIdListWithAtom(route.query.songsList, true)
    window.open('/play', 'player')
}

</script>

<style scoped lang="less">
@import url('@CSS/global.less');

.albumDetailContaienr{
    color: @color-text-grey;
    background-color: @color-cyan;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .user{
        height: 10%;
    }

    .albumInfo{
        margin: 0 0 2vh 15vw ;
        display: flex;
        position: relative;
        .img{
            width: 200px;
            height: 200px;
            // border: 1px solid white; 
            background-size: cover;
        }

        .info{
            display: flex;
            flex-direction: column;
            margin-left: 6vw;
            

            .title{
                font-size: 40px;
            }

            .singer{
                margin-top: 10px;
            }

            .data-info{
                width: 520px;
                height: 80px;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                margin: 10px 0;

                .data-info-item{
                    width: 200px;

                }
            }

            .menu-bar{
                display: flex;
                justify-content: space-between;
                width: 400px;

                .bar{
                    border: 1px solid @color-text-grey;
                    padding: 10px 15px;
                    border-radius: 7px;

                    &.on{
                        color: #fff;
                        background-color: @color-text-green;
                    }

                    &:hover{
                        border-color: #fff;
                        color: #fff;
                    }
                }
            }

            .data-description{
                position: absolute;
                right: 150px;
                bottom: 0px;
                width: 300px;
                white-space: wrap;
            }
        }
    }

    .palyerList{
        width: 70%;
        margin: auto;
    }

    .bottom{
        height: 20%;
    }
}

</style>