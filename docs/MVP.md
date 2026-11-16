# MVP — critérios

**Nível:** Produto (N3). Os 12 critérios valem.

**Revisão de 16/11/2026** (ciclo de 16/11/2026, branch `feature/2026-11-16` → `developer/sprint-2026-11-19`). **Revisto em:** 16/11/2026, 12h26 (alertas do Dependabot).

**Resumo:** 10 de 12 aplicáveis atendidos (1, 2, 3, 4, 6, 7, 8, 10, 11 e 12) e 2 parciais (5 e 9).

**Finalizado:** não. O 5 depende do responsável e tem issue com `depende-do-responsavel` (#251, conta do GoatCounter). O 9 tem duas pendências: as issues públicas antigas (#253, do responsável) e 1 alerta do Dependabot sem correção sem versão maior (#282), que não depende só do responsável.

| # | Critério | Como verificar | Situação |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende: "Quem avalia o responsável (recrutadores, clientes e parceiros) acha, em poucos cliques, projetos no ar e o que foi feito em cada um." Frase abaixo, em "Problema e hipótese" |
| 2 | Hipótese a validar | Aposta escrita, com meta e "saberemos quando" | Atende: hipótese abaixo, com a meta (1 em cada 4 visitas abre um projeto) e o "saberemos quando" (painel do GoatCounter por 30 dias, #251) |
| 3 | Fluxo principal completo | Teste de ponta a ponta no navegador no CI | Atende: `e2e/projeto.pw.ts` vai da página inicial a um projeto no ar em 3 cliques (Projetos → No ar → nova aba). `npm run test:e2e` em 16/11/2026: 42 testes, 0 falhas; job `Fluxos no navegador` verde no run 43835545981 (commit `411c999`) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: seção "Fora do MVP" abaixo |
| 5 | Medição de uso | Painel da ferramenta com visitas | Parcial: o código do GoatCounter está pronto (só no site publicado, sem cookie, evento `abriu-projeto`; `src/testes/medicao.test.ts` e `e2e/projeto.pw.ts`). Falta a conta, do responsável (#251) |
| 6 | Falhas tratadas | Testes que simulam falha de rede, lista vazia e espera | Atende: `e2e/falhas.pw.ts` (16/11/2026) cobre a API do GitHub recusando (403) e a lista vazia em Projetos, o feed do Medium com falha e vazio no Blog, e a espera: com as respostas seguradas, Projetos mostra "—" nos indicadores e o Blog mostra "Carregando artigos…" até a resposta chegar. `e2e/fluxo.pw.ts` cobre a página inicial sem a API e a rota inexistente. `npm run test:e2e` em 16/11/2026: 42 testes, 0 falhas |
| 7 | Desempenho aceitável | Lighthouse móvel no site publicado, 3 execuções válidas, mediana, TBT e elemento do LCP | Atende: Lighthouse 12.8.2 móvel em https://douglasabnovato-dev.vercel.app/, 16/11/2026, 05:38 a 05:40. Build medido: `master` `4753b76` (deploy `Production` da Vercel; bundle `index-85GoStO7.js`). 5 execuções válidas: LCP 1,54 / 1,69 / 2,39 / 1,51 / 1,69 s, **mediana 1,69 s**; TBT 39 / 66 / 144 / 0 / 66 ms (mediana 66 ms); elemento do LCP `section > img.w-full` (imagem de destaque). Este ciclo muda o CSS do foco, o menu do celular e o aviso de lista vazia: medir de novo depois da publicação (#271) |
| 8 | Acessibilidade básica | axe sem violações (claro e escuro, desktop, dados reais) e teclado | Atende: `e2e/acessibilidade.pw.ts` roda o axe (WCAG 2.1 A e AA) em 9 rotas, com o currículo fechado e liberado, nos temas escuro e claro (o site tem tema escuro próprio por `data-theme`), a 1280 px, com transições desligadas, e também no menu do celular aberto (375 px); falha também com `color-contrast` em `incomplete`: 22 casos, 0 violações em 16/11/2026. Dados reais: os do site (certificados, Blog, curadoria e currículo) e as respostas públicas do GitHub (47 repositórios, 100 gists) e do Medium (10 artigos), gravadas em 16/11/2026 em `e2e/fixtures` por `node e2e/fixtures/gravar.mjs`; só as capas externas são cortadas. Teclado: `e2e/teclado.pw.ts` confere o contorno do foco no acento dos dois temas e, no menu do celular, que fechado fica fora do Tab, que Enter abre, Esc fecha e devolve o foco, que escolher um link fecha sem devolver o foco ao cabeçalho e que o Tab que sai do menu aberto o fecha. Job `Fluxos no navegador` verde no run 43835545981 |
| 9 | Segurança e conformidade | `npm audit --omit=dev`, Dependabot pela API, sem segredo, dados pessoais decididos | Parcial: `npm audit --omit=dev` com 0 vulnerabilidades (16/11/2026); nenhum segredo no código (só a chave anônima do Supabase, por desenho, protegida por RLS). `gh api "repos/douglasabnovato/douglasabnovato.dev/dependabot/alerts?state=open&per_page=100"` às 12h26 de 16/11/2026: 1 aberto, o #250 (`minimatch` 10.2.6, moderada, desenvolvimento, GHSA-g3hv-75wg-m249; criado às 11h25). 0 corrigidos na sprint-19; 1 resta (#282): a correção só existe no `minimatch` 11, e o `@typescript-eslint/typescript-estree` 8.72.2 (o mais novo) ainda pede `^10.2.2`. Falta também a decisão do responsável sobre as issues públicas antigas (#253) |
| 10 | Entrega confiável | CI nos PRs e principal protegida | Atende: `gh api repos/douglasabnovato/douglasabnovato.dev/rules/branches/master`, 16/11/2026: `deletion`, `non_fast_forward`, `pull_request` e `required_status_checks` com `Testes e build` e `Fluxos no navegador`. A Vercel publica só a `master` (`docs/DEPLOY.md`) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI, sem `skip` | Atende: 42 testes Playwright e 28 testes Vitest no CI, sem `skip` no código (`grep -rn "\.skip" e2e src` sem resultado, 16/11/2026). Run 43835263696: `Testes e build` e `Fluxos no navegador` verdes |
| 12 | Documentação honesta | README com comandos conferidos e link que responde hoje | Atende: comandos do README (`npm run dev`, `npm test`, `npm run lint`, `npm run build`, `npm run test:e2e`) conferidos contra o `package.json` em 16/11/2026; link da Vercel com HTTP 200 em 16/11/2026; publicação em `docs/DEPLOY.md` |

## Problema e hipótese

**Problema e público.** Quem avalia o responsável (recrutadores, clientes e parceiros) precisa achar, em poucos cliques, projetos no ar e o que foi feito em cada um. O site é o link enviado às vagas.

**Hipótese.** Acreditamos que mostrar os projetos no ar, com o que foi feito em cada um, fará quem avalia chegar a um projeto em até 3 cliques e abrir ao menos um. **Meta:** 1 em cada 4 visitas abre um projeto. **Saberemos quando** o painel do GoatCounter mostrar, por 30 dias, a razão entre o evento `abriu-projeto` e as visitas (#251). A meta foi decidida pelo coordenador em 10/11/2026 e pode ser revista pelo responsável. O teste com uma pessoa de fora é validação de produto (#252).

## Fora do MVP

- Linha do tempo com marcos não confirmados (#237).
- Artigo completo sobre os canais de web design (#238).
- `/curadoria` e `/ideias` só listam anotações; não são cursos concluídos nem projetos entregues.
- Imagem de prévia por página (a imagem geral está na #255).
- Domínio próprio e plano pago (ambiente gratuito).

## Medições de 16/11/2026

Lighthouse 12.8.2 local, móvel simulado, no site publicado, com `--chrome-flags="--headless --no-sandbox"`. Antes de medir: o deploy `Production` da Vercel aponta para `4753b76` (a `master`), e os chunks que não dependem das variáveis do Supabase (`NotFound-*.js`, `curadoria.data-*.js`) batem com o build local.

- **Primeira série (05:22 a 05:28), descartada em parte:** a máquina estava carregada. Execuções com FCP observado de 2,9 s, 8,7 s e 5,3 s foram descartadas; as válidas (FCP observado ~1 s) deram 1,70 e 1,70 s.
- **Segunda série (05:38 a 05:40), registrada:** 5 execuções válidas, FCP observado de 0,48 a 0,86 s. LCP 1,54 / 1,69 / 2,39 / 1,51 / 1,69 s, mediana 1,69 s; desempenho 0,96 a 1,00; TBT de 0 a 144 ms.

## Histórico

- 16/11/2026, 12h26 (alertas do Dependabot): 10 de 12 → 10 de 12; Finalizado: sim → não. Mais cedo no mesmo dia, a leitura da API dava 0 alertas; às 12h26 havia 1 (#250, `minimatch`), sem correção sem versão maior (#282).

- 10/11/2026 (PR #263, sprint #262): 10 de 12 (1, 2, 3, 4, 6, 7, 8, 10, 11 e 12). O critério 8 se apoiava só no Lighthouse 100 e num Tab manual, e o 6 não tinha teste de espera nem de lista vazia; desde 16/11/2026 os dois se apoiam em testes do CI.
- 06/11/2026 (PR #250): 9 de 12. O 3 estava "Parcial" à espera de uma pessoa de fora; o 5, "Não atende". Lighthouse em duas séries: medianas de 2,67 s (máquina carregada) e 1,70 s.
- 02/11/2026 (PR #248): LCP local de 2,13 s, depois do WebP (era 3,46 s).
- 31/10/2026: primeira avaliação com os 12 critérios (`docs/AVALIACAO.md`).
