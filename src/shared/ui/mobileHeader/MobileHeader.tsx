import { Menu } from 'lucide-react'

interface MobileHeaderProps {
    onMenuClick: () => void
}

export const MobileHeader = ({ onMenuClick }: MobileHeaderProps) => {
    return (
        <header className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-surface-solid border-b border-default px-4 h-14">
            <span className="font-bold text-sm">
                douglasabnovato<span className="text-muted">.dev</span>
            </span>
            <button onClick={onMenuClick} aria-label="Abrir menu" className="text-secondary hover:text-primary">
                <Menu size={22} />
            </button>
        </header>
    )
}