/*
 * @Author: hyman
 * @Date: 2023-06-15 23:19:04
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-16 21:20:20
 * @Description: 请填写简介
 */
import { get, post} from '@/utils/server'

/**
 * 获得粉丝列表
 * @param followerUsername 查询的用户名
 * @returns 
 */
export function getFollowed<T = any>(followerUsername : string){
    return get<T>(
        {
            url : `/getFollowed/${followerUsername}`
        }
    )
}

/**
 * 获得关注列表
 * @param followedUsername 查询的用户名
 * @returns 
 */
export function getFollower<T = any>(followedUsername : string){
    return get<T>(
        {
            url : `/getFollower/${followedUsername}`
        }
    )
}

/**
 * 删除一个关注关系
 * @param followerUsername 关注
 * @param followedUsername 粉丝
 * @returns 
 */
export function deleteFollowByOne<T = any>(followerUsername : string, followedUsername : string){
    return get<T>(
        {
            url : `/deleteFollowByOne/${followerUsername}/${followedUsername}`
        }
    )
}

/**
 * 添加一个关注关系
 * @param followerUsername 关注
 * @param followedUsername 粉丝
 * @returns 
 */
export function addFollowByOne<T = any>(followerUsername : string, followedUsername : string){
    return get<T>({
        url : `/addFollowByOne/${followerUsername}/${followedUsername}`
    })
}