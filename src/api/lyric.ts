import {get} from '@/utils/request'

/**
 * 搜索歌词
 * @param id 音乐ID
 * @param yrc 是否逐字获取歌词，有一些可能不包含逐字歌词
 * @returns 
 */
export function getLyric<T>(
    id : number,
    yrc? : boolean
){
    return get<T>({
        url: `/lyric${yrc ? '/new' : ''}?id=${id}`
    })
}

