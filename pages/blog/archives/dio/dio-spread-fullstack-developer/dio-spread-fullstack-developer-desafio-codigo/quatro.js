/**
 * Detalhes
 * Todas as entradas e saída dos algoritmos são utilizados o STDIN e STDOUT de cada linguagem, abaixo tem algumas dicas de como utilizar cada STDIN e STDOUT de cada linguagem.
 * 
 * JavaScript

Em JavaScript as funções de STDIN e STDOUT respectivamente sãogets e console.log, a função gets é implementada internamente para auxiliar a entrada dos dados.

Exemplo:
let line = gets(); // Retorna a próxima linha de entrada

console.log(line); // Imprime o dado

 * Desafio
Você recebeu o desafio de ler um valor e criar um programa que coloque o valor lido na primeira posição de um vetor N[10]. Em cada posição subsequente, coloque o dobro do valor da posição anterior. Por exemplo, se o valor lido for 1, os valores do vetor devem ser 1,2,4,8 e assim sucessivamente. Mostre o vetor em seguida.

Entrada
A entrada contém um valor inteiro (V<=50).

Saída
Para cada posição do vetor, escreva "N[i] = X", onde i é a posição do vetor e X é o valor armazenado na posição i. O primeiro número do vetor N (N[0]) irá receber o valor de V.

Exemplo de Entrada
1

Exemplo de Saída
N[0] = 1
N[1] = 2
N[2] = 4

Sugestão de código

// a função gets é implementada dentro do sistema para ler as entradas(inputs) dos dados e a função print para imprimir a saída (output) de dados e já pula uma linha ("\n")
// Abaixo segue um exemplo de código que você pode ou não utilizar

const input = gets();
let a = input;

//TODO: Complete os espaços em branco com uma possível solução para o desafio

for (                              ) {
  print(`N[${      }] = ${   }`);
  a =       ;
}



let numeros = []
let valor = 1

numeros.push(valor)


for (let i = 1; i < 10; i++){
    numeros.push(valor * 2)
    valor = numeros[i]
    console.log(numeros)
}
 */

//Solução

const input = gets();
let a = input;

//TODO: Complete os espaços em branco com uma possível solução para o desafio

for (let i = 0; i < 10; i++) {
  print(`N[${i}] = ${a}`);
  a = a * 2;
}
