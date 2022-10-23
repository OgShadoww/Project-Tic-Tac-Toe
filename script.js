// create main variable
const selectBox = document.querySelector('.select-box')
const playerX = selectBox.querySelector('.playerX')
const playerO = selectBox.querySelector('.playerO')
const playBoard = document.querySelector('.play-board')
const allBox = document.querySelectorAll('section span')
const players = document.querySelector('.players')
const resultBox = document.querySelector('.result-box')
const replayBtn = resultBox.querySelector('button')
const wonText = resultBox.querySelector('.won-text')

window.onload = () => { // once window load
    allBox.forEach(item => {
        item.setAttribute('onclick', 'clickedBox(this)') // add onclick attribute
    })
    
    playerX.addEventListener('click', () => {
        selectBox.classList.add('hide') // hide the select box on playerX button clicked
        playBoard.classList.add('show') // show the playboard sections on playerX button clicked
    })
    
    playerO.addEventListener('click', () => {
        selectBox.classList.add('hide') // hide the select box on playerO button clicked
        playBoard.classList.add('show') // show the playboard sections on playerO button clicked
        players.setAttribute('class', 'players active player') // add three class name in player element
    })
}

let playerXIcon = 'fas fa-times' // class name font awesome
let playerOIcon = 'far fa-circle' // class name font awesome
let playerSing = 'X'
let runBot = true;

// user click
function clickedBox (element) {
    if(players.classList.contains('player')) {
        element.innerHTML = `<i class="${playerOIcon}"></i>` // add circle in element what user clicked
        players.classList.add('active')
        playerSing = 'O'
        element.setAttribute('id', playerSing)
    }else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`// add cross in element what user clicked
        players.classList.add('active')
        element.setAttribute('id', playerSing)
    }
    selectWinner() // calling the winner function
    element.style.pointerEvents = 'none'
    playBoard.style.pointerEvents = 'none'
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed()
    setTimeout(() => {
        bot(runBot)
    }, randomDelayTime)
}

// bot click
function bot (runBot) {
    if(runBot ) {
    playerSing = 'O'
    let array = [] // create empty array, in this array we add index of all unselected element
    for(let i = 0; i < allBox.length; i++) {
        if(allBox[i].childElementCount == 0) { // if span has no any child element
            array.push(i) // add index unselected element
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected box
    if(array.length > 0) {
        if(players.classList.contains('player')) {
            allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>` // add cross in element what user clicked
            players.classList.remove('active')
            playerSing = 'X'
            allBox[randomBox].setAttribute('id', playerSing)
        }else {
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`// add circle in element what user clicked
            players.classList.remove('active')
            allBox[randomBox].setAttribute('id', playerSing)
        }
        selectWinner() // calling the winner function
    }
    allBox[randomBox].style.pointerEvents = 'none'
    playBoard.style.pointerEvents = 'auto'
    playerSing = 'X'
    }
}
// let work a select winner
function getClass (idname) {
    return document.querySelector('.box' + idname).id // returning id name
}

function checkClass(val1, val2, val3, sing) {
    if(getClass(val1) == sing && getClass(val2) == sing && getClass(val3) == sing ) {
        return true
    }
}
function selectWinner () {
    if(checkClass(1,2,3, playerSing) || checkClass(4,5,6, playerSing) || checkClass(7,8,9, playerSing) || checkClass(1,4,7, playerSing) || checkClass(2,5,8, playerSing) ||  checkClass(3,6,9, playerSing) || checkClass(1,5,9, playerSing) || checkClass(3,5,7, playerSing)) {
        // after end stop the bot
        runBot = false 
        bot(runBot)
        // we'll delay to show result box 
        setTimeout(() => {
            playBoard.classList.remove('show')
            resultBox.classList.add('show')
        }, 1000 ); //700ms delay

        wonText.innerHTML = `Player ${playerSing} WIIN!!!`
    }else {
        // if draw
        if(getClass(1) !== '' && getClass(2) !== '' && getClass(3) !== '' && getClass(4) !== '' && getClass(5) !== '' && getClass(6) !== '' && getClass(7) !== '' && getClass(8) !== '' && getClass(9) !== '') {
            runBot = false 
            bot(runBot)
            // we'll delay to show result box 
            setTimeout(() => {
                playBoard.classList.remove('show')
                resultBox.classList.add('show')
            }, 1000 ); //700ms delay

            wonText.innerHTML = `Match has been Drawn!!!!, You need to play it again`
        }
    }
}

replayBtn.addEventListener('click', () => {
    window.location.reload()
})