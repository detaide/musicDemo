import {get} from '@/utils/request'

/**
 * 获取音源，可以选择音质
 * @param id 音乐ID
 * @param level 播放等级 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res
 */
export function getMusicUrlNew<T>(
    id: number,
    level: 'standard' | 'higher' | 'exhigh' | 'loseless' | 'hires'
){
    return get<T>({
        url:`/song/url/v1?id=${id}&level=${level}`
    })

}

/**
 * 查看歌曲的详细信息
 * @param ids 歌曲ID数组
 * @returns 
 */
export function getMusicDetail<T>(ids : number[] | number){
    if(Array.isArray(ids)){
        const idList = ids.map(item => item.toLocaleString()).join(',')
    }
    else{
        const idList = ids
    }
    
    return get<T>({url : `/song/detail?ids=${ids}`})
}

/**
 * 
 * @param id 音乐ID
 * @param br 码率，可选
 * @returns 
 */
export function getMusicUrl<T>(
    id : number,
    br? : string
){ 
    return get<T>({
        url:`/song/url?id=${id}${br ? `br=${br}` : ''}`
    })

}

/**
 * 检查当前音乐ID是否可用
 * @param id 音乐ID
 * @param br 码率
 * @returns 
 */
export function musicIsUsed<T>(
    id : number,
    br? : string
){
    return get<T>({
        url:`/check/music?id=${id}${br ? `&br=${br}` : ''}`
    })
}

/**
 * 获取新歌速递
 * @param type  All:0 | 华语:7 | 欧美：96 | 日本：8 | 韩国： 16
 * @returns 
 */
export function newSongExpress<T>(type : Number){
    return get<T>({
        url : `/top/song?type=${type}`
    })
}

/**
 * 
 * @param refresh 是否刷新数据,默认为 false
 * @param cursor 上一条数据返回的 cursor
 * @returns 
 */
export function homeDiscover<T>(refresh? : boolean, cursor? : string){
    return get<T>({
        url: `/homepage/block/page?${refresh? `refresh=${refresh}` : ''}${cursor ? `&cursor=${cursor}` : ''}`
    })
}

/**
 * 调用此接口 , 可获取 APP 首页圆形图标入口列表
 * @returns 
 */
export function homeDiscoverCircle<T>(){
    return get<T>({
        url: '/homepage/dragon/ball'
    })
}

