

export function createLocalStorage(){


    function set<T = any>(key : string, data : T){
        const json = JSON.stringify(data)
        window.localStorage.setItem(key, json)
    }

    function get(key:string){
        const json = window.localStorage.getItem(key)
        if(json){
            let storageData = null
            try{
                storageData = JSON.parse(json)
            }catch{
                // Prevent failure
            }

            if(storageData){
                const data = storageData
                return data
            }
        }
        return null
    }

    function remove(key: string){
        window.localStorage.removeItem(key)
    }

    function clear(){
        window.localStorage.clear()
    }

    return {
        set,
        get,
        remove,
        clear
    }

}

export const ss = createLocalStorage()