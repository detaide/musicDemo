<!--
 * @Author: hyman
 * @Date: 2023-06-16 19:40:42
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-16 23:53:17
 * @Description: 请填写简介
-->
<!--
 * @Author: hyman
 * @Date: 2023-06-16 19:13:22
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-16 19:39:09
 * @Description: 请填写简介
-->


<script setup lang="ts">
import status from '@Components/global/status.vue'
import { onMounted, onUpdated, reactive, ref, watch } from 'vue'
import {useRouter, useRoute} from 'vue-router'
import { api } from '@/api'
import { useServerStore } from '@/store'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const serverStore = useServerStore()
const currUser = ref('')

const follows = reactive<any>({
    follower : [],
    followed : [],
    musicList : []
})

const data = ref()
const isFollow = ref(false)

const jump = (path : string) => {
    router.replace({name : path, query : {username : currUser.value}})
}

const addFollow = async  () =>{
    if(currUser.value === serverStore.username){
        ElMessage({
            message:'不能关注自己',
            type:'warning'
        })
        return ;
    }

    const ret = api.addFollowByOne(currUser.value, serverStore.username)
    if(ret){
        isFollow.value = true
    }
}

const deletFollow = async  () =>{
    if(currUser.value === serverStore.username){
        ElMessage({
            message:'不能取关自己',
            type:'warning'
        })
        return ;
    }

    const ret = api.deleteFollowByOne(currUser.value, serverStore.username)
    if(ret){
        isFollow.value = false
        
    }
}

const getCollectList = async () =>{
    await new Promise<void>((resolve) =>{
        follows.musicList.splice(0,follows.musicList.length)
        resolve()
    })

    for( const item of data.value){
        const {songs} = await api.getMusicDetail(item.collectId)
        follows.musicList.push({
            musicName : songs[0]?.name,
            musicId : songs[0]?.id,
            musicImg : songs[0]?.al?.picUrl
        })
    }

}

onMounted(async ()=>{
    currUser.value = (route.query?.username as string ) || serverStore.username || ''
    //粉丝
    follows.followed = await api.getFollowed(currUser.value)
    follows.follower = await api.getFollower(currUser.value)

    console.log(follows)
    const bl = await follows.followed.find((obj:any) => obj.followedUsername === serverStore.username)
    isFollow.value = bl ? true : false 
})

watch(currUser,async ()=>{
    follows.followed = await api.getFollowed(currUser.value)
    follows.follower = await api.getFollower(currUser.value)
    data.value = await api.getCollecet(currUser.value)
    await getCollectList()
})

watch(isFollow,async ()=>{
    follows.followed = await api.getFollowed(currUser.value)
    follows.follower = await api.getFollower(currUser.value)
})

onUpdated(()=>{
    currUser.value = (route.query?.username as string ) || serverStore.username || ''
})


</script>

<template>
    <div class="container">
        <status style="width:100%;height: 4%;"/>
        <div class="user-main">
            <div class="user-img"></div>
            <div class="username"> {{ currUser }}</div>
            <div class="user-follow">
                <div @click="jumpTo">关注 {{ follows.follower.length  }}</div>
                <div class="gap"></div>
                <div>粉丝 {{ follows.followed.length  }}</div>
                <div class="addFollower m-button" v-show="!isFollow" @click="addFollow">添加关注</div>
                <div class="addFollower m-button" v-show="isFollow" @click="deletFollow">取消关注</div>
            </div>

            <div class="options">
                <ul class="module-select">
                    <li class="text on" @click="jump('collect')">我喜欢</li>
                    <li class="text" @click="jump('follower')">关注</li>
                    <li class="text" @click="jump('followed')">粉丝</li>
                </ul>
            </div>
        </div>

        <div class="select-show" v-if="currUser">
            <router-view :follows="follows"/>
        </div>
        

    </div>
    
</template>

<style scoped lang="less">
@import url('@CSS/global.less');

.container{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    .user-main{
        height: 35%;
        width: 100%;
        border: 1px solid black;
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
        background-image: url(https://y.qq.com/ryqq/static/media/bg_profile.bd497b5a.jpg?max_age=2592000);
        background-size: cover;
        color: white;

        .user-img{
            width: 130px;
            height: 130px;
            min-width: 130px;
            min-height: 130px;
            border-radius: 50%;
            border: 2px solid white;
            background-image: url('@Pictures/info-pic.png');
            background-size: cover;
        }

        .user-follow{
            display: flex;
            flex-direction: row;
            gap: 20px;
            font-size: 22px;
            align-items: center;

            .gap{
                width: 2px;
                height: 70%;
                border: 1px solid white;
            }

            .addFollower{
                border: 1px solid @color-text-grey-light;
                padding: 5px 20px;
                font-size: 16px;
                border-radius: 5px;
                cursor: pointer;

                &:hover{
                    color: @color-text-green;
                }
            }
        }

        .options{
            .module-select{
                display: flex;
                flex-direction: row;
                gap: 30px;

                .text{
                    font-size: 20px;
                    cursor: pointer;

                    &:hover{
                        color: @color-text-green;
                    }

                    &.on{
                        color: @color-text-green;
                    }
                }
            }
        }
    }

    .select-show{
        width: 80%;
        // height: 100%;
        margin: 20px auto;
    }


}

</style>