const fallbackImages = Object.values(
    import.meta.glob('../../../assets/github-img-*.{jpg,jpeg,png,webp,svg}', { eager: true, import: 'default' })
) as string[]

export function getRandomFallbackImage(): string {
    if (fallbackImages.length === 0) {
        return 'https://placehold.co/600x400/e4e4e7/71717a?text=Sem+imagem'
    }
    const index = Math.floor(Math.random() * fallbackImages.length)
    return fallbackImages[index]
}


/**
 * Imagem de reserva determinística
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