const game = (function () {
	// board
	let gameBoard = {
		board: {
			tl: null,
			tm: null,
			tr: null,
			l: null,
			m: null,
			r: null,
			bl: null,
			bm: null,
			br: null,
		},
		setBoard: function (player, gameBoard, position) {
			const { name, wins, symbol } = player.info();
			gameBoard.board[position] = symbol;
			return gameBoard;
		},
		clearBoard: function () {
			gameBoard.board = {
				tl: null,
				tm: null,
				tr: null,
				l: null,
				m: null,
				r: null,
				bl: null,
				bm: null,
				br: null,
			};
		},
	};
	const getBoard = () => {
		return gameBoard.board;
	};
	const getBoardStatus = (position) => {
		return gameBoard.board.position;
	};

	// logic
	let gameController = {
		gameState: {
			allPlayers: {},
			curPlayer: {},
			turnNumber: 0,
			gameStart: false,
			gameEnd: false,
			gameWinner: null,
		},
		excludedLines: { row: {}, column: {}, diagonal: {} },
		validPosition: function (position) {
			return game.getBoardStatus(position) === null;
		},
		check: function (gameBoard, player) {
			const { name, wins, symbol } = player.info();

			let winningLines = {
				row: {
					top: [gameBoard.board.tl, gameBoard.board.tm, gameBoard.board.tr],
					middle: [gameBoard.board.l, gameBoard.board.m, gameBoard.board.r],
					bottom: [gameBoard.board.bl, gameBoard.board.bm, gameBoard.board.br],
				},
				column: {
					left: [gameBoard.board.tl, gameBoard.board.l, gameBoard.board.bl],
					middle: [gameBoard.board.tm, gameBoard.board.m, gameBoard.board.bm],
					right: [gameBoard.board.tr, gameBoard.board.r, gameBoard.board.br],
				},
				diagonal: {
					topleftbottomright: [
						gameBoard.board.tl,
						gameBoard.board.m,
						gameBoard.board.br,
					],
					bottomlefttopright: [
						gameBoard.board.bl,
						gameBoard.board.m,
						gameBoard.board.tr,
					],
				},
			};

			//only check if not in excludedLines
			if (!gameController.excludedLines.row.top === true) {
				// only check when all positions filled
				if (!winningLines.row.top.some((pos) => pos === null)) {
					// check whether all positions are filled by the same symbol, if yes, return true else add excludedLine
					winningLines.row.top.every((pos) => pos === symbol)
						? (gameController.gameState.gameEnd = true)
						: (gameController.excludedLines.row.top = true);
				}
			}
			if (!gameController.excludedLines.row.middle === true) {
				// only check when all positions filled
				if (!winningLines.row.middle.some((pos) => pos === null)) {
					// check whether all positions are filled by the same symbol, if yes, return true else add excludedLine
					winningLines.row.middle.every((pos) => pos === symbol)
						? (gameController.gameState.gameEnd = true)
						: (gameController.excludedLines.row.middle = true);
				}
			}
			if (!gameController.excludedLines.row.bottom === true) {
				// only check when all positions filled
				if (!winningLines.row.bottom.some((pos) => pos === null)) {
					// check whether all positions are filled by the same symbol, if yes, return true else add excludedLine
					winningLines.row.bottom.every((pos) => pos === symbol)
						? (gameController.gameState.gameEnd = true)
						: (gameController.excludedLines.row.bottom = true);
				}
			}
			if (!gameController.excludedLines.column.left === true) {
				// only check when all positions filled
				if (!winningLines.column.left.some((pos) => pos === null)) {
					// check whether all positions are filled by the same symbol, if yes, return true else add excludedLine
					winningLines.column.left.every((pos) => pos === symbol)
						? (gameController.gameState.gameEnd = true)
						: (gameController.excludedLines.column.left = true);
				}
			}
			if (!gameController.excludedLines.column.middle === true) {
				// only check when all positions filled
				if (!winningLines.column.middle.some((pos) => pos === null)) {
					// check whether all positions are filled by the same symbol, if yes, return true else add excludedLine
					winningLines.column.middle.every((pos) => pos === symbol)
						? (gameController.gameState.gameEnd = true)
						: (gameController.excludedLines.column.middle = true);
				}
			}
			if (!gameController.excludedLines.column.right === true) {
				// only check when all positions filled
				if (!winningLines.column.right.some((pos) => pos === null)) {
					// check whether all positions are filled by the same symbol, if yes, return true else add excludedLine
					winningLines.column.right.every((pos) => pos === symbol)
						? (gameController.gameState.gameEnd = true)
						: (gameController.excludedLines.column.right = true);
				}
			}
			if (!gameController.excludedLines.diagonal.topleftbottomright === true) {
				// only check when all positions filled
				if (
					!winningLines.diagonal.topleftbottomright.some((pos) => pos === null)
				) {
					// check whether all positions are filled by the same symbol, if yes, return true else add excludedLine
					winningLines.diagonal.topleftbottomright.every(
						(pos) => pos === symbol,
					)
						? (gameController.gameState.gameEnd = true)
						: (gameController.excludedLines.diagonal.topleftbottomright = true);
				}
			}
			if (!gameController.excludedLines.diagonal.bottomlefttopright === true) {
				// only check when all positions filled
				if (
					!winningLines.diagonal.bottomlefttopright.some((pos) => pos === null)
				) {
					// check whether all positions are filled by the same symbol, if yes, return true else add excludedLine
					winningLines.diagonal.bottomlefttopright.every(
						(pos) => pos === symbol,
					)
						? (gameController.gameState.gameEnd = true)
						: (gameController.excludedLines.diagonal.bottomlefttopright = true);
				}
			}
			return gameController.gameState.gameEnd;
		},
		play: function (position) {
			if (gameController.validPosition(position)) {
				// if not valid position, return gameBoard in it's current state
				console.log('pick new position');
				return gameBoard;
			} else {
				// play the move
				// console.log(gameController.gameState.curPlayer, gameBoard, position);
				newBoard = gameBoard.setBoard(
					gameController.gameState.curPlayer,
					gameBoard,
					position,
				);
				newBoardLayout = gameBoard.board;
				gameController.turnNumber++;
				const { player1, player2 } = gameController.gameState.allPlayers;
				return newBoard;
			}
		},
	};
	const endGame = () => {
		gameController.gameState.gameStart = false;
		gameController.gameState.gameWinner =
			gameController.gameState.curPlayer.info().name;
	};
	const initialise = (allPlayers) => {
		const { player1, player2 } = allPlayers;
		gameController.gameState.gameEnd = false;
		gameController.gameState.gameWinner = null;
		gameController.gameState.gameStart = true;
		gameController.gameState.turnNumber = 1;
		gameController.gameState.allPlayers = allPlayers;
		gameController.gameState.curPlayer = player1;
		displayController.showPlayerInfo();
		displayController.updateTurn();
		displayController.updateWinner();
	};
	const playTurn = (position) => {
		if (!gameController.gameState.gameEnd) {
			const allPlayers = gameController.gameState.allPlayers;
			const { player1, player2 } = gameController.gameState.allPlayers;
			const curPlayer = gameController.gameState.curPlayer;
			const newBoard = gameController.play(position);
			gameController.check(newBoard, curPlayer);
			if (!gameController.gameState.gameEnd) {
				gameController.gameState.curPlayer = // change current player
					gameController.gameState.curPlayer === player1 ? player2 : player1;
			} else {
				console.log(gameController.gameState.curPlayer);
				gameController.gameState.curPlayer.win();
			}
		}
		displayController.updateBoard(newBoard);
		displayController.updateTurn();
		displayController.updateWinner();
	};

	const getCurrentPlayer = () => gameController.gameState.curPlayer;
	const getTurnNumber = () => gameController.gameState.turnNumber;
	const getGameStart = () => gameController.gameState.gameStart;
	const getGameEnd = () => gameController.gameState.gameEnd;
	const getWinner = () => gameController.gameState.gameWinner;
	const restart = () => {
		gameBoard.clearBoard();
		displayController.clearBoard();
		initialise(gameController.gameState.allPlayers);
	};
	// player
	const createPlayer = (playerName) => {
		let playerInfo = {
			name: playerName,
			wins: 0,
			symbol: '',
		};
		return {
			info: () => playerInfo,
			win: () => {
				game.getGameEnd() && game.getGameStart()
					? ++playerInfo.wins
					: console.log('naughty');
				game.endGame();
			},
			setName: (name) => (playerInfo.name = name),
			setSymbol: (symbol) => (playerInfo.symbol = symbol),
		};
	};

	return {
		getBoard,
		getBoardStatus,
		getGameStart,
		getGameEnd,
		getCurrentPlayer,
		getTurnNumber,
		getWinner,
		createPlayer,
		initialise,
		playTurn,
		restart,
		endGame,
	};
})();

