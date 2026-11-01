# Relatório de revisão independente

**Projeto:** douglasabnovato.dev · **Data:** 27/10/2026 · **Branch:** `feature/claudeia-2026-10-27` (a partir de `af306a4`) · **Escopo:** leitura do código, do `dist/` de 26/10 e do HTML publicado. Nenhum comando de build, teste, git ou npm foi executado nesta revisão.

Este documento **não repete** o relatório do `Readme.md` (23/09 + atualização de 26/10). Ele remete a ele, aponta o que está desatualizado e acrescenta o que falta. Os IDs `0.x`–`3.x` são os do plano do README; os IDs `P.x` (produto) e `2.10+` são novos e estão detalhados em `02-plano-e-arquitetura.md`.

---

## 1. Visão geral medida

| Medida | Valor | Evidência |
|---|---:|---|
| Arquivos `.ts`/`.tsx` em `src/` | 56 | `find src -name '*.ts' -o -name '*.tsx'` (README diz 54) |
| Linhas de TypeScript | 6.099 (5.944 sem o teste) | `wc -l` (README diz 5.157) |
| Linhas de CSS | 466 | `wc -l` — 170 delas em `App.css`, que **não é importado** |
| Dependências de runtime no `package.json` | 8 | `package.json:13-22` (README diz 13) |
| Dependências de runtime no `package-lock.json` | 13 | raiz do lock ainda lista `chart.js`, `jspdf` etc. — lock de 07/10 |
| `vitest` em `node_modules` | ausente | `node_modules/vitest` não existe |
| Testes | 14 (`it`) em 1 arquivo | `src/testes/integridade-dados.test.ts` — 6 + 4 + 4 |
| Registros de certificados | 161 = 148 arquivo + 11 registro + 2 ao vivo | `grep evidencia` em `certificates.data.ts` |
| Arquivos em `public/arquivos` | 148, todos referenciados, nenhum ausente | cruzamento `arquivo:` × disco |
| Peso do acervo | 33,54 MB | soma dos 148 arquivos |
| Arquivos vazios | 3 | `useProjects.ts`, `utils.ts`, `Badge.tsx` (0 linha) |
| Produção hoje | sem `lang`, título único, sem descrição | HTML de https://douglasabnovato-dev.vercel.app lido em 27/10 |

### Bundle por página (dist de 26/10, 18:22 — code splitting já aplicado)

Medido com gzip nível 9 sobre `dist/assets`. O Vite usa outro nível, por isso o README fala em 89,95 kB para a entrada e aqui aparecem 86,75 kB: a ordem de grandeza é a mesma. O lote de 26/10 não altera o bundle de forma relevante, porque as dependências removidas nunca eram importadas.

| Chunk | Bruto (kB) | Gzip (kB) |
|---|---:|---:|
| `index` (entrada: React, Router, ícones, `resume.data`, `blog.data`, Home) | 268,76 | 86,75 |
| `Curriculo` | 217,66 | 55,17 |
| `Certificados` | 63,91 | 12,97 |
| `Projetos` | 31,17 | 8,34 |
| `Blog` | 12,01 | 4,00 |
| `NotFound`, `lock`, `useResumeAccess` | 0,60 | 0,51 |
| CSS principal + CSS do Currículo | 30,62 | 6,91 |

| Página aberta direto | JS gzip baixado | Comentário |
|---|---:|---|
| Home | 86,75 | só a entrada |
| Blog | 90,75 | entrada + Blog |
| Projetos | 95,27 | entrada + Projetos + `lock` |
| Certificados | 100,06 | não carrega o Supabase |
| Currículo | 142,26 | o Supabase está **só** aqui |

**Conclusão que o README ainda não registra:** depois do item 2.1, o cliente Supabase saiu da entrada. Ele pesa cerca de 210 kB brutos (estimativa do experimento de 23/09) e hoje está concentrado no chunk do Currículo. A premissa do item 2.4 ("210 kB carregados em todas as páginas") não vale mais.

---

## 2. Notas

