# Testes automatizados

## Como rodar no Windows

Na raiz do projeto, no PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\docs\claudeia\verificar.ps1
```

Parâmetro opcional: `-PularInstall` pula a etapa 1 (só depois que o lock já estiver atualizado e commitado).

O script para no primeiro erro das etapas bloqueantes (1 a 3). O lint (etapa 4) é informativo e nunca interrompe.

## Etapas

| # | Etapa | Bloqueia? | O que verifica | Resultado esperado hoje |
|---:|---|---|---|---|
| 0 | Pré-requisitos | sim | `node` e `npm` no PATH; Node 20.19+ ou 22.12+ (exigência do Vite 8); `package.json` na pasta | Versões impressas |
| 1 | `npm install` | sim | Instala o que o `package.json` pede e **reescreve o `package-lock.json`** | Lock atualizado: sem `chart.js`, `react-chartjs-2`, `html2canvas`, `jspdf`, `react-to-print` e `@types/chart.js`; com `vitest` |
| 2 | `npm test` | sim | `vitest run`: os 14 testes de integridade | `14 passed` |
| 3 | `npm run build` | sim | `tsc -b` com `strict: true` e depois `vite build` | Build verde; chunks por página em `dist/assets` |
| 4 | `npm run lint` | não | ESLint | 6 erros conhecidos e 1 aviso (item 2.2) |

## Por que `npm install` na primeira vez

O `package.json` foi alterado em 26/10 (6 pacotes saíram e o `vitest` entrou), mas o `package-lock.json` é de 07/10. Consequências:

| Onde | Comando | O que acontece com o lock antigo |
|---|---|---|
| Sua máquina | `npm test` | Falha: `vitest` não está em `node_modules` |
| CI (`ci.yml`) | `npm ci` | **Falha**: o `npm ci` recusa lock e `package.json` fora de sincronia |
| Vercel | instalação padrão | Tende a funcionar, mas instala a partir de um lock que não corresponde ao código |

O `npm install` resolve as três situações, desde que o `package-lock.json` resultante **seja commitado junto** com o `package.json`. Depois disso, o CI usa `npm ci` (instalação exata e reprodutível) e o `-PularInstall` passa a ser seguro no uso local.

## Se algo falhar

| Etapa | Sintoma | Causa provável | O que fazer |
|---|---|---|---|
| 1 | `ETARGET No matching version found for vitest@^5.0.2` | A versão não existe no registro | Trocar no `package.json` pela versão estável mais recente do Vitest que aceite o Vite 8 e rodar de novo |
| 1 | `ERESOLVE ... peer vite@...` | O Vitest escolhido não declara suporte ao Vite 8.1 | Idem. **Não** usar `--force` nem `--legacy-peer-deps` para mascarar |
| 2 | `reg-... → ...` em "têm âncora com destino" | Âncora nova sem destino em `resume.data.ts` | Corrigir o id ou, se for decisão consciente, registrar em `ANCORAS_PENDENTES` |
| 2 | "Âncora corrigida: remova-a de ANCORAS_PENDENTES" | Alguém corrigiu `reg-ifsudestemg` ou `reg-ufjf` | Remover a linha do teste |
| 2 | "a série por ano somando o total" | Publicou um artigo e atualizou só um dos contadores | Atualizar `mediumTotal`, `yearly`, `topics` e `editorial` juntos |
| 2 | "apontam para um arquivo existente" | PDF renomeado ou apagado em `public/arquivos` | Acertar o caminho em `certificates.data.ts` |
| 3 | `error TS...` | Erro de tipo revelado pelo `strict` | Corrigir o código; não desligar o `strict` |
| 4 | Mais de 6 erros | Regressão nova de lint | Corrigir antes do merge, mesmo com o lint informativo |

## O que os testes cobrem e o que não cobrem

| Coberto (14 testes) | Não coberto (plano) |
|---|---|
| Id único, seção válida, data válida e arquivo existente nos certificados | Funções puras (1.2) |
| Âncora com destino, com a lista de pendências fiel | Estados `loading/ok/stale/error` dos hooks (1.3) |
| Datas, "presente" e rótulo de período no currículo | Render das rotas (1.4) |
| Somas e continuidade de anos no Blog | Portão do currículo com storage bloqueado e erro do Supabase (1.3, 1.4, ADR-04) |
| — | Checagem de tipos do próprio arquivo de teste (1.6) |
| — | "200+" × `mediumTotal` (proposta ADR-03) |

## Depois de verde

1. Commitar `package.json` + `package-lock.json` no mesmo commit (`chore(deps): ...`).
2. Commitar os demais itens do lote em commits separados (ver `03-registro.md`).
3. Abrir o PR para `developer-mvp` e conferir o CI verde.
4. Rodar o `05-testes-manuais.md` no preview da Vercel.
