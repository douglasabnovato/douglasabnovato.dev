# Testes manuais

**Onde:** primeiro em `npm run dev` (`http://localhost:5173`) ou `npm run preview` depois do build; depois no preview da Vercel do PR; por fim em https://douglasabnovato-dev.vercel.app depois do merge.
**Quando:** depois do `verificar.ps1` verde. Marque `[x]` em cada linha. Anote em "Obs." o que divergir.
Itens marcados com **(conhecido)** descrevem falhas já registradas no relatório: o esperado é o comportamento atual, e a caixa confirma que ele continua igual (ou que foi corrigido).

## 1. Home `/`

| # | Ação | Esperado | OK |
|---:|---|---|:-:|
| 1.1 | Abrir `/` | Foto, frase de abertura e linha com o cargo atual (AmploPay) | [ ] |
| 1.2 | Olhar a aba do navegador | "Douglas A. B. Novato · douglasabnovato.dev" | [ ] |
| 1.3 | Aguardar 2 s | "Último commit público há …" aparece (vem da API do GitHub) | [ ] |
| 1.4 | Rolar até o destaque | Volta Express: imagem 16:9, nota do Critt, 3 links externos que abrem em nova aba | [ ] |
| 1.5 | Bloco learnTECH | 4 miniaturas (Core, Bootcamps, Tools, Career); ao passar o mouse, a imagem ganha cor | [ ] |
| 1.6 | Faixa de canais no fim | 8 blocos; GitHub com número de repositórios; Medium com "257 artigos publicados" | [ ] |
| 1.7 | Clicar em WhatsApp | Abre `wa.me` com a mensagem preenchida | [ ] |
| 1.8 | Procurar um link para o Currículo no corpo da página | **(conhecido, P.1)** não há; só no menu | [ ] |

## 2. Projetos `/projetos`

| # | Ação | Esperado | OK |
|---:|---|---|:-:|
| 2.1 | Abrir pelo menu | Aba "Projetos · douglasabnovato.dev"; menu com Projetos ativo | [ ] |
| 2.2 | Indicadores | 4 números (repositórios, ativos em 30 dias, issues abertas, com link em produção); "—" só enquanto carrega | [ ] |
| 2.3 | Gestão de projetos | Boards renderizados; nenhum aponta para página privada | [ ] |
| 2.4 | Seção **Top Destaques** | Aparece, com contagem no título, e contém o card **Components** | [ ] |
| 2.5 | Card Components | Capa (OpenGraph do GitHub ou reserva fixa), título, descrição, links do repositório | [ ] |
| 2.6 | Recarregar a página 2 vezes | A capa de reserva de um projeto é sempre a mesma | [ ] |
| 2.7 | Seções Projetos, Forks e Arquivados | Cards reduzidos em 2 colunas | [ ] |
| 2.8 | Gists | "20 de N" e link "Ver todos no GitHub" | [ ] |
| 2.9 | Comparar o total de repositórios com o da Home (1.6) e do Currículo (4.6) | **(conhecido, 2.9)** podem diferir em 1–2; anote os três valores: ___ / ___ / ___ | [ ] |

## 3. Blog `/blog`

| # | Ação | Esperado | OK |
|---:|---|---|:-:|
| 3.1 | Abrir | Aba "Blog · …"; painel com 257 artigos, 165.601 visualizações e 75.893 leituras | [ ] |
| 3.2 | Gráfico por ano | Barras de 2014 a 2026, anos sem publicação em zero | [ ] |
| 3.3 | Nota de método | Os dois parágrafos de ressalva visíveis | [ ] |
| 3.4 | Publicados recentemente | "10 de 257" (ou menos), cards com numeração `#257`, `#256`… | [ ] |
| 3.5 | Texto de fechamento do painel | **(conhecido, P.4)** "Hoje é o que faço em tempo integral: formação de desenvolvedores" | [ ] |

## 4. Currículo `/curriculo`

Faça em janela anônima comum (cookies permitidos), para começar sem acesso.

