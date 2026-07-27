import { Lock, Globe } from 'lucide-react'
import type { ManagementBoard } from '../model/types'

interface ManagementBoardCardProps {
    board: ManagementBoard
}

export const ManagementBoardCard = ({ board }: ManagementBoardCardProps) => {
    return (
        <a
            href={board.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl p-4 bg-surface hover:bg-surface-solid transition-colors"
        >
            <div className="flex items-center gap-2 mb-1">
                {board.privado ? <Lock size={14} className="text-muted" /> : <Globe size={14} className="text-muted" />}
                <p className="text-sm font-medium">{board.nome}</p>
            </div>
            <p className="text-xs text-muted mb-2">{board.objetivo}</p>
            <p className="text-xs text-secondary mb-3">{board.descricao}</p>
            <div className="flex gap-4 text-xs text-muted">
                <span>{board.quantidadeRepositorios} repositórios</span>
                <span>{board.quantidadeIssues} issues</span>
            </div>
        </a>
    )
}