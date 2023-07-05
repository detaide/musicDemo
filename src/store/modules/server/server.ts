/*
 * @Author: hyman
 * @Date: 2023-06-15 22:31:20
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-15 23:53:13
 * @Description: 请填写简介
 */

import {ss} from '@/utils/storage'

const LOCAL_NAME = 'server'

export interface Server{
    isLogin : Boolean,
    username? : string,

}

export function defaultParam() : Server{
    return {
        isLogin : true,
        username : ''
    }
}


export function setLocalStorage(server : Server) {
    ss.set(LOCAL_NAME, server)
}

export function getLocalStorage() : Server{
    const server = ss.get(LOCAL_NAME)

    return server ? server : defaultParam()
}



