import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, FileText, LayoutGrid, Code2, Newspaper, Share2, Sparkles, X } from 'lucide-react'
import { resumeData } from '@/entities/resume/model/resume.data'
import { ecosystemData } from '@/entities/project/api/ecosystem.data'
import type { EcosystemItem } from '@/entities/project/api/ecosystem.data'

import profileImg from './../../assets/home/1-profile.jpg'

// Componente para alternar imagens a cada 3 segundos
const CarouselImage = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images])

  if (!images || images.length === 0) return null

  return (
    <div className="relative w-full h-full rounded overflow-hidden border border-default bg-surface-solid">
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt="Preview"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
        />
      ))}
    </div>
  )
}

const navSections = [
  { to: '/curriculo', label: 'Currículo', icon: FileText },
  { to: '/projetos', label: 'Projetos', icon: LayoutGrid },
  { to: '/codigos', label: 'Códigos', icon: Code2 },
  { to: '/blog', label: 'Blog', icon: Newspaper },
  { to: '/redes-sociais', label: 'Redes sociais', icon: Share2 },
]

export const Home = () => {
  const [activeModal, setActiveModal] = useState<EcosystemItem | null>(null)
  const currentRoles = resumeData.experiences.filter((e) => e.tier === 'atual')

  // Perfil é o primeiro item (id: 'profile') const profile = ecosystemData[0]
  
  // Ecossistema são os itens restantes
  const ecosystemItems = ecosystemData.slice(1)

  return (
    <div className="max-w-4xl pb-16 relative">
      {/* HEADER E PERFIL */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-default">
        <span className="font-mono font-semibold text-sm tracking-tight text-primary">
          douglasabnovato<span className="text-muted">.dev</span>
        </span>
        <a href="https://github.com/douglasabnovato" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded border border-default bg-surface flex items-center justify-center hover:border-accent hover:text-accent transition-all">
          <ArrowUpRight size={14} />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 mb-10 items-center">
        <div className="lg:col-span-7">
          <span className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">
            Arquiteto de Software & Produto
          </span>
          <h1 className="text-3xl font-bold mb-3 tracking-tight text-primary">Douglas A. B. Novato</h1>
          <p className="text-secondary text-sm leading-relaxed mb-4">
            Especializado em produtos digitais de alta performance, arquitetura de ecossistemas e liderança técnica.
            Atuo no desenvolvimento de ponta a ponta, delegação estratégica para agências e acompanhamento rigoroso de entregas.
          </p>
          <div className="text-xs font-mono text-muted py-2 px-3 rounded bg-surface border border-default inline-block">
            {currentRoles.map((role) => `${role.role} — ${role.company}`).join(' · ')}
          </div>
        </div>
        <div className="lg:col-span-3 h-40">
          <img src={profileImg} alt="Douglas Novato" className="w-full h-full object-cover rounded border border-default" />
        </div>
      </div>

      {/* NAV SECTIONS */}
      <div className="flex flex-wrap gap-2 mb-14">
        {navSections.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className="flex items-center gap-2 px-3.5 py-1.5 rounded border border-default bg-surface hover:border-accent hover:text-accent text-xs font-medium transition-all">
            <Icon size={14} /> {label}
          </Link>
        ))}
      </div>

      {/* ECOSSISTEMA */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-widest font-mono text-muted">
          Ecossistema de Atuação & Projetos
        </h2>
        <span className="text-[10px] font-mono text-muted">Visão Geral</span>
      </div>

      <div className="space-y-6">
        {ecosystemItems.map((item, index) => (
          <div key={item.id} className="group relative rounded-lg bg-surface border border-default p-6 transition-all hover:border-accent">
            <div className="absolute top-0 left-0 w-[2px] h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-accent px-2 py-0.5 rounded border border-accent/20 bg-accent/5">
                {item.badge}
              </span>
              <span className="text-[10px] font-mono text-muted">#{String(index + 1).padStart(2, '0')}</span>
            </div>

            {item.type !== 'grid' ? (
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
                <div className="lg:col-span-7">
                  <h3 className="font-bold text-base mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-xs text-secondary leading-relaxed mb-4">{item.description}</p>

                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-default/50">
                    {item.links.map(l => (
                      l.external ? (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded bg-surface-solid text-primary border border-default hover:border-accent hover:text-accent transition-colors font-mono"
                        >
                          {l.label}
                          <ArrowUpRight size={14} />
                        </a>
                      ) : (
                        <button
                          key={l.label}
                          onClick={() => setActiveModal(item)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors font-mono cursor-pointer"
                        >
                          <Sparkles size={12} />
                          {l.label}
                        </button>
                      )
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-3 h-32">
                  <CarouselImage images={item.images || []} />
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-base mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-xs text-secondary leading-relaxed mb-4">{item.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-default/50">

                  {item.subItems?.map((sub) => (
                    <a
                      key={sub.title}
                      href={sub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-default rounded bg-surface-solid/50 flex flex-col hover:border-accent transition-colors group"
                    >
                      {sub.image && (
                        <div className="w-full h-28 mb-3 overflow-hidden rounded border border-default">
                          <img
                            src={sub.image}
                            alt={sub.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-primary group-hover:text-accent transition-colors flex items-center justify-between">
                          {sub.title}
                          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </p>
                        <p className="text-[11px] text-muted mt-0.5">{sub.description}</p>
                      </div>
                    </a>
                  ))}

                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {activeModal && activeModal.modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-xl bg-surface-solid border border-default p-6 shadow-2xl">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-muted hover:text-primary transition-colors p-1 rounded cursor-pointer">
              <X size={18} />
            </button>
            <span className="text-[10px] font-mono text-accent px-2 py-0.5 rounded border border-accent/20 bg-accent/5 inline-block mb-3">
              {activeModal.badge}
            </span>
            <h3 className="text-xl font-bold text-primary mb-1">{activeModal.title}</h3>
            <p className="text-xs font-mono text-muted mb-4">{activeModal.modalContent.subtitle}</p>

            <div className="space-y-4 mb-6">
              <div className="p-3 rounded bg-surface border border-default">
                <p className="text-xs font-semibold text-primary mb-1">Objetivo Central</p>
                <p className="text-xs text-secondary leading-relaxed">{activeModal.modalContent.objective}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-primary mb-2">Destaques da Iniciativa</p>
                <ul className="space-y-1.5">
                  {activeModal.modalContent.highlights.map((item, idx) => (
                    <li key={idx} className="text-xs text-secondary flex items-start gap-2">
                      <span className="text-accent">▪</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-default">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 rounded bg-surface hover:border-accent text-xs font-mono text-primary border border-default transition-colors cursor-pointer">
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}