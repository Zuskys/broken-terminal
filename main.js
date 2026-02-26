import { gameState, startRound, handleGuess } from "./game.js";
import { loadWords } from "./utils.js";

const attempts = document.getElementById("attempts-cont");
const wordList = document.getElementById("word-list");
const historyPanel = document.getElementById("panel-history");
const history = document.getElementById("result-history");

//create attempts circles
const attemptStyles = () => {
	const style = document.getElementById("attempts-style");
	style.innerHTML = "";
	for (let i = 0; i < 4; i++) {
		const life = document.createElement("div");
		life.classList.add("life-style");
		if (i >= gameState.attempts) life.classList.add("loss");
		style.appendChild(life);
	}
};

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
	btn.classList.add("game-btn");
	btn.innerHTML = "Next Level";
	btn.onclick = () => {
		startRound();
		history.innerHTML = "";
		render();
		historyPanel.removeChild(btn);
	};
	historyPanel.appendChild(btn);
};

//save the history of the round
const renderHistory = (outcome) => {
	history.innerHTML = "";
	attemptStyles();
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
	btn.classList.add("game-btn");
	btn.innerHTML = isGameOver ? "Again!!" : "Restart?";
	btn.onclick = () => {
		if (isGameOver) {
			gameState.round = 0;
			gameState.difficulty = 0;
		}
		startRound();
		history.innerHTML = "";
		render();
		historyPanel.removeChild(btn);
	};
	historyPanel.appendChild(btn);
};

//Elements updates
function render() {
	attemptStyles();

	wordList.innerHTML = "";

	gameState.visibleWords.forEach((word) => {
		const btn = document.createElement("button");
		btn.classList.add("word-btn");
		btn.textContent = word;
		btn.onclick = () => {
			const outcome = handleGuess(word);
			renderHistory(outcome);
			if (outcome.result === "continue") render();
			console.log(gameState.round);
			console.log(gameState.difficulty);
		};
		wordList.appendChild(btn);
	});
}

//function that start everything
async function init() {
	await loadWords();
	startRound();
	render();
}

init();
