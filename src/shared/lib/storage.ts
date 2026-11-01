/**
 * Acesso protegido ao localStorage.
 *
 * Em janela anônima, com cookies bloqueados ou com o armazenamento cheio, o
 * navegador lança exceção em getItem/setItem. Estas funções devolvem null ou
 * seguem sem gravar, para que uma preferência nunca derrube a página.
 * Mesmo padrão do localCache.ts.
 */

export function lerItem(chave: string): string | null {
  try {
    return localStorage.getItem(chave);
  } catch {
    return null;
  }
}

export function gravarItem(chave: string, valor: string): void {
  try {
    localStorage.setItem(chave, valor);
  } catch {
    // Armazenamento indisponível: a página segue sem persistir o valor.
  }
}
