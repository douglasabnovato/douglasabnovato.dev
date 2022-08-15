/* 
Desafio 1/3
Leia dois valores inteiros identificados como variáveis A e B. Calcule a soma entre elas e chame essa variável de SOMA.
A seguir escreva o valor desta variável.

Entrada
O arquivo de entrada contém 2 valores inteiros.

Saída
Imprima a variável SOMA com todas as letras maiúsculas, inserindo um espaço em branco antes e depois do símbolo de igualdade, seguido pelo valor correspondente à soma de A e B.

Exemplos de Entrada: 
30 
10
Exemplos de Saída: 
SOMA = 40

Exemplos de Entrada: 
-30
10
Exemplos de Saída: 
SOMA = -20

Exemplos de Entrada: 
0
0
Exemplos de Saída: 
SOMA = 0

- JavaScript

Em JavaScript as funções de STDIN e STDOUT respectivamente sãogets e console.log, a função gets é implementada internamente para auxiliar a entrada dos dados

let line = gets(); // Retorna a próxima linha de entrada
console.log(line); // Imprime o dado
*/

// a função gets é implementada dentro do sistema para ler as entradas(inputs) dos dados e a função print para imprimir a saída (output) de dados e já pula uma linha ("\n")
// Abaixo segue um exemplo de código que você pode ou não utilizar

let A = parseInt(gets());
let B = parseInt(gets());

//TODO: Complete os espaços em branco com uma possível solução para o desafio

let SOMA =  A + B;               
print("SOMA = "+ SOMA ); 