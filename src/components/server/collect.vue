
<script setup lang="ts">
import { onMounted, onUpdated, reactive, ref, watch } from "vue";
import { api }  from "@/api"
import { useContentStore } from '@/store'
import { useRouter } from 'vue-router'

let data  = ref()

const musicList = reactive<Array<any>>([])
const contentStore = useContentStore()
const router = useRouter()

const props = defineProps({
    follows : Object as () => any
})


// const getCollectList = async () =>{
//     await musicList.splice(0,musicList.length)
//     data.forEach(async (item)=>{
//         const {songs} = await api.getMusicDetail(item.collectId)
//         musicList.push({
//             musicName : songs[0]?.name,
//             musicId : songs[0]?.id,
//             musicImg : songs[0]?.al?.picUrl
//         })
//     })
// }

const jumpTo = (index : number) =>{
    console.log(props.follows.musicList[index])
    console.log(props.follows.musicList[index]?.musicId)
    contentStore.setCurrId(props.follows.musicList[index]?.musicId)
    contentStore.setContentStore()

    router.push({name : 'contents'})
}


onMounted(async ()=>{
    // console.log(props.username)
    // if(props?.username){
    //     data = await api.getCollecet(props?.username)
    //     getCollectList()
    // }

})


</script>

<template>
    <div class="container">
        <template v-if="props.follows?.musicList?.length">
            <div class="box" v-for="(item,index) in props.follows?.musicList" :key="index" @click="jumpTo(index)">
                <div class="pic-img" :style="{'background-image' : `url('${item.musicImg}')`}">
                </div>
                <div class="music-name">{{ item.musicName }}</div>
            </div>
        </template>

        <template v-else>
          <div style="margin: 0 auto; font-size: 30px;">
            空空如也
          </div>
        </template>
    </div>
  
</template>

<style scoped lang="less">
@import url('@CSS/global.less');

.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .box{
        padding: 20px 40px;
        width: 220px;
        height: 200px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;

        &:hover{
            color: @color-text-green;
        }

        .pic-img{
            width: 140px;
            height: 140px;
            background-image: url('@Pictures/info-pic.png');
            background-size: cover;
        }

        .music-name{
            margin: 0 auto;
            font-size: 18px;
        }
    }
}

</style>