import { get, post } from "@/utils/server"

export interface Login{
    id? : number,
    username : string,
    password : string,
    head_img? : number,
    nickname? : string
}

export function demo<T = any>(){
    return get<T>(
        {url : '/demo'}
    )
}


export function register<T = any>(data : Login){
    return post<T>(
        {
            url : '/register',
            data 
        }
    )
}

export function loginTime<T = any>(username : string){
    return get<T>(
        {
            url : `/loginTime/${username}`
        }
    )
}

export function login<T = any>(username : string, password : string){
    return get<T>(
        {
            url : `/login/${username}/${password}`
        }
    )
}