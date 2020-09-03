// constants
const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
// cell query
let cells = document.querySelectorAll("[data-cell]");
// board query
const board = document.querySelector(".board");
//winning message element
const winningMessage = document.querySelector("#winning-message");
const winningMessageText = document.querySelector("#winning-message-text")
//restart button
const restartBtn = document.querySelector("#restart-btn")
// winning combination 
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//let global variables 
let circleTurn;


//start game
startGame();


//restart button 
restartBtn.addEventListener("click", function(){
    //remove show class
    winningMessage.classList.remove("show");

    startGame();
})

//start game initially
function startGame() {
    setBoardHoverClass();
    //add Event to cell
    cells.forEach( cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        
        cell.addEventListener("click", handleClick, { once: true});
    })
    
}

function handleClick(e) {
    let cell = e.target;
    let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;


    //place mark 
    placeMark(cell, currentClass);
    
    if (checkWin(currentClass)){
        endGame(false, currentClass);
        
    } else if (isDraw()) {
        endGame(true, currentClass);
    } else {
        //swap turn 
        swapTurn();
        //hover board class for turn
        setBoardHoverClass();
    }
}

// place a mark
function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}


//swap turns 
function swapTurn(){
    circleTurn = !circleTurn;
}


//set board hover class
function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);

    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

// check for win
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some( combination => {
        return combination.every( index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}


// check for draw
function isDraw(){
    return Array.from(cells).every( cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}


//end game 
function endGame(draw, currentClass) {
    if (!draw) {
        winningMessageText.textContent = `${ currentClass == CIRCLE_CLASS ?"O's Wins!" : "X's Wins!"}`;

    } else {
        winningMessageText.textContent = `Draw`;
    }

    winningMessage.classList.add("show");
}