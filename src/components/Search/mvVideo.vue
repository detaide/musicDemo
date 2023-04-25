<template>
    <div class="mvVideoContainer">
        <mv-player :width="width" :id="id" class="player" v-if="id"/>
    </div>
    

</template>

<script setup lang="ts">
import  mvPlayer  from "@Components/Search/mvPlayer.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const id = ref(null)
const mvName = ref(null)
const width = ref(null)

onMounted(()=>{
    id.value = route.query.id
    mvName.value = route.query.mvName
    width.value = 1200 as number
})

</script>

<style scoped lang="less">
@import url('@CSS/global.less');

.mvVideoContainer{
    width: 100%;
    height: 100%;
    background-color: @color-cyan;
    overflow: hidden;

    .player{
        margin:  auto;
        margin-top: 50px;
    }
}

</style>