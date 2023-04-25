<template>
  <div class="albumContainer">
        <ul class="album-list-head">
            <li v-for="(item,index) in head" :key="index" class="list">
				
                <div class="album">{{item.album}}</div>
                <div class="singer">{{item.singer}}</div>
                <div class="time">{{item.time}}</div>
            </li>
        </ul>
        <ul class="album-list-data">
			
            <li 
				v-for="(item,index) in data" :key="index" class="list"
				@mouseenter="hoverEnterHandler(index)"
                @mouseleave="hoverLeaveHandler()"
			>
				<div class="menu-bar" v-show="index === currHover">
					<div class="play m-circle bar" @click="addToList(index)"><i class="fa fa-play" ></i></div>
					<div class="addToList m-circle bar" @click="addToList(index)"><i class="fa fa-plus" ></i></div>
				</div>
                <div class="album"><div class="album-img" :style="{'background-image':`url('${item.picSrc}')`}" @click="jump(index)"></div>{{item.albumName}}</div>
                <div class="singer">{{item.singer}}</div>
                <div class="time">{{item.publishTime}}</div>
            </li>
        </ul>
		
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {getSearchAlbumData} from '@/utils/useUnits'
import {useGeneralStore, type MusicState, useMusicStore} from '@/store'
import {api} from '@/api'
import {useRouter} from 'vue-router'

const head = reactive([
    {
        album : '专辑',
        singer : '歌手',
        time : '发行时间',
    },
])

const currHover = ref(-1)
const data = ref(null)
const generalStore = useGeneralStore()
const musicStore = useMusicStore()
const router = useRouter()

const props = defineProps({
	search : String
})

const hoverEnterHandler = (index : number) =>{
	currHover.value = index
}

const hoverLeaveHandler = ()=>{
    currHover.value = -1
}



const addToPlay = async (index) =>{
	//清空当前默认的列表
	const idList = await getAlbumData(data.value[index].albumId)

}

//添加到播放列表中
const addToList = async (index)=>{
	const idList = await getAlbumData(data.value[index].albumId)
	//需要先获取当前的列表项再变值，因为其他动作也会更新表
    generalStore.getgeneralStorage()
    musicStore.getMusicInfoStorage()

	//添加进入pinia状态
	musicStore.changeMusicId(idList[0])
	generalStore.addMusicListId(idList)

	generalStore.setgeneralStorage()
    musicStore.setMusicInfoStorage()
    window.open('/play', 'player')

}

const getAlbumData = async (id : number) =>{
	const {songs} = await api.album(id)
	return songs.map(item =>{
		return item.id
	})
}

// 跳转到目标专辑
const jump = async (index) =>{
	const albumId  = data.value[index].albumId
	const songsList =  await getAlbumData(albumId)
	router.push({name:'albumDetail',query:{albumId, songsList}})
}

onMounted( async()=>{
	data.value  = await getSearchAlbumData(props.search)
})

</script>

<style scoped lang="less">
@import url('@CSS/global.less');

.albumContainer{
	.album-list-head{
		margin: 20px;
		.list{
			display: flex;
			color: @color-text-grey;

			.album{
				width: 50%;
			}

			.singer{
				width: 30%;
			}
		}	
	}

	.album-list-data{
		margin: 20px;
		position: relative;

		.menu-bar{
			position: absolute;
			display: flex;
			margin-left: 500px;
			.bar{
				width: 30px;
				height: 30px;
				border: 1px solid @color-text-grey;
				color: @color-text-grey;
				margin-right: 8px;
				font-size: 18px;
				cursor: pointer;

				.fa-play{
					margin-left: 4px;
				}

				&:hover{
					border-color: @color-text-green;
				}
				
			}
		}
		
		.list{
			display: flex;
			// border: 1px solid black;
			height: 100px;
			align-items: center;
			*:hover{
				color: @color-text-green;
				
			}
			.album{
				width: 50%;
				display: flex;
				line-height: 80px;
				cursor: pointer;

				.album-img{
					height: 80px;
					width: 80px;
					margin-right: 10px;
					background-size: cover;
				}
			}

			.singer{
				width: 30%;
				cursor: pointer;
			}

			.time{
				color: @color-text-grey;
			}
		}

		
	}
}


</style>