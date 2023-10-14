//HW1-1
const mailInput = document.querySelector('#gmail_input')
const mailButton = document.querySelector('#gmail_button')
const mailResult = document.querySelector('#gmail_result')

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

mailButton.addEventListener('click', ()=>{
    if(mailButton){
        mailResult.classList.add("checker");
    }
    if(regExp.test(mailInput.value)){
        mailResult.innerHTML = 'Yes it is Gmail'
        mailResult.style.color = 'black'
    }else{
        mailResult.innerHTML = 'It is not Gmail'
        mailResult.style.color = 'red'
    }
})

// HW1-2
const childBlock = document.querySelector('.child_block')
let posX = 0
let posY = 0
let sideChanger = 'right'
function animateBall(){
    if(sideChanger === 'right' && posX < 449){
        posX++
        childBlock.style.left = `${posX}px`
    }else if(sideChanger === 'right' && posX >= 449){
        sideChanger = 'down'
    }else if(sideChanger === 'down' && posY < 449){
        posY++
        childBlock.style.top = `${posY}px`
    }else if (sideChanger === 'down' && posY >= 449) {
        sideChanger = 'left'
    }else if(sideChanger === 'left' && posX > 0){
        posX--
        childBlock.style.left = `${posX}px`
    }else if(sideChanger === 'left' && posX >= 0){
        sideChanger = 'up'
    }else if(sideChanger === 'up' && posY > 0){
        posY--
        childBlock.style.top = `${posY}px`
    }else if(sideChanger === 'up' && posY <= 0) {
        sideChanger= 'right';
    }
    setTimeout(animateBall, 10);

}
animateBall()


//HW 2

const time = document.querySelector('#secondsS')
const btnStart= document.querySelector('#start')
const btnStop= document.querySelector('#stop')
const btnReset= document.querySelector('#reset')
let num = 0
let start;
let flag = false
btnStart.onclick = () =>{
    if(!flag){
        start = setInterval( ()=>{
            num++
            time.textContent = num
        } , 1000)
    }
    flag = true
}

btnStop.onclick = () => {
    if(flag){
        clearInterval(start)
    }
    flag = false
}

btnReset.onclick = () => {
    clearInterval(start)
    num = 0
    time.textContent = num
    flag = false
}