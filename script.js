

const gridSizeElement = document.getElementById('gridSize');
let GRID_COUNT = Number(gridSizeElement.value);

gridSizeElement.addEventListener('change', (e) => {
    GRID_COUNT = Number(e.target.value);
    renderBoard();
})

const FONT_BASED_ON_GRID_COUNT = {
    3: '100px',
    4: "90px",
    5: "70px",
    6: "60px",
    7: "50px",
    8: "40px",
    9: "30px",
    10: "25px",
    11: "20px",
    12: "18px",
    13: "16px",
    14: "14px",
    15: "12px",
}



let board = [];

let xWins = 0;
let oWins = 0;
let draw = 0;

const PLAYER = {
    X: 'X',
    O: 'O'
}

let isGameOver = false;

let currentPlayer = PLAYER.X;
let xIcon = `<iconify-icon style="font-size:${FONT_BASED_ON_GRID_COUNT[GRID_COUNT]}" icon="fa6-solid:x"></iconify-icon>`
let oIcon = `<iconify-icon style="font-size:${FONT_BASED_ON_GRID_COUNT[GRID_COUNT]}" icon="fa6-solid:o"></iconify-icon>`

const xTurnIcon = '<iconify-icon icon="fa6-solid:x"></iconify-icon>'
const oTurnIcon = '<iconify-icon icon="fa6-solid:o"></iconify-icon>'


const boardHTML = document.getElementById('board');

const boardRow = document.createElement('div');
boardRow.className = 'board__row';

let winningRow = [];


const checkWin = () => {

    let isWinInDiagonalLeft = true;
    let isWinInDiagonalRight = true;

    const winningRowTempDiagonalLeft = [];
    const winningRowTempDiagonalRight = [];
    for (let i = 0; i < GRID_COUNT; i++) {

        let isWinInHorizontal = true;
        let isWinInVertical = true;

        const winningRowTempHorizontal = [];
        const winningRowTempVertical = [];

        for (let j = 0; j < GRID_COUNT - 1; j++) {

            
            if (board[i][j] !== board[i][j + 1] || board[i][j] === '') {
                isWinInHorizontal = false;
            }

            if (board[j][i] !== board[j+1][i] || board[j][i] === ''){
                isWinInVertical = false;
            }

            winningRowTempHorizontal.push([i, j])
            winningRowTempVertical.push([j, i])
        }
        winningRowTempHorizontal.push([i, GRID_COUNT - 1])
        winningRowTempVertical.push([GRID_COUNT - 1, i])

        
        if (isWinInHorizontal){
            winningRow = winningRowTempHorizontal;
            return true;
        }

        if (isWinInVertical){
            winningRow = winningRowTempVertical;
            return true;
        }

        if (i < GRID_COUNT - 1 && (board[i][i] !== board[i+1][i+1] || board[i][i] === '')){
            isWinInDiagonalLeft = false;
        }

        const currentIdx = GRID_COUNT - 1 - i;
        if (currentIdx > 0 && (board[i][currentIdx] !== board[i + 1][currentIdx - 1] || board[i][currentIdx] === '')){
            isWinInDiagonalRight = false;
        }

        winningRowTempDiagonalLeft.push([i, i])
        winningRowTempDiagonalRight.push([i, currentIdx])
    }
    
    if (isWinInDiagonalLeft){
        winningRow = winningRowTempDiagonalLeft;
        return true;
    }

    if (isWinInDiagonalRight){
        winningRow = winningRowTempDiagonalRight;
        return true;
    }

    return false;
}

