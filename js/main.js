// Gameboard
const gameBoard = (function () {
    let board = {
        tl: "-",
        tm: "-",
        tr: "-", 
        l: "-",
        m: "-",
        r: "-", 
        bl: "-",
        bm: "-",
        br: "-"
    };
    const getBoard = () => board;
    const validPosition = (position) => {
        return board[position] === '-';
    }
    const setBoard = (player, position) => {    
        const {name, wins, symbol} = player.info();
        board[position] = symbol;
        displayController.updateBoard(position, board[position]);
        return gameBoard;
    }
    return {getBoard,validPosition,setBoard,};
})();

// Game Logic
const gameLogic = (function () {  
    let game = {
        allPlayers: {},
        curPlayer: {},
        turnNumber: 0,
        gameStart: false,
        gameEnd: false,
        gameWinner: null,
        excludedLines: {
            row : {},
            column: {},
            diagonal: {}
        },
        check: function (gameBoard, player1, player2) {
            const p1symbol = player1.info().symbol;
            const p2symbol = player2.info().symbol;

            const {tl, tm, tr, l, m, r, bl, bm, br} = gameBoard.getBoard();
            
            const winningLines = {
                row : {
                    top: [tl, tm, tr],
                    middle: [l, m, r],
                    bottom: [bl, bm, br]
                },
                column : {
                    left: [tl, l, bl],
                    middle: [tm, m, bm],
                    right: [tr, r, br]
                },
                diagonal : {
                    topleftbottomright: [tl, m, br],
                    bottomlefttopright: [bl, m, tr]
                }
            };

            // check all rows
            if (!game.excludedLines.row.top === true) { // only check if not in excludedLines 
                if (!winningLines.row.top.some(pos => pos === "-")) { // only check when all positions filled
                    (winningLines.row.top.every(pos => pos === p1symbol) ? player1.win() : false);
                    (winningLines.row.top.every(pos => pos === p2symbol) ? player2.win() : false);
                    game.excludedLines.row.top = true; // add to excludedLines since all positions filled
                }
            } 

            if (!game.excludedLines.row.middle === true) { // only check if not in excludedLines 
                if (!winningLines.row.middle.some(pos => pos === "-")) { // only check when all positions filled
                    (winningLines.row.middle.every(pos => pos === p1symbol) ? player1.win() : false);
                    (winningLines.row.middle.every(pos => pos === p2symbol) ? player2.win() : false);
                    game.excludedLines.row.middle = true; // add to excludedLines since all positions filled
                }
            } 

            if (!game.excludedLines.row.bottom === true) { // only check if not in excludedLines 
                if (!winningLines.row.bottom.some(pos => pos === "-")) { // only check when all positions filled
                    (winningLines.row.bottom.every(pos => pos === p1symbol) ? player1.win() : false);
                    (winningLines.row.bottom.every(pos => pos === p2symbol) ? player2.win() : false);
                    game.excludedLines.row.bottom = true; // add to excludedLines since all positions filled
                }
            } 

            // check all columns
            if (!game.excludedLines.column.left === true) { // only check if not in excludedLines 
                if (!winningLines.column.left.some(pos => pos === "-")) { // only check when all positions filled
                    (winningLines.column.left.every(pos => pos === p1symbol) ? player1.win() : false);
                    (winningLines.column.left.every(pos => pos === p2symbol) ? player2.win() : false);
                    game.excludedLines.column.left = true; // add to excludedLines since all positions filled
                }
            } 

            if (!game.excludedLines.column.middle === true) { // only check if not in excludedLines 
                if (!winningLines.column.middle.some(pos => pos === "-")) { // only check when all positions filled
                    (winningLines.column.middle.every(pos => pos === p1symbol) ? player1.win() : false);
                    (winningLines.column.middle.every(pos => pos === p2symbol) ? player2.win() : false);
                    game.excludedLines.column.middle = true; // add to excludedLines since all positions filled
                }
            }

            if (!game.excludedLines.column.right === true) { // only check if not in excludedLines 
                if (!winningLines.column.right.some(pos => pos === "-")) { // only check when all positions filled
                    (winningLines.column.right.every(pos => pos === p1symbol) ? player1.win() : false);
                    (winningLines.column.right.every(pos => pos === p2symbol) ? player2.win() : false);
                    game.excludedLines.column.right = true; // add to excludedLines since all positions filled
                }
            }

            // check all diagonals
            if (!game.excludedLines.diagonal.topleftbottomright === true) { // only check if not in excludedLines 
                if (!winningLines.diagonal.topleftbottomright.some(pos => pos === "-")) { // only check when all positions filled
                    (winningLines.diagonal.topleftbottomright.every(pos => pos === p1symbol) ? player1.win() : false);
                    (winningLines.diagonal.topleftbottomright.every(pos => pos === p2symbol) ? player2.win() : false);
                    game.excludedLines.diagonal.topleftbottomright = true; // add to excludedLines since all positions filled
                }
            }

            if (!game.excludedLines.diagonal.bottomlefttopright === true) { // only check if not in excludedLines 
                if (!winningLines.diagonal.bottomlefttopright.some(pos => pos === "-")) { // only check when all positions filled
                    (winningLines.diagonal.bottomlefttopright.every(pos => pos === p1symbol) ? player1.win() : false);
                    (winningLines.diagonal.bottomlefttopright.every(pos => pos === p2symbol) ? player2.win() : false);
                    game.excludedLines.diagonal.bottomlefttopright = true; // add to excludedLines since all positions filled
                }
            }

        },
        play: function (position) {
            if (!gameBoard.validPosition(position)) { // if not valid position, return gameBoard in it's current state
                console.log('pick new position');
                return gameBoard;
            } else { // play the move
                newBoard = gameBoard.setBoard(game.curPlayer, position);
                newBoardLayout = newBoard.getBoard();
                game.turnNumber++;
                const {player1, player2} = game.allPlayers;
                game.curPlayer = (game.curPlayer === player1 ? player2 : player1);
                return newBoard;
            }
        }
    };
    const playTurn = (position) => {   
        const {player1, player2} = game.allPlayers;
        const newBoard = game.play(position); 
        game.check(newBoard, player1, player2);
        displayController.updateTurn();
        displayController.updateWinner();
    }
    const initialise = (allPlayers) => {
        const { player1, player2 } = allPlayers;
        game.gameStart = true;
        game.turnNumber = 1;
        game.allPlayers = allPlayers;
        game.curPlayer = player1;
        displayController.showPlayerInfo();
        displayController.updateTurn();
        displayController.updateWinner();
    }
    const getCurrentPlayer = () => game.curPlayer;
    const getTurnNumber = () => game.turnNumber;
    const getWinner = () => game.gameWinner;
    const setWinner = (playerName) => game.gameWinner = playerName;
    
    return {initialise, playTurn, getCurrentPlayer, getTurnNumber, getWinner, setWinner
    }
})();

