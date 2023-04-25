import {get} from '@/utils/request'


/**
 * 歌曲搜索
 * @param keywords  搜索关键词
 * @param limit     返回数量，默认30
 * @param offset    偏移数量，用于分页
 * @param type      搜索类型，1单曲 | 10专辑 | 100歌手 | 1000歌单 | 1002用户 | 1004MV | 1006歌词 | 1009电台 | 1014视频 | 1018总和 | 2000声音 
 * @returns         返回
 */

export function search<T = any>(
    keywords? : string,
    type? : Number,
    limit? : Number,
    offset? : Number,   
){ 
    const params = [
        `keywords=${keywords}`,
        limit && `limit=${limit}`,
        offset && `offset=${offset}`,
        type && `type=${type}`,
    ]
    const url = `/search?${params.filter(Boolean).join('&')}` 
    return get<T>(
        { url }
    )
}

/**
 * 默认搜索关键词
 * @returns 
 */
export function searchDetault<T = any>(){   return get<T>( { url:'/search/default' } )  }

/**
 * 热搜列表
 * @param detail 是否请求详细信息
 * @returns 
 */
export function serchHot<T = any>(
    detail? : Boolean
){
    return get<T>({
        url:`/search/hot/${detail}`
    })
}

export function multiMatch<T = any>(
    keywords : string
) {
    return get<T>({
        url: `/search/multimatch?keyword=${keywords}`
    })
}

