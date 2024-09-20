const board = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cellIndex = event.target.getAttribute('data-index');
    if (gameState[cellIndex] || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.style.color = currentPlayer === 'X' ? '#ff6600' : '#0055ff';

    checkWinner();
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Player ${currentPlayer} wins! It's a game!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes(null)) {
        message.textContent = `It's a draw! It's a game!`;
        gameActive = false;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameState = Array(9).fill(null);
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;
    board.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '#333';
    });
}

board.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

message.textContent = `Player ${currentPlayer}'s turn`;
