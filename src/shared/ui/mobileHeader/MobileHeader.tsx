import { forwardRef } from 'react'
import { Menu } from 'lucide-react'

interface MobileHeaderProps {
    isMenuOpen: boolean
    onMenuClick: () => void
}

export const MobileHeader = forwardRef<HTMLButtonElement, MobileHeaderProps>(({ isMenuOpen, onMenuClick }, ref) => {
    return (
        <header className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-surface-solid border-b border-default px-4 h-14">
            <span className="font-bold text-sm">
                douglasabnovato<span className="text-muted">.dev</span>
            </span>
            <button
                ref={ref}
                onClick={onMenuClick}
                aria-label="Abrir menu"
                aria-expanded={isMenuOpen}
                aria-controls="menu-principal"
                className="text-secondary hover:text-primary"
            >
                <Menu size={22} />
            </button>
        </header>
    )
})

MobileHeader.displayName = 'MobileHeader'