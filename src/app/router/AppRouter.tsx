import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/home/Home'

/* Cada página abaixo vira um arquivo próprio e só é baixada quando aberta. */
const Projetos = lazy(() =>
    import('@/pages/projetos/Projetos').then((m) => ({ default: m.Projetos })),
)
const Blog = lazy(() => import('@/pages/blog/Blog').then((m) => ({ default: m.Blog })))
const Curriculo = lazy(() =>
    import('@/pages/curriculo/Curriculo').then((m) => ({ default: m.Curriculo })),
)
const Certificados = lazy(() =>
    import('@/pages/certificados/Certificados').then((m) => ({ default: m.Certificados })),
)
const NotFound = lazy(() =>
    import('@/pages/notFound/NotFound').then((m) => ({ default: m.NotFound })),
)

const Carregando = () => (
    <p className="text-[10px] font-mono text-muted" role="status">
        Carregando…
    </p>
)

export const AppRouter = () => {
    return (
        <Suspense fallback={<Carregando />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projetos" element={<Projetos />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/curriculo" element={<Curriculo />} />
                <Route path="/certificados" element={<Certificados />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}