import {get} from '@/utils/request'

/**
 * 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该音乐的所有评论 ( 不需要登录 )
 * @param id 音乐 id
 * @param limit 取出评论数量 , 默认为 20
 * @param offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 */
export function getMusicComment<T>(
    id : number,
    limit? : number,
    offset? : number,
    before? : number
){
    const params = [
        `id=${id}`,
        limit && `limit=${limit}`,
        offset && `offset=${offset}`,
        before && `before=${before}`
    ]

    return get<T>({
        url : `/comment/music?${params.filter(Boolean).join('&')}`
    })
}

/**
 * 调用此接口 , 传入资源 parentCommentId 和资源类型 type 和资源 id 参数, 可获得该资源的歌曲楼层评论
 * @param parentCommentId 楼层评论 id
 * @param id 资源 id
 * @param type 0: 歌曲 | 1: mv | 2: 歌单 | 3: 专辑 | 4: 电台节目 | 5: 视频 | 6: 动态 | 7: 电台
 * @param limit 取出评论数量 , 默认为 20
 * @param time 分页参数,取上一页最后一项的 time 获取下一页数据
 * @returns 
 */
export function getFloorComment<T>(
    parentCommentId : number,
    id : number,
    type : number,
    limit : number,
    time : any
){
    const params = [
        `parentCommentId=${parentCommentId}`,
        `id=${id}`,
        `type=${type}`,
        limit && `limit=${limit}`,
        time && `time=${time}`
    ]
    return get<T>({
        url : `/comment/floor?${params.filter(Boolean).join('&')}`
    })
}