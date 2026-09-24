<h1 align="center">douglasabnovato.dev</h1>

<p align="center">
  Site pessoal — trajetória profissional, projetos em andamento e catálogo de<br>
  repositórios lido ao vivo da API do GitHub.
</p>

<p align="center">
  <strong>· React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Feature-Sliced Design ·</strong>
</p>

<p align="center">
  <a href="https://douglasabnovato-dev.vercel.app/"><img alt="Live" src="https://img.shields.io/badge/live-douglasabnovato--dev.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white"></a>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
</p>

---

## Sobre

Site pessoal que reúne trajetória profissional, projetos em andamento e a forma como eu conduzo produto. É também a origem do [ecossistema learnTECH](https://learn-tech-pied.vercel.app).

O repositório tem história: nasceu em 2022 como desafio de portfólio da Rocketseat, passou por cinco versões em HTML, CSS e JavaScript puro ao longo de 320 commits, ficou três anos parado, e está sendo **reconstruído do zero** — não como remendo do código antigo, mas como reflexo do trabalho atual. As versões anteriores seguem preservadas nas branches.

## Objetivo

O site atende quatro públicos, nesta ordem de prioridade:

1. **Empresas que contratam** — é o principal foco. A vaga-alvo é desenvolvedor de produto digital
2. **Clientes** que queiram contratar um serviço
3. **Alunos e entusiastas** de tecnologia
4. **Eu mesmo**, como catálogo consultável de ferramentas, eventos e projetos

## Princípios

Quatro regras governam o que entra no site, e explicam a maior parte das decisões de código:

**Nada de número autodeclarado.** Toda métrica exibida vem de uma fonte verificável — API do GitHub, estatísticas da plataforma onde o conteúdo está publicado, datas do próprio histórico, ou um link que o visitante pode conferir. Não há barra de proficiência, nota de habilidade nem percentual de domínio, porque nenhum deles pode ser checado por quem lê.

**Uma fonte de verdade por assunto.** O currículo da tela e o PDF exportado leem do mesmo arquivo. O catálogo de projetos vem da API, não de uma lista mantida à mão. Onde há duas cópias, uma delas envelhece.

**Dizer também o que o dado não permite concluir.** Onde um recorte seria enganoso, o site declara que ele ficou de fora e por quê — como a nota de método do painel do Blog, que explica por que visualizações por ano não são comparáveis entre si. Número exibido sem ressalva é afirmação; com ressalva, é análise.

**Hierarquia por escala, não por cor.** A importância de um elemento é comunicada por espaço, tamanho e proporção. Cor é reservada para estado e para série de dados.

## Páginas

| Página | Estado | O que faz |
|---|---|---|
| **Home** | no ar | Abertura em primeira pessoa e o que está sendo construído agora. Um projeto em destaque, os satélites do learnTECH e as demais frentes, em três níveis de tamanho. Sinal de atividade vindo da API. Fecha com a faixa de canais públicos |
| **Currículo** | no ar | Acesso mediante identificação, registrada no Supabase. Faixa temporal da carreira, quatro números verificáveis, experiência em três profundidades de leitura e exportação em PDF de uma página |
| **Projetos** | no ar | Catálogo lido ao vivo do GitHub, classificado por topics do próprio repositório. Boards de gestão, indicadores agregados e recorte dos gists |
| **Blog** | no ar | Painel analítico do acervo de 257 artigos — volume por ano, distribuição temática, mais lidos e nota de método. Abaixo, os artigos recentes lidos ao vivo do [Medium](https://douglasabnovato.medium.com) |
| **Certificados** | no ar | Acervo da trajetória em linha do tempo: 161 registros em nove seções. Não está no menu — chega-se a ela por um botão dentro do Currículo |

A antiga página **Redes sociais** foi removida. Os canais viraram uma faixa de oito blocos no fim da Home, alimentada por um arquivo único de configuração — ela repetia links que já existiam, em contexto melhor, nas outras páginas.

## Como os projetos são classificados

A classificação mora **no próprio GitHub**, como topic do repositório — não num arquivo do site. Assim, reclassificar um projeto não exige abrir o editor.

| Topic | Seção |
|---|---|
| `especial` | Especiais |
| `destaque` | Top Destaques |
| `mvp` | MVP & Aplicações |
| `curso` | etiqueta "material de curso" no card, sem criar seção |
| `oculto` | não aparece no site |
| *(nenhum)* | Projetos — o destino padrão |

Repositórios marcados como fork ou arquivado ganham seções próprias no fim da página. Qualquer topic fora dessa lista é tratado como **etiqueta de tecnologia** e exibido no card.

A ordem de decisão é: `oculto` → `.github` → topic de categoria → categoria do arquivo local → arquivado → fork → padrão. O arquivo local funciona como segunda opção, o que permite migrar para topics sem nenhum momento de virada.

## Dados ao vivo

Números vêm de API pública, sem autenticação, com cache em `localStorage`:

| Fonte | O que traz | Cache |
|---|---|---|
| `/users/{u}/repos` | catálogo, issues abertas, datas, linguagens, topics | 1 hora |
| `/users/{u}` | totais da conta, inclusive o número real de gists | 24 horas |
| `/users/{u}/gists` | os 100 mais recentes, dos quais 20 são exibidos | 24 horas |
| `/orgs/{org}` | a organização — a seção só renderiza se houver repositório público | 24 horas |
| `opengraph.githubassets.com` | capa de cada repositório | CDN do GitHub |
| `rss2json` sobre o feed do Medium | os 10 artigos mais recentes, com o conteúdo completo | 6 horas |

A capa de cada projeto é o **cartão OpenGraph do próprio GitHub**. Quando um repositório define uma imagem em Settings → Social preview, o card do site passa a exibi-la automaticamente, sem mudança de código. Quando a imagem falha, entra uma reserva escolhida de forma determinística pelo nome do repositório — o mesmo projeto sempre recebe a mesma capa.

O limite do GitHub sem token é de 60 requisições por hora por IP. Cada página consome entre uma e três, e as respostas ficam em cache. Em caso de falha, o site exibe os dados anteriores e avisa.

O RSS do Medium não é acessível direto do navegador por falta de CORS, por isso a ponte é o `rss2json`. O feed entrega no máximo dez artigos e não é paginável — limitação do formato, não do código.

## O acervo do Blog

O painel do Blog usa números que **nenhuma API entrega**: o RSS conhece só os dez mais recentes. Os totais foram apurados na tela `Stats › Stories` do Medium, que lista todas as publicações com tempo de leitura, data, visualizações e leituras.

| | |
|---|---|
| Artigos | 257 |
| Período | 15/01/2014 – 19/07/2026 |
| Tempo de leitura somado | 1.422 minutos · 23,7 horas |
| Visualizações | 165.601 |
| Leituras completas | 75.893 · 45,8% |

Os 257 títulos foram classificados um a um em sete grupos temáticos e cruzados com alcance e taxa de leitura. Tudo isso mora em `entities/article/api/blog.data.ts`.

**Para atualizar depois de publicar:** soma 1 em `mediumTotal`, soma 1 no ano corrente em `yearly`, e atualiza `totalViews` e `totalReads` na próxima revisão de estatísticas. Nenhum componente precisa ser tocado.

Os artigos recentes exibidos abaixo do painel continuam vindo do feed, ao vivo, e se atualizam sozinhos a cada publicação.

## O acervo de certificados

A página reúne **161 registros** em `entities/certificate/model/certificates.data.ts`, divididos em duas naturezas:

| Natureza | Quantos | Como aparece |
|---|---:|---|
| Certificado com arquivo publicado | 148 | Card com botão que abre o PDF ou a imagem |
| Registro de comprovação | 13 | Card com botão que abre um modal — **o documento original não vai para o repositório** |

Os 13 registros cobrem vínculos e formações cujos comprovantes são documentos pessoais: CodeJr, ABC da Construção, Brasil Center, AlmavivA, Nvoip, Grupo MYSA, Estácio ADS, IF Sudeste MG, Oficina da Net, GitHub, Medium, UFJF e Volta Express Brasil.

**Nove seções**, na ordem fixada por `ORDEM_SECOES`, e dentro de cada uma por data decrescente:

| Seção | Registros |
|---|---:|
| Cursos | 53 |
| ABC — Programa GRC1 | 36 |
| DIO — Bootcamp Spread Fullstack | 26 |
| Eventos | 23 |
| Formação e trajetória | 10 |
| Alura — Programa ONE | 4 |
| DIO — Bootcamp Santander | 3 |
| Rocketseat Discover | 3 |
| Produção pública | 3 |

**Sem duplicação de dado.** Cada registro carrega um campo `ancora` apontando para um id do `resume.data.ts`; `resolverAncora()` resolve organização, papel e período na hora de renderizar. Empresa e cargo continuam existindo em um lugar só.

**Os arquivos são estáticos.** Vivem em `public/arquivos/cursos` e `public/arquivos/eventos` e são servidos pela Vercel — sem Supabase Storage, sem chamada de rede extra, sem custo de egress.

### Compressão do acervo

| | Antes | Depois |
|---|---:|---:|
| 148 arquivos | 81,33 MB | **33,52 MB** |

Redução de **58,8%**. Do total, 110 PDFs e 4 imagens foram otimizados, 34 originais foram mantidos porque o ganho não passava de 10%, e **nenhum foi barrado pela trava de qualidade**.

O método: a resolução alvo é calculada pela **largura real de exibição de cada imagem**, medida percorrendo o content stream do PDF e acompanhando os operadores `q` / `Q` / `cm` / `Do` — não pela largura da página, que superestima imagens pequenas. Reamostragem para 150 DPI e JPEG q80.

A trava usa **duas métricas** comparando o render antes e depois: diferença média de intensidade e fração de pixels alterados em mais de 10%. Uma métrica só não funciona — o branco da página dilui a média, e um ajuste destrutivo passa despercebido. Os limites foram calibrados em uma escada de DPI renderizada para o caso. Descoberta útil do processo: na maioria dos certificados o nome e o título são **texto vetorial**, não imagem; só a parte decorativa rasterizada degrada.

### Metadados

Extraídos por leitor de nome de arquivo + leitor de texto por emissor, com cruzamento e nível de confiança:

| Resultado | Linhas |
|---|---:|
| verde — nome e documento concordam | 141 |
| amarelo — só uma das fontes tem o dado | 7 |
| vermelho — divergência real | 0 |

Cobertura: emissor 148/148 · data 148/148 · título 148/148 · carga horária 136/148 · papel 113/148 · código de validação 69/148. **956 horas** somadas. Doze arquivos sem camada de texto foram lidos visualmente.

## Canais públicos

Um identificador — `douglasabnovato` — em todos os endereços. A lista completa vive em `shared/config/channels.ts` e alimenta a faixa no fim da Home.

Cada canal tem um campo `active`: em `false`, ele não renderiza. Serve para deixar preparado um canal que ainda não tem conteúdo que sustente o link. GitHub e Medium exibem número ao vivo; os demais, uma nota fixa do que existe de fato ali.

## Design

- **Tema** — dark e light por `data-theme` no elemento raiz, com variáveis CSS e persistência em `localStorage`. Dark é o padrão
- **Acento único** — dourado `#c5a880` no escuro, `#8a6a3d` no claro, usado só em estado ativo, em link e nas barras do gráfico de volume do Blog
- **Trilhas de cor** — seis variáveis, uma por frente de atuação. Usadas na faixa temporal do currículo, no painel de assuntos do Blog e na capa de reserva dos artigos
- **Ritmo vertical** — três medidas fixas em variáveis: 96px entre blocos, 56px entre grupos, 20px entre itens
- **Escada de ênfase nas imagens** — três níveis de saturação criam profundidade sem acrescentar cor, e respeitam `prefers-reduced-motion`
- **Números** — sempre em fonte mono com `tabular-nums`, para não dançarem ao atualizar
- **Gráficos sem biblioteca** — as barras do painel do Blog são divs com largura e altura proporcionais. Treze barras não justificam mais de cem kilobytes no bundle
- Sem gradiente, sem glow, sem vidro fosco, sem emoji na interface
- **Responsivo** — a barra lateral vira menu deslizante abaixo do breakpoint `md`

## Tecnologias

- [React 19](https://react.dev/) e [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/) com `@utility` e variáveis CSS para o tema
- [React Router 7](https://reactrouter.com/)
- [Lucide React](https://lucide.dev/) para ícones de interface e [react-icons](https://react-icons.github.io/react-icons/) para ícones de marca
- [Supabase](https://supabase.com/) para o registro de acesso ao currículo
- Exportação de PDF com `window.print()` e uma folha `@media print` dedicada — sem biblioteca
- Nenhuma biblioteca de gráfico

## Estrutura

Arquitetura inspirada em Feature-Sliced Design: `app` orquestra, `entities` guarda dado e regra, `pages` são as telas, `shared` é o reutilizável.

```
src/
├── app/
│   ├── App.tsx
│   ├── main.tsx
│   ├── router/AppRouter.tsx
│   └── styles/{main.css,App.css}    # tokens, tema, utilitários
│
├── entities/
│   ├── article/                     # artigos e acervo do Medium
│   │   ├── api/blog.data.ts         # totais, série por ano, grupos, mais lidos
│   │   ├── model/{types.ts,useMediumPosts.ts}
│   │   └── ui/
│   │       ├── ArticleCard.tsx      # card horizontal, numeração da série
│   │       └── BlogDashboard.tsx    # painel do acervo
│   │
│   ├── certificate/                 # acervo de certificados e comprovações
│   │   ├── model/
│   │   │   ├── types.ts             # Certificado, Registro, ORDEM_SECOES
│   │   │   ├── certificates.data.ts # 161 registros — fonte única
│   │   │   ├── ancora.ts            # resolverAncora() contra o resume.data.ts
│   │   │   ├── formato.ts           # data, carga horária, rótulos
│   │   │   └── useCertificates.ts   # agrupamento por seção e ordenação
│   │   └── ui/
│   │       ├── CertificateCard.tsx  # card com link para o arquivo
│   │       ├── RecordCard.tsx       # card sem arquivo publicado
│   │       └── RecordModal.tsx      # detalhe dos 13 registros
│   │
│   ├── github/                      # tudo que vem da API
│   │   ├── api/
│   │   │   ├── githubApi.ts
│   │   │   └── gistsFixos.ts        # gists fixados à mão
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── useGithubExtras.ts   # gists e organização
│   │   └── ui/{GistCard.tsx,OrganizationCard.tsx}
│   │
│   ├── project/
│   │   ├── api/
│   │   │   ├── ecosystem.data.ts    # frentes exibidas na Home
│   │   │   └── projects.data.ts     # enriquecimento e boards
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   ├── fallbackImage.ts
│   │   │   └── useProjectCatalog.ts # catálogo, roteamento, indicadores
│   │   └── ui/
│   │       ├── ProjectCard.tsx
│   │       ├── ProjectRow.tsx       # card reduzido, para volume alto
│   │       └── ManagementBoardCard.tsx
│   │
│   └── resume/                      # fonte única do currículo
│       ├── model/{types.ts,resume.data.ts,useResumeAccess.ts}
│       └── ui/
│           ├── CurriculumAccessModal.tsx
│           ├── CurriculumPrintTemplate.tsx
│           └── curriculo-print.css  # PDF de uma página, legível por ATS
│
├── pages/
│   ├── home/Home.tsx
│   ├── curriculo/Curriculo.tsx
│   ├── certificados/Certificados.tsx
│   ├── projetos/Projetos.tsx
│   ├── blog/Blog.tsx
│   └── notFound/NotFound.tsx
│
├── shared/
│   ├── config/channels.ts           # canais públicos da faixa da Home
│   ├── lib/{localCache.ts,supabase.ts}
│   └── ui/
│       ├── layout/MainLayout.tsx
│       ├── sidebar/Sidebar.tsx
│       ├── mobileHeader/MobileHeader.tsx
│       └── themeToggle/ThemeToggle.tsx
│
└── (public/arquivos/{cursos,eventos} — 148 arquivos do acervo, servidos estáticos)
```

## Rodando localmente

```bash
git clone https://github.com/douglasabnovato/douglasabnovato.dev.git
cd douglasabnovato.dev
git checkout feature/projetos
npm install
npm run dev
```

Em `http://localhost:5173`. O build de produção é `npm run build`, que roda `tsc -b` antes do Vite — erro de tipo impede o deploy.

Para o registro de acesso ao currículo funcionar em desenvolvimento, crie um `.env.local`:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Sem essas variáveis o site roda normalmente; apenas o registro não é gravado.

## Branches

```
master             → produção
developer          → integração
feature/projetos   → desenvolvimento ativo
demais branches    → histórico das versões 1.0 a 5.2
```

## Ecossistema

| Projeto | O que é |
|---|---|
| [learnTECH](https://learn-tech-pied.vercel.app) | Plataforma principal — LXP e hub de engenharia da ByteClass |
| [Bootcamps](https://bootcamps-dun.vercel.app) | Retrospectiva de formações e eventos |
| [Tools](https://douglasabnovato.github.io/tools) | Catálogo curado de ferramentas para desenvolvedores |
| [Career](https://douglasabnovato.github.io/career) | Oportunidades, empresas e perfis |

---

## Feito

**Currículo**
- Fonte única de verdade: tela e PDF leem do mesmo arquivo
- Faixa temporal da carreira, com barras sobrepostas e trilhas por área
- Quatro números verificáveis, dois deles ao vivo
- Experiência em três profundidades de leitura, por relevância e recência
- Tecnologias apresentadas por evidência — cada uma com a empresa e o período em que foi usada
- PDF de uma página, coluna única, alinhamento à esquerda e corpo em 9,5pt — legível por sistemas de triagem
- Chart.js removido do código — as dependências ainda constam no `package.json` (issue 2.6)
- Botão de acesso ao acervo de certificados

**Certificados**
- Página nova, fora do menu, alcançada por dentro do Currículo
- 161 registros em nove seções, ordenados em linha do tempo
- Duas naturezas de card: 148 com arquivo publicado, 13 com modal e sem documento original no repositório
- Campo `ancora` resolvendo organização, papel e período contra o `resume.data.ts` — nenhum dado duplicado
- Acervo comprimido de 81,33 MB para 33,52 MB, com trava de qualidade de duas métricas
- Metadados extraídos e conferidos: 141 verde, 7 amarelo, 0 vermelho

**Home**
- Abertura em primeira pessoa, com foto e cargos atuais lidos do currículo
- Hierarquia por escala: um destaque, quatro satélites, três frentes
- Escada de ênfase por saturação, com guarda de movimento reduzido
- Sinal de atividade vindo da API do GitHub
- Faixa de canais em 2 × 4 no fim da página, com número ao vivo em GitHub e Medium
- Cabeçalho aliviado: os links saíram para a faixa e a abertura voltou a ser só apresentação
- Navegação duplicada removida — a barra lateral já cumpre o papel

**Projetos**
- Catálogo lido ao vivo, com roteamento por topics e o arquivo local como segunda opção
- Todo repositório novo cai automaticamente na seção padrão
- Contagens derivadas — nenhum número escrito à mão
- Quatro indicadores agregados no topo
- Capa vinda do OpenGraph do GitHub, com reserva determinística
- Boards de gestão com nomes corretos; o board privado deixou de apontar para uma página inacessível
- Seções de Forks e Arquivados
- Gists: 20 exibidos, total real no cabeçalho, e um arquivo para fixar escolhas à mão
- Organização com renderização condicional — aparece sozinha quando houver conteúdo público

**Blog**
- Painel do acervo: 257 artigos, 165.601 visualizações, 75.893 leituras, 23,7 horas de leitura somada
- Volume por ano de 2014 a 2026, com os anos sem publicação exibidos em zero em vez de omitidos
- Sete grupos temáticos, classificados título a título e cruzados com alcance e taxa de leitura
- Os oito artigos mais lidos, com visualizações e proporção de leitura
- Nota de método ao lado das conclusões, declarando o que ficou de fora e por quê
- Feed do Medium com cache, reserva em dado antigo e estado tipado, no mesmo contrato do catálogo de projetos
- Tempo de leitura calculado pela fórmula da própria plataforma; presença de código, capa e resumo extraídos do corpo com `DOMParser`, não com expressão regular
- Data normalizada sem conversão de fuso, o que elimina o deslocamento de um dia
- Card horizontal em duas colunas, com numeração da série (`#257`, `#256`, …) e capa tipográfica determinística quando o artigo não tem imagem
- Entidade `article` reconstruída do zero — o `types.ts` anterior havia sido sobrescrito pelo do currículo e quebrava o build

**Infraestrutura**
- `--color-accent` criado: 48 referências a `accent` espalhadas por 8 arquivos nunca haviam funcionado
- Variáveis de ritmo vertical e trilhas de cor
- Chamada de repositórios reduzida de duas páginas para uma
- Página Códigos removida, com o conteúdo migrado
- Página Redes sociais removida, com os canais migrados para a faixa da Home

---

# Relatório de engenharia

**Apurado em 23/09/2026**, sobre a branch de desenvolvimento, com build de produção real. Os números abaixo são medidos, não estimados. Cada item que pede ação vira uma issue no plano da seção seguinte.

## Tamanho e composição

| | |
|---|---:|
| Arquivos `.ts` / `.tsx` | 54 |
| Linhas de TypeScript | 5.157 |
| Linhas de CSS | 466 |
| Entidades | 5 — `article`, `certificate`, `github`, `project`, `resume` |
| Páginas | 6 |
| Dependências de runtime | 13 |

A arquitetura Feature-Sliced está sendo respeitada: nenhuma página importa de outra página, nenhuma entidade importa de outra entidade, e o `shared` não conhece ninguém acima dele. Não existem as camadas `features` e `widgets` — e, no tamanho atual, não fazem falta.

## Build

| Artefato | Bruto | Gzip |
|---|---:|---:|
| JavaScript | 648,62 kB | **181,61 kB** |
| CSS | 29,61 kB | 6,66 kB |

O JavaScript sai em **um único chunk**. Quem abre a Home baixa o currículo, o catálogo de projetos, o painel do Blog e os 161 registros de certificados — sem usar nada disso.

O `dist` completo pesa cerca de **36,1 MB**: 2,57 MB de aplicação e 33,52 MB do acervo de certificados. O limite de upload estático da Vercel no plano Hobby é de 100 MB, e o limite de arquivos-fonte é 15.000 — há folga confortável nos dois.

### Experimento de code splitting

Com `React.lazy` por rota, medido no mesmo build:

| Chunk | Bruto | Gzip |
|---|---:|---:|
| entrada | 268,62 kB | 85,89 kB |
| Home | 18,70 kB | 7,28 kB |
| Currículo | 234,18 kB | 60,27 kB |
| Certificados | 65,59 kB | 13,46 kB |
| Projetos | 34,11 kB | 8,88 kB |
| Blog | 12,46 kB | 4,19 kB |

Caminho crítico de **181,6 kB para 93,2 kB gzip — 49% menos**, sem tocar em nenhuma linha de componente.

### Peso do Supabase

Substituindo o cliente Supabase por um stub, o bundle cai de 633 kB para 424 kB. São **210 kB — um terço do JavaScript** — carregados em todas as páginas para atender um formulário que aparece em uma.

## Tipagem

`strict` **não está habilitado** no `tsconfig.app.json`. Estão ligados `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly` e `noFallthroughCasesInSwitch`.

Rodando `tsc -b --force` com `strict: true`: **zero erros**. A rigor, o projeto já é estrito — só não está declarado. É a melhoria de maior retorno e menor custo do relatório.

## Lint

`npm run lint` retorna **6 erros e 1 aviso**:

| Arquivo | Linha | Regra |
|---|---:|---|
| `useMediumPosts.ts` | 119 | `setState` dentro de efeito |
| `useGithubExtras.ts` | 80 | `setState` dentro de efeito |
| `useProjectCatalog.ts` | 155 | `setState` dentro de efeito |
| `Curriculo.tsx` | 36 | `setState` dentro de efeito |
| `Home.tsx` | 29 | `setState` dentro de efeito |
| `useProjectCatalog.ts` | 226 | função impura durante a renderização |
| `Curriculo.tsx` | 127 | *(aviso)* `now` recriado a cada render |

Os cinco primeiros são o mesmo padrão repetido — o contrato `loading | ok | stale | error` implementado quatro vezes, copiado de um hook para o outro. Cabe extrair um hook único.

## Testes e integração contínua

**Zero testes. Zero pipeline.** Não há `npm test`, não há runner instalado, não há workflow no GitHub Actions. A única barreira antes do deploy é o `tsc -b` do `npm run build`.

Com 161 registros de certificados, 257 artigos catalogados e um currículo que alimenta tela e PDF, o custo de uma regressão silenciosa em dado só cresce.

## Dependências

Cinco dependências de runtime estão instaladas e **nunca são importadas**:

`chart.js` · `react-chartjs-2` · `html2canvas` · `jspdf` · `react-to-print`

Mais `@types/chart.js` em desenvolvimento. Elas não entram no bundle — o Vite faz tree shaking —, mas pesam na instalação, no `package-lock.json` e na superfície de auditoria de segurança.

## Arquivos mortos

| Situação | Arquivos |
|---|---|
| Vazios (0 linha) | `useProjects.ts`, `Badge.tsx`, `useDocumentTitle.ts`, `utils.ts` |
| Sem nenhum importador | `PdfExportButton.tsx`, `ExperienceBlock.tsx` |
| Imagens nunca importadas | `home/4-volta-express-brasil-2.jpg` (597 KB), `home/2-dev-fullstack-2.jpg` (94 KB) — **691 KB** |

O `App.css` **está em uso** — a versão anterior deste relatório o listava como órfão por engano.

As imagens que de fato entram no build somam cerca de 2,1 MB em JPEG e são exibidas a um terço do tamanho em que estão salvas.

## Acessibilidade e metadados

| Verificação | Resultado |
|---|---|
| Imagens com `alt` | 10 de 10 |
| Botões de ícone com rótulo acessível | 10 de 10 |
| `lang` do documento | **`en`** — o site é em português |
| `meta description` | **ausente** |
| `prefers-reduced-motion` | respeitado |

## Riscos identificados

**`ThemeToggle` derruba a aplicação inteira.** Lê `localStorage` dentro do inicializador do `useState`, sem `try/catch`. O componente vive no `MainLayout`, então uma exceção — navegação anônima, cookies bloqueados, storage cheio — apaga todas as páginas de uma vez. É o ponto mais frágil do projeto.

**`useResumeAccess` tem o mesmo problema**, com alcance menor: quebra só o currículo.

**`CurriculumAccessModal`** é o único componente com cores literais (`bg-zinc-900`, `text-white`) em vez dos tokens do tema — ele ignora o modo claro. Além disso dá `window.location.reload()` após gravar e engole o erro do Supabase em `console.error`: se a gravação falhar, o visitante não fica sabendo.

**A chave anônima do Supabase está no bundle**, como é o desenho do produto. A proteção real depende das políticas de RLS na tabela, não do código do site.

**O projeto Supabase gratuito é pausado após 7 dias sem atividade no banco.** Se o formulário do currículo ficar uma semana sem uso, o próximo visitante encontra a gravação indisponível.

---

# Plano de ação

Dezenove entregas, agrupadas em quatro fases. A ordem não é negociável entre fases: **rede de segurança antes de teste, teste antes de refatoração, refatoração antes de documentação**. Mexer em performance sem teste é trocar um risco conhecido por um desconhecido.

Cada linha vira uma issue no GitHub, com o texto da coluna *Entrega* como título e a coluna *Pronto quando* como critério de aceite.

## Processo de trabalho

**Fluxo de branch**

```
feature/<área>-<assunto>   →   developer   →   master
        1 issue = 1 PR         CI verde        produção
```

- Uma issue, um PR. PR que resolve três issues não é revisável
- Nome da branch: `feature/certificados-ordenacao`, `fix/tema-storage`, `chore/faxina-deps`
- **Nenhum merge com CI vermelho.** Sem exceção — a exceção é o que corrói a regra
- `master` só recebe merge vindo de `developer`

**Convenção de commit**

```
tipo(escopo): descrição no imperativo
```

| Tipo | Quando |
|---|---|
| `feat` | funcionalidade nova visível para o visitante |
| `fix` | correção de defeito |
| `refactor` | muda a forma, não o comportamento |
| `perf` | muda o desempenho, não o comportamento |
| `test` | acrescenta ou corrige teste |
| `docs` | documentação, inclusive este arquivo |
| `chore` | dependência, configuração, script |

Exemplo: `fix(tema): proteger leitura de localStorage com try/catch`

**Pronto significa**

1. O critério de aceite da issue está satisfeito
2. `npm run lint` e `npm run build` passam
3. Os testes passam, e o que a issue mudou tem teste quando cabe teste
4. Se a mudança altera comportamento ou contrato de dado, o README foi atualizado no mesmo PR

## Fase 0 — Rede de segurança

Nada aqui muda o que o visitante vê. Tudo aqui impede que uma mudança futura quebre o site em silêncio.

| Issue | Entrega | Pronto quando |
|---|---|---|
| **0.1** | Habilitar `strict: true` no `tsconfig.app.json` | `tsc -b --force` passa com zero erro e o build de produção continua verde |
| **0.2** | Proteger toda leitura de `localStorage` com `try/catch` — `ThemeToggle` e `useResumeAccess` | O site abre e navega em janela anônima com storage bloqueado, caindo no tema padrão |
| **0.3** | Workflow no GitHub Actions rodando `lint` e `build` em push e em PR | Um PR com erro de tipo aparece vermelho antes de qualquer revisão |
| **0.4** | Teste de integridade dos dados: `certificates.data.ts`, `resume.data.ts` e `blog.data.ts` | O teste falha se houver id duplicado, `ancora` sem destino no currículo, seção fora de `ORDEM_SECOES`, data inválida ou arquivo referenciado que não existe em `public/arquivos` |

A issue 0.4 é a que paga mais rápido: são 161 registros mantidos à mão, e um `ancora` errado hoje só aparece quando alguém abre a página.

## Fase 1 — Testes

| Issue | Entrega | Pronto quando |
|---|---|---|
| **1.1** | Vitest + Testing Library configurados, com script `npm test` | `npm test` roda no CI e no local, com um teste de fumaça passando |
| **1.2** | Testes das funções puras: `resolverAncora`, `formato.ts`, `fallbackImage`, classificação por topic | Cada função tem caso feliz, caso de borda e caso de entrada inválida |
| **1.3** | Testes dos hooks de dado ao vivo, com `fetch` mockado | Os quatro estados — `loading`, `ok`, `stale`, `error` — são exercitados, inclusive o retorno de dado antigo quando a API falha |
| **1.4** | Teste de fumaça por rota | Cada página renderiza sem erro com a API mockada, e o `/certificados` mostra as nove seções |
| **1.5** | Cobertura medida e piso no CI | O relatório de cobertura é publicado no PR e o piso acordado é aplicado |

## Fase 2 — Performance, robustez e limpeza

Só depois da Fase 1: aqui se mexe em código que já funciona.

| Issue | Entrega | Pronto quando |
|---|---|---|
| **2.1** | Code splitting por rota com `React.lazy` e `Suspense` | O chunk de entrada fica em torno de 93 kB gzip e cada página carrega o seu |
| **2.2** | Extrair o contrato `loading / ok / stale / error` em um hook único e eliminar os 5 `setState` em efeito | `npm run lint` retorna zero erro e os quatro hooks usam a mesma implementação |
| **2.3** | Corrigir a função impura durante a renderização em `useProjectCatalog.ts:226` | Lint limpo e o catálogo continua igual em dois renders seguidos |
| **2.4** | Mover a gravação de acesso ao currículo para uma função serverless na Vercel | O cliente Supabase sai do bundle do navegador — cerca de 210 kB a menos — e a gravação continua funcionando |
| **2.5** | Corrigir o `CurriculumAccessModal`: tokens de tema, erro visível ao visitante, fim do `window.location.reload()` | O modal respeita o modo claro, informa a falha em vez de engoli-la, e libera o currículo sem recarregar a página |
| **2.6** | Faxina: remover 5 dependências não usadas, 4 arquivos vazios, 2 órfãos e 691 KB de imagens nunca importadas | `npm ci` mais leve, nenhum import quebrado, build verde |
| **2.7** | Converter as imagens da Home para WebP, redimensionadas por nível de exibição | Os 2,1 MB caem para algo em torno de 300 KB, sem diferença visível |
| **2.8** | `lang="pt-BR"`, `meta description` e título por página | O HTML declara o idioma correto e cada rota tem título e descrição próprios |
| **2.9** | Unificar a contagem de repositórios entre a faixa da Home e a página Projetos | As duas telas leem a mesma função e não podem divergir |

## Fase 3 — Documentação

| Issue | Entrega | Pronto quando |
|---|---|---|
| **3.1** | ADRs curtos das decisões estruturais: Feature-Sliced sem `features`, classificação por topic do GitHub, fonte única do currículo, acervo estático em vez de Supabase Storage | Um arquivo por decisão em `docs/adr/`, com contexto, decisão e consequência |
| **3.2** | Contrato de dado documentado: como acrescentar um certificado, um registro, uma experiência ou um artigo | Um `docs/dados.md` que permite acrescentar um registro sem abrir o código dos componentes |
| **3.3** | `CONTRIBUTING.md` com o processo de trabalho desta seção | Fluxo de branch, convenção de commit e definição de pronto fora do README |
| **3.4** | Reapurar o relatório de engenharia | Os números da seção anterior refletem o estado após a Fase 2, com a data da nova apuração |

## Fora do código

Pendências que não são issue de engenharia, mas envelhecem se ninguém as anotar.

**Números do acervo do Blog** — `blog.data.ts` guarda a apuração de setembro de 2026. A cada ciclo de revisão, atualizar total, ano corrente, visualizações e leituras.

**Divergências entre o currículo e os documentos** — a varredura do acervo encontrou quatro pontos em que o `resume.data.ts` e os documentos originais não batem. Estão em aberto, aguardando decisão de qual versão vai para o site:

| Vínculo | O currículo diz | O documento diz |
|---|---|---|
| Grupo MYSA | fev/2025 – fev/2026 · Tech Growth CRM · Salesforce Developer | CTPS de 04/12/2023 a 05/09/2025 · Assistente de CRM |
| Nvoip | dois papéis distintos | contrato único de 09/12/2020 a 31/08/2021 · Desenvolvedor Frontend Jr |
| Brasil Center | a partir de set/2015 | CLT de 14/09/2015 a 09/09/2019, mais contrato de aprendiz em 2009 |
| IF Sudeste MG | 2016 – 2017 | conclusão em 02/03/2020, diploma expedido em 02/06/2023 |

**Função serverless na Vercel para a API do GitHub** — um endpoint com token de leitura resolve quatro coisas de uma vez: o limite de 60 requisições por hora, a contagem de commits por repositório, as colunas reais do board (Projects v2 só existe em GraphQL autenticado) e as issues fechadas. Atende as três páginas que leem a API.

**learnTECH Community** — a organização não tem repositório público. Ou um repositório se torna público, ou os satélites do learnTECH migram para lá — o que exigiria somar a chamada `/orgs/{org}/repos` ao catálogo.

**Link do currículo na Home** — com os links fora do cabeçalho, o destino mais procurado por quem contrata ficou acessível só pelo menu lateral. Falta uma chamada discreta no corpo da página.

**WhatsApp** — botão flutuante em todas as páginas, hoje presente só na faixa da Home.

---

Feito por [Douglas A. B. Novato](https://www.linkedin.com/in/douglasabnovato/)