| # | Ação | Esperado | OK |
|---:|---|---|:-:|
| 4.1 | Abrir | Tela "Currículo restrito" e botão "Solicitar acesso"; aba "Currículo · …" | [ ] |
| 4.2 | Clicar "Solicitar acesso" | Modal com 2 campos (Primeiro Nome, Sua Empresa) | [ ] |
| 4.3 | Enviar vazio | O navegador bloqueia (campos obrigatórios) | [ ] |
| 4.4 | Preencher "Teste" / "Teste QA 27-10" e Acessar | Botão "Liberando...", página recarrega **(conhecido, 2.5)** e o currículo aparece | [ ] |
| 4.5 | No Supabase, Table Editor → `curriculum_access_logs` | Uma linha nova com "Teste" e "Teste QA 27-10". **Se não houver, a gravação falhou em silêncio (E2)** | [ ] |
| 4.6 | Números do topo | 2009 · repositórios (API) · com link em produção (API) · "200+" **(conhecido, P.3)** | [ ] |
| 4.7 | Faixa temporal | Barras por vínculo, legenda de trilhas | [ ] |
| 4.8 | "Ver acervo completo" | Vai para `/certificados` já liberado | [ ] |
| 4.9 | Botão PDF → Salvar como PDF (A4) | **Uma página**, fundo branco, coluna única, sem menu nem barra lateral | [ ] |
| 4.10 | Ler o PDF | 5 experiências detalhadas; **(conhecido, P.2)** AmploPay aparece só em "Trajetória anterior" | [ ] |
| 4.11 | Recarregar `/curriculo` | Continua liberado, sem pedir de novo | [ ] |
| 4.12 | Fechar a janela anônima e abrir outra | Volta a pedir identificação | [ ] |
| 4.13 | Apagar a linha de teste no Supabase | Tabela sem a linha "Teste QA 27-10" | [ ] |

## 5. Certificados `/certificados`

| # | Ação | Esperado | OK |
|---:|---|---|:-:|
| 5.1 | Em janela nova, sem acesso, abrir `/certificados` | "Acervo restrito" e link "Ir para o currículo" | [ ] |
| 5.2 | Com acesso, abrir | Aba "Certificados · …"; 4 indicadores (161 itens, 148 com certificado, horas, desde) | [ ] |
| 5.3 | Contar as seções | **9**, nesta ordem e com estes totais: Cursos 53 · ABC GRC1 36 · DIO Spread 26 · Eventos 23 · Formação e trajetória 10 · Alura ONE 4 · DIO Santander 3 · Rocketseat 3 · Produção pública 3 | [ ] |
| 5.4 | Abrir 3 certificados (um de cada pasta, incluindo "Resilia Conecta") | O PDF ou a imagem abre em nova aba | [ ] |
| 5.5 | Clicar em um registro de comprovação (ex.: Estácio) | Modal com organização, documento, o que comprova e nota | [ ] |
| 5.6 | No modal: Esc, clique fora e botão Fechar | Os três fecham; o fundo não rola enquanto o modal está aberto | [ ] |
| 5.7 | Abrir os registros IF Sudeste MG e UFJF | **(conhecido, P.6)** aparecem sem período vindo do currículo | [ ] |

## 6. 404

| # | Ação | Esperado | OK |
|---:|---|---|:-:|
| 6.1 | Abrir `/nao-existe` | "Página não encontrada"; aba "Página não encontrada · …" | [ ] |
| 6.2 | Procurar caminho de volta | **(conhecido, 2.13)** só o menu | [ ] |

## 7. Títulos de aba

| # | Rota | Título esperado | OK |
|---:|---|---|:-:|
| 7.1 | `/` | Douglas A. B. Novato · douglasabnovato.dev | [ ] |
| 7.2 | `/projetos` | Projetos · douglasabnovato.dev | [ ] |
| 7.3 | `/blog` | Blog · douglasabnovato.dev | [ ] |
| 7.4 | `/curriculo` | Currículo · douglasabnovato.dev | [ ] |
| 7.5 | `/certificados` | Certificados · douglasabnovato.dev | [ ] |
| 7.6 | `/qualquer` | Página não encontrada · douglasabnovato.dev | [ ] |
| 7.7 | Navegar Home → Blog → voltar | O título acompanha a rota a cada troca | [ ] |

