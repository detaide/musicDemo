/**
 * 导出axios
 */

import { AxiosResponse } from "axios"
import request from './axios'

/**
 * 设置接口方便类型检查
 */
export interface HttpOption {
    url : string,
    data? : any,
    method? : string,
    headers? : any,
    beforeRequest? : () => void,
    afterRequest? : () => void 
}

export interface Response<T = any> {
    data: T,
    message: string | null,
    status: Number
}


export function http<T = any>(
    {
        url,
        data,
        method,
        beforeRequest,
        afterRequest,
    } : HttpOption
){
    
    // 成功请求
    const successHandler = (res : AxiosResponse<Response<T>>) => {
        //对返回数据状态码进行校验
        if(res.status === 200 ){
            return res.data
        }

        //其他返回状态
        return Promise.reject(res.data)
    }

    //请求失败
    const failHandler = (error: Response<Error>) => {
        console.log('请求失败')
        afterRequest?.()
        throw new Error(error?.message || 'Error');
        
    }

    beforeRequest?.()

    //默认为GET
    method = method || 'GET'

    //post携带的数据
    const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {})

    return method === 'GET' 
        ? request.get(url).then(successHandler, failHandler)
        : request.post(url, params).then(successHandler, failHandler)
}


export function get< T = any>(
    {url, data, method = 'GET', beforeRequest, afterRequest}:HttpOption,
): Promise<Response<T>> {
    return http<T>({
        url,
        data,
        method,
        beforeRequest,
        afterRequest
    })
}

//看api似乎暂时用不到
export function post< T = any>(
    {url, data, method, beforeRequest,afterRequest} :HttpOption
) : Promise<Response<T>>{
    return http<T>({
        url,
        data,
        method,
        beforeRequest,
        afterRequest
    })
}
