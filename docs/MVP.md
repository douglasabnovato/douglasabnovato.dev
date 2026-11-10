# MVP — critérios

> Avaliação de 31/10/2026 com os mesmos 12 critérios usados no `movies`. "Não medido" significa que não há evidência, não que falhe.

**Revisão de 10/11/2026 (ciclo da faixa de 90%, decisões D1 a D7 do repositório `engenharia`).** Nível: Produto (N3), 12 critérios.

**Resumo:** 10 de 12 aplicáveis atendidos (1, 2, 3, 4, 6, 7, 8, 10, 11 e 12) e 2 parciais (5 e 9).

**Finalizado:** sim — os 2 que faltam dependem do responsável, e cada um tem issue com o rótulo `depende-do-responsavel`: #251 (5, criar a conta do GoatCounter) e #253 (9, editar as issues antigas e restringir os documentos).

| # | Critério | Como verificar | Situação |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: meta decidida pelo coordenador em 10/11/2026 (decisão D1), revisável pelo responsável. Aposta abaixo, em "Revisão de 02/11/2026" |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Atende (decisão D2): `npx playwright test` em 10/11/2026, 8 testes, 0 falhas; `e2e/projeto.pw.ts` vai da página inicial a um projeto no ar em 3 cliques (Projetos → No ar → nova aba). Site publicado responde (`curl`, HTTP 200, 10/11/2026) e o fluxo depende só dele e da API pública do GitHub. O teste com uma pessoa de fora virou validação de produto (#252) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: lista abaixo |
| 5 | Medição de uso | A métrica principal é coletada | Parcial: código pronto; falta a conta (decisão D5, #251). GoatCounter com o código `douglasabnovato`, só no site publicado, sem cookie, evento `abriu-projeto`; `npm test` (`src/testes/medicao.test.ts`) e `e2e/projeto.pw.ts` conferem que não carrega em localhost nem nos testes |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: API do GitHub indisponível e rota inexistente testadas; currículo liberado mesmo sem `localStorage`, com teste (PR #250) |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Atende: Lighthouse 12.8.2 móvel no site publicado, 10/11/2026, segunda série (a primeira teve FCP observado de 8,8 s, inválida): 1,71 / 1,58 / 2,30 s, mediana 1,71 s, TBT 87 ms, elemento do LCP `section > img.w-full` (imagem de destaque) |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: Lighthouse 100; Tab sem elemento sem nome ou sem foco |
| 9 | Segurança e conformidade | Riscos decididos; termos cumpridos | Parcial: `npm audit --omit=dev` 0 vulnerabilidades e Dependabot pela API 0 alertas abertos, 10/11/2026. Faltam as issues públicas antigas com nomes de terceiros e links privados (#253): editar o texto não apaga o histórico de edição, que só o responsável remove, e restringir os documentos compartilhados é dele |
| 10 | Entrega confiável | Publicação só depois de CI verde | Atende: `gh api repos/douglasabnovato/douglasabnovato.dev/rules/branches/master`, 10/11/2026: `required_status_checks` com `Testes e build` e `Fluxos no navegador`, além de PR obrigatório e bloqueio de force push e exclusão. A Vercel publica a `master`, que só recebe o que passou no CI (#254) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: 8 testes Playwright e 28 testes Vitest no CI (`npm test` em 10/11/2026: 28 testes, 0 falhas) |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende: README com estado e comandos conferidos contra o `package.json` em 10/11/2026 |

## Histórico

- 06/11/2026 (PR #250), critério 10 revisto em 10/11/2026: 9 de 12 (1, 2, 4, 6, 7, 8, 10, 11 e 12). O 3 estava "Parcial" à espera de uma pessoa de fora; o 5, "Não atende".

## Revisão de 02/11/2026

**Hipótese (proposta, sem validação):** Se o portfólio mostrar projetos no ar e o que foi feito em cada um, quem avalia chega a um projeto em menos de 3 cliques, e ao menos 1 em cada 4 visitas abre um projeto.

**Fora do MVP (proposta):** Linha do tempo com marcos não confirmados (#237), artigo completo sobre os canais (#238 parcial) e os cursos e as ideias registrados em `/curadoria` e `/ideias`, que só são listados.

**Medição:** Lighthouse 12.8.2 local, móvel, 3 execuções no site publicado. LCP 1,85 / 2,13 / 2,33 s (mediana 2,13 s; era 3,46 s antes do WebP), acessibilidade 100. O resultado varia entre execuções, e não houve teste em celular real.

**Critério 5:** segue sem atender, porque nada coleta uso; depende de uma conta de medição do responsável.

## Medições de 06/11/2026

Site publicado depois do PR #257 (com o JSON-LD). Lighthouse 12.8.2 local, móvel simulado, sem aparelho real, 7 execuções em duas séries. Primeira série: LCP 2,72 / 1,67 / 2,67 s (mediana 2,67 s, acima da meta), com o computador sobrecarregado por outros processos. Segunda série: 1,71 / 1,70 / 1,51 s (mediana 1,70 s), desempenho 99 e TBT de 77 a 125 ms. Mediana das 7: 1,71 s. Acessibilidade 100 em todas. A variação mostra que a medição local não é confiável sozinha; a medição em ambiente estável está na #258.
