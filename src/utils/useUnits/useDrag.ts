let radio : number
export function processDrag(dot : any,process : any,parent : any, initRadio? : number) : number{  
        const leftOffset = dot.offsetLeft
        const MaxLength = parent.offsetWidth as number
        if(initRadio){
            dot.style.left = `${MaxLength * initRadio}px`
            process.style.width = `${MaxLength * initRadio}px` 
        }      
    
        //传入三要素，点，进度条，全局条
        dot.onmousedown = (ev: any) => {      
            const mouseXStart = ev.clientX
            document.onmousemove = (e) =>{
                let moveX = e.clientX- mouseXStart
                let validX = leftOffset + moveX as number
                validX = validX > MaxLength ? MaxLength : validX
                validX = validX < 0 ? 0 : validX

                dot.style.left = `${validX}px`
                process.style.width = `${validX}px`   
                radio = Number((validX / MaxLength).toFixed(2))
            }

            document.onmouseup =()=>{
                document.onmousemove = null
                return radio
            }
            
        }
        return radio
   
}

export function updateProcess(dot: any, process: any, parent : any, radio: number){
    const MaxLength = parent.offsetWidth 
    const currLeft = MaxLength * radio
}