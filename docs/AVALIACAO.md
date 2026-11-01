# Avaliação — douglasabnovato.dev

> Data: 31/10/2026 · Base: `3102629`.

## Evidências

| Item | Resultado |
|---|---|
| `npm ci` e build | Passam localmente |
| Lint | **Falha**: 6 erros e 1 aviso |
| Testes | Não há script nem teste na `master` |
| `npm audit --omit=dev` | 7 alertas: 1 crítico, 5 altos e 1 moderado |
| CI | Não há workflow de verificação na `master` |
| Publicação | Vercel e Pages no commit atual; o site responde 200, com `lang="en"` e título único |

## Achados

| # | Severidade | Achado | Encaminhamento |
|---|---|---|---|
| A1 | Alta | A `master` publica sem verificação | O lote de 27/10 traz CI; decidir |
| A2 | Alta | Alertas de dependências de produção | Tratar depois de decidir o lote |
| A3 | Média | Lint quebrado | Corrigir depois do lote |
| A4 | Média | Metadados de SEO ausentes em produção | O lote de 27/10 traz |

## Nota

**6,0**, nível N2 parcial; meta N3. É um julgamento técnico.
