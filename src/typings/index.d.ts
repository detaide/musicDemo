declare namespace AnyResponse{
    interface SearchResponse{
        result: any,
        code: Number
    }
    
    interface MusicResponse{
        data: string,
        code: number
    }
    
    interface CheckMusicResponse{
        success : string,
        message : string
    }
    
    
    interface CommentResponse{
        comments: any,
        hotComment : any,
        code : number
    }

    interface floorResponse{
        code : number,
        message : string,
        data : any
    }

    interface musicDetail{
        songs: any,
        code : number,
        privileges : any
    }
}

export type {SearchResponse, MusicResponse, CheckMusicResponse, CommentResponse, floorResponse}

