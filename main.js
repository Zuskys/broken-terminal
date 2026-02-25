import { gameState, startRound, handleGuess } from "./game.js";
import { loadWords } from "./utils.js";

const attempts = document.getElementById("attempts");
const wordList = document.getElementById("word-list");
const resultTxt = document.getElementById("feedback");
const container = document.getElementById("game");

//Elements updates
function render() {
	attempts.textContent = `Attempts: ${gameState.attempts}`;

	wordList.innerHTML = "";

	gameState.visibleWords.forEach((word) => {
		const btn = document.createElement("button");
		btn.textContent = word;
		btn.onclick = () => {
			const outcome = handleGuess(word);
			console.log(gameState.round);
			console.log(gameState.difficulty);

			if (outcome.result === "win") {
				resultTxt.textContent = "Correct!!";
				endGame();
				nextGame();
			} else if (outcome.result === "win the game") {
				resultTxt.textContent = "You win the game!!";
				endGame();
				restartGame(true);
			} else if (outcome.result === "lose") {
				resultTxt.textContent = "You lose...";
				endGame();
				restartGame(false);
			} else {
				resultTxt.textContent = `Resemblance: ${outcome.score}/${outcome.total}`;
				render();
			}
		};
		wordList.appendChild(btn);
	});
}

//Game btns states
const endGame = () => {
	gameState.isRunning = false;
	wordList.querySelectorAll("button").forEach((btn) => {
		btn.disabled = true;
	});
};

//Create next lvl btn
const nextGame = () => {
	const btn = document.createElement("button");
	btn.innerHTML = "Next Level";
	btn.onclick = () => {
		startRound();
		render();
		resultTxt.innerText = "";
		container.removeChild(btn);
	};
	container.appendChild(btn);
};

//Create restart btn
const restartGame = (isGameOver) => {
	const btn = document.createElement("button");
	btn.innerHTML = isGameOver ? "Again!!" : "Restart?";
	btn.onclick = () => {
		if (isGameOver) {
			gameState.round = 0;
			gameState.difficulty = 0;
		}
		startRound();
		render();
		resultTxt.innerText = "";
		container.removeChild(btn);
	};
	container.appendChild(btn);
};

//function that start everything
async function init() {
	await loadWords();
	startRound();
	render();
}

init();
