# Variáveis e Tipos

Neste repositório você encontrará a atividade prática proposta pelo curso "Variáveis e Tipos" do Basecamp de Javascript da Digital Innovation One.

## Atividade 1

Verifique, de duas maneiras diferentes entre si, se uma String é um palíndromo.

_Palíndromo: frase ou palavra que se pode ler, indiferentemente, da esquerda para a direita ou vice-versa (ex.: raiar, ama, ovo, radar)_

### detalhes da resolução A
- Palíndromo: "arara", "asa"

### detalhes da resolução B
- Palíndromo: "roma me tem amor", "anotaram a data da maratona", "a Rita, sobre vovô, versos atira", "ato idiota"

## Atividade 2

Troque todos os elementos pares e diferentes de zero de um array pelo número 0. Se o array for vazio, retorne -1.

Exemplo:
Input -> [1, 3, 4, 6, 80, 33, 23, 90]

Output -> [1, 3, 0, 0, 0, 33, 23, 0]

Input -> []

Output -> -1

### detalhes da resolução

- -1
````javascript
    substituirPares(false)
    substituirPares(null)
    substituirPares(0)
````
- já é zero
````javascript
    let arr = [1, 3, 4, 6, 80, 33, 23, 90];
    substituirPares(arr)
````
- substituindo
````javascript
    let arr = [1, 3, 0, 0, 0, 33, 23, 0];
    substituirPares(arr)
````
- rodar js no terminal
````node
    node substituirPares.js
````
