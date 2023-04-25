import { api } from "@/api";
import { timeFormatter , timeStampFormatter} from "@/utils/formatter";

export function lyricMatchTime(currTime : number, timeList : number[]){
    if(!currTime && !timeList ) return -1  
    let i = 0
    const length = timeList.length
    if(currTime > timeList[length -1]) return length -1

    // console.log(timeList)
    
    let start = 0, end = length - 1
    while(true){
        const index = (start + end) >> 1
        if(++i > 10) return-1; 
        if(currTime == timeList[index] || (currTime > timeList[index] && currTime < timeList[index + 1])){
            return index;
        }else if(currTime > timeList[index]){
             start = index
        }else{
            end = index
            if(start >= end) return -1
        }
    }
}

export async function getSearchSingleData(keywords : string | number, limit : number, offset : number ){
    const {result} = await api.search(keywords, 1)
    const songs = result.songs
    
    const detail =  songs.map((item : any)=>{
        return {
            musicId : item.id,
            album : item.album,
            musicName : item.name,
            singerId : item.artists[0].id,
            singer : item.artists[0].name
        }
    }) 
    let idList = [] as any

    detail.forEach((item : any)=>{
        idList.push(item.musicId)
    })

    const ret = await api.getMusicDetail(idList)
    ret.songs.forEach((item:any,index:number)=>{
        detail[index].length = item.dt >> 10
        detail[index].lengthFormatter = timeFormatter(detail[index].length)
    })

    return detail

    
}

export async function getSearchAlbumData(keywords : String) {
    const {result} = await api.search(keywords, 10)
    const albums = result.albums
    return  albums.map((item : any) =>{
        return {
            albumId : item.id,
            albumName : item.name,
            picSrc : item.picUrl,
            publishTime : timeStampFormatter(item.publishTime,'yyyy-mm-dd'),
            singer : item.artist.name
        }
    })

}

export async function getAlbumById(id : number){
    const {album} = await api.album(id)
        return {
            albumName : album.name,
            picUrl : album.picUrl,
            publishTime : timeStampFormatter(album.publishTime,'yyyy-mm-dd'),
            description : album.description,
            company : album.company,
            subType : album.subType,
            singer : album.artist.name
        }
}