| Área | Nota | Resumo |
|---|---:|---|
| Objetivo | **7,0** | O público e os princípios estão claros e o código os segue na maior parte. Há quatro desvios de conteúdo que contrariam os princípios do próprio site |
| Eficiência de produto digital | **5,0** | Quem contrata não encontra nome, cargo nem caminho para o currículo na Home. O PDF põe o emprego atual em "Trajetória anterior". Há números divergentes entre páginas |
| Performance | **6,5** | O code splitting resolveu o maior problema. Restam 1,16 MB de imagens na Home, a imagem de destaque com `loading="lazy"`, três buscas separadas do mesmo `/repos` e o Supabase carregado antes de ser preciso |
| UX design | **6,0** | A hierarquia por escala é boa e os temas são consistentes. Pesam contra: contraste abaixo do AA no tema escuro, favicon padrão do Vite, `<main>` aninhado, formulário sem rótulos e menu móvel acessível pelo teclado quando fechado |
| Engenharia | **6,5** | A FSD está limpa, a tipagem é boa e o teste de integridade é bem desenhado. Mas o lote de 26/10 ainda não foi verificado, o lock está fora de sincronia (o CI vai falhar), o erro do Supabase nunca é detectado e o lint tem 6 erros |

---

## 3. Objetivo — 7,0

| Pontos fortes | Evidência |
|---|---|
| Público e prioridade explícitos, com vaga-alvo definida | `Readme.md`, seção Objetivo |
| Princípios aplicados em código: figuras com `source`, contagens derivadas, nota de método | `resume.data.ts:25-50`, `useProjectCatalog.ts:228-233`, `blog.data.ts:28-31` |
| Fonte única aplicada a tela e PDF | `Curriculo.tsx` e `CurriculumPrintTemplate.tsx` leem `resumeData` |

| Falha | Evidência | Princípio violado |
|---|---|---|
| "200+" artigos no Currículo e "Mais de 200 artigos" em Publicações, contra os 257 do Blog e da Home | `resume.data.ts:47` e `:464` × `blog.data.ts` `mediumTotal: 257` | uma fonte de verdade; número autodeclarado |
| O fechamento do Blog diz "Hoje é o que faço em tempo integral: formação de desenvolvedores", mas a ByteClass terminou em out/2026 e o cargo atual é na AmploPay | `blog.data.ts` (`blogClosing`) × `resume.data.ts:90-126` | conteúdo desatualizado |
| "Recebe atualizações semanais" (learnTECH) é uma afirmação que o visitante não consegue conferir | `ecosystem.data.ts:86` | número ou fato sem fonte |
| Datas divergentes entre dois arquivos públicos: a Estácio aparece como "fev/2023 – jul/2025" na formação e com conclusão em 05/07/2026 no registro | `resume.data.ts:381` × `certificates.data.ts` (`reg-estacio-ads`) | uma fonte de verdade |

---

## 4. Eficiência de produto digital — 5,0

**Fluxo Home → Projetos → Currículo, do ponto de vista de quem contrata:**

| Etapa | O que acontece | Problema |
|---|---|---|
| Home, primeira dobra | O `<h1>` é a frase entre aspas (`ecosystem.data.ts:59-60`). O nome só aparece no `alt` da foto e na marca "douglasabnovato.dev" | O recrutador não lê o nome nem o cargo como título. O cargo atual aparece em 12px, mono, cor `muted` (`Home.tsx:199-207`) |
| Home → Currículo | Não há link no corpo da página; só o menu lateral, que no celular fica escondido | Já registrado no README ("Fora do código"), mas é a falha de maior impacto para o público nº 1 |
| Projetos | Os boards de gestão vêm antes do catálogo (`Projetos.tsx:77-85`). Top Destaques aparece só depois de Especiais | O que demonstra código (Components, Top Destaques) fica abaixo da dobra |
| Currículo | Formulário de identificação (regra do dono, mantida) | Com o armazenamento bloqueado, o visitante entra em laço (ver Engenharia E1) |
| PDF | `PDF_FULL` detalha Volta Express, ByteClass, MYSA, ABC e Nvoip (`CurriculumPrintTemplate.tsx:16-22`) | **AmploPay, o emprego atual (`tier: 'atual'`), cai em "Trajetória anterior"**, ao lado de vínculos de 2009 |

**Coerência entre páginas:**

| Assunto | Home | Currículo | Projetos |
|---|---|---|---|
| Repositórios | todos menos `.github`, **incluindo os `oculto`** (`Home.tsx:176-178`) | todos, **incluindo `.github`** (`Curriculo.tsx:51`) | sem `.github` e sem `oculto` (`useProjectCatalog.ts:120-125`) |
| Artigos | 257 (`blogMeta`) | "200+" | — |
| Largura e alinhamento | `max-w-4xl`, alinhado à esquerda | `max-w-5xl mx-auto` | `max-w-4xl`, à esquerda |

Três telas podem mostrar três totais de repositórios diferentes. O item 2.9 do README cobre só Home × Projetos.

---

## 5. Performance — 6,5

