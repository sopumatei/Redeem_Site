// LOCAL STORAGE REDEEMED CODES
let redeemedCodes = []

const getRedeemedCodes = () => {
    if(localStorage.getItem('redeemedCodes')){
        redeemedCodes = JSON.parse(localStorage.getItem('redeemedCodes'))
    }
}

const setRedeemedCodes = () => {
    console.log('code stored');
    localStorage.setItem('redeemedCodes', JSON.stringify(redeemedCodes))
}

getRedeemedCodes()

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

const checkIfRedeemed = (code) => {
    for(let i = 0; i < redeemedCodes.length; ++i) {
        if(redeemedCodes[i] == code) {
            return true
        }
    }

    return false
}

// REDEEM 
redeemButton.addEventListener('click', () => {
    if(redeemInput.value) { //checks if the input is not empty
        if(checkCode(redeemInput.value) && !checkIfRedeemed(redeemInput.value)) { //checks if the code is valid or it hasn't already been redeemed
            redeemedCodes.push(redeemInput.value)
            setRedeemedCodes()

            resultMessage.textContent = 'VALID CODE'
            resultMessage.style.backgroundColor = correctBgColor
            
            resultIcon.setAttribute('src', correctIconSrc)
        }
        else if (checkCode(redeemInput.value) && checkIfRedeemed(redeemInput.value)) {
            resultMessage.textContent = 'ALREADY REDEEMED'
            resultMessage.style.backgroundColor = wrongBgColor
            
            resultIcon.setAttribute('src', wrongIconSrc)
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
        }, 1800)
    }
})

// COPYRIGHT
const copyrightText= document.getElementById('copyright-text')
const currentDate = new Date
copyrightText.textContent = `All rights reserved ${currentDate.getFullYear()} © Giani's Codes`