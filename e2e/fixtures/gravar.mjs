// Regrava as respostas reais e públicas que o e2e/acessibilidade.pw.ts usa.
// Uso: node e2e/fixtures/gravar.mjs (3 requisições sem token: GitHub e rss2json).
// Guarda só os campos que o site lê; o conteúdo dos artigos é cortado em 4 mil caracteres.
import { writeFileSync } from 'node:fs'

const pasta = new URL('./', import.meta.url)
const u = 'douglasabnovato'
const pegar = async (url) => {
  const r = await fetch(url, { headers: { 'User-Agent': 'fixtures-e2e' } })
  if (!r.ok) throw new Error(`${url}: ${r.status}`)
  return r.json()
}
const escolher = (o, campos) => Object.fromEntries(campos.map((c) => [c, o[c] ?? null]))

const repos = (await pegar(`https://api.github.com/users/${u}/repos?sort=updated&per_page=100`)).map((r) =>
  escolher(r, ['id', 'name', 'description', 'html_url', 'homepage', 'language', 'stargazers_count', 'forks_count', 'open_issues_count', 'updated_at', 'created_at', 'pushed_at', 'topics', 'fork', 'archived']),
)
const usuario = escolher(await pegar(`https://api.github.com/users/${u}`), ['login', 'name', 'public_repos', 'public_gists', 'created_at'])
const gists = (await pegar(`https://api.github.com/users/${u}/gists?per_page=100`)).map((g) => ({
  ...escolher(g, ['id', 'description', 'html_url', 'created_at', 'updated_at', 'comments']),
  files: Object.fromEntries(Object.entries(g.files).map(([k, f]) => [k, escolher(f, ['filename', 'language', 'size'])])),
}))
const feed = await pegar(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${u}`)
const medium = {
  status: feed.status,
  items: feed.items.map((i) => ({ ...escolher(i, ['title', 'link', 'pubDate', 'categories']), content: (i.content ?? '').slice(0, 4000) })),
}

const gravar = (nome, dado) => writeFileSync(new URL(nome, pasta), JSON.stringify(dado, null, 1) + '\n')
gravar('github-repos.json', repos)
gravar('github-usuario.json', usuario)
gravar('github-gists.json', gists)
gravar('medium.json', medium)
console.log(`repos ${repos.length}, gists ${gists.length}, artigos ${medium.items.length}`)
