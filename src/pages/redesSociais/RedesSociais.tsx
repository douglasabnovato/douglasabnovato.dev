import type { ComponentType } from 'react'
import { Mail, Rss, Link2 } from 'lucide-react'
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from 'react-icons/fa6'

interface SocialLink {
  label: string
  url: string
  icon: ComponentType<{ size?: number; className?: string }>
}

const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/douglasabnovato', icon: FaGithub },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/douglasabnovato/', icon: FaLinkedin },
  { label: 'Instagram', url: 'https://www.instagram.com/douglasabnovato/', icon: FaInstagram },
  { label: 'Medium', url: 'https://douglasabnovato.medium.com', icon: Rss },
  { label: 'Twitter / X', url: 'https://twitter.com/douglasabnovato', icon: FaXTwitter },
  { label: 'Linktree', url: 'https://linktr.ee/douglasabnovato', icon: Link2 },
  { label: 'E-mail', url: 'mailto:douglasabnovato@gmail.com', icon: Mail },
]

export const RedesSociais = () => {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-1">Redes sociais</h1>
      <p className="text-secondary text-sm mb-8">Onde mais me encontrar.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialLinks.map(({ label, url, icon: Icon }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-surface rounded-xl px-4 py-3 hover:bg-surface-solid transition-colors"
          >
            <Icon size={18} className="text-secondary" />
            <span className="text-sm font-medium">{label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}