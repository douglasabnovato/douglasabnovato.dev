# Plano de ação — douglasabnovato.dev

> O plano de 26/10/2026 (fases 0 a 3) segue no `Readme.md`, seção "Plano de ação". Este arquivo guarda os ciclos datados a partir de 03/11/2026. O estado do MVP fica só em [`MVP.md`](MVP.md).

## Ciclo de 16/11/2026

> Branch `feature/2026-11-16` → `developer/sprint-2026-11-19` → `master`. Nível: Produto (N3), 12 critérios. A sprint anterior (PR #262) entrou na `master` em 16/11/2026.

### Produto

**Problema e público.** Quem avalia o responsável (recrutadores, clientes e parceiros) precisa achar, em poucos cliques, projetos no ar e o que foi feito em cada um. O site é o link enviado às vagas, e quem avalia pode navegar só pelo teclado ou no celular.

**Hipótese e meta.** Se o portfólio mostrar projetos no ar e o que foi feito em cada um, quem avalia chega a um projeto em até 3 cliques, e ao menos 1 em cada 4 visitas abre um projeto. Saberemos quando o GoatCounter mostrar a razão entre o evento `abriu-projeto` e as visitas, por 30 dias (#251, conta do responsável).

**O que a análise achou.**
- O critério 8 estava "Atende" só com o Lighthouse. A régua pede axe nos dois temas, em desktop, e teste de teclado. Nenhum teste rodava o axe.
- Na página inicial, o ícone do Linktree (Simple Icons) vem com `role="img"` e sem nome: o axe acusa `svg-img-alt`.
- No celular, o menu fechado fica fora da tela, mas os links seguem no Tab: o foco some da tela. O menu também não fecha com Esc nem devolve o foco.
- O foco do teclado usava o contorno padrão do navegador, sem token do tema.
- O GitHub Pages está ligado no modo legado e publica o código-fonte da `master`: `douglasabnovato.github.io/douglasabnovato.dev` responde 200 com o `index.html` de desenvolvimento, que pede `/src/app/main.tsx` e não abre o site. A Vercel é a hospedagem real.

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Resultado "incompleto" do axe | O axe separa o que não consegue decidir (por exemplo, contraste sobre fundo translúcido ou gradiente) em `incomplete`. O teste falha também com `color-contrast` em `incomplete`, para "sem violação" não esconder contraste não medido | [axe-core: API, objeto de resultados](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#results-object) |
| Foco visível | O critério 2.4.7 da WCAG pede um indicador de foco visível. Com o menu fora da tela, o foco ia para um link invisível. O contorno passa a usar o acento do tema, e o menu fechado sai da ordem do Tab | [W3C: Understanding 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) |
| Botão que mostra e esconde um bloco | O padrão "disclosure" da APG usa `aria-expanded` e `aria-controls` no botão. O botão "Abrir menu" ganhou os dois, e o Esc fecha o menu e devolve o foco | [W3C APG: Disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) |
| Imagem de prévia | O protocolo Open Graph define `og:image` e `og:image:alt`; o card grande pede `twitter:card` `summary_large_image`. Fica para a #255 | [The Open Graph protocol](https://ogp.me/) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | axe nas 9 rotas, nos dois temas, com `incomplete` de contraste | Alto | Baixo | Este ciclo |
| 2 | Ícone sem nome na faixa de canais | Médio | Baixo | Este ciclo |
| 3 | Menu do celular pelo teclado (Tab, Esc, foco) e contorno de foco do tema | Alto | Baixo | Este ciclo |
| 4 | Lighthouse móvel no site publicado, com o hash do bundle conferido | Médio | Baixo | Este ciclo |
| 5 | Desligar o GitHub Pages legado | Médio | Baixo | Responsável (issue nova) |
| 6 | Imagem de prévia (Open Graph) | Médio | Baixo | Issue (#255) |
| 7 | Lighthouse no CI com orçamento de LCP | Médio | Médio | Issue (#258) |

**Fora do escopo.** Imagem por página, linha do tempo (#237), artigo dos canais (#238), troca de hospedagem.

### Engenharia

**Arquitetura.** Sem mudança: SPA React 19 + TypeScript 6 + Vite 8, Tailwind 4 e React Router 7, em camadas (`app`, `pages`, `entities`, `shared`). Os testes de navegador rodam no build de produção (`vite preview`), com a API do GitHub e o feed do Medium simulados.

**Riscos.**
- O GitHub Pages legado publica uma cópia quebrada do site com o mesmo nome; quem acha esse endereço vê uma página vazia.
- A medição local do Lighthouse varia com a carga da máquina; vale só a série com FCP observado baixo.
- Issues públicas antigas com dados de terceiros (#253, do responsável).

**Qualidade.**
- Testes: axe (`e2e/acessibilidade.pw.ts`) em 9 rotas, com o currículo fechado e liberado, nos temas escuro e claro, a 1280 px, com transições desligadas, e no menu do celular aberto. GitHub e Medium respondem com dados reais gravados em `e2e/fixtures`. Teclado (`e2e/teclado.pw.ts`): contorno do foco no acento dos dois temas, menu fechado fora do Tab, Enter abre, Esc fecha e devolve o foco, link escolhido não devolve o foco ao cabeçalho, Tab que sai do menu o fecha. Falhas (`e2e/falhas.pw.ts`): erro, vazio e espera em Projetos e no Blog.
- Os testes novos foram conferidos contra o código anterior, em 16/11/2026: com `git stash push -- src` e `npm run build`, `npx playwright test e2e/teclado.pw.ts e2e/acessibilidade.pw.ts` deu 5 falhas (2 axe, 3 teclado); com o `Sidebar.tsx`, o `MainLayout.tsx` e o `main.css` de antes da revisão, os 3 testes novos do menu falharam. Um texto sobre gradiente cai em `incomplete` de `color-contrast`, que o teste trata como falha.
- A revisão independente mostrou que o menu fechava sem animação. A causa: a regra global `* { transition }` do `main.css` fica fora das camadas do Tailwind e vence o `transition-transform`, então o menu nunca deslizou. A transição do menu passou para uma regra própria no `main.css`.
- Desempenho: Lighthouse 12.8.2 móvel no site publicado, com o bundle conferido contra a `master`.
- Segurança: `npm audit --omit=dev` e alertas do Dependabot pela API.

**Definição de pronto.** `npm run lint`, `npm test`, `npm run build` e `npm run test:e2e` passam; CI verde no PR; revisão independente feita; `docs/MVP.md` e `Readme.md` atualizados.

### Plano de ação

**Este ciclo executa.**
1. axe nas rotas e nos dois temas, com o `incomplete` de contraste.
2. Correção do ícone sem nome e do menu do celular pelo teclado, com testes.
3. Lighthouse no site publicado e `MVP.md` com a evidência de cada "Atende".
4. `docs/DEPLOY.md` com a Vercel e o Pages legado.

**Vira issue.** Desligar o Pages legado (#270, responsável). Medir de novo o LCP depois da publicação (#271), link "Pular para o conteúdo" (#272), Dependabot semanal (#274). O axe com dados reais (#273) entrou neste ciclo, depois da revisão. Seguem #255, #256 e #258.

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
