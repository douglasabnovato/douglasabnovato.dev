<h1 align="center">🌐 douglasabnovato.dev</h1>
<p align="center">Meu site pessoal — currículo, projetos e conteúdo, num só lugar.</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
</p>

---

## 💻 Sobre o projeto

Site pessoal que centraliza minha trajetória, meu currículo e os projetos que venho construindo — incluindo o [ecossistema learnTECH](https://learn-tech-pied.vercel.app), do qual esse site é a origem.

Esse repositório tem história: nasceu em 2022 como um desafio de portfólio da Rocketseat, evoluiu por 5 versões em HTML/CSS/JS puro (320 commits), ficou parado por mais de 3 anos, e está sendo **reconstruído do zero** com uma stack moderna — não como remendo do código antigo, mas como reflexo de onde estou hoje. O histórico de versões anteriores continua preservado nas branches do repositório.

## ✨ Funcionalidades

| Página | Status | O que faz |
|---|---|---|
| 🏠 Home | ✅ Pronta | O que estou fazendo agora, com destaque pro ecossistema learnTECH |
| 📄 Currículo | ✅ Pronta | Trajetória profissional real, com exportação em PDF (layout de duas colunas) |
| 🗂️ Projetos | ✅ Pronta | Curadoria própria: Especiais, Destaques e categorias — só o que está hospedado e passa no meu padrão de qualidade |
| 💻 Códigos | ✅ Pronta | Tudo consumido ao vivo da API do GitHub: repositórios, issues em progresso, gists e a comunidade [learnTECH Community](https://github.com/learnTECH-community) — com cache local de 1h para respeitar o limite de requisições |
| 📝 Blog | ✅ Pronta | Artigos que escrevo, via [Medium](https://douglasabnovato.medium.com) |
| 🔗 Redes sociais | ✅ Pronta | Todos os meus links, num lugar só |

## 🎨 Tema e responsividade

- **Dark/light** — alternância manual com persistência em `localStorage`; dark é o padrão, consistente com o resto do ecossistema (não é limitação, é escolha deliberada)
- **Responsivo** — sidebar vira menu mobile (drawer com overlay) abaixo do breakpoint `md`

## 🛠 Tecnologias

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) como build tool
- [Tailwind CSS 4](https://tailwindcss.com/) para estilização, com variáveis CSS para o tema dark/light
- [React Router](https://reactrouter.com/) para navegação
- [react-to-print](https://github.com/MatthewHerbst/react-to-print) para exportação de currículo em PDF
- [Lucide React](https://lucide.dev/) para ícones gerais + [react-icons](https://react-icons.github.io/react-icons/) (Font Awesome 6) para ícones de marca (GitHub, LinkedIn, Instagram, X) — o Lucide removeu esses ícones nas versões recentes
- API pública do GitHub, sem autenticação (repositórios, issues, gists, organizações), com cache local para respeitar o limite de requisições

## 📁 Estrutura do projeto

Arquitetura inspirada em Feature-Sliced Design — mesmo padrão usado no [bootcamps](https://bootcamps-dun.vercel.app): separação por `app` (orquestração), `entities` (dado e regra de negócio), `pages` (telas) e `shared` (reutilizável).

```
src/
├── app/
│   ├── App.tsx
│   ├── main.tsx
│   ├── router/
│   │   └── AppRouter.tsx
│   └── styles/
│       ├── App.css
│       └── main.css
│
├── entities/
│   ├── article/
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── useMediumPosts.ts
│   │   └── ui/
│   │       └── ArticleCard.tsx
│   ├── github/                 # dados ao vivo da API do GitHub
│   │   ├── api/
│   │   │   └── githubApi.ts
│   │   └── model/
│   │       └── types.ts
│   ├── project/                # curadoria de projetos (Especiais/Destaques/categorias)
│   │   ├── api/
│   │   │   └── projects.data.ts
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── useProjects.ts
│   │   └── ui/
│   │       └── ProjectCard.tsx
│   └── resume/                 # currículo, com exportação em PDF
│       ├── model/
│       │   ├── resume.data.ts
│       │   └── types.ts
│       └── ui/
│           ├── curriculo-print.css
│           ├── ExperienceBlock.tsx
│           └── PdfExportButton.tsx
│
├── pages/
│   ├── blog/Blog.tsx
│   ├── codigos/Codigos.tsx
│   ├── curriculo/Curriculo.tsx
│   ├── home/Home.tsx
│   ├── notFound/NotFound.tsx
│   ├── projetos/Projetos.tsx
│   └── redesSociais/RedesSociais.tsx
│
└── shared/
    ├── lib/
    │   ├── localCache.ts       # cache com TTL em localStorage (usado pela página Códigos)
    │   ├── utils.ts
    │   └── hooks/
    │       └── useDocumentTitle.ts
    └── ui/
        ├── badge/Badge.tsx
        ├── layout/MainLayout.tsx
        ├── mobileHeader/MobileHeader.tsx  # barra fixa mobile, só abaixo do breakpoint md
        ├── sidebar/Sidebar.tsx
        └── themeToggle/ThemeToggle.tsx
```

## 🚀 Como rodar localmente

```bash
git clone https://github.com/douglasabnovato/douglasabnovato.dev.git
cd douglasabnovato.dev
git checkout mvp-versao-1
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## 🌳 Workflow de branches

```
master              → produção
developer            → integração/staging
mvp-versao-1         → desenvolvimento ativo desta reconstrução
demais branches      → histórico preservado das versões anteriores (v1.0 a v5.2)
```

## 🌐 Ecossistema

Esse site é a origem de um conjunto maior de projetos:

| Projeto | Descrição |
|---|---|
| [learnTECH](https://learn-tech-pied.vercel.app) | Plataforma principal — LXP e hub de engenharia da ByteClass |
| [Bootcamps](https://bootcamps-dun.vercel.app) | Retrospectiva e roteiro de formações e eventos |
| [Tools](https://douglasabnovato.github.io/tools) | Catálogo curado de ferramentas para devs |
| [Career](https://douglasabnovato.github.io/career) | Oportunidades, empresas e perfis de devs |

E dois projetos de portfólio avulso, provas de capacidade técnica em contextos reais:

| Projeto | Descrição |
|---|---|
| [DoctorCare](https://douglasabnovato.github.io/doctor-care) | Landing page institucional para profissionais autônomos da saúde |
| [Crachá Virtual](https://douglasabnovato.github.io/cracha-virtual) | Gerador de crachá digital mobile-first com links sociais |

---

Feito por [Douglas A. B. Novato](https://www.linkedin.com/in/douglasabnovato/) 👋🏽