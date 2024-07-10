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
		return gameBoard.board[position];
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
		excludedLines: {
			row: { top: false, middle: false, right: false },
			column: { left: false, middle: false, bottom: false },
			diagonal: { topleftbottomright: false, bottomlefttopright: false },
		},
		validPosition: function (position) {
			console.log(game.getBoardStatus(position) === null ? true : false);
			return game.getBoardStatus(position) === null ? true : false;
		},
		check: function () {
			const symbol = gameController.gameState.curPlayer.info().symbol;
			console.log(`symbol: ${symbol}`);
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
			if (gameController.gameState.gameEnd !== true) {
				if (!gameController.validPosition(position)) {
					return false;
				} else {
					gameBoard.setBoard(
						gameController.gameState.curPlayer,
						gameBoard,
						position,
					);
					newBoardLayout = gameBoard.board;
					gameController.gameState.turnNumber++;
					gameController.check();
					return true;
				}
			}
		},
		endGame: function (win) {
			gameController.gameState.gameStart = false;
			if (win) {
				gameController.gameState.gameWinner =
					gameController.gameState.curPlayer.info().name;
			} else {
				gameController.gameState.gameWinner = 'Draw';
			}
		},
	};

	const initialise = (player1, player2) => {
		gameController.gameState.gameEnd = false;
		gameController.gameState.gameWinner = null;
		gameController.gameState.gameStart = true;
		gameController.gameState.turnNumber = 1;
		gameController.gameState.allPlayers = { player1, player2 };
		gameController.gameState.curPlayer = player1;
	};
	const playTurn = (position) => {
		const validMove = gameController.play(position);
		const gameEnd = gameController.gameState.gameEnd;
		if (validMove) {
			if (gameController.gameState.turnNumber > 9) {
				gameController.endGame(false);
			}
			if (!gameController.gameState.gameStart === false) {
			}
			if (!gameEnd && gameController.gameState.gameStart === true) {
				gameController.gameState.curPlayer = // change current player
					gameController.gameState.curPlayer === player1 ? player2 : player1;
			}
			console.log(gameEnd);
			if (gameEnd) {
				gameController.gameState.curPlayer.win();
				gameController.endGame(true);
			}
		}
	};

	const getCurrentPlayer = () => gameController.gameState.curPlayer;
	const getTurnNumber = () => gameController.gameState.turnNumber;
	const getGameStart = () => gameController.gameState.gameStart;
	const getGameEnd = () => gameController.gameState.gameEnd;
	const getWinner = () => gameController.gameState.gameWinner;
	const restart = (player1, player2) => {
		gameBoard.clearBoard();
		displayController.clearBoard();
		gameController.excludedLines = {
			row: { top: false, middle: false, right: false },
			column: { left: false, middle: false, bottom: false },
			diagonal: { topleftbottomright: false, bottomlefttopright: false },
		};
		initialise(player1, player2);
	};
	// player
	const createPlayer = () => {
		let playerInfo = {
			name: '',
			wins: 0,
			symbol: '',
		};
		return {
			info: () => playerInfo,
			win: () => {
				game.getGameEnd() && game.getGameStart()
					? ++playerInfo.wins
					: console.log('how did this happen');
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
	};
})();

const divCollection = {
	curPlayerDiv: document.getElementById('current-player'),
	player1Input: document.getElementById('player1-name-input'),
	player2Input: document.getElementById('player2-name-input'),
	player1Div: document.getElementById('player1-name'),
	player2Div: document.getElementById('player2-name'),
	turnNumberDiv: document.getElementById('turn-number'),
	winnerDiv: document.getElementById('winner'),
	startGameButton: document.getElementById('start-game'),
	resetGameButton: document.getElementById('reset-game'),
	toggleNameButton: document.getElementById('toggle-name'),
};