| Ponto forte | Evidência |
|---|---|
| Code splitting por rota, com a entrada em cerca de 87 kB gzip | `AppRouter.tsx:6-18`; tabela da seção 1 |
| Cache com reserva em dado antigo para GitHub e rss2json | `localCache.ts`; `useGithubExtras.ts:78-105` |
| Gráficos sem biblioteca e PDF por `window.print()` | `BlogDashboard.tsx`; `Curriculo.tsx:443` |
| Acervo estático comprimido (33,54 MB) | `public/arquivos` |

| Falha | Medida | Evidência |
|---|---|---|
| Imagens da Home | 8 JPEG, **1.155,8 kB**, exibidos bem menores do que o tamanho salvo | `dist/assets`: perfil 29,6 · destaque 230,1 · learnTECH 706,3 · frentes 189,8 |
| A imagem de destaque, provável LCP, usa `loading="lazy"` | — | `Home.tsx:223` |
| `/users/{u}/repos` buscado por três hooks com três chaves de cache | até 3 requisições por visitante por hora, de um limite de 60 por IP | `Home.tsx:20,34`; `Curriculo.tsx:26,42`; `useProjectCatalog.ts:142,160` |
| Projetos guarda a resposta completa do `/repos` no `localStorage` | estimativa: centenas de kB por visitante | `useProjectCatalog.ts:163` |
| Supabase incluído no chunk do Currículo mesmo para quem já tem acesso | cerca de 210 kB brutos (estimativa) | `CurriculumAccessModal.tsx:2` (import estático) |
| `* { transition }` global em todos os elementos | custo em cada troca de tema e animação indesejada na primeira pintura | `main.css:57-59` |
| Capas do GitHub (`opengraph.githubassets.com`) | 1 imagem externa por card, com `lazy` | `ProjectCard.tsx:14,30-34` — aceitável |

---

## 6. UX design — 6,0

| Ponto forte | Evidência |
|---|---|
| Hierarquia por escala (destaque 16:9, grupo 3:2, frentes 4:3) | `ecosystem.data.ts:12-15` |
| Tokens de tema completos para claro e escuro | `main.css:5-51` |
| `alt` em todas as imagens; botões de ícone com `aria-label` | `Sidebar.tsx:32`; `MobileHeader.tsx:13` |
| `RecordModal` com `role="dialog"`, `aria-modal` e fechamento por Esc | `RecordModal.tsx:20,40-42` |
| `prefers-reduced-motion` respeitado nas imagens | `main.css:124-131` |

| Falha | Medida | Evidência |
|---|---|---|
| Contraste do texto `muted` no tema escuro | **4,12:1** sobre `--color-page` e **3,67:1** sobre `surface-solid` (AA pede 4,5:1). Aparece em 111 usos de `text-muted`, muitos em 10px (61 usos de `text-[10px]`) | `main.css:14`; cálculo WCAG |
| Favicon é o raio roxo padrão do template Vite | `#863bff` | `public/favicon.svg` |
| `<main>` dentro de `<main>` | 2 landmarks `main` no Currículo | `MainLayout.tsx:16` × `Curriculo.tsx:424` |
| Formulário de acesso sem `<label>`, sem `role="dialog"`, sem Esc, sem foco inicial, com cores literais (ignora o tema claro) | — | `CurriculumAccessModal.tsx:29-44` |
| Menu móvel fechado continua recebendo foco do teclado (só é deslocado com `translate`) | — | `Sidebar.tsx:25` |
| Tema claro pisca escuro na carga: o `data-theme` só é aplicado depois do primeiro render | — | `ThemeToggle.tsx:17-20`; `index.html` sem script inline |
| Página 404 sem caminho de volta, e a Vercel responde 200 (rewrite total) | — | `NotFound.tsx:6`; `vercel.json` |
| Não há link para pular a navegação | — | `MainLayout.tsx` |
| Nome visível só como marca "douglasabnovato.dev" | — | `Sidebar.tsx:29-31` |

---

## 7. Engenharia — 6,5

| Ponto forte | Evidência |
|---|---|
| FSD respeitada: nenhuma página importa outra, `shared` não conhece camadas acima | conferido nos imports |
| Teste de integridade bem desenhado: `ANCORAS_PENDENTES` falha nos dois sentidos | `integridade-dados.test.ts:35-38,75-89` |
| `storage.ts` simples e com o mesmo padrão do `localCache.ts` | `storage.ts:10-24` |
| CI enxuto, com `permissions: contents: read`, `concurrency` e `timeout` | `ci.yml:11-22` |

### Falhas de Engenharia, em ordem de gravidade