// Display
const displayController = (function () {
	const divCollection = {
		curPlayerDiv: document.getElementById('current-player'),
		player1Div: document.getElementById('player1-name'),
		player2Div: document.getElementById('player2-name'),
		turnNumberDiv: document.getElementById('turn-number'),
		winnerDiv: document.getElementById('winner'),
	};
	const updateBoard = (gameBoard) => {
		let b = game.getBoard();
		let positions = Object.keys(b);
		positions.forEach(
			(position) =>
				(document.getElementsByClassName(position)[0].innerHTML =
					b[position] === null ? '-' : b[position]),
		);
	};
	const clearBoard = (gameBoard) => {
		let b = game.getBoard();
		let positions = Object.keys(b);
		positions.forEach(
			(position) =>
				(document.getElementsByClassName(position)[0].innerHTML =
					b[position] !== '-' ? '-' : '-'),
		);
	};
	const updateWinner = () => {
		divCollection.winnerDiv.innerHTML = `${game.getWinner()}`;
	};
	const updateTurn = () => {
		if (
			divCollection.curPlayerDiv.innerHTML ===
			divCollection.player1Div.innerHTML
		) {
			divCollection.player2Div.classList.remove('current-player');
			divCollection.player1Div.classList.add('current-player');
		} else {
			divCollection.player1Div.classList.remove('current-player');
			divCollection.player2Div.classList.add('current-player');
		}
		divCollection.turnNumberDiv.innerHTML = `${game.getTurnNumber()}`;
	};
	const showPlayerInfo = () => {
		const { name: p1name, wins: p1wins, symbol: p1symbol } = player1.info();
		const { name: p2name, wins: p2wins, symbol: p2symbol } = player2.info();
		// const { p2name: name, wins, symbol } = player2.info();
		document.getElementById('player1-name').innerHTML = `${p1name}`;
		document.getElementById('player1-wins').innerHTML = `${p1wins}`;
		document.getElementById('player1-symbol').innerHTML = `${p1symbol}`;
		document.getElementById('player2-name').innerHTML = `${p2name}`;
		document.getElementById('player2-wins').innerHTML = `${p2wins}`;
		document.getElementById('player2-symbol').innerHTML = `${p2symbol}`;
	};
	return { updateBoard, updateWinner, updateTurn, showPlayerInfo, clearBoard };
})();

// // Main

// //create players
const player1 = game.createPlayer('bob');
const player2 = game.createPlayer('alice');
// set symbols
player1.setSymbol('x');
player2.setSymbol('o');
// // initialise game
game.initialise({ player1, player2 });

//play game 1
game.playTurn('tl');
game.playTurn('tm');
game.playTurn('l');
game.playTurn('tr');
game.playTurn('bl');
game.restart();
game.playTurn('tl');
game.playTurn('tm');
game.playTurn('l');
game.playTurn('tr');
game.playTurn('bl');
game.restart();
game.playTurn('tl');
game.playTurn('tm');
game.playTurn('l');
game.playTurn('tr');
game.playTurn('bl');
