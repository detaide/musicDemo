import {get} from '@/utils/request'

/**
 * 调用此接口 , 传入 mv id,可获取 mv 播放地址
 * @param id MVID 
 * @param resolution 分辨率选择
 * @returns 
 */
export function getMvData(id: number , resolution? : number){
    return get({
        url: `/mv/url?id=${id}${resolution? `&r=${resolution}`: ''}`
    })
}

/**
 * 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 , 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
 * @param id MVID
 * @returns 
 */
export function getMVDetail(id:number){
    return get({
        url: `/mv/detail?mvid=${id}`
    })
}