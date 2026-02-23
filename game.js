import { shuffle, wordsByLength } from "./utils.js";

//Actual game State
export let gameState = {
	round: 0,
	attempts: 4,
	correctWord: false,
	isRunning: true,
	visibleWords: [],
	difficulty: 0,
};

//Function that start the new rounds
export function startRound() {
	let length = 4; //base difficult
	//change length dependent of the difficult
	if (gameState.difficulty === 1) length = 5;
	else if (gameState.difficulty === 2) length = 7;
	else if (gameState.difficulty === 3) length = 10;

	const pool = wordsByLength[length];
	const shuffled = shuffle(pool);

	gameState.visibleWords = shuffled.slice(0, 6);
	gameState.correctWord = gameState.visibleWords[0];
	gameState.attempts = 4;
}

//Get the correct letters of the word selected
export function likeness(correct, guess) {
	let matches = 0;
	for (let i = 0; i < correct.length; i++) {
		if (correct[i] === guess[i]) matches++;
	}
	return matches;
}

//Return the result of the game
export function handleGuess(word) {
	if (word === gameState.correctWord) {
		gameState.round++;
		if (gameState.round === 3) gameState.difficulty++;
		else if (gameState.round === 6) gameState.difficulty++;
		else if (gameState.round === 8) gameState.difficulty++;
		else if (gameState.round === 10) return { result: "win the game" };
		return { result: "win" };
	}
	gameState.attempts--;
	const score = likeness(gameState.correctWord, word);

	if (gameState.attempts === 0) return { result: "lose" };

	return { result: "continue", score, total: gameState.correctWord.length };
}
