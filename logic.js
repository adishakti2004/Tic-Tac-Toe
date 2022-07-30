alert("Player X Will Play First Everytime")

const X_Class = "x"
const O_Class = "o"
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
    [2, 5, 8], [0, 4, 8], [2, 4, 6]
]
let cellElems = document.querySelectorAll("[data-cell]")
let board = document.getElementById("board")
let winText = document.getElementById("winningText")
let winMsg = document.getElementById("winningScreen")
const restart = document.getElementById("restart")
let x_turn

startGame()

restart.addEventListener("click", startGame)

function startGame(){
    winMsg.classList.remove("show")
    x_turn = true
    cellElems.forEach(cell => {
        cell.classList.remove("o", "x")
        cell.addEventListener("click", handleClick, { once: true })
    })
    switchHoverState()
}

function handleClick(e) {
    const cell = e.target
    let turn = x_turn ? X_Class : O_Class
    placeMark(cell, turn)
     //Check For Win
    if (checkWin(turn)) {
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        //Switch Turns
        switchTurns()
        switchHoverState()
    }
}

function endGame(draw) {
    if (draw) {
        winText.innerHTML = "It's a Draw!"
    } else {
        winText.innerHTML = `Player ${x_turn ? "X" : "O"} wins!`
    }
    winMsg.classList.add("show")
}

function isDraw() {
    return [...cellElems].every(cell => {
        return cell.classList.contains("x") || 
        cell.classList.contains("o")
    })
}

function placeMark(cell, turn) {
    cell.classList.add(turn)
}

function switchTurns(){
    x_turn = !x_turn
}

function switchHoverState(){
    board.classList.remove(X_Class, O_Class)
    if (x_turn) board.classList.add(X_Class)
    else board.classList.add(O_Class)
}

function checkWin(turn) {
    return winningCombos.some(combo => {
        return combo.every(index => {
            return cellElems[index].classList.contains(turn)
        })
    })
}