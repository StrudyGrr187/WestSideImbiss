import { Play } from 'lucide-react'
import type { Reel } from '../../data/westside'
import { formatDate } from '../../lib/format'
import { Picture } from '../ui/Picture'

/** 9:16 reel teaser linking to the real Instagram reel. Thumbnails are native 360px – never upscaled. */
export function ReelCard({ reel }: { reel: Reel }) {
  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-[var(--radius-card)] bg-surface"
    >
      <Picture
        image={reel.image}
        sizes="(min-width: 1024px) 360px, 72vw"
        className="img-graded size-full object-cover transition-transform duration-[600ms] ease-brand group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
      />
      <span className="grade-overlay" aria-hidden="true" />

      <span
        className="absolute top-1/2 left-1/2 inline-flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold bg-bg/55 text-gold backdrop-blur-sm transition-[background-color,color] duration-200 group-hover:bg-gold group-hover:text-bg"
        aria-hidden="true"
      >
        <Play size={24} strokeWidth={1.75} className="translate-x-0.5" />
      </span>

      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
        <time dateTime={reel.date} className="eyebrow text-gold">
          {formatDate(reel.date)}
        </time>
        <span className="font-display-upper text-[28px] leading-[1.02] font-extrabold text-text">{reel.title}</span>
        {reel.note && <span className="text-small text-muted">{reel.note}</span>}
      </span>
      <span className="sr-only"> – Reel auf Instagram ansehen (öffnet in neuem Tab)</span>
    </a>
  )
}
