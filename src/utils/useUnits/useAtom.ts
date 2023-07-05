// import {useGeneralStore, type MusicState, useMusicStore} from '@/store'
// const generalStore = useGeneralStore()
// const musicStore = useMusicStore()

// console.log(musicStore)

// export function dataToStoreAndPlay(id : number | number[]){
//     //需要先获取当前的列表项再变值，因为其他动作也会更新表
//     generalStore.getgeneralStorage()
//     musicStore.getMusicInfoStorage()
//     //添加进入pinia状态
//     if(Array.isArray(id)){
//         musicStore.changeMusicId(id[0])
//     }else{
//         musicStore.changeMusicId(id)
//     }
//     generalStore.addMusicListId(id)

//     generalStore.setgeneralStorage()
//     musicStore.setMusicInfoStorage()
// }