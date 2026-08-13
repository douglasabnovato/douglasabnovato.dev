import type { ComponentType } from 'react'
import { Mail, Rss, Link2, ExternalLink, Sparkles } from 'lucide-react'
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from 'react-icons/fa6'

interface SocialLink {
  label: string
  url: string
  username: string
  description: string
  icon: ComponentType<{ size?: number; className?: string }>
  colorClass: string
  borderColor: string
  bgHover: string
}

const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    url: 'https://github.com/douglasabnovato',
    username: '@douglasabnovato',
    description: 'Repositórios, open source e códigos diários.',
    icon: FaGithub,
    colorClass: 'group-hover:text-purple-400',
    borderColor: 'hover:border-purple-500/50',
    bgHover: 'group-hover:bg-purple-500/10'
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/douglasabnovato/',
    username: 'in/douglasabnovato',
    description: 'Conexões profissionais, artigos e carreira tech.',
    icon: FaLinkedin,
    colorClass: 'group-hover:text-blue-400',
    borderColor: 'hover:border-blue-500/50',
    bgHover: 'group-hover:bg-blue-500/10'
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/douglasabnovato/',
    username: '@douglasabnovato',
    description: 'Bastidores, rotina e momentos do ecossistema.',
    icon: FaInstagram,
    colorClass: 'group-hover:text-pink-400',
    borderColor: 'hover:border-pink-500/50',
    bgHover: 'group-hover:bg-pink-500/10'
  },
  {
    label: 'Medium',
    url: 'https://douglasabnovato.medium.com',
    username: 'douglasabnovato.medium',
    description: 'Artigos técnicos e reflexões sobre desenvolvimento.',
    icon: Rss,
    colorClass: 'group-hover:text-emerald-400',
    borderColor: 'hover:border-emerald-500/50',
    bgHover: 'group-hover:bg-emerald-500/10'
  },
  {
    label: 'Twitter / X',
    url: 'https://twitter.com/douglasabnovato',
    username: '@douglasabnovato',
    description: 'Tecnologia em tempo real e pílulas de conhecimento.',
    icon: FaXTwitter,
    colorClass: 'group-hover:text-zinc-200',
    borderColor: 'hover:border-zinc-400/50',
    bgHover: 'group-hover:bg-zinc-500/10'
  },
  {
    label: 'Linktree',
    url: 'https://linktr.ee/douglasabnovato',
    username: 'linktr.ee/douglasabnovato',
    description: 'Central de links rápidos para projetos e produtos.',
    icon: Link2,
    colorClass: 'group-hover:text-green-400',
    borderColor: 'hover:border-green-500/50',
    bgHover: 'group-hover:bg-green-500/10'
  },
  {
    label: 'E-mail',
    url: 'mailto:douglasabnovato@gmail.com',
    username: 'douglasabnovato@gmail.com',
    description: 'Contato direto para negócios, mentorias e parcerias.',
    icon: Mail,
    colorClass: 'group-hover:text-amber-400',
    borderColor: 'hover:border-amber-500/50',
    bgHover: 'group-hover:bg-amber-500/10'
  },
]

export const RedesSociais = () => {
  return (
    <div className="max-w-4xl space-y-8 pb-16">
      {/* HEADER ELEGANTE COM DESTAQUE VISUAL */}
      <div className="pb-6 border-b border-default">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono text-accent px-2 py-0.5 rounded border border-accent/20 bg-accent/5 flex items-center gap-1">
            <Sparkles size={10} /> Conexões & Canais
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Redes Sociais</h1>
        <p className="text-secondary text-sm mt-1 max-w-xl leading-relaxed">
          Onde me encontrar, acompanhar a evolução dos projetos e trocar ideias sobre tecnologia, produtos e ecossistemas.
        </p>
      </div>

      {/* GRID DE CARDS COLORIDOS E IMERSIVOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socialLinks.map(({ label, url, username, description, icon: Icon, colorClass, borderColor, bgHover }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative bg-surface border border-default rounded-xl p-5 flex flex-col justify-between transition-all duration-300 ${borderColor}`}
          >
            {/* Filete de destaque dinâmico */}
            <div className="absolute top-0 left-0 w-[2px] h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity rounded-l" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-surface-solid border border-default flex items-center justify-center transition-colors ${bgHover}`}>
                  <Icon size={20} className={`text-secondary transition-colors ${colorClass}`} />
                </div>
                <span className="text-xs font-mono text-muted group-hover:text-primary transition-colors flex items-center gap-1">
                  Acessar <ExternalLink size={10} />
                </span>
              </div>

              <h2 className="text-sm font-bold text-primary group-hover:text-accent transition-colors">
                {label}
              </h2>
              <p className="text-xs font-mono text-accent mt-0.5 mb-2">
                {username}
              </p>
              <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                {description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}