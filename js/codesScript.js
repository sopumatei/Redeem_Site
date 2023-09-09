// TIME VARIABLES
const hoursEl = document.getElementById('time-hours')
const minutesEl = document.getElementById('time-minutes')
const secondsEl = document.getElementById('time-seconds')
const interval = 7200000 //time in milliseconds (in this case 2 hours)

let currentDate = new Date
let finishDate = new Date(currentDate.getTime() + interval)
let timeToWait = null

// GET CODE VARIABLES
import codes from '../codes.js'

const getButton = document.getElementById('get-code-button')
let canClick = false
let gotCode = false

const codeText = document.getElementById('code')

// WHEN THE getButton IS CLICKED
getButton.addEventListener('click', () => {
    if(canClick && !gotCode) {
        gotCode = true
        let randomNr = Math.floor(Math.random() * codes.length)
        let displayCode = codes[randomNr]
        codeText.textContent = displayCode
        codeText.style.transform = 'scale(1)'
    }
})

// GET TIME TO WAIT
const getTime = () => {
    if(localStorage.getItem('timeToWait') && JSON.parse(localStorage.getItem('timeToWait')) != "") {
        let date = new Date(JSON.parse(localStorage.getItem('timeToWait'))) 
        timeToWait = date.getTime() - currentDate.getTime()
    }
    else {
        timeToWait = interval
        localStorage.setItem('timeToWait', JSON.stringify(finishDate))
    }
}

getTime()

// TIME ELEMENTS IN MILLISECONDS
let second = 1000
let minute = second * 60
let hour = minute * 60

let textHour = null
let textMinute = null
let textSecond = null

let rightHour = null
let rightMinute = null
let rightSecond = null

const countdown = (valueHour, valueMinute, valueSecond) => {
    //DISPLAY VARIABLES
    textHour = valueHour
    textMinute = valueMinute
    textSecond = valueSecond

    hoursEl.textContent = textHour
    minutesEl.textContent = textMinute
    secondsEl.textContent = textSecond
}

if(timeToWait <= 1000) {
    countdown(0, 0, 0)
}
else {
    countdown(Math.floor(timeToWait / hour), Math.floor((timeToWait % hour) / minute), Math.floor(((timeToWait % hour) % minute) / second))
}

// RESET TIMER VARIABLES
const resetButton = document.getElementById('reset-time-button')

let timeCountdown = setInterval(() => {
    if(timeToWait <= 1000) {
        console.log('finsihed');
        countdown(0, 0, 0)
        canClick = true
        getButton.style.opacity = '1'
        getButton.className = 'canClick'
        clearInterval(timeCountdown)
        resetButton.style.transform = 'scale(1)'
    }
    else {
        timeToWait -= 1000
        rightHour = Math.floor(timeToWait / hour)
        rightMinute = Math.floor((timeToWait % hour) / minute)
        rightSecond = Math.floor(((timeToWait % hour) % minute) / second)
        countdown(rightHour, rightMinute, rightSecond)
    }
    // console.log(`Hours: ${textHour} Minutes: ${textMinute} Seconds: ${textSecond}`)
}, 1000)

// WHEN THE resetButton IS CLICKED
resetButton.addEventListener('click', () => {
    // RESET TIMER
    currentDate = new Date
    finishDate = new Date(currentDate.getTime() + interval)
    localStorage.setItem('timeToWait', JSON.stringify(""))
    getTime()

    // RESET GET CODE BUTTON
    canClick = false
    getButton.style.opacity = '0.6'
    getButton.className = ''
    resetButton.style.transform = 'scale(0)'

    // RESET CODE TEXT
    codeText.textContent = ''
    codeText.style.transform = 'scale(0)'

    let timeCountdown = setInterval(() => {
        if(timeToWait <= 0) {
            countdown(0, 0, 0)
            canClick = true
            getButton.style.opacity = '1'
            getButton.className = 'canClick'
            clearInterval(timeCountdown)
            resetButton.style.transform = 'scale(1)'
        }
        else {
            timeToWait -= 1000
            rightHour = Math.floor(timeToWait / hour)
            rightMinute = Math.floor((timeToWait % hour) / minute)
            rightSecond = Math.floor(((timeToWait % hour) % minute) / second)
            countdown(rightHour, rightMinute, rightSecond)
        }
        console.log(`Hours: ${textHour} Minutes: ${textMinute} Seconds: ${textSecond}`)
    }, 1000)
})