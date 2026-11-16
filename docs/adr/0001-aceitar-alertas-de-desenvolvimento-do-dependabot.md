# ADR 0001: Aceitar os alertas de desenvolvimento do Dependabot

- **Status:** Aceita
- **Data:** 16/11/2026

## Contexto

Em 16/11/2026, às 14h39, `gh api "repos/douglasabnovato/douglasabnovato.dev/dependabot/alerts?state=open&per_page=100"` devolveu 1 alerta aberto, no `package-lock.json`, com escopo de desenvolvimento.

Regra para os alertas, ordem do responsável repassada pelo DG líder em 16/11/2026:

> "Regra geral por ADR. alertas que nao atrapalham a producao, pode passar. os que atrapalham, entender, escolher a melhor estrategia para manter a funcionalidade"

"Produção" aqui é o build estático do Vite publicado na Vercel.

## Decisão

| Alerta | Pacote | Severidade | Quem o puxa | Por que não chega à produção |
|---|---|---|---|---|
| #250 | `minimatch` 10.2.6 (GHSA-g3hv-75wg-m249) | média | `eslint` 10.14.0 (direto e por `@eslint/config-array` 0.23.5) e `typescript-eslint` 8.72.1 → `@typescript-eslint/typescript-estree` | Só lint (`npm run lint`), em `devDependencies`. O site não importa o ESLint, e o Vite só empacota o que o código importa. A correção só existe no `minimatch` 11. |

Prova, em 16/11/2026, no clone de `developer/sprint-2026-11-19`:

- `npm ls minimatch --all --package-lock-only`: os caminhos acima.
- `npm ls minimatch --all --package-lock-only --omit=dev`: "(empty)".
- `npm audit --omit=dev --package-lock-only`: "found 0 vulnerabilities".

Não se fecha nem se dispensa alerta pela API. Esta ADR só registra a decisão.

## Consequências

- O risco fica no ambiente de quem desenvolve e no CI, não no site.
- O alerta #250 segue aberto no GitHub. O critério 9 do `docs/MVP.md` conta o alerta como coberto por esta ADR.
- A issue #282 segue como o caminho para zerar o alerta.

## Quando revisar

- Se o `minimatch` aparecer no `npm audit --omit=dev`.
- Já existe correção sem versão maior: o `eslint` 10.15.0 e o `@eslint/config-array` 0.23.6 (13/11/2026) pedem `minimatch` `^11.0.5`, e o `@typescript-eslint/typescript-estree` 8.73.0 (16/11/2026) pede `^11.0.1`. Atualizar no próximo ciclo (#282), quando as versões tiverem alguns dias de uso, com `npm run lint` e o CI verdes. Com isso, esta ADR deixa de ter alerta para cobrir.
- Numa troca da ferramenta de lint.
