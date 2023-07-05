<!--
 * @Author: hyman
 * @Date: 2023-06-15 22:11:39
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-16 23:54:44
 * @Description: 请填写简介
-->


<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {useRouter} from 'vue-router'
import { api } from '@/api'
import {useServerStore} from '@/store'
import { watch } from 'vue'

const status = ref(false)

const router = useRouter()
const serverStore = useServerStore()


const jump = (path : string) =>{
    if(path === 'user'){
        router.push({name : path, query : { username : serverStore.username}})
    }else{
        router.push({name : path})
    }
    
    
}

const statusChange = () =>{
    serverStore.setLogin(false,'')
    serverStore.setServerStore()
    router.push({name : 'search'})
}

</script>

<template>
    <div class="container">
        <div class="main" @click="jump('search')">搜索</div>

        <div class="in-status status " v-show="serverStore.isLogin">
            <div class="info m-button" @click="jump('user')">我的信息</div>
            <div class="exit m-button" @click="statusChange">退出</div>
        </div>

        <div class="un-status status " v-show="!serverStore.isLogin">
            <div class="login m-button" @click="jump('login')">登陆</div>
        </div>
    </div>
  
</template>

<style scoped lang="less">
@import url('@CSS/global.less');

.container{
    height: 100%;
    width: 100%;
    // border: 1px solid black;
    padding: 0 40px;
    text-align: center;
    background-color: @color-cyan;
    line-height: 150%;

    .main{
        float: left;
        color: white;
        cursor: pointer;
    }

    .status{
        float: right;
        display: flex;
        gap: 20px;
        color: #fff;
        
        & > div{
            cursor: pointer;
        }
    }

}

</style>