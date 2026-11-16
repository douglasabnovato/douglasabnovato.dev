# Publicação — douglasabnovato.dev

> Conferido em 16/11/2026. Hospedagem: **Vercel**, plano gratuito (Hobby). Endereço: https://douglasabnovato-dev.vercel.app/

## Como o site chega ao ar

1. Um PR entra na `master` depois do CI verde. O ruleset da `master` exige os jobs `Testes e build` e `Fluxos no navegador`, PR obrigatório e bloqueia force push e exclusão (`gh api repos/douglasabnovato/douglasabnovato.dev/rules/branches/master`, 16/11/2026).
2. A integração da Vercel com o GitHub publica a `master` sozinha. O status `Vercel` aparece no commit, e a API de deployments do GitHub registra o ambiente `Production` com o hash do commit.
3. PRs e outras branches ganham uma prévia (`Preview`) na Vercel, sem tocar na produção.

Não há passo manual nem workflow de deploy: o `.github/workflows/ci.yml` só testa.

## Configuração do projeto na Vercel (já feita)

O painel da Vercel é da conta do responsável, e o agente não o abre. A tabela vem do que o repositório e a API do GitHub mostram em 16/11/2026 (`package.json`, `vercel.json` e os deployments `Production` da `master`). Os campos do painel devem ser conferidos pelo responsável.

| Campo | Valor |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` (roda `tsc -b` antes do `vite build`) |
| Output Directory | `dist` |
| Install Command | `npm install` (padrão) |
| Production Branch | `master` |
| Rotas | `vercel.json` manda toda rota para `/index.html` (SPA) |

**Variáveis de ambiente** (Settings → Environment Variables): `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`. Os nomes estão no `.env.example`; os valores ficam só na Vercel e no `.env.local`. A chave anônima vai para o bundle por desenho; a proteção é a política de RLS da tabela no Supabase.

## Como conferir que a produção roda a `master`

```bash
# 1. Commit publicado em produção
gh api "repos/douglasabnovato/douglasabnovato.dev/deployments?environment=Production&per_page=1" --jq '.[0].sha'
git rev-parse origin/master

# 2. Bundle publicado
curl -s https://douglasabnovato-dev.vercel.app/ | grep -oE 'assets/index-[^"]+\.js'
```

O hash do `index-*.js` publicado difere do build local, porque a Vercel injeta as variáveis do Supabase. Compare os chunks que não dependem delas (`NotFound-*.js`, `curadoria.data-*.js`): em 16/11/2026, os dois batiam com o build local da `master` (`4753b76`).

## GitHub Pages legado (desligado em 16/11/2026)

O repositório tinha o GitHub Pages ligado no modo legado, publicando a raiz da `master`. Ele servia o `index.html` de desenvolvimento, que pede `/src/app/main.tsx`, e a página ficava vazia.

Foi desligado em 16/11/2026, por ordem do responsável (#270). Conferido às 11:28:

| Verificação | Resultado |
|---|---|
| `gh api repos/douglasabnovato/douglasabnovato.dev/pages` | 404 (Pages desligado) |
| `curl -s -o /dev/null -w "%{http_code}" https://douglasabnovato.github.io/douglasabnovato.dev/` | 404 |
| `curl -s -o /dev/null -w "%{http_code}" https://douglasabnovato-dev.vercel.app` | 200 |

A Vercel é a única hospedagem. Não religar o Pages: ele publicaria o código-fonte, não o build.

## Se a Vercel falhar

- Falha em 2 a 4 segundos, antes da instalação, é configuração do projeto na Vercel, não build. O link do status `Vercel` no commit leva ao log.
- Build vermelho na Vercel com o CI verde: comparar a versão do Node (o CI usa a 24) e as variáveis de ambiente.
- Corrigir conta, projeto ou variáveis é do responsável. O agente diagnostica pelo log público e abre a issue.
