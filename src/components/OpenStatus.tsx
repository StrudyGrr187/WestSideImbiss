import { useOpenStatus } from '../hooks/useOpenStatus'
import { describeStatus } from '../lib/openStatus'

/** 8px status dot – green with pulse ring when open, flame red (static) when closed. */
export function StatusDot({ isOpen, className = '' }: { isOpen: boolean; className?: string }) {
  return (
    <span className={`relative inline-flex size-2 shrink-0 ${className}`} aria-hidden="true">
      {isOpen && <span className="absolute inset-0 rounded-full bg-open animate-pulse-ring motion-reduce:hidden" />}
      <span className={`relative size-2 rounded-full ${isOpen ? 'bg-open' : 'bg-flame'}`} />
    </span>
  )
}

interface OpenStatusPillProps {
  className?: string
  /** "pill" = bordered chip (Hero), "inline" = plain text row (Location, Overlay) */
  variant?: 'pill' | 'inline'
  /** Only one instance per page should announce changes to screen readers */
  live?: boolean
}

/** Live status for Europe/Vienna, e.g. "JETZT GEÖFFNET · bis 22:00".  */
export function OpenStatusPill({ className = '', variant = 'pill', live = false }: OpenStatusPillProps) {
  const status = useOpenStatus()
  const { label, detail } = describeStatus(status)
  const shell =
    variant === 'pill'
      ? 'h-9 rounded-full border border-line-strong bg-surface/80 px-4 backdrop-blur-md'
      : ''
  return (
    <p {...(live ? { role: 'status', 'aria-live': 'polite' as const } : {})} className={`inline-flex items-center gap-2.5 ${shell} ${className}`}>
      <StatusDot isOpen={status.isOpen} />
      <span className="eyebrow text-text">{label}</span>
      <span className="text-small text-muted" aria-hidden="true">
        ·
      </span>
      <span className="text-small text-muted">{detail}</span>
    </p>
  )
}
