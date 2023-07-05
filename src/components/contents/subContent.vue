<!--
 * @Author: hyman
 * @Date: 2023-06-14 23:59:37
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-17 00:00:47
 * @Description: 请填写简介
-->
<!--
 * @Author: hyman
 * @Date: 2023-06-14 22:45:55
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-14 23:52:39
 * @Description: 请填写简介
-->


<script setup lang="ts">
import {defineComponent, onMounted} from 'vue'
import {ref} from 'vue'
import  { type Single } from './singleContent.vue'
import { api } from "@/api";
import {eventBus} from '@/utils/general';
import { ElMessage } from 'element-plus';
import { useServerStore, useContentStore } from "@/store";
import { type SubmitReply } from "./contents.vue";
import { useRouter } from 'vue-router'

const props = defineProps({
    data : {
        type: Object as () => Single,
        require : true
    }
})

const data = ref()

const text = ref("")

const isAreaShow = ref(false)
const serverStore = useServerStore()
const contentStore = useContentStore()

const router = useRouter()

const thumbs = async (item : Single) =>{
    // console.log(item.id)
    const ret = await api.updateThumb(item.id, item.type)
    if(ret) item.thumbs += 1
}

const replySubmit = () =>{

    if(!serverStore.isLogin){
        ElMessage({
            message : "请先登陆",
            type : 'warning'
        })
        return ;
    }

    const subData : SubmitReply = {
        username : serverStore?.username || 'unknown',
        musicId : contentStore.curr_MainID,
        content : `@${data?.value.username} ${text.value}`,
        type : contentStore.type,
        fatherId : data.value.fatherId
    }

    const ret = api.addContent(subData)

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
}

const jumpTo = (username : string) =>{
  router.push({name: "user", query : { username }  })
}

onMounted(()=>{
    data.value = props.data
})


</script>

<template>
    <div class="single-container" v-if="data">
        <div class="head-img" @click="jumpTo(data.username)">
        </div>
        <div class="right">
            <div class="nickname">{{ data.username }}</div>
            <div class="time">{{ data.time }}</div>
            <div class="content">{{ data.content }}</div>
            <div class="status">
                <div class="thumbs">
                    <i class="fa fa-thumbs-o-up" @click="thumbs(data)">&nbsp;{{ data.thumbs }}</i>
                </div>
                <div class="said" @click="isAreaShow = !isAreaShow" >回复</div>
            </div>
            <div class="content-textarea" v-show="isAreaShow">
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

        </div>
        
        
    </div>
  
</template>

<style lang="less" scoped>
@import url('@CSS/global.less');

.single-container{
    display: flex;
    width:100%;
    padding: 10px;
    overflow: hidden;
    .head-img{
       
        width: 40px;
        height: 40px;
        // border: 1px solid black;
        border-radius: 50%;
        margin: 10px;
        background-image: url('@Pictures/info-pic.png');
        background-size: cover;
        margin-right: 20px;
        cursor: pointer;
    }

    .right{
        max-width: 70%;
        display: flex;
        flex-direction: column;
        gap: 5px;
        .status{
            display: flex;
            .thumbs{
                margin-right: 10px;
                cursor: pointer;

                &:hover{
                    color: @color-text-green;
                }
            }
            .said{
                color: @color-text-deep-grep;
                cursor: pointer;
            }
             
        }
        .time{
            color: @color-text-deep-grep;
        }

        .see{
            color: @color-text-deep-grep;
            cursor: pointer;
        }

        .content-textarea{
            width: 100%;

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

        .sub-contents{
            height: 200px;
            width: 100%;
            background-color: @color-text-grey-light;
            border-radius: 10px;
        }
    }
}

</style>>