| # | Falha | Evidência | Efeito |
|---|---|---|---|
| **E1** | **Laço no formulário com o armazenamento bloqueado.** `grantAccess` grava em `localStorage` (falha em silêncio desde o 0.2), e `window.location.reload()` relê `isAuthorized()`, que devolve `false` | `CurriculumAccessModal.tsx:18-20`; `useResumeAccess.ts:4-11` | O visitante preenche, a página recarrega e volta trancada. **Cada tentativa grava uma linha**, o que infla a medição de volume |
| **E2** | **Falha do Supabase nunca é detectada.** O `supabase-js` v2 não lança exceção em `insert`: devolve `{ error }`. O `catch` só pega exceções de rede raras | `CurriculumAccessModal.tsx:15-23` | Com RLS errada, variável ausente ou projeto pausado (7 dias), o acesso é liberado e **o registro se perde sem nenhum aviso**. A medição subconta sem ninguém saber |
| **E3** | **`package-lock.json` fora de sincronia com o `package.json`.** O lock é de 07/10, não tem `vitest` e mantém as 6 dependências removidas | raiz do lock × `package.json` | O `npm ci` do CI falha na primeira execução. O `npm test` local falha porque não há `vitest` em `node_modules` |
| **E4** | **`vitest ^5.0.2` não verificado** contra o registro e contra o `peerDependencies` do Vite 8.1 | `package.json:36` | Se a versão não existir ou não aceitar o Vite 8, o `npm install` falha (`ETARGET` ou `ERESOLVE`) |
| **E5** | **README declara "Feito em 26/10" para itens sem commit e sem verificação** (0.1–0.4, 2.1 parcial, 2.6, 2.8) | `Readme.md`, "Atualização de 26/10" e Fase 0 | Divergência entre documento e repositório. A produção ainda tem `lang` ausente e título único |
| E6 | `strict: true` declarado, mas não compilado desde o code splitting. O 23/09 mediu zero erro com uma base anterior | `tsconfig.app.json:28` | Risco baixo: os arquivos novos são simples e tipados. Só o `npm run build` confirma |
| E7 | O arquivo de teste não passa por checagem de tipos em lugar nenhum: está excluído do `tsconfig.app` e o `tsconfig.node` só inclui `vite.config.ts` | `tsconfig.app.json:37-39`; `tsconfig.node.json:22` | Erro de tipo no teste passa despercebido (o Vitest não checa tipos) |
| E8 | O lint tem 6 erros e o CI não bloqueia. As linhas citadas no README mudaram: Home 29→**30**, Currículo 36→**37** e 127→**128** | `Home.tsx:30`; `Curriculo.tsx:37,128` | Item 2.2 |
| E9 | Contrato `loading/ok/stale/error` e `relativeTime` duplicados | 4 hooks; `relativeTime` em 3 arquivos (`Home.tsx:59`, `useProjectCatalog.ts:242`, `useMediumPosts.ts:164`) | Divergência futura |
| E10 | `App.css` (170 linhas) **não é importado** por nenhum arquivo. O README afirma o contrário ("está em uso") | `grep` vazio; CSS do `dist` sem `Jakarta` ou `ecosystem-grid` | Código morto que confunde |
| E11 | Imagens não importadas: 3, não 2 — `4-volta-express-brasil-2.jpg` (597 KB), `5-byteclass-1.jpg` (278 KB), `2-dev-fullstack-2.jpg` (94 KB) = **969 KB**. Também `public/icons.svg`, sem referência | `src/assets/home`; `grep` | O README fala em 691 KB |
| E12 | Formulário sem `maxLength` e sem limite no servidor descrito | `CurriculumAccessModal.tsx:33-44` | Texto arbitrário na tabela. A proteção depende da RLS e de uma `check constraint` (não visível no repositório) |
| E13 | `supabase.ts` cria cliente com URL de reserva quando falta variável | `supabase.ts:10-13` | Em desenvolvimento, toda gravação falha em silêncio (soma com E2) |
| E14 | Pasta de testes `src/testes/` foge da convenção FSD (testes junto da fatia) | — | Baixa. Aceitável enquanto houver um arquivo só |

### Segurança

| Item | Situação |
|---|---|
| Chave anon no bundle | Por desenho. Exige RLS na `curriculum_access_logs` só com `insert` para `anon`, sem `select`, `update` ou `delete`. Não verificável pelo repositório: **pergunta ao dono** |
| `.env*` no `.gitignore` | Sim (`.gitignore:4-10`) |
| `target="_blank"` com `rel="noopener noreferrer"` | Conferido nos cards |
| HTML do Medium | Lido com `DOMParser` para extração; não há `dangerouslySetInnerHTML` no projeto |
| Dados pessoais coletados (nome e empresa) | Não há aviso de finalidade no formulário. Proposta P.8 (LGPD) |

