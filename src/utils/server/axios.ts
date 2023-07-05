/*
 * @Author: hyman
 * @Date: 2023-06-15 22:41:31
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-15 22:46:36
 * @Description: 请填写简介
 */
import axios, { type AxiosResponse } from 'axios'

/**
 * 封装service，设置基础URL,为/api，走代理过跨域
 */
const service = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL
})

/**
 * 设置拦截器,在请求之前处理
 */
service.interceptors.request.use(
    (config)=>{
        //设置请求头参数
        return config
    },
    (error)=>{
        return Promise.reject(error.response)
    }
)

/**
 * 设置拦截器，请求返回的时候处理
 */
service.interceptors.response.use(
    (Response : AxiosResponse) : AxiosResponse =>{
        if(Response.status === 200){
            return Response
        } 
        throw new Error(Response.status.toString());        
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service