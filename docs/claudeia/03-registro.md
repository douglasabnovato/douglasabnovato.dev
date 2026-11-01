# Registro de mudanças

## Lote de 26/10/2026

Sessão de 26/10, aplicada sobre `af306a4` (o commit que foi para produção). Estão na branch `feature/claudeia-2026-10-27` como **16 arquivos alterados, sem commit e ainda não verificados pelo dono**. A lista bate com os 16 arquivos modificados depois do `dist/` de 26/10, às 18:22.

Itens do plano do README: 0.1, 0.2, 0.3, 0.4, parte do 1.1, parte do 2.6, parte do 2.8 e a documentação.

| # | Arquivo | O que mudou | Item | Revisão de 27/10 |
|---:|---|---|---|---|
| 1 | `src/shared/lib/storage.ts` (novo) | `lerItem` e `gravarItem` com `try/catch` | 0.2 | Correto. O efeito colateral no portão do currículo é o E1 (ver abaixo) |
| 2 | `src/shared/ui/themeToggle/ThemeToggle.tsx` | Lê e grava o tema por `storage.ts`; valida `'dark'` ou `'light'` | 0.2 | Correto. O flash do tema claro continua (2.12) |
| 3 | `src/entities/resume/model/useResumeAccess.ts` | `isAuthorized` e `grantAccess` por `storage.ts` | 0.2 | Não derruba mais a página, mas com o storage bloqueado o portão nunca abre, e o `reload` do modal cria laço com uma linha gravada por tentativa (**E1**, risco alto) |
| 4 | `src/shared/lib/hooks/useDocumentTitle.ts` | Antes vazio; agora define `"<título> · douglasabnovato.dev"` | 2.6, 2.8 | Correto. O título só muda depois do carregamento do chunk lazy (aceitável) |
| 5 | `src/pages/home/Home.tsx` | `useDocumentTitle(resumeData.shortName)` | 2.8 | Desloca em +1 a linha do erro de lint (29 → 30) |
| 6 | `src/pages/projetos/Projetos.tsx` | `useDocumentTitle('Projetos')` | 2.8 | Ok |
| 7 | `src/pages/blog/Blog.tsx` | `useDocumentTitle("Blog")` | 2.8 | Ok |
| 8 | `src/pages/curriculo/Curriculo.tsx` | `useDocumentTitle('Currículo')` | 2.8 | Desloca as linhas de lint (36 → 37, 127 → 128) |
| 9 | `src/pages/certificados/Certificados.tsx` | `useDocumentTitle("Certificados")` | 2.8 | Ok |
| 10 | `src/pages/notFound/NotFound.tsx` | `useDocumentTitle('Página não encontrada')` | 2.8 | Ok. Sem link de volta (2.13) |
| 11 | `index.html` | `lang="pt-BR"`, título, `description`, `canonical`, Open Graph e `twitter:card` | 2.8 | Correto. Falta `og:image`. O `canonical` aponta para `vercel.app`: rever se houver domínio próprio |
| 12 | `tsconfig.app.json` | `strict: true`; `exclude: ["src/**/*.test.ts"]` | 0.1 | **Não compilado** desde então (risco baixo). Com a exclusão, o teste fica sem checagem de tipos (E7 → 1.6) |
| 13 | `package.json` | Sai `chart.js`, `react-chartjs-2`, `html2canvas`, `jspdf`, `react-to-print` e `@types/chart.js`; entra `vitest ^5.0.2` e o script `"test": "vitest run"` | 2.6, 1.1 | **O lock não foi atualizado** (E3); a versão do Vitest não foi verificada (E4). Ver `04-testes-automatizados.md` |
| 14 | `src/testes/integridade-dados.test.ts` (novo) | 14 testes: certificados (6), currículo (4) e Blog (4); `ANCORAS_PENDENTES` com `reg-ifsudestemg` e `reg-ufjf` | 0.4 | Bem desenhado (falha nos dois sentidos). Só roda depois do `npm install` |
| 15 | `.github/workflows/ci.yml` (novo) | `npm ci`, lint informativo, `npm test`, `npm run build`; Node 24 | 0.3 | Correto, mas **falha no `npm ci`** até o lock ser commitado |
| 16 | `Readme.md` | Tabela de divergências com documentos pessoais removida; seção "Atualização de 26/10"; coluna Situação no plano | docs | Marca "Feito" em itens sem commit (E5) e mantém informações vencidas (seção 9 do relatório) |

### Riscos de build do lote

| Risco | Probabilidade | Sintoma | Mitigação |
|---|---|---|---|
| Lock fora de sincronia | Certa no CI | `npm ci` termina com "package.json and package-lock.json ... are not in sync" | Rodar `npm install` localmente e commitar o lock |
| `vitest ^5.0.2` inexistente ou incompatível com o Vite 8.1 | Desconhecida (não verificável nesta revisão) | `ETARGET` ou `ERESOLVE` no `npm install` | Trocar pela versão estável cujo `peerDependencies.vite` aceite `^8` |
| `strict` revelar erro | Baixa | `tsc -b` falha no `npm run build` (Vercel e CI) | Corrigir o erro apontado; não desligar o `strict` |
| Vercel instalar a partir do lock antigo | Baixa | Build da Vercel com pacotes removidos | Commitar o lock junto com o `package.json` |
| Portão em laço (E1) | Certa com cookies bloqueados | O formulário nunca libera | 2.5 (ADR-04) |

### Situação

| | |
|---|---|
| Commit | Nenhum |
| Verificado pelo dono | Não |
| Próximo passo | `docs/claudeia/verificar.ps1` e `05-testes-manuais.md` |

---

## Revisão de 27/10/2026

Revisão independente, **só de documentação**. Nenhum arquivo de código, configuração ou dado foi alterado; nenhum arquivo foi apagado; nenhum comando de git, npm, node ou build foi executado. Os 16 arquivos do lote de 26/10 foram lidos e não foram tocados.

| Arquivo | Situação | Conteúdo |
|---|---|---|
| `docs/claudeia/01-relatorio.md` | novo | Medidas, notas, falhas por gravidade, o que está vencido no README |
| `docs/claudeia/02-plano-e-arquitetura.md` | novo | Arquitetura atual e alvo, 7 ADRs (ADR-04: medição de acesso), plano em lotes |
| `docs/claudeia/03-registro.md` | novo | Este arquivo |
| `docs/claudeia/04-testes-automatizados.md` | novo | O que cada etapa automática verifica e como ler o resultado |
| `docs/claudeia/verificar.ps1` | novo | Script de verificação para Windows (UTF-8 com BOM) |
| `docs/claudeia/05-testes-manuais.md` | novo | Roteiro manual com caixas de marcação |

**Fontes da revisão:** código em `src/`, `public/`, arquivos de configuração, `dist/` de 26/10 (medição de chunks), referências em `.git/` lidas como arquivo (sem executar git) e o HTML de produção em 27/10.

**Limitações:** sem execução não foi possível confirmar o `strict`, a versão do Vitest, o resultado do lint atual nem a política RLS do Supabase. Os valores de gzip usam nível 9 e diferem levemente dos do Vite.
