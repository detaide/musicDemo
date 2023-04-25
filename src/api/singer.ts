import {get} from '@/utils/request'

/**
 * 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
 * @param id 歌手ID
 * @returns 
 */
export function getSingerMusic<T>(id : number){
    return get<T>({url : `/artists?id=${id}`})
}

/**
 * 调用此接口 , 传入歌手 id, 可获得歌手 mv 信息 ，将获取的MVID使用getSingerMVURL获取url
 * @param id 歌手ID
 * @returns 
 */
export function getSingerMV<T>(id : number){
    return get<T>({url : `/artists/mv?id=${id}`})
}

/**
 * 获取MV的URL
 * @param id MVID
 * @returns 
 */
export function getSingerMVURL<T>(id : number){
    return get<T>({url : `/artists/mv?mvid=${id}`})
}

/**
 *  调用此接口 , 传入歌手 id, 可获得歌手专辑内容
 * @param id 歌手 id
 * @param limit 取出数量 , 默认为 30
 * @param offset 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 * @returns 
 */
export function getSingerAlbum<T>(
    id : number,
    limit? : number,
    offset? : number
){
    const params = [
        `id=${id}`,
        limit && `limit=${limit}`,
        offset && `offset=${offset}`
    ]
    return get<T>({
        url : `/artist/album?id=${params.filter(Boolean).join('&')}`
    })
}