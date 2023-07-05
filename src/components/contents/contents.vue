<!--
 * @Author: hyman
 * @Date: 2023-06-14 21:59:17
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-18 13:30:00
 * @Description: 请填写简介
-->


<script setup lang="ts">
import singleContent from './singleContent.vue'
import {api} from '@/api'
import { onMounted, ref, computed } from 'vue'
import { LyricFormatter } from "@/utils/formatter";
import { useContentStore, type contentInfo, useGeneralStore, useServerStore } from "@/store";
import  status from '@Components/global/status.vue'
import { ElMessage } from 'element-plus'
import {eventBus} from '@/utils/general'

export interface SubmitReply{
    username : string,
    content : string,
    fatherId : number,
    type : 'songs' | 'album',
    musicId : number
}


const content = ref<contentInfo>()
const lyric = ref<Object>()

const contentStore = useContentStore()
const generalStore = useGeneralStore()
const serverStore = useServerStore()

const text = ref('')
const isCollect = ref(false)


const author = computed(()=>{
    if(!content.value) return '未知'
    return  content?.value?.author?.join(' / ')
})

const img_url = ref<string>('https://qpic.y.qq.com/music_cover/HbLJMw6wKWEWoQyBy4IhB7XC12OMOsh1O0DbUungvp6lHDE0p898dA/600?n=1')
const isUrl = /^https?:\/\//.test(img_url.value)

const addToPlay = () =>{
    generalStore.addIdListWithAtom(contentStore.curr_MainID, true)
    window.open('/play', 'player')
}

const replySubmit = () =>{

    if(!serverStore.isLogin){
        ElMessage({
            message : "请先登陆",
            type : 'warning'
        })
        return ;
    }

    const data : SubmitReply = {
        username : serverStore?.username || 'unknown',
        musicId : contentStore.curr_MainID,
        content : text.value,
        type : contentStore.type,
        fatherId : 0
    }


    const ret = api.addContent(data)

    if(ret){
        ElMessage({
            message:"回复成功",
            type : "success"
        })

        text.value = ''

        eventBus.emit('replySubmit', '')
    }else{
        ElMessage({
            message:"回复失败",
            type : "warning"
        })
    }

    
    // console.log(contentStore)
}

const addCollect = async () =>{
    if(!serverStore.isLogin){
        return
    }

    const ret = await api.insertCollect({
        collectId : contentStore.curr_MainID,
        username : serverStore.username,
        type : contentStore.type
    })

    isCollect.value = ret

}

const deleteCollect = async () => {
    if(!serverStore.isLogin){
        return
    }

    const ret = await api.deleteCollectByOne(serverStore.username, contentStore.curr_MainID)
    isCollect.value = !ret
}

onMounted(async ()=>{
    
    console.log(contentStore.curr_MainID)
    await contentStore.getContent()
    content.value = contentStore.content
    lyric.value = contentStore.lyric
    img_url.value = content?.value.album?.picUrl || img_url.value
    
    if(serverStore.isLogin){
        const ret = await api.getCollecet(serverStore?.username)
        const bl = ret.find((obj:any) => obj.collectId === contentStore.curr_MainID)
        isCollect.value = bl ?  true : false
    }
        
    console.log(isCollect.value)
    

})


</script>

<template v-if="data">
    <status style="height:4%;width: 100%;"/>
    <div class="music-contents">
        <div class="head">
            <div class="head-left" 
                :style="{'background-image' : `url('${img_url}')`}"
            ></div>
            <div class="head-right">
                <ul class="head-right-ul">
                    <li style="font-size:4vh;">{{ content?.name }}</li>
                    <li> <i class="fa fa-user-o"></i> {{ author }}</li>
                    <li>
                        <div>专辑：{{ content?.album.name }}</div>
                        <div>语种：国语</div>
                    </li>
                    <li>发行时间：{{ content?.publishTime }}</li>
                    

                </ul>
                <div class="options">
                    <ul class="menu-bar">
                        <li class="m-button bar on" @click="addToPlay"><i class="fa fa-play" ></i> 播放</li>
                        <li class="m-button bar" @click="addCollect" v-show="!isCollect"><i class="fa fa-heart-o" ></i> 收藏</li>
                        <li class="m-button bar" @click="deleteCollect" v-show="isCollect"><i class="fa fa-heart-o" ></i> 已收藏</li>
                        <li class="m-button bar"><i class="fa fa-commenting-o"></i> 评论</li>
                        <li class="m-button bar"><i class="fa fa-ellipsis-h"></i> 更多</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="lyric">
            <span style="font-size:30px;">歌词</span>
            <template v-if="lyric">
                <ul v-for="(item,index) in lyric" :key="index">
                    <li>{{ item?.lyric }}</li>
                </ul>
            </template>
           
        </div>
        <div class="content">
        <div style="font-size:30px;font-weight: bold;margin: 20px;">评论</div>
            <div class="content-textarea">
                    <el-input
                        v-model="text"
                        maxlength="100"
                        placeholder="Please input"
                        show-word-limit
                        type="textarea"
                    />
                    <div class="content-textarea-button">
                        <button class="m-button bar on" @click="replySubmit">回复</button>
                        <button class="m-button bar " @click="text = ''">取消</button>
                    </div>
                </div>
            <div class="box">
                <singleContent/>
            </div>
            
        </div>
    </div>
</template>

<style scoped lang="less">
@import url('@CSS/global.less');


.music-contents{
    // margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    padding-top: 3vh;
    overflow-x: hidden;
    margin: 0 auto;

    .head{
        width: 70%;
        height: 35%;
        // border: 1px solid black;
        min-height: 35%;
        display: flex;
        gap: 20px;
        

        .head-left{
            height: 250px;
            width: 250px;
            // border: 1px solid black;
            margin: 0 20px;
            margin-right: 50px;
            // background-image: url('https://p1.music.126.net/EIJc2Wt5AEsIHCFcVxm6pg==/109951165033567317.jpg');
            background-size: cover;
        }

        .head-right{
            display: flex;
            flex-direction: column;
            gap: 20px;
            .head-right-ul{
                margin-top: 20px;
                gap: 10px;
                display: flex;
                flex-direction: column;
                text-align: center;

                & > li{
                    display: flex;
                    flex-direction: row;
                    gap: 20px;

                }
            }

            .options{
                .menu-bar{
                    display: flex;
                    justify-content: space-between;
                    width: 380px;
                    .bar{
                        border: 1px solid @color-text-grey;
                        padding: 10px 15px;
                        border-radius: 7px;

                        &.on{
                            color: #fff;
                            background-color: @color-text-green;
                        }

                        &:hover{
                            // border-color: #fff;
                            // color: #fff;
                            color: @color-text-grey;
                        }
                    }
                }
            }
        }

        
    }

    .lyric{
        width: 70%;
        // height: 30%;
        // border: 1px solid black;
        // min-height: 30%;
        padding: 10px 20px;
        gap: 10px;
        display: flex;
        flex-direction: column;
    }

    .content{
        width: 70%;
        // border: 1px solid black;
        .content-textarea{
            width: 70%;
            margin-left: 2%;
            

            .content-textarea-button{
                margin-top: 10px;
                float: right;
                .bar{
                        border: 1px solid @color-text-grey;
                        padding: 8px 15px;
                        border-radius: 7px;
                        margin-left: 10px;

                        &.on{
                            color: #fff;
                            background-color: @color-text-green;
                        }

                        &:hover{
                            border-color: #fff;
                            // color: #fff;
                            color: @color-text-grey;
                        }
                    }
            }
        }
    }
}


</style>