/*
Desafio 3/3

Papai Noel está brincando com seus duendes para entretê-los durante a véspera do Natal. A brincadeira consiste nos elfos escreverem números em pedaços de papel e colocarem no gorro do Papai Noel. Após todos terminarem de colocar os números Noel sorteia um papel e aquele número representa quantos "Ho" o Noel deve falar.

Seu trabalho é ajudar o Papai Noel montando um problema que mostre todos os "Ho" que ele deve falar dado o número sorteado.

Entrada
A entrada é composta por um único inteiro N (0 < N ≤ 106) representando quantos "Ho" serão falados por Noel.

Saída
A saída é composta por todos "Ho" que Papai Noel deve falar separados por um espaço. Após o último "Ho" deve ser apresentado um "!" encerrando o programa.

Exemplo de Entrada
5
Exemplo de Saída
Ho Ho Ho Ho Ho!

Contest de Natal 2014
 */
// a função gets é implementada dentro do sistema para ler as entradas(inputs) dos dados e a função print para imprimir a saída (output) de dados e já pula uma linha ("\n")
// Abaixo segue um exemplo de código que você pode ou não utilizar

let lines = gets().split("\n");

//TODO: Complete os espaços em branco com uma possível solução para o desafio

let N = parseInt(lines.shift());

let frase = "";

for (let i = 1; i <= N; i++) {
  
  if (i < (N)) {
    frase += "Ho ";
  } else {
    frase += "Ho!";
  }
  
}

print(frase);