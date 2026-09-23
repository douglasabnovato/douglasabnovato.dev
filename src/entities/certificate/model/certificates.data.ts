/**
 * Fonte única do acervo de certificados.
 *
 * Os registros de comprovação guardam apenas a camada de prova; organização,
 * cargo, período e contexto vêm do resume.data.ts pela âncora.
 *
 * Os certificados com arquivo são gerados a partir da varredura das pastas
 * public/arquivos/cursos e public/arquivos/eventos. Os seis abaixo são amostra;
 * os demais entram no mesmo formato.
 */

import type { Certificate } from "./types";

export const certificates: Certificate[] = [
  /* ---------- Formação e trajetória — registros de comprovação ---------- */
  {
    id: "reg-estacio-ads", secao: "Formação e trajetória", data: "2026-07",
    evidencia: "registro", natureza: "oficial", ancora: "estacio",
    organizacao: "Centro Universitário Estácio",
    documento: "Diploma de Tecnólogo em Análise e Desenvolvimento de Sistemas",
    comprova: "Conclusão do curso superior de tecnologia e registro do diploma.",
  },
  {
    id: "reg-ifsudestemg", secao: "Formação e trajetória", data: "2017-12",
    evidencia: "registro", natureza: "oficial", ancora: "ifsudestemg",
    organizacao: "IF Sudeste MG — Campus Juiz de Fora",
    documento: "Diploma e histórico do curso Técnico em Informática",
    comprova: "Conclusão do curso técnico e as disciplinas cursadas.",
    nota: "O período indicado é o de realização do curso. O diploma foi expedido em 02/06/2023, quando o documento foi solicitado.",
  },
  {
    id: "reg-ufjf", secao: "Formação e trajetória", data: "2015-12",
    evidencia: "registro", natureza: "oficial", ancora: "ufjf",
    organizacao: "UFJF — Departamento de Ciência da Computação",
    documento: "Histórico escolar do curso de Ciência da Computação",
    comprova: "Disciplinas cursadas e carga horária integralizada.",
  },
  {
    id: "reg-codejr", secao: "Formação e trajetória", data: "2016-02",
    evidencia: "registro", natureza: "nao-oficial", ancora: "codejr",
    organizacao: "CodeJr — Empresa júnior de Computação da UFJF",
    documento: "Dez comunicações internas e o relatório de trabalho de nov/2015",
    comprova: "Participação nas três gestões e a atuação como Diretor de Qualidade.",
    nota: "Não existe declaração institucional emitida pela CodeJr. O registro é sustentado por comunicações de época.",
  },
  {
    id: "reg-brasil-center", secao: "Formação e trajetória", data: "2019-09",
    evidencia: "registro", natureza: "oficial", ancora: "brasil-center-sup",
    organizacao: "Brasil Center Comunicações",
    documento: "Registros em carteira de trabalho",
    comprova: "Dois vínculos distintos: o de jovem aprendiz, em 2009, e o contrato CLT posterior.",
  },
  {
    id: "reg-almaviva", secao: "Formação e trajetória", data: "2019-10",
    evidencia: "registro", natureza: "oficial", ancora: "almaviva",
    organizacao: "AlmavivA do Brasil",
    documento: "Registro em carteira de trabalho",
    comprova: "Vínculo e cargo de Supervisor de Operações.",
  },
  {
    id: "reg-nvoip", secao: "Formação e trajetória", data: "2021-08",
    evidencia: "registro", natureza: "oficial", ancora: "nvoip-dev",
    organizacao: "Nvoip",
    documento: "Registro em carteira de trabalho",
    comprova: "Vínculo e o cargo de Analista de Desenvolvimento de Sistemas.",
  },
  {
    id: "reg-abc", secao: "Formação e trajetória", data: "2025-02",
    evidencia: "registro", natureza: "oficial", ancora: "abc-construcao",
    organizacao: "ABC da Construção",
    documento: "Ficha de registro, termo de compromisso de estágio e contrato de prestação de serviços",
    comprova: "Vínculo e as frentes de Growth e CRM.",
  },
  {
    id: "reg-mysa", secao: "Formação e trajetória", data: "2026-02",
    evidencia: "registro", natureza: "oficial", ancora: "mysa",
    organizacao: "Grupo MYSA",
    documento: "Registro em carteira e contrato de prestação de serviços",
    comprova: "Vínculo com a holding formada a partir da ABC da Construção.",
    nota: "A ABC da Construção passou a integrar o Grupo MYSA. O trabalho foi contínuo, com mudança de fonte pagadora.",
  },
  {
    id: "reg-volta-express", secao: "Formação e trajetória", data: "2021-03",
    evidencia: "registro", natureza: "nao-oficial", ancora: "volta-express",
    organizacao: "Volta Express Brasil",
    documento: "Documento do processo de incubação no CRITT",
    comprova: "A startup e o processo de incubação em andamento.",
    nota: "A empresa está em processo de incubação e regularização. Não há documento societário definitivo.",
  },

  /* ---------- Produção pública ---------- */
  {
    id: "reg-oficina-da-net", secao: "Produção pública", data: "2015-06",
    evidencia: "registro", natureza: "oficial", ancora: "oficina-da-net",
    organizacao: "Oficina da Net",
    documento: "Seis artigos assinados e datados pelo veículo",
    comprova: "Autoria e publicação dos artigos no veículo.",
    nota: "Oficina da Net é publicação digital especializada em tecnologia. Não possui registro ISSN.",
  },
  {
    id: "reg-github", secao: "Produção pública", data: "2026-09",
    evidencia: "ao-vivo", natureza: "ao-vivo", ancora: "volta-express",
    organizacao: "GitHub",
    documento: "Perfil público, lido da API",
    comprova: "Repositórios, projetos em produção e atividade de código.",
    destino: "/projetos",
  },
  {
    id: "reg-medium", secao: "Produção pública", data: "2026-09",
    evidencia: "ao-vivo", natureza: "ao-vivo", ancora: "oficina-da-net",
    organizacao: "Medium",
    documento: "Perfil público, lido do feed",
    comprova: "Artigos publicados, alcance e leitura.",
    destino: "/blog",
  },

  /* ---------- Amostra de certificados com arquivo ---------- */
  {
    id: "startse-tech-academy", secao: "Programas de longa duração", data: "2022-07",
    evidencia: "arquivo", emissor: "StartSe", titulo: "Tech Academy",
    arquivo: "cursos/startse-20220700-tech-academy.pdf",
    duracao: "100 h", horas: 100, papel: "Concluinte",
  },
  {
    id: "alura-one-desenvolvimento-pessoal", secao: "Programas de longa duração", data: "2023-05-26",
    evidencia: "arquivo", emissor: "Alura", titulo: "Desenvolvimento Pessoal T5",
    arquivo: "cursos/alura-one-20230526-formacao-desenvolvimento-pessoal-t5.pdf",
    programa: "Programa ONE", tipo: "Formação",
    duracao: "38 h", horas: 38, papel: "Concluinte",
  },
  {
    id: "dio-spread-09", secao: "Cursos", data: "2022-05-27",
    evidencia: "arquivo", emissor: "DIO", titulo: "Sintaxe e Operadores",
    arquivo: "cursos/dio-spread-fullstack-09-sintaxe-e-operadores.pdf",
    programa: "Bootcamp Spread Fullstack",
    duracao: "2 h", horas: 2, papel: "Concluinte", codigo: "9F691C73",
  },
  {
    id: "voitto-criatividade", secao: "Cursos", data: "2024-04-05",
    evidencia: "arquivo", emissor: "Grupo Voitto",
    titulo: "Criatividade e Resolução de Problemas",
    arquivo: "cursos/voitto-20240405-criatividade-e-resolucao-de-problemas.pdf",
    duracao: "9 h", horas: 9, papel: "Concluinte", codigo: "5066551301",
  },
  {
    id: "ufjf-analise-redes-sociais", secao: "Cursos", data: "2011-10-17",
    evidencia: "arquivo", emissor: "UFJF", titulo: "Análise de Redes Sociais",
    arquivo: "cursos/ufjf-20111017-minicurso-analise-de-redes-sociais.pdf",
    tipo: "Minicurso", evento: "XV Semana de Computação",
    duracao: "4 h", horas: 4, papel: "Participante",
  },
  {
    id: "ufjf-leis-dados-marketing", secao: "Eventos", data: "2025-07-02",
    evidencia: "arquivo", emissor: "UFJF — LEIS",
    titulo: "Dados e Inovação em Marketing",
    arquivo: "eventos/ufjf-leis-20250702-roda-de-conversa-dados-e-inovacao-em-marketing.pdf",
    tipo: "Roda de conversa", evento: "Conexões em Foco: Tecnologia, Dados e Inovação",
    duracao: "1 h", horas: 1, papel: "Ouvinte",
  },
];

// Fim do acervo.