// take a array then make it aleatory
export function shuffle(array) {
	return [...array].sort(() => Math.random() - 0.5);
}

//Dictionary words
export let wordsByLength = {};

export async function loadWords() {
	const response = await fetch("assets/wordsByLength.json");
	wordsByLength = await response.json();
}

//see the last word of the array
export const arrayLength = (array) => {
	return array[array.length - 1];
};
