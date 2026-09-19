/**
 * Gists fixados manualmente.
 *
 * Os itens desta lista aparecem SEMPRE, no topo da seção, na ordem em que
 * estiverem aqui. O restante dos 20 é preenchido automaticamente pelos gists
 * mais recentes da API.
 *
 * Como fixar um gist:
 *   1. abra o gist no GitHub e copie a URL
 *   2. acrescente um objeto abaixo, com os quatro campos
 *
 * Por que os dados vêm escritos aqui em vez de virem da API: um gist antigo
 * pode não estar entre os 100 mais recentes que a página busca, e procurá-lo
 * custaria uma requisição por item. Escrevendo os quatro campos, custa zero.
 */

export interface GistFixo {
  id: string;
  /** Nome do arquivo principal — é o identificador que o GitHub exibe. */
  arquivo: string;
  descricao: string;
  linguagem: string;
  url: string;
}

export const gistsFixos: GistFixo[] = [
  // Exemplo — remova o comentário e ajuste, ou apague se não for usar:
  // {
  //   id: 'a1b2c3d4e5f6',
  //   arquivo: 'debounce.ts',
  //   descricao: 'Debounce tipado para busca em React, sem dependência.',
  //   linguagem: 'TypeScript',
  //   url: 'https://gist.github.com/douglasabnovato/a1b2c3d4e5f6',
  // },
]