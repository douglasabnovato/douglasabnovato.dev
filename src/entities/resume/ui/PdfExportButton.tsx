import { useReactToPrint } from 'react-to-print'
import type { RefObject } from 'react'
import { Download } from 'lucide-react'

interface PdfExportButtonProps {
  targetRef: RefObject<HTMLDivElement | null>
  fileName: string
}

export const PdfExportButton = ({ targetRef, fileName }: PdfExportButtonProps) => {
  const handlePrint = useReactToPrint({
    contentRef: targetRef,
    documentTitle: fileName,
  })

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-default hover:bg-surface-solid transition-colors"
    >
      <Download size={16} />
      Exportar PDF
    </button>
  )
}