---

## 8. Falhas consolidadas por gravidade

### Engenharia

| Ordem | ID | Falha | Item do plano |
|---:|---|---|---|
| 1 | E1 | Laço e registros duplicados com armazenamento bloqueado | 2.5 (ampliado) |
| 2 | E2 | Erro do Supabase não detectado: medição perdida em silêncio | 2.5 (ampliado) |
| 3 | E3/E4 | Lock fora de sincronia e `vitest ^5.0.2` não verificado | A.1–A.2 |
| 4 | E5 | README à frente do repositório | 3.5 |
| 5 | — | Contraste AA no tema escuro | 2.10 |
| 6 | — | `/repos` buscado três vezes; três totais diferentes | 2.9 (ampliado) |
| 7 | — | Imagens da Home (1,16 MB) e LCP com `lazy` | 2.7 |
| 8 | E6/E7 | `strict` não compilado; teste sem checagem de tipos | A.3, 1.6 |
| 9 | E8/E9 | Lint e duplicação do contrato de estado | 2.2, 2.3 |
| 10 | — | `<main>` aninhado, foco no menu fechado, modal sem rótulos, flash de tema, 404 | 2.11–2.13 |
| 11 | E10/E11 | `App.css`, 969 KB de imagens, `icons.svg`, 3 arquivos vazios | 2.6 |

### Decisão de produto (o dono decide; aqui são propostas)

| Ordem | ID | Proposta |
|---:|---|---|
| 1 | P.1 | Home: nome e cargo como título e um link discreto "Currículo" na primeira dobra |
| 2 | P.2 | PDF: incluir `amplopay` em `PDF_FULL` ou criar uma seção "Atual" |
| 3 | P.3 | Trocar "200+" e "Mais de 200" por `blogMeta.mediumTotal` |
| 4 | P.4 | Revisar `blogClosing` ("tempo integral: formação de desenvolvedores") |
| 5 | P.5 | Conferir o período da Estácio (formação × registro) e a data do IF Sudeste (2016–2017 × registro 2020-03) |
| 6 | P.6 | Corrigir as âncoras `ifsudestemg` → `if-sudeste` e `ufjf` → `ufjf-dcc` e remover de `ANCORAS_PENDENTES` |
| 7 | P.7 | Projetos: Top Destaques antes dos boards de gestão |
| 8 | P.8 | Uma linha de finalidade no formulário ("usado só para contar acessos ao currículo") |
| 9 | P.9 | Favicon próprio e `og:image` |
| 10 | P.10 | Rever "Recebe atualizações semanais" ou ligar a uma data vinda da API |

---

## 9. O que está desatualizado ou falta no README

| Seção do README | Situação | Correção sugerida |
|---|---|---|
| Atualização de 26/10 e Fase 0 | Marca "Feito" em itens sem commit e não verificados | "Feito localmente em 26/10, aguardando verificação" até o `verificar.ps1` passar |
| Tamanho e composição | 54 arquivos, 5.157 linhas, 13 dependências | 56 / 6.099 / 8 |
| Peso do Supabase e item 2.4 | Premissa de "todas as páginas" vencida; objetivo de tirar o Supabase do navegador contraria a regra do dono | Reformular o 2.4 (ver ADR-04) |
| Arquivos mortos | "App.css está em uso" está **errado**; as imagens são 3 (969 KB), não 2 (691 KB); falta `icons.svg` | Corrigir |
| Lint | Linhas deslocadas em 1 (Home e Currículo) | 30, 37, 128 |
| Estrutura | Faltam `shared/lib/storage.ts`, `shared/lib/hooks/`, `src/testes/`, `.github/workflows/`, `docs/claudeia/` | Acrescentar |
| Branches | Cita `feature/projetos` como ativa; o fluxo `developer-mvp → master` não aparece no histórico local (`origin/master` local em `4023284`, `af306a4` só em `origin/feature/projetos`) | Confirmar o fluxo real de deploy |
| Riscos — `CurriculumAccessModal` | Descreve "engole o erro em `console.error`"; na verdade o erro nem chega ao `catch` (E2), e falta o laço E1 | Ampliar |
| Riscos — pausa do Supabase | Descrito, sem plano | Ver ADR-04 |
| Design | Diz "persistência em `localStorage`"; falta registrar o flash do tema claro | — |
