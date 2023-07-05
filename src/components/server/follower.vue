<!--
 * @Author: hyman
 * @Date: 2023-06-16 19:52:13
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-16 22:45:29
 * @Description: 请填写简介
-->

<script setup lang="ts">
import { router } from "@/router";
import { onMounted, reactive, defineProps } from "vue";

const props = defineProps({
  follows : Object as () => any
})


const jumpTo = (index : number) =>{
  router.push({name: "user", query : { username : props.follows.follower[index].followerUsername}  })
}


</script>

<template>
  <div class="container">
        <template v-if="props.follows.follower.length">
          <div class="box" v-for="(item,index) in props.follows.follower" :key="index" @click="jumpTo(index)">
            <div class="pic-img">
            </div>
            <div class="music-name">{{ item.followerUsername}}</div>
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
        width: 180px;
        height: 200px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;

        &:hover{
            color: @color-text-green;
        }

        .pic-img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
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