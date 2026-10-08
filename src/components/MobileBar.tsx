import type { ReactNode } from 'react'
import { Navigation, Phone, ShoppingBag } from 'lucide-react'
import { links, phone } from '../data/westside'
import { useOpenStatus } from '../hooks/useOpenStatus'
import { StatusDot } from './OpenStatus'
import { useOrderSheet } from './order/orderSheetContext'

const itemClass =
  'relative flex h-16 flex-1 flex-col items-center justify-center gap-1 text-text transition-colors active:bg-surface-2'

function ItemLabel({ children }: { children: ReactNode }) {
  return <span className="text-[12px] font-bold uppercase tracking-[0.06em]">{children}</span>
}

/** Thumb zone actions (< lg): Route · Anrufen · Bestellen. Body reserves the space via `pb-mobile-bar`. */
export function MobileBar() {
  const { isOpen } = useOpenStatus()
  const { openOrderSheet } = useOrderSheet()

  return (
    <nav
      aria-label="Schnellaktionen"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-[14px] lg:hidden"
    >
      <ul className="flex divide-x divide-line">
        <li className="flex flex-1">
          <a href={links.route} target="_blank" rel="noopener noreferrer" className={itemClass}>
            <Navigation size={20} strokeWidth={1.75} aria-hidden="true" className="text-gold" />
            <span className="inline-flex items-center gap-1.5">
              {isOpen && <StatusDot isOpen />}
              <ItemLabel>Route</ItemLabel>
            </span>
            <span className="sr-only">({isOpen ? 'jetzt geöffnet' : 'derzeit geschlossen'}, öffnet in neuem Tab)</span>
          </a>
        </li>
        <li className="flex flex-1">
          <a href={phone.href} className={itemClass}>
            <Phone size={20} strokeWidth={1.75} aria-hidden="true" className="text-gold" />
            <ItemLabel>Anrufen</ItemLabel>
          </a>
        </li>
        <li className="flex flex-1">
          <button type="button" onClick={openOrderSheet} className={itemClass} aria-haspopup="dialog">
            <ShoppingBag size={20} strokeWidth={1.75} aria-hidden="true" className="text-gold" />
            <ItemLabel>Bestellen</ItemLabel>
          </button>
        </li>
      </ul>
    </nav>
  )
}