// Display
const displayController = (function () {
	const updateDisplay = () => {
		updateBoard();
		updateTurn();
		updateWinner();
		showPlayerInfo();
	};
	const updateBoard = () => {
		let b = game.getBoard();
		let positions = Object.keys(b);
		positions.forEach((position) => {
			document.getElementById(position).innerHTML =
				b[position] === null ? '-' : b[position];
			if (b[position] === 'x') {
				document.getElementById(
					position,
				).innerHTML = `<i class='game-symbol fa-solid fa-x'></i>`;
			}
			if (b[position] === 'o') {
				document.getElementById(
					position,
				).innerHTML = `<i class='game-symbol fa-solid fa-o'></i>`;
			}
		});
	};
	const clearBoard = () => {
		let b = game.getBoard();
		let positions = Object.keys(b);
		positions.forEach(
			(position) =>
				(document.getElementById(position).innerHTML =
					b[position] !== '-' ? '-' : '-'),
		);
	};
	const updateWinner = () => {
		if (game.getWinner() === 'Draw') {
			divCollection.winnerDiv.innerHTML = `Draw`;
			document.getElementById(
				'error-message',
			).innerHTML = `Game over, reset to play again`;
		} else if (game.getWinner() !== null) {
			divCollection.winnerDiv.innerHTML = `${game.getWinner()} wins!`;
		}
	};
	const updateTurn = () => {
		divCollection.curPlayerDiv.innerHTML = `${
			game.getCurrentPlayer().info().name
		}`;
		if (game.getCurrentPlayer() === player1) {
			divCollection.player2Div.classList.remove('current-player');
			divCollection.player1Div.classList.add('current-player');
		} else {
			divCollection.player1Div.classList.remove('current-player');
			divCollection.player2Div.classList.add('current-player');
		}
		divCollection.turnNumberDiv.innerHTML = `Turn: ${game.getTurnNumber()}`;
		return game.getTurnNumber();
	};
	const validPlayerNames = () => {
		const player1NameMissing = divCollection.player1Input.value.trim() === '';
		const player2NameMissing = divCollection.player2Input.value.trim() === '';
		let bothValid = false;

		player1NameMissing
			? divCollection.player1Input.classList.add('highlight')
			: divCollection.player1Input.classList.remove('highlight');

		player2NameMissing
			? divCollection.player2Input.classList.add('highlight')
			: divCollection.player1Input.classList.remove('highlight');

		!player1NameMissing && !player2NameMissing
			? (bothValid = true)
			: (bothValid = false);

		return bothValid;
	};

	const showPlayerInfo = () => {
		const { name: p1name, wins: p1wins, symbol: p1symbol } = player1.info();
		const { name: p2name, wins: p2wins, symbol: p2symbol } = player2.info();

		document.getElementById('player1-name').innerHTML = `${p1name}`;
		document.getElementById('player1-wins').innerHTML = `Wins: ${p1wins}`;
		document.getElementById('player2-name').innerHTML = `${p2name}`;
		document.getElementById('player2-wins').innerHTML = `Wins: ${p2wins}`;
		return true;
	};

	return {
		updateDisplay,
		validPlayerNames,
		clearBoard,
	};
})();

// // Main
let player1 = game.createPlayer();
let player2 = game.createPlayer();

document
	.getElementsByClassName('gameBoard')[0]
	.addEventListener('click', (e) => {
		let choice = e.target.id;
		if (game.getGameStart()) {
			document.getElementById('error-message').innerHTML = '';
		} else if (!game.getGameStart() && game.getGameEnd()) {
			displayController.validPlayerNames();
			document.getElementById(
				'error-message',
			).innerHTML = `Game over, reset to play again`;
		} else {
			displayController.validPlayerNames();
			document.getElementById(
				'error-message',
			).innerHTML = `Press start to play`;
		}
		displayController.updateDisplay();
	});

divCollection.startGameButton.onclick = () => {
	if (!displayController.validPlayerNames()) {
		document.getElementById('error-message').innerHTML =
			'Error: Missing player names';
		return false;
	} else {
		document.getElementById('error-message').innerHTML = '';
	}
	divCollection.player1Input.hidden = true;
	divCollection.player2Input.hidden = true;
	divCollection.player1Div.hidden = false;
	divCollection.player2Div.hidden = false;
	player1.setSymbol('x');
	player2.setSymbol('o');
	game.initialise(player1, player2);
	divCollection.startGameButton.hidden = true;
	divCollection.resetGameButton.hidden = false;
	displayController.updateDisplay();
};

divCollection.resetGameButton.onclick = () => {
	if (game.getTurnNumber() > 1) {
		divCollection.player1Div.classList.remove('current-player');
		divCollection.player2Div.classList.remove('current-player');
		game.restart(player1, player2);
		document.getElementById('error-message').innerHTML = ``;
		divCollection.winnerDiv.innerHTML = ``;
		displayController.updateDisplay();
	} else {
		document.getElementById(
			'error-message',
		).innerHTML = `Error: Can't reset on first round`;
	}
};

divCollection.player1Input.onkeyup = () => {
	player1.setName(divCollection.player1Input.value);
};
divCollection.player2Input.onkeyup = () => {
	player2.setName(divCollection.player2Input.value);
};

divCollection.player1Div.onclick = () => {
	const hidden = divCollection.player1Input.hidden;
	if (hidden) {
		divCollection.player1Input.hidden = false;
		divCollection.player1Div.classList.remove('current-player');
		divCollection.player1Div.innerHTML = 'save changes';
	} else {
		divCollection.player1Input.hidden = true;
		displayController.updateDisplay();
	}
};

divCollection.player2Div.onclick = () => {
	const hidden = divCollection.player2Input.hidden;
	if (hidden) {
		divCollection.player2Input.hidden = false;
		divCollection.player2Div.classList.remove('current-player');
		divCollection.player2Div.innerHTML = 'save changes';
	} else {
		divCollection.player2Input.hidden = true;
		displayController.updateDisplay();
	}
};
