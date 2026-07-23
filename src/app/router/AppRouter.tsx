import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/home/Home'
import { Curriculo } from '@/pages/curriculo/Curriculo'
import { Projetos } from '@/pages/projetos/Projetos'
import { Codigos } from '@/pages/codigos/Codigos'
import { Blog } from '@/pages/blog/Blog'
import { RedesSociais } from '@/pages/redesSociais/RedesSociais'
import { NotFound } from '@/pages/notFound/NotFound'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/codigos" element={<Codigos />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/curriculo" element={<Curriculo />} />
            <Route path="/redes-sociais" element={<RedesSociais />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}