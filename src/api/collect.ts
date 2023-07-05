/*
 * @Author: hyman
 * @Date: 2023-06-15 23:30:15
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-15 23:38:11
 * @Description: 请填写简介
 */

import { get, post } from '@/utils/server'

export interface Collect{
    collectId : number,
    username : string,
    type : 'songs' | 'album',
    addTime? : string
}

/**
 * 获取一个收藏夹
 * @param username 
 * @returns 
 */
export function getCollecet<T = any>(username : string){
    return get<T>(
        {
            url : `/getCollecet/${username}`
        }
    )
}


export function deleteCollectByOne<T = any>(username : string, id : number){
    return get<T>(
        {
            url : `/deleteCollectByOne/${username}/${id}`
        }
    )
}


export function insertCollect<T = any>(data : Collect){
    return post<T>(
        {
            url : '/insertCollect',
            data
        }
    )
}