## 8. Tema claro e escuro

| # | Ação | Esperado | OK |
|---:|---|---|:-:|
| 8.1 | Primeira visita | Tema escuro | [ ] |
| 8.2 | "Modo claro" | Fundo branco e acento dourado escuro em todas as páginas | [ ] |
| 8.3 | Recarregar no claro | Continua claro. **(conhecido, 2.12)** pode piscar escuro por um instante | [ ] |
| 8.4 | No claro, abrir o modal do Currículo | **(conhecido, 2.5)** o modal continua escuro | [ ] |
| 8.5 | No claro, imprimir o PDF | O PDF é igual ao do escuro | [ ] |

## 9. Janela anônima com cookies bloqueados

Chrome: Configurações → Privacidade → Cookies → "Bloquear todos os cookies" (ou bloquear só para `localhost` e `vercel.app`). Reverter ao final.

| # | Ação | Esperado | OK |
|---:|---|---|:-:|
| 9.1 | Abrir `/` | A página abre normalmente (era o risco do item 0.2) | [ ] |
| 9.2 | Trocar o tema | Troca; ao recarregar volta ao escuro (sem persistência) | [ ] |
| 9.3 | Projetos e Blog | Carregam (sem cache, buscam de novo) | [ ] |
| 9.4 | Currículo → Solicitar acesso → enviar | **(conhecido, E1)** recarrega e volta a "Currículo restrito": laço | [ ] |
| 9.5 | No Supabase, contar as linhas criadas no 9.4 | **(conhecido, E1)** uma linha por tentativa. Anotar: ___ | [ ] |
| 9.6 | Restaurar os cookies e apagar as linhas de teste | — | [ ] |

## 10. Celular (ou DevTools com 375 × 812)

| # | Ação | Esperado | OK |
|---:|---|---|:-:|
| 10.1 | Abrir `/` | Cabeçalho fixo com "douglasabnovato.dev" e botão de menu; sem rolagem horizontal | [ ] |
| 10.2 | Abrir o menu | Painel desliza da esquerda; fundo escurece | [ ] |
| 10.3 | Tocar fora / no X / num link | Fecha nos três casos; o link navega | [ ] |
| 10.4 | Home, Projetos, Blog, Currículo, Certificados | Grades em 1 ou 2 colunas, textos sem cortar, sem rolagem horizontal | [ ] |
| 10.5 | Currículo, faixa temporal | O eixo de anos some, as barras continuam legíveis | [ ] |
| 10.6 | Modal de acesso | Cabe na tela; o teclado não esconde o botão Acessar | [ ] |
| 10.7 | Teclado físico (DevTools): Tab com o menu fechado | **(conhecido, 2.11)** o foco passa por links invisíveis do menu | [ ] |

## 11. Versão publicada

| # | Ação | Esperado | OK |
|---:|---|---|:-:|
| 11.1 | Ver o código-fonte de https://douglasabnovato-dev.vercel.app | `<html lang="pt-BR">`, `meta description`, `canonical` e `og:*` (antes do merge: ainda sem eles) | [ ] |
| 11.2 | Acessar diretamente `/curriculo`, `/certificados` e `/blog` (recarregar) | Abrem (rewrite da Vercel) | [ ] |
| 11.3 | DevTools → Network → JS ao abrir `/` | Só o chunk `index-*.js` (cerca de 87 kB gzip); `Curriculo-*.js` só ao abrir o Currículo | [ ] |
| 11.4 | Colar o link num aplicativo de mensagem | Título e descrição aparecem; **(conhecido, 2.8)** sem imagem | [ ] |
| 11.5 | Abrir um PDF do acervo pela URL direta | Abre | [ ] |
| 11.6 | GitHub → Actions | Último CI verde no commit publicado | [ ] |

**Resultado:** ___ de ___ caixas OK · Data: ___/___/2026 · Ambiente: ___
