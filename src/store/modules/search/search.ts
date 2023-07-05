export interface searchList{
    MusicName?: string,
    singer? : string,
    album ?: string,
    length ?: string,
}

export interface search{
    searchList? : searchList[]
}

export function defaultParam() : search{
    return {
        searchList : []
    }
}