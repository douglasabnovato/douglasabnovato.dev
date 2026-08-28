import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'

interface PdfExportButtonProps {
  targetRef?: React.RefObject<HTMLDivElement | null>
  fileName?: string
}

export const PdfExportButton: React.FC<PdfExportButtonProps> = () => {
  const [isExporting, setIsExporting] = useState(false)

  const handlePrintPdf = () => {
    setIsExporting(true)

    setTimeout(() => {
      window.print()
      setIsExporting(false)
    }, 300)
  }

  return (
    <button
      onClick={handlePrintPdf}
      disabled={isExporting}
      className="inline-flex items-center gap-2 px-4 py-2 rounded border border-default bg-surface hover:border-accent hover:text-accent text-xs font-mono font-medium transition-all duration-300 cursor-pointer disabled:opacity-50"
    >
      {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
      {isExporting ? 'Preparando PDF...' : 'Exportar Currículo PDF'}
    </button>
  )
}