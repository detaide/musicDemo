<template>
	<div class="mvContainer">
		<div class="videoContainer" v-for="(item,index) in data" :key="index" >
			<div class="mv-img" :style="{'background-image' : `url('${item.mvPic? item.mvPic : ''}')`}" @click="jump(item)">
				<i class="fa fa-play"></i>
			</div>
			<div class="mv-name">{{item.mvName}}</div>
			<div class="singer">{{item.singer}}</div>
		</div>

	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api } from "@/api";
import { useRouter } from "vue-router";

const data= ref(null)
const router = useRouter()

const props = defineProps({
	search : String
})

const jump = (item) =>{
	router.push({name:'mvVideo', query:{id : item.mvid, mvName : item.mvName}})
}


onMounted(async ()=>{
	const {result} = await api.search(props.search, 1004)
	const mvList = result.mvs
	data.value = mvList.map(item=>{
		return {
			mvPic : item.cover,
			mvid : item.id,
			singer : item.artistName,
			singerId : item.artistId,
			mvName : item.name
		}
	})
})

</script>

<style scoped lang="less">
@import url('@CSS/global.less');

.mvContainer{
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	
	.videoContainer{
		width: 280px;
		height: 250px;
		// border: 1px solid black;
		margin-right: 20px;
		

		.mv-img{
			width: 100%;
			height: 170px;
			cursor: pointer;
			background-size: cover;
			display: flex;
			align-items: center;
			justify-content: center;


			.fa{
				border: 1px solid white;
				width: 50px;
				height: 50px;
				color: @color-text-grey;
				border-radius: 50%;
				font-size: 35px;
				text-align: center;
				background-color: #fff;
				padding: 7px 0 0 8px ;
				opacity: 0;
				transition: opacity 0.2s ease;
			}

			&:hover .fa{
				opacity: 1;
			}

		}

		.singer{
			color: @color-text-grey;
			margin-top: 4px;
			cursor: pointer;
		}
	}
}

</style>