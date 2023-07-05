import {get} from '@/utils/request'

/**
 * 获取专辑信息
 * @param id 专辑ID
 * @returns 
 */
export function album<T = any>(id : number){
    return get<T>(
        {url:`/album?id=${id}`}
    )
}

/**
 * 调用此接口 , 传入专辑 id, 可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
 * @param id 专辑id
 * @returns 
 */
export function albumDetail<T = any>(id : number){
    return get<T>(
        {url : `/album/detail/dynamic?id=${id}`}
    )
}