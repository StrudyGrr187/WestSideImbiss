import { useId } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Bike, X } from 'lucide-react'
import { deliveryHours, orderPlatforms } from '../../data/westside'
import { useModal } from '../../hooks/useModal'
import { SHEET_SPRING } from '../../lib/motion'

interface OrderSheetProps {
  open: boolean
  onClose: () => void
}

/** Bottom sheet (mobile) / centered dialog (lg+) with the two verified delivery partners. */
export function OrderSheet({ open, onClose }: OrderSheetProps) {
  const reduced = useReducedMotion()
  const titleId = useId()
  const ref = useModal<HTMLDivElement>(open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <m.div key="order-sheet" className="fixed inset-0 z-[70] flex overscroll-contain items-end justify-center lg:items-center lg:p-6">
          <m.div
            className="absolute inset-0 bg-bg/75"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />
          <m.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-lg rounded-t-[var(--radius-sheet)] border border-line-strong border-b-0 bg-surface px-5 pt-3 pb-[calc(24px+env(safe-area-inset-bottom))] lg:rounded-[var(--radius-sheet)] lg:border-b lg:p-8"
            initial={reduced ? { opacity: 0 } : { y: '100%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: '100%' }}
            transition={reduced ? { duration: 0.2 } : SHEET_SPRING}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line-strong lg:hidden" aria-hidden="true" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-gold">Lieferung</p>
                <h2 id={titleId} className="mt-3 font-display-upper text-h3 font-extrabold">
                  Online bestellen
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="-mr-2 -mt-1 inline-flex size-12 items-center justify-center rounded-full text-muted transition-colors hover:text-text"
                aria-label="Bestell-Auswahl schließen"
              >
                <X size={22} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <ul className="mt-6 divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line-strong">
              {orderPlatforms.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-16 items-center justify-between gap-4 bg-surface-2/40 px-5 transition-colors hover:bg-surface-2"
                  >
                    <span className="font-display-upper text-[28px] font-extrabold">{p.name}</span>
                    <span className="sr-only"> – bei {p.name} bestellen (öffnet in neuem Tab)</span>
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="text-gold transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-5 flex items-center gap-2.5 text-small text-muted">
              <Bike size={20} strokeWidth={1.75} aria-hidden="true" className="text-gold" />
              Lieferung {deliveryHours.open.replace(':00', '')}–{deliveryHours.close.replace(':00', '')} Uhr
            </p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
