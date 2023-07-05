export function timeFormatter(time: number): String{
    if(time)
        return Math.floor(time / 60).toString().padStart(2,'0') + ':' +  Math.floor(time % 60).toString().padStart(2,'0')
    return '00:00'
}


interface lyricFormatter{
    time? : any,
    lyric? : any
}

/**
 * 格式化歌词
 * @param lyric 逐字歌词，带时间和歌词
 * @returns 一个包含时间-歌词的对象数组
 */
export function LyricFormatter(lyric : string) : lyricFormatter {
    if(!lyric) return {}
    const lyric_list = lyric.split('\n')
    
    const lyric_obj = [] as any
    const time_obj = [] as any
    
    const regex = /\[(\d{2}):(\d{2}\.\d{2,3})\](.*)/; 
    time_obj.push(0)
    lyric_obj.push('')
    lyric_list.forEach(item =>{
        const match = item.match(regex)     
        if(match){
            time_obj.push((+match[1]) * 60 + +match[2])
           lyric_obj.push({lyric:match[3]}) 
        }
    })
    return {time: time_obj, lyric : lyric_obj }
}

export function timeStampFormatter(time : number,format : string){
    if(!time) return '未知'
    const date = new Date(time)
    const year = date.getFullYear().toString()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    return format.replace('yyyy',year).replace('mm',month).replace('dd',day)
}