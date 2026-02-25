import { gameState, startRound, handleGuess } from "./game.js";
import { loadWords } from "./utils.js";

const attempts = document.getElementById("attempts");
const wordList = document.getElementById("word-list");
const container = document.getElementById("game");
const history = document.getElementById("result-history");

//Elements updates
function render() {
	attempts.textContent = `Attempts: ${gameState.attempts}`;

	wordList.innerHTML = "";

	gameState.visibleWords.forEach((word) => {
		const btn = document.createElement("button");
		btn.textContent = word;
		btn.onclick = () => {
			const outcome = handleGuess(word);
			renderHistory(outcome);
			if (outcome.result === "continue") render();
			// console.log(gameState.round);
			// console.log(gameState.difficulty);
		};
		wordList.appendChild(btn);
	});
}

//Game btns states
const disableBtns = () => {
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
		history.innerHTML = "";
		render();
		container.removeChild(btn);
	};
	container.appendChild(btn);
};

//save the history of the round
const renderHistory = (outcome) => {
	history.innerHTML = "";
	gameState.triedWords.forEach(({ word, score, total }) => {
		const p = document.createElement("p");
		p.textContent = `${word} - Resemblance: ${score}/${total}`;
		history.appendChild(p);
	});

	if (outcome.result === "win") {
		const p = document.createElement("p");
		p.textContent = "Correct!!";
		history.appendChild(p);
		disableBtns();
		nextGame();
	} else if (outcome.result === "win the game") {
		const p = document.createElement("p");
		p.textContent = "You win the game!!!";
		history.appendChild(p);
		disableBtns();
		restartGame(true);
	} else if (outcome.result === "lose") {
		const p = document.createElement("p");
		p.textContent = "You lose...";
		history.appendChild(p);
		disableBtns();
		restartGame(false);
	}
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
		history.innerHTML = "";
		render();
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
