import { ArrowUpRight, MapPin } from 'lucide-react'
import type { GithubOrg } from '../model/types'

/**
 * Card da organização. Só é renderizado pelo hook quando a organização tem
 * pelo menos um repositório público — organização vazia vira link para uma
 * página que anuncia que não há nada, e isso custa mais que a ausência.
 */
export const OrganizationCard = ({ org }: { org: GithubOrg }) => (
  <article className="rounded-lg border border-default bg-surface p-5">
    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
      <img
        src={org.avatar_url}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-14 h-14 rounded-md object-cover border border-default shrink-0"
      />

      <div className="flex-1 min-w-0">
        <span className="block text-[10px] font-mono uppercase tracking-[0.14em] text-muted">
          Organização
        </span>
        <h3 className="mt-1.5 text-base font-medium text-primary">{org.name ?? org.login}</h3>

        {org.description && (
          <p className="mt-2 text-xs text-secondary leading-relaxed">{org.description}</p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-mono text-muted tabular-nums">
          <span>
            {org.public_repos}{' '}
            {org.public_repos === 1 ? 'repositório público' : 'repositórios públicos'}
          </span>
          {org.location && (
            <span className="flex items-center gap-1">
              <MapPin size={10} /> {org.location}
            </span>
          )}
        </div>

        <a
          href={org.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono text-secondary hover:text-accent transition-colors"
        >
          Ver organização <ArrowUpRight size={11} />
        </a>
      </div>
    </div>
  </article>
)