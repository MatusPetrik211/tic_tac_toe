const GameBoard = (function(){
    let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    function checkBoard(board) {
        if(board[0] === board[1] && board[1] === board[2] ||
           board[3] === board[4] && board[4] === board[5] ||
           board[6] === board[7] && board[7] === board[8] ||
           board[0] === board[3] && board[3] === board[6] ||
           board[1] === board[4] && board[4] === board[7] ||
           board[2] === board[5] && board[5] === board[8] ||
           board[0] === board[4] && board[4] === board[8] ||
           board[2] === board[4] && board[4] === board[6] ) {
            return true;
        }

        return false;
    }

    return {board, checkBoard};

})();

function GameController() {
    let gameboard = GameBoard.board;
    let count = 0
    const cells = document.querySelectorAll('.cell');
    const results = document.querySelector('.results');
    const turn = document.querySelector('.turn');

    const players = [
        {
            name: 'PlayerX',
            sign: 'X'
        },
        {
            name: 'PlayerO',
            sign: 'O'
        }
    ]

    function placeSign(player, place) {
        if (gameboard[place] in gameboard) {
            gameboard[place] = player.sign;
            return player.sign;
        }
        return null
    }

    function restartGame() {
        gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        cells.forEach((cell) => {
            cell.textContent = '';
        })
        count = 0;
        turn.textContent = ''
    }

    let player = players[0];
    turn.textContent = `Its ${player.name} turn`;

    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            let place = cell.getAttribute('id');
            if(typeof placeSign(player, place) === 'string') {
                cell.textContent = player.sign;
                player = player === players[0] ? players[1] : players[0];
                turn.textContent = `Its ${player.name} turn`;
                count++;
            }
            if(GameBoard.checkBoard(gameboard)) {
                restartGame();
                player = player === players[0] ? players[1] : players[0];
                results.textContent = `${player.name} WON!!!`;  
                setTimeout(() => {
                    results.textContent = ``;  
                }, 3000);  
            }
            if(count === 9) {
                restartGame()
                results.textContent = `DRAW!!!`;
                setTimeout(() => {
                    results.textContent = ``;  
                }, 3000);
                count = 0;  
            }
        })
    });
}

GameController();