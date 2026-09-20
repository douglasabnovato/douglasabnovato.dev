const fallbackImages = Object.values(
    import.meta.glob('../../../assets/github-img-*.{jpg,jpeg,png,webp,svg}', { eager: true, import: 'default' })
) as string[]

/**
 * Imagem de reserva determinística: o mesmo nome devolve sempre a mesma
 * imagem. Substitui o sorteio aleatório, que trocava a capa a cada montagem
 * do componente e repetia a mesma imagem em projetos diferentes.
 */
export function getFallbackImageFor(key: string): string {
    if (fallbackImages.length === 0) {
        return 'https://placehold.co/600x300/e4e4e7/71717a?text=Sem+imagem'
    }
    let hash = 0
    for (let i = 0; i < key.length; i += 1) {
        hash = (hash * 31 + key.charCodeAt(i)) % 100000
    }
    return fallbackImages[hash % fallbackImages.length]
}