// Player
const createPlayer = (playerName) => {
    let playerInfo = {
        name: playerName,
        wins: 0,
        symbol: ""
    }

    return({
        info: () => playerInfo,
        win: () => {
            ++playerInfo.wins;
            gameLogic.setWinner(playerInfo.name);
            return console.log(`congratulations ${playerInfo.name}!`);
        },
        setName: (name) => playerInfo.name = name,
        setSymbol: (symbol) => playerInfo.symbol = symbol,
    })
}

// Display 
const displayController = (function () {
    const updateBoard = (position, symbol) => {
        document.getElementsByClassName(position)[0].innerHTML = symbol;
    }
    const updateTurn = () => {
        document.getElementById('currentPlayer').innerHTML = `${gameLogic.getCurrentPlayer().info().name}`;
        
        if (document.getElementById('currentPlayer').innerHTML === document.getElementById('player1-name').innerHTML) {
            console.log('in if');
            document.getElementById('player2-name').classList.remove('current-player');
            document.getElementById('player1-name').classList.add('current-player');
        } else {
            console.log('in else');
            document.getElementById('player1-name').classList.remove('current-player');
            document.getElementById('player2-name').classList.add('current-player');
        }

        document.getElementById('turnNumber').innerHTML = `${gameLogic.getTurnNumber()}`;
    }
    const updateWinner = () => {
        document.getElementById('winner').innerHTML = `${gameLogic.getWinner()}`;
    }
    const showPlayerInfo = () => {
        const { name: p1name, wins: p1wins, symbol: p1symbol } = player1.info();
        const { name: p2name, wins: p2wins, symbol: p2symbol } = player2.info();
        // const { p2name: name, wins, symbol } = player2.info();
        document.getElementById('player1-name').innerHTML = `${p1name}`;
        document.getElementById('player1-wins').innerHTML = `${p1wins}`;
        document.getElementById('player1-symbol').innerHTML =`${p1symbol}`;
        document.getElementById('player2-name').innerHTML = `${p2name}`;
        document.getElementById('player2-wins').innerHTML = `${p2wins}`;
        document.getElementById('player2-symbol').innerHTML = `${p2symbol}`;
    }
    const updatePlayerInfo = () => {
    }
    return {showPlayerInfo, updateBoard, updateTurn, updateWinner, updatePlayerInfo};
})();

// Main

//create players
const player1 = createPlayer('bob');
const player2 = createPlayer('alice');
// set symbols
player1.setSymbol('x');
player2.setSymbol('o');
// initialise game
gameLogic.initialise({player1, player2});
// gameLogic.playTurn('tl');
// gameLogic.playTurn('tm');
// gameLogic.playTurn('tr');
// gameBoard.setBoard(player1, 'tl');
// gameBoard.setBoard(player2, 'tm');
// gameBoard.setBoard(player1, 'l');
// gameBoard.setBoard(player2, 'm');
// gameBoard.setBoard(player1, 'bl');
