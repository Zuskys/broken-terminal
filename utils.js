// take a array then make it aleatory
export function shuffle(array) {
	return [...array].sort(() => Math.random() - 0.5);
}

//Dictionary words
export const wordsByLength = {
	4: ["GAME", "HACK", "CODE", "LOCK", "BOOT", "FILE", "DATA"],
	5: ["ENTER", "ADMIN", "VIRUS", "PROXY", "SHELL"],
	7: ["ENTERss", "ADMINss", "VIRUSss", "PROXYss", "SHELLss"],
	10: ["ENTERsqaas", "ADMINsqas", "VIRUSsqas", "PROXYsqas", "SHELLsqas"],
};
