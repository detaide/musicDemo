<template>
    <div class="searchContainer">
        <!-- <div class="mod-user"></div> -->
        <status class="mod-user"/>
        <div class="mod-search">
            <input type="text" class="search" v-model="search">
            <div class="searchBtn m-button" @click="searchHandler"><i class="fa fa-search"></i></div>
        </div>
        <div class="search-module">
            <ul class="module-selected">
                <li class="single on" @click="barHandler(1, 'single')">单曲</li>
                <li class="album" @click="barHandler(10, 'album')">专辑</li>
                <li class="mv" @click="barHandler(1004, 'mv')">MV</li>
                <li class="playlist" @click="barHandler(1000, 'playlist')">歌单</li>
                <li class="user" @click="barHandler(100, 'singer')">歌手</li>
            </ul>

            <div class="selected-show">
                <router-view :search="search"></router-view>
            </div>
        </div>

        <div class="buttonIcon"></div>
        
        
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {api} from '@/api'
import {useEventStore} from '@/store'
import { useRouter } from "vue-router";
import status  from '@Components/global/status.vue'

const router = useRouter()
const search = ref('三体')
const searchType = ref(1)
const event = useEventStore()

const searchHandler = async ()=>{
    searchType.value = 1
    router.replace('single')
    event.addEvent('searchClick', {})
}

const barHandler = (type, routerName)=>{
    searchType.value = type
    event.addEvent('modChange',{})
    router.replace({name: routerName})
}


onMounted(()=>{
    searchType.value = 1
})

</script>

<style scoped lang="less">
@import url('@CSS/global.less');

.searchContainer{
    width: 100%;
    height: 100%;

    .mod-user{
        width: 100%;
        height: 4%;
        // border: 1p solid black;
    }

    .mod-search{
        width: 100%;
        height: 250px;
        background-image: url('@Pictures/searchbg2.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        display: flex;
        align-items: center;
        justify-content: center;

        .search{
            height: 8vh;
            padding: 2vw 1vw;
            width: 35vw;
            border: none;
            letter-spacing: 1px;
            font-size: 18px;
            border-radius: 10px 0 0 10px;
        }

        .searchBtn{
            padding: 1vw;
            height: 8vh;
            text-align: center;
            background-color: #fff;
            border-radius: 0 10px 10px 0;
            font-size: 20px;
            cursor: pointer;
        }
    }

    .search-module{
        margin-left: 10vw;
        .module-selected{
            display: flex;
            
            li{
                padding:3vh;
                margin-right: 2vw;
                cursor: pointer;

                &:hover{
                    color: green;
                }

                &.on{
                    color: green;
                }
            }

            
        }
        
    }

    .buttonIcon{
        height: 30%;
    }
}

</style>