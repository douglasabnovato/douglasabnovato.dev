document.getElementById("app").innerHTML = `
<div class="container">
  <h1>Hello World, Dev!</h1>
  <p>Resolvendo desafios de código da XPEducação com javascript puro.</p>
  <h2>Desafio 1</h2>
  <p><strong>A)</strong> Se listarmos todos os números naturais menores que 10 e que são múltiplos de 3 ou 5, obtemos 3, 5, 6 e 9. A soma desses múltiplos é 23. Encontre a soma de todos os múltiplos de 3 ou 5 abaixo de 1000.</p>
  <p><strong>B)</strong> Aperfeiçoar essa solução com modularização, onde uma função específica para cada tarefa.</p>
  <p><strong>C)</strong> Aperfeiçoar para guardar a lista de múltiplos.</p>
  <p>Solução A:calcularMultiplos3ou5()</p>
  <p>Solução B:somarMultiplos3ou5() e verificarMultiplo3ou5(numero)</p>
  <p>Solução C:listaMultiplos(umMultiplo) e listMult</p>
</div>
`;

alert("Hello World, Dev!")

let listaMult = [];

function calcularMultiplos3ou5() {
  let limiteSuperior = 1000;
  let soma = 0;
  for (let i = 1; i < limiteSuperior; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      soma = soma + i;
      listaMultiplos(i);
    }
  }
  return soma;
}

function listaMultiplos(umMultiplo) {
  listaMult.push(umMultiplo);
}

function verificarMultiplo3ou5(numero) {
  if (numero % 3 === 0 || numero % 5 === 0) {
    return numero;
  }
}

function somarMultiplos3ou5() {
  let limiteSuperior = 1000;
  let soma = 0;
  for (let i = 1; i < limiteSuperior; i++) {
    if (verificarMultiplo3ou5(i)) {
      soma = soma + i;
    }
  }
  return soma;
}

console.log("Resultado A: ", calcularMultiplos3ou5());
console.log("Resultado B: ", somarMultiplos3ou5());
console.log("Resultado C: ", listaMult);
