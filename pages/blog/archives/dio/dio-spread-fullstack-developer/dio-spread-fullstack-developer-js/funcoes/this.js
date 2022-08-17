function calculaIdade(tempo) {
  return `Daqui a ${tempo} anos, ${this.nome} terá ${this.idade + tempo} anos de idade.`;
}

const pessoaA = {
  nome: "José",
  idade: 20,
};

const pessoaB = {
  nome: "Maria",
  idade: 25,
};

const pessoaC = {
  nome: "João",
  idade: 30,
};

console.log(calculaIdade.apply(pessoaA, [6]));
console.log(calculaIdade.call(pessoaB, 12));
console.log(calculaIdade.apply(pessoaC, [24]));