const checkDraw = () => {
    for (let i = 0; i < GRID_COUNT; i++) {
        for (let j = 0; j < GRID_COUNT; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

const renderPlayerTurn = () => {
    const turnElement = document.getElementById('player-turn');

    turnElement.innerHTML = '';
    const xDivElement = document.createElement('div');
    const oDivElement = document.createElement('div');

    xDivElement.className = 'player-turn-x';
    oDivElement.className = 'player-turn-o';
    xDivElement.innerHTML = xTurnIcon;
    oDivElement.innerHTML = oTurnIcon;

    if (currentPlayer === PLAYER.X) {
        xDivElement.classList.add('player-turn--current')
    } else {
        oDivElement.classList.add('player-turn--current')
    }
    
    turnElement.appendChild(xDivElement);
    turnElement.appendChild(oDivElement);

}


const renderBoard = () => {
    for (let i = 0; i < GRID_COUNT; i++) {
        board.push(Array(GRID_COUNT).fill(''));
    }
    xIcon = `<iconify-icon style="font-size:${FONT_BASED_ON_GRID_COUNT[GRID_COUNT]}" icon="fa6-solid:x"></iconify-icon>`
    oIcon = `<iconify-icon style="font-size:${FONT_BASED_ON_GRID_COUNT[GRID_COUNT]}" icon="fa6-solid:o"></iconify-icon>`

    const xWinElement = document.getElementById('xWin');
    const oWinElement = document.getElementById('oWin');
    const drawElement = document.getElementById('draw');

    xWinElement.innerHTML = xWins % 2 === 0 ? `${xWins} Wins` : `${xWins} Win`;
    oWinElement.innerHTML = oWins % 2 === 0 ? `${oWins} Wins` : `${oWins} Win`;
    drawElement.innerHTML = draw % 2 === 0 ? `${draw} Draws` : `${draw} Draw`;

    boardHTML.innerHTML = '';
    for (let i = 0; i < GRID_COUNT; i++) {
        const boardRow = document.createElement('div');
        boardRow.className = 'board__row';

        if (i === GRID_COUNT - 1) {
            boardRow.classList.add('board__row--last');
        }

        for (let j = 0; j < GRID_COUNT; j++) {
            console.log()
            const boardSquare = document.createElement('div');
            if (board[i][j] === 'X') {
                boardSquare.className = 'board__square board__square-x';
                boardSquare.innerHTML = xIcon;
            } else if (board[i][j] === 'O') {
                boardSquare.className = 'board__square board__square-o';
                boardSquare.innerHTML = oIcon;
            } else {
                boardSquare.className = 'board__square';
                boardSquare.innerHTML = '';
            }

            if (winningRow){
                // console.log(winningRow)
                for (let k = 0; k < winningRow.length; k++){
                    if (winningRow[k][0] === i && winningRow[k][1] === j){
                        boardSquare.classList.add('board__square--win');
                    }
                }
            }

            boardSquare.setAttribute('data-row', i);
            boardSquare.setAttribute('data-col', j);
            boardSquare.setAttribute('id', `${i}${j}`);
            boardSquare.addEventListener('click', (e) => {
                if (!isGameOver) {
                    const row = e.target.getAttribute('data-row');
                    const col = e.target.getAttribute('data-col');

                    board[row][col] = currentPlayer;
                    if (currentPlayer === PLAYER.X) {
                        currentPlayer = PLAYER.O;
                    } else {
                        currentPlayer = PLAYER.X;
                    }
                    

                    var delayInMilliseconds = 100;

                    if (checkWin()) {
                        if (currentPlayer === PLAYER.X) {
                            oWins++;
                            setTimeout(function() {
                                alert('O win');
                            }, delayInMilliseconds);
                            
                        } else {
                            xWins++;
                            setTimeout(function() {
                                alert('X win');
                            }, delayInMilliseconds);
                            
                        }
                        isGameOver = true;
                    }
                    else if (checkDraw()) {
                        setTimeout(function() {
                            alert('Draw');
                        }, delayInMilliseconds);
                        draw++;
                        isGameOver = true;
                    }
                    renderBoard();
                }
            });
                
            boardRow.appendChild(boardSquare);
        }
        boardHTML.appendChild(boardRow);
    }

    renderPlayerTurn();
}

const resetGameButton = document.getElementById('reset_game');
resetGameButton.addEventListener('click', () => {
    for (let i = 0; i < GRID_COUNT; i++) {
        for (let j = 0; j < GRID_COUNT; j++) {
            board[i][j] = '';
        }
    }
    winningRow.length = 0;
    isGameOver = false;
    renderBoard();
});

const resetScoreButton = document.getElementById('reset_score');
resetScoreButton.addEventListener('click', () => {
    xWins = 0;
    oWins = 0;
    draw = 0;
    renderBoard();
}
);

renderBoard();








