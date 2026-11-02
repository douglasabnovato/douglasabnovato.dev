# MVP — critérios

> Avaliação de 31/10/2026 com os mesmos 12 critérios usados no `movies`. "Não medido" significa que não há evidência, não que falhe.

| # | Critério | Como verificar | Situação |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: proposta abaixo |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Parcial: navegação testada; pessoa de fora não testou |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: lista abaixo |
| 5 | Medição de uso | A métrica principal é coletada | Não atende |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: API do GitHub indisponível e rota inexistente testadas |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Atende: 2,13 s em 02/11/2026 |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: Lighthouse 100; Tab sem elemento sem nome ou sem foco |
| 9 | Segurança e conformidade | Riscos decididos; termos cumpridos | Parcial: issues públicas com dados de terceiros, a editar pelo responsável |
| 10 | Entrega confiável | Publicação só depois de CI verde | Parcial: CI verde em PR; a `master` não é protegida |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: 6 testes Playwright e testes de dados no CI |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende: README com estado e comandos conferidos |

## Revisão de 02/11/2026

**Hipótese (proposta, sem validação):** Se o portfólio mostrar projetos no ar e o que foi feito em cada um, quem avalia chega a um projeto em menos de 3 cliques, e ao menos 1 em cada 4 visitas abre um projeto.

**Fora do MVP (proposta):** Linha do tempo com marcos não confirmados (#237), artigo completo sobre os canais (#238 parcial) e os cursos e as ideias registrados em `/curadoria` e `/ideias`, que só são listados.

**Medição:** Lighthouse 12.8.2 local, móvel, 3 execuções no site publicado. LCP 1,85 / 2,13 / 2,33 s (mediana 2,13 s; era 3,46 s antes do WebP), acessibilidade 100. O resultado varia entre execuções, e não houve teste em celular real.

**Critério 5:** segue sem atender, porque nada coleta uso; depende de uma conta de medição do responsável.
