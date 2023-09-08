// REDEEM VARIABLES
const redeemInput = document.getElementById('redeem-input')
const redeemButton = document.getElementById('redeem-button')

// RESULT VARIABLES
const resultIcon = document.getElementById('result-icon')
const correctIconSrc = './img/correct-icon.png'
const wrongIconSrc = './img/wrong-icon.png'

const resultMessage = document.getElementById('result-message')
const wrongBgColor = '#ff6347';
const correctBgColor = '#90ee90';

// VALID CODES 
import codes from "./codes.js"

const checkCode = (code) => {
    for(let i = 0; i < codes.length; ++i) {
        if(codes[i] === code) {
            return true
        }
    }

    return false
}

// REDEEM 
redeemButton.addEventListener('click', () => {
    if(redeemInput.value) { //checks if the input is not empty
        if(checkCode(redeemInput.value)) { //checks if the code is valid
            resultMessage.textContent = 'VALID CODE'
            resultMessage.style.backgroundColor = correctBgColor
            
            resultIcon.setAttribute('src', correctIconSrc)
        }
        else {
            resultMessage.textContent = 'INVALID CODE'
            resultMessage.style.backgroundColor = wrongBgColor
            
            resultIcon.setAttribute('src', wrongIconSrc)
        }

        resultMessage.className = 'result-message-intro'
        resultIcon.className = 'result-image-intro'

        setTimeout(() => {
            resultMessage.className = 'result-message-out'
            resultIcon.className = 'result-image-out'
            redeemInput.value = ''
        }, 2300)
    }
})