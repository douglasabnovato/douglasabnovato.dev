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