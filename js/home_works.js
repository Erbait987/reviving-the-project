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
let count = 0
function animateBall() {
    count ++
    if (count < 450) {
        childBlock.style.left = count + 'px'
        setTimeout(animateBall, 5)
    }else {
        setTimeout(backAnimated, 1000)
    }
}

function backAnimated(){
    count--
    if(count > 0){
        childBlock.style.left = count + 'px'
        setTimeout(backAnimated, 5)
    }else {
        count = 0
        setTimeout(animateBall, 1000)
    }
}
animateBall()

