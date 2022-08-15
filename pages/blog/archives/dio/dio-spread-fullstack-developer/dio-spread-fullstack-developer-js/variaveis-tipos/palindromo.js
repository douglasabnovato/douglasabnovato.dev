/** Solução 1
 */
function verificarPalindromoA(stringA) {
	if (!stringA) return "string inexistente";//undefined
	if (!stringA.length) return "string vazia";//null

	console.log(stringA === stringA.split('').reverse().join(''));
}

let myLetA = "asa";

/** Solução 2
 */
 function verificarPalindromoB(stringB) {

    let vazio = stringB.replace(/ /g, "");

	for (let i = 0; i < vazio.length / 2; i++) {
		if (vazio[i] !== vazio[vazio.length - 1 - i]) {
			return console.log(false);
		}
	}

	return console.log(true);
}

let myLetB = "roma me tem amor";

verificarPalindromoA(myLetA);
verificarPalindromoB(myLetB);
