/** Formatação de datas do acervo, tolerante a data parcial. */

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun",
               "jul", "ago", "set", "out", "nov", "dez"];

/** "2024-04-05" vira "abr/2024"; "2022-07" vira "jul/2022"; "2022" fica "2022". */
export function formatarData(data: string): string {
  const [ano, mes] = data.split("-");
  if (!mes) return ano;
  return `${MESES[Number(mes) - 1]}/${ano}`;
}

// Fim do formatador.