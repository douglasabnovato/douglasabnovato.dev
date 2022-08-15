function operator(paramA, paramB) {
  let igualdade = saoIguais(paramA, paramB);
  let soma = paramA + paramB;
  let soma10 = verificar10Soma(paramA, paramB);
  let soma20 = verificar20Soma(paramA, paramB);

  return console.log(`
    os números são ${igualdade}.
    A soma é  ${soma}. 
    A soma é ${soma10} que 10 e ${soma20} que 20.
  `);
}

function saoIguais(paramA, paramB) {
  if (paramA == paramB) {
    return "IGUAIS";
  } else {
    return "DIFERENTES";
  }
}

function verificar10Soma(paramA, paramB) {
  if (paramA + paramB > 10) {
    return "MAIOR";
  } else {
    return "MENOR";
  }
}

function verificar20Soma(paramA, paramB) {
  if (paramA + paramB < 20) {
    return "MENOR";
  } else {
    return "MAIOR";
  }
}

operator();
