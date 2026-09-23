import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/home/Home'
import { Curriculo } from '@/pages/curriculo/Curriculo'
import { Projetos } from '@/pages/projetos/Projetos'
import { Blog } from '@/pages/blog/Blog' 
import { Certificados } from '@/pages/certificados/Certificados'
import { NotFound } from '@/pages/notFound/NotFound'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/curriculo" element={<Curriculo />} /> 
            <Route path="/certificados" element={<Certificados />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}