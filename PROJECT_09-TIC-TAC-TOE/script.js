const cells = document.querySelectorAll('.cell');
// FIX 1: Removed the '#' symbols
const statusText = document.getElementById('statusText');
const restartButton = document.getElementById('restartBtn');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let currentPlayer = 'X';
let isRunning = false;
let options = ['', '', '', '', '', '', '', '', ''];

initializeGame();

function initializeGame() {
    // FIX 2: Changed comma to a period
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartButton.addEventListener('click', restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    isRunning = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex'); // works with your current HTML
    if (options[cellIndex] != '' || !isRunning) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell , index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        isRunning = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        isRunning = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    isRunning = true;
}