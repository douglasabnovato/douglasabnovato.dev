<h1 align="center">douglasabnovato.dev</h1>
<p align="center">Ecossistema pessoal em tecnologia — currículo, projetos e gestão de produto, com dados lidos ao vivo do GitHub.</p>

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

Três regras governam o que entra no site, e explicam a maior parte das decisões de código:

**Nada de número autodeclarado.** Toda métrica exibida vem de uma fonte verificável — API do GitHub, datas do próprio histórico, ou um link que o visitante pode conferir. Não há barra de proficiência, nota de habilidade nem percentual de domínio, porque nenhum deles pode ser checado por quem lê.

**Uma fonte de verdade por assunto.** O currículo da tela e o PDF exportado leem do mesmo arquivo. O catálogo de projetos vem da API, não de uma lista mantida à mão. Onde há duas cópias, uma delas envelhece.

**Hierarquia por escala, não por cor.** A importância de um elemento é comunicada por espaço, tamanho e proporção. Cor é reservada para estado e para série de dados.

## Páginas

| Página | Estado | O que faz |
|---|---|---|
| **Home** | no ar | Abertura em primeira pessoa e o que está sendo construído agora. Um projeto em destaque, os satélites do learnTECH e as demais frentes, em três níveis de tamanho. Sinal de atividade vindo da API |
| **Currículo** | no ar | Acesso mediante identificação, registrada no Supabase. Faixa temporal da carreira, quatro números verificáveis, experiência em três profundidades de leitura e exportação em PDF de uma página |
| **Projetos** | no ar | Catálogo lido ao vivo do GitHub, classificado por topics do próprio repositório. Boards de gestão, indicadores agregados e recorte dos gists |
| **Blog** | no ar | Artigos publicados no [Medium](https://douglasabnovato.medium.com), via RSS |
| **Redes sociais** | no ar | Links reunidos |
| **Certificados** | a construir | Acervo da trajetória, em linha do tempo, com acesso registrado |

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

Tudo que é número vem da API pública do GitHub, sem autenticação, com cache em `localStorage`:

| Fonte | O que traz | Cache |
|---|---|---|
| `/users/{u}/repos` | catálogo, issues abertas, datas, linguagens, topics | 1 hora |
| `/users/{u}` | totais da conta, inclusive o número real de gists | 24 horas |
| `/users/{u}/gists` | os 100 mais recentes, dos quais 20 são exibidos | 24 horas |
| `/orgs/{org}` | a organização — a seção só renderiza se houver repositório público | 24 horas |
| `opengraph.githubassets.com` | capa de cada repositório | CDN do GitHub |

A capa de cada projeto é o **cartão OpenGraph do próprio GitHub**. Quando um repositório define uma imagem em Settings → Social preview, o card do site passa a exibi-la automaticamente, sem mudança de código. Quando a imagem falha, entra uma reserva escolhida de forma determinística pelo nome do repositório — o mesmo projeto sempre recebe a mesma capa.

O limite sem token é de 60 requisições por hora por IP. Cada página consome entre uma e três, e as respostas ficam em cache. Em caso de falha, o site exibe os dados anteriores e avisa.

## Design

- **Tema** — dark e light por `data-theme` no elemento raiz, com variáveis CSS e persistência em `localStorage`. Dark é o padrão
- **Acento único** — dourado `#c5a880` no escuro, `#8a6a3d` no claro, usado só em estado ativo e em link
- **Trilhas de cor** — seis variáveis, uma por frente de atuação, usadas exclusivamente na faixa temporal do currículo
- **Ritmo vertical** — três medidas fixas em variáveis: 96px entre blocos, 56px entre grupos, 20px entre itens
- **Escada de ênfase nas imagens** — três níveis de saturação criam profundidade sem acrescentar cor, e respeitam `prefers-reduced-motion`
- **Números** — sempre em fonte mono com `tabular-nums`, para não dançarem ao atualizar
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

## Estrutura

Arquitetura inspirada em Feature-Sliced Design: `app` orquestra, `entities` guarda dado e regra, `pages` são as telas, `shared` é o reutilizável.

```
src/
├── app/
│   ├── App.tsx
│   ├── main.tsx
│   ├── router/AppRouter.tsx
│   └── styles/main.css              # tokens, tema, utilitários
│
├── entities/
│   ├── article/                     # artigos do Medium
│   │   ├── model/{types.ts,useMediumPosts.ts}
│   │   └── ui/ArticleCard.tsx
│   │
│   ├── github/                      # tudo que vem da API
│   │   ├── api/
│   │   │   ├── githubApi.ts
│   │   │   └── gists.fixos.ts       # gists fixados à mão
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
│   ├── projetos/Projetos.tsx
│   ├── blog/Blog.tsx
│   ├── redesSociais/RedesSociais.tsx
│   └── notFound/NotFound.tsx
│
└── shared/
    ├── lib/{localCache.ts,supabase.ts}
    └── ui/
        ├── layout/MainLayout.tsx
        ├── sidebar/Sidebar.tsx
        ├── mobileHeader/MobileHeader.tsx
        └── themeToggle/ThemeToggle.tsx
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
- Chart.js removido do projeto

**Home**
- Abertura em primeira pessoa, com foto, cargos atuais lidos do currículo e ações diretas
- Hierarquia por escala: um destaque, quatro satélites, três frentes
- Escada de ênfase por saturação, com guarda de movimento reduzido
- Sinal de atividade vindo da API do GitHub
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

**Infraestrutura**
- `--color-accent` criado: 48 referências a `accent` espalhadas por 8 arquivos nunca haviam funcionado
- Variáveis de ritmo vertical e trilhas de cor
- Chamada de repositórios reduzida de duas páginas para uma
- Página Códigos removida, com o conteúdo migrado

## Próximos passos

**Certificados** — acervo em linha do tempo por ano, com acesso registrado, imagens no Supabase Storage e visualizador sem download direto.

**Blog e Redes sociais** — as duas páginas ainda não passaram por revisão.

**Função serverless na Vercel** — um endpoint com token de leitura resolve quatro coisas de uma vez: o limite de 60 requisições por hora, a contagem de commits por repositório, as colunas reais do board (Projects v2 só existe em GraphQL autenticado) e as issues fechadas. Atende as três páginas.

**Faxina** — sete arquivos sem importadores (`useProjects.ts`, `ExperienceBlock.tsx`, `Badge.tsx`, `utils.ts`, `useDocumentTitle.ts`, `PdfExportButton.tsx`, `App.css`) e três dependências que nunca foram usadas (`react-to-print`, `html2canvas`, `jspdf`).

**Imagens da Home** — 2,1 MB em JPEG, exibidos a um terço do tamanho em que estão salvos. Convertidos para WebP e redimensionados por nível, devem ficar em torno de 300 KB.

**Robustez** — o `ThemeToggle` lê `localStorage` dentro do inicializador do `useState` sem try/catch; é o único ponto capaz de derrubar a aplicação inteira em navegação anônima.

**WhatsApp** — botão flutuante em todas as páginas, hoje presente só no cabeçalho da Home.

**TypeScript** — `strict` não está habilitado. Ligar exige corrigir o que aparecer antes do próximo deploy, já que o build roda `tsc -b`.

**learnTECH Community** — a organização não tem repositório público. Ou um repositório se torna público, ou os satélites do learnTECH migram para lá — o que exigiria somar a chamada `/orgs/{org}/repos` ao catálogo.

---

Feito por [Douglas A. B. Novato](https://www.linkedin.com/in/douglasabnovato/)