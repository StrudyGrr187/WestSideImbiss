import { InstagramIcon } from './InstagramIcon'

/** "AUS UNSEREN REELS" – marks every photo as a real frame from the shop's own Instagram reels. */
export function ReelChip({ className = '' }: { className?: string }) {
  return (
    <span
      className={`eyebrow inline-flex h-8 items-center gap-2 rounded-full bg-surface/80 px-3 text-[11px] text-text backdrop-blur-md ${className}`}
    >
      <InstagramIcon size={14} strokeWidth={1.75} aria-hidden="true" className="text-gold" />
      Aus unseren Reels
    </span>
  )
}
