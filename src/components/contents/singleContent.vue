<!--
 * @Author: hyman
 * @Date: 2023-06-16 10:25:29
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-18 14:09:06
 * @Description: 请填写简介
-->
<!--
 * @Author: hyman
 * @Date: 2023-06-14 22:45:55
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-15 11:28:42
 * @Description: 请填写简介
-->


<script setup lang="ts">
import {computed, defineComponent, onMounted, reactive} from 'vue'
import subContent from './subContent.vue'
import {ref} from 'vue'
import { api } from '@/api'
import {eventBus} from '@/utils/general'
import { ElMessage } from 'element-plus';
import { useServerStore, useContentStore } from "@/store";
import { type SubmitReply } from "./contents.vue";
import {useRouter} from 'vue-router'

export interface Single{
    id : number,
    username : string,
    time : string,
    content : string,
    fatherId : number,
    thumbs : number,
    type : "songs" | "album",
    music_id : number
}


export interface FList{
    father : Single,
    subShow : Boolean,
    reply : Boolean,
    son? : Array<Single>
}


const text = ref("")
const contentStore = useContentStore()
const serverStore = useServerStore()
const content = reactive<Array<FList>>([])

const IndexMap = new Map()
const router = useRouter()


eventBus.on('replySubmit',()=>{
    contentGetAndFormatter()
})

const totalSub = (list : Array<Single> )=>{
    return list.length
}

const thumbs = async (item : Single) =>{
    const ret = await api.updateThumb(item.id, item.type)
    if(ret) item.thumbs += 1
}

const replySubmit = (item : Single) =>{
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
        content : `${text.value}`,
        type : contentStore.type,
        fatherId : item.id
    }

    // console.log(subData, item)

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

//评论数据分割
const contentDivide = (content : Array<Single>) =>{
    if(!content){
        return []
    }

    IndexMap.clear()

    //content排序
    content.sort((a : any, b : any) : number =>{
        return a.id - b.id
    } )
    
    let father : Array<FList> = []
        // 如果数据包含father_id就添加到数据集的子属性中，没有就保存到father中
    content.forEach((item)=>{
        if(item.fatherId == 0){
            const rets =  father.push({father : item, son : [], subShow : false, reply : false})
            IndexMap.set(item.id, rets-1)
        }else{
            const index = IndexMap.get(item.fatherId)
            if(index >= 0){
                father[index].son?.push(item)
            }
        }
    })


    return father
    
}

const contentGetAndFormatter = async () =>{
    const ret = await api.getContents(contentStore.curr_MainID, contentStore.type)
    const formatterContent = contentDivide(ret)
    //数据备份
    const content_bak = content

    try{
        content.splice(0, content.length)
        formatterContent.map((item : FList)=>{
            if(item.son &&  item.son?.length <= 2) {
                item.subShow = true
            }
            content.push(item)
        })
    }catch{
        if(!content.length){
            content_bak.forEach((item)=>{
                content.push(item)
            })
        }
    }

    
}

const jumpTo = (username : string) =>{
  router.push({name: "user", query : { username }  })
}

onMounted(async ()=>{
    await contentGetAndFormatter()

    
})

</script>

<template>
    <div class="single-container" v-for="(item, index) in content" :key="index">
        <div class="head-img" @click="jumpTo(item.father.username)">
        </div>
        <div class="right">
            <div class="nickname">{{ item.father.username }}</div>
            <div class="time">{{ item.father.time }}</div>
            <div class="content">{{ item.father.content }}</div>
            <div class="status">
                <div class="thumbs" @click="thumbs(item.father)">
                    <i class="fa fa-thumbs-o-up">&nbsp;{{ item.father.thumbs }}</i>
                </div>
                <div class="said" @click="item.reply = !item.reply">回复</div>
            </div>
            <div class="content-textarea" v-show="item.reply">
                <el-input
                    v-model="text"
                    maxlength="100"
                    placeholder="Please input"
                    show-word-limit
                    type="textarea"
                />
                <div class="content-textarea-button">
                    <button class="m-button bar on" @click="replySubmit(item.father)">回复</button>
                    <button class="m-button bar ">取消</button>
                </div>
            </div>

            <div class="see" style="margin: 10px 0;" @click="item.subShow  = !item.subShow" v-show="item.son?.length">
                <div v-show="!item.subShow">查看以下{{ totalSub(item.son) }}条>></div>
                <div v-show="item.subShow">收起</div>
            </div>

            <div class="sub-contents" v-show="item.subShow">
                <template v-for="(son,b) in item.son" :key="b">
                    <div v-if="son">
                        <subContent :data="son"/>
                    </div>
                </template>
                
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
        min-width: 500px;
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
            // height: 200px;
            width: 100%;
            background-color: @color-text-grey-light;
            border-radius: 10px;
        }
    }
}

</style>>
