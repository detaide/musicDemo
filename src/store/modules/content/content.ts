/*
 * @Author: hyman
 * @Date: 2023-06-15 11:33:47
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-16 20:47:11
 * @Description: 请填写简介
 */

import {reactive, ref} from 'vue'
import {ss} from "@/utils/storage";

const LOCAL_NAME = 'content'

interface contentInfo {
    name? : string,
    album? : any,
    author? : string,
    publishTime? : string,
    id? : number,
}

export interface Content{
    curr_MainID : number,
    content? : contentInfo,
    lyric? : Object,
    type : "songs" | "album"
}


export function defaultParam() : Content {
    // const currId = 1431292823
    const currId = 347230

    return {
        curr_MainID : currId,
        content : {id : currId},
        lyric : {},
        type : 'songs'
    }

}

export function setLocalStorage(content : Content) {
    ss.set(LOCAL_NAME, content);
}

export function getLocalStorage() : Content{

    const content : Content = ss.get(LOCAL_NAME)

    return content ? content : defaultParam() 

}