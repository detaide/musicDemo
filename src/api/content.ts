import {get, post} from '@/utils/server'

export function getContents<T = any>(musicId : number, type : 'songs' | 'albums'){
    return get<T>(
        {url : `/getContents/${musicId}/${type}`}
    )
}

export function addContent<T = any>(content : any){
    return post<T>(
        {
            url: '/addContent',
            data : content
        }
    )
}

export function updateThumb<T = any>(musicId : number){
    return get<T>(
        {
            url : `/updateThumb/${musicId}`
        }
    )
}