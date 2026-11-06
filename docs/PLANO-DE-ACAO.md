# Plano de ação — douglasabnovato.dev

> O plano de 26/10/2026 (fases 0 a 3) segue no `Readme.md`, seção "Plano de ação". Este arquivo guarda os ciclos datados a partir de 03/11/2026. O estado do MVP fica só em [`MVP.md`](MVP.md).

## Ciclo de 03/11/2026

> Branch `feature/2026-11-06` → `developer/sprint-2026-11-12` → `master`. Nível: Produto (N3), 12 critérios.

### Produto

**Problema e público.** Quem avalia o responsável (recrutadores, clientes e parceiros) precisa ver, em poucos minutos, projetos no ar e o que foi feito em cada um. O site é também o link enviado às vagas.

**Hipótese e meta.** Se o portfólio mostrar projetos no ar e o que foi feito em cada um, quem avalia chega a um projeto em menos de 3 cliques, e ao menos 1 em cada 4 visitas abre um projeto. Medir depende de uma conta do responsável (#251); o teste com pessoa de fora também (#252).

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Dados estruturados de perfil | O Google tem um tipo `ProfilePage` para páginas sobre uma pessoa, com a pessoa como entidade principal e `sameAs` apontando os outros perfis. Virou um JSON-LD no `index.html`, com teste que liga o `sameAs` aos canais de `channels.ts` | [Google Search Central: ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page?hl=pt-br), [schemaorg-kit: Person](https://6f5.github.io/schemaorg-kit/guides/person) |
| Poucos projetos, o melhor primeiro | Guias de carreira dizem que uma lista longa esconde o melhor trabalho e que quem avalia decide em segundos. Reforça a hipótese de 3 cliques e o teste com pessoa de fora (#252) | [Fueler: 7 segundos](https://www.fueler.io/blog/your-portfolio-has-7-seconds-what-recruiters-look-at-first), [Pesto: o que recrutadores procuram](https://pesto.tech/resources/what-recruiters-look-for-in-developer-portfolios) |
| Mostrar decisões, não só funcionalidades | Quem avalia valoriza o porquê das escolhas (desempenho, segurança, testes). O site já tem o "Relatório de engenharia" no README; a prévia ao compartilhar o link vira a #255 | [Proxify: o que destaca um portfólio](https://proxify.io/knowledge-base/job-descriptions/what-makes-a-developer-portfolio-stand-out-to-recruiters), [DevPlaybook: checklist](https://devplaybook.cc/blog/developer-portfolio-checklist-20-things-hiring-managers) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Currículo liberado com cookies bloqueados (achado 10 de 27/10) | Alto | Baixo | Este ciclo (PR #250) |
| 2 | JSON-LD `ProfilePage` + `Person` | Médio | Baixo | Este ciclo (PR #250) |
| 3 | Medição de visitas que abrem projeto | Alto | Baixo | Responsável (#251) |
| 4 | Teste com pessoa de fora | Alto | Baixo | Responsável (#252) |
| 5 | Dados de terceiros nas issues antigas | Alto | Médio | Responsável (#253) |
| 6 | Proteger a `master` | Alto | Baixo | Responsável (#254) |
| 7 | Imagem Open Graph | Médio | Baixo | Issue (#255) |
| 8 | Validar o JSON-LD no Google | Baixo | Baixo | Issue (#256) |
| 9 | Linha do tempo e artigo dos canais | Médio | Médio | Responsável (#237, #238) |

**Fora do escopo.** Linha do tempo com marcos não confirmados (#237), blog próprio fora do Medium, área logada.

### Engenharia

**Arquitetura.** SPA React 19 + TypeScript 6 + Vite 8, com Tailwind 4 e React Router 7, organizada em camadas (`app`, `pages`, `entities`, `shared`). Dados mantidos à mão em arquivos `*.data.ts`, conferidos por testes de integridade. GitHub e Medium são lidos ao vivo, com cache no `localStorage`. O Supabase só registra o acesso ao currículo. Publicação na Vercel a cada push na `master`.

**Riscos.**
- A Vercel publica qualquer push na `master`, e a `master` não é protegida (#254).
- Issues públicas antigas com dados de terceiros (#253).
- Sem `localStorage`, a liberação do currículo vale só para a aba aberta; numa aba nova, o formulário volta (esperado, sem laço).

**Qualidade.**
- Testes: 25 testes Vitest (integridade dos dados, curadoria, dados estruturados, acesso ao currículo) e 6 fluxos Playwright no CI.
- Acessibilidade: Lighthouse 100 nas medições de 02/11; nada visual mudou neste ciclo.
- Desempenho: LCP medido no ar depois do merge (seção de medições do `MVP.md`).
- Segurança: o `sameAs` exclui WhatsApp e e-mail, para não expor telefone nem endereço em dado estruturado (com teste).

**Definição de pronto.** `npm run lint`, `npm test`, `npm run build` e `npm run test:e2e` passam; CI verde no PR; `docs/MVP.md` e `Readme.md` atualizados.

### Plano de ação

**Este ciclo executa.**
1. Liberação do currículo sem laço com cookies bloqueados, com testes.
2. JSON-LD `ProfilePage` + `Person`, com teste.
3. `MVP.md` com resumo, nível e "Finalizado"; README com o estado e os próximos passos.

**Vira issue.** #251, #252, #253, #254 (responsável); #255, #256 e #258 (agente; a #258 veio da variação das medições de 06/11). #237 e #238 seguem com o responsável.
