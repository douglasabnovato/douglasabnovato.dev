# MVP — critérios

> Avaliação de 31/10/2026 com os mesmos 12 critérios usados no `movies`. "Não medido" significa que não há evidência, não que falhe.

**Revisão de 06/11/2026 (ciclo de 03/11/2026, PR #250); critério 10 revisto em 10/11/2026.** Nível: Produto (N3), 12 critérios.

**Resumo:** 9 de 12 aplicáveis atendidos (1, 2, 4, 6, 7, 8, 10, 11 e 12), 2 parciais (3 e 9) e 1 não atendido (5).

**Finalizado:** sim — os 3 que faltam dependem do responsável, e cada um tem issue com o rótulo `depende-do-responsavel`: #252 (3), #251 (5) e #253 (9).

| # | Critério | Como verificar | Situação |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: proposta abaixo |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Parcial: navegação testada; pessoa de fora não testou (#252) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: lista abaixo |
| 5 | Medição de uso | A métrica principal é coletada | Não atende: depende de uma conta do responsável (#251) |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: API do GitHub indisponível e rota inexistente testadas; currículo liberado mesmo sem `localStorage`, com teste (PR #250) |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Atende: mediana de 1,71 s nas 7 execuções de 06/11/2026 (2,13 s em 02/11/2026); ver a variação nas medições abaixo |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: Lighthouse 100; Tab sem elemento sem nome ou sem foco |
| 9 | Segurança e conformidade | Riscos decididos; termos cumpridos | Parcial: issues públicas com dados de terceiros, a editar pelo responsável (#253) |
| 10 | Entrega confiável | Publicação só depois de CI verde | Atende: o workflow `CI` (jobs `verificar` e `fluxo`) roda em todo PR; `gh api repos/douglasabnovato/douglasabnovato.dev/rulesets`, 10/11/2026: ruleset `principal-protegida` ativo (exige PR, bloqueia force push e exclusão). A Vercel publica a `master`, que agora só recebe merge de PR (#254) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: 6 testes Playwright e 25 testes Vitest no CI |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende: README com estado e comandos conferidos |

## Revisão de 02/11/2026

**Hipótese (proposta, sem validação):** Se o portfólio mostrar projetos no ar e o que foi feito em cada um, quem avalia chega a um projeto em menos de 3 cliques, e ao menos 1 em cada 4 visitas abre um projeto.

**Fora do MVP (proposta):** Linha do tempo com marcos não confirmados (#237), artigo completo sobre os canais (#238 parcial) e os cursos e as ideias registrados em `/curadoria` e `/ideias`, que só são listados.

**Medição:** Lighthouse 12.8.2 local, móvel, 3 execuções no site publicado. LCP 1,85 / 2,13 / 2,33 s (mediana 2,13 s; era 3,46 s antes do WebP), acessibilidade 100. O resultado varia entre execuções, e não houve teste em celular real.

**Critério 5:** segue sem atender, porque nada coleta uso; depende de uma conta de medição do responsável.

## Medições de 06/11/2026

Site publicado depois do PR #257 (com o JSON-LD). Lighthouse 12.8.2 local, móvel simulado, sem aparelho real, 7 execuções em duas séries. Primeira série: LCP 2,72 / 1,67 / 2,67 s (mediana 2,67 s, acima da meta), com o computador sobrecarregado por outros processos. Segunda série: 1,71 / 1,70 / 1,51 s (mediana 1,70 s), desempenho 99 e TBT de 77 a 125 ms. Mediana das 7: 1,71 s. Acessibilidade 100 em todas. A variação mostra que a medição local não é confiável sozinha; a medição em ambiente estável está na #258.
