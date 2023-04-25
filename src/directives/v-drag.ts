//进度条处理，处理点class为process-dot

const processDrag = {
    mounted: (el: any, binding :any) => {   
        el.onmousedown = (ev: any) => {
            const bindvalue = binding.value.processObject
            const process = bindvalue.process.value
            const processParent = bindvalue.processParent.value
            const leftOffset = el.offsetLeft
            const MaxLength = processParent.offsetWidth
            
            const mouseXStart = ev.clientX

            document.onmousemove = (e) =>{
                let moveX = e.clientX- mouseXStart
                let validX = leftOffset + moveX
                validX = validX > MaxLength ? MaxLength : validX
                validX = validX < 0 ? 0 : validX

                el.style.left = `${validX}px`
                process.style.width = `${validX}px`   
            }
            
        }

        document.onmouseup =()=>{
            document.onmousemove = null
        }


    }
  }

const lyricDrag = {
    mounted : (el: any, binding : any) =>{
        el.onmousedown = (ev : any) =>{
            const mouseYStart : number = ev.clientY
            const offsetY : number = el.offsetTop
            const MaxOffset : number = el.offsetHeight - 100
            
            
            document.onmousemove = (e) =>{
                let moveY = e.clientY - mouseYStart
                let validY = moveY + offsetY
                validY =  validY > 0 ?0 : validY
                validY = validY < -MaxOffset ? -MaxOffset : validY
                el.style.top = `${validY}px`
            }

            document.onmouseup =()=>{
                document.onmousemove = null
            }
        }
    }
}

const lyricAutoDrag = {
    mounted : (el : any, binding : any)=>{
    },

    updated : (el : any, binding : any)=>{
        if(binding.value < 3) {return}
//     // lyricBox.value.style.top = `-${(music.index-3) * 35}px`
        el.style.transform = `translateY(-${(binding.value-4) * 35}px)`
    },
}

export {processDrag, lyricDrag, lyricAutoDrag}