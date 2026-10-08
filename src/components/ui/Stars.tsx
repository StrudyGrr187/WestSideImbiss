import { Star } from 'lucide-react'

interface StarsProps {
  rating: number
  size?: number
  className?: string
}

/** Gold star row. Decorative – the numeric rating must always be rendered as text nearby. */
export function Stars({ rating, size = 18, className = '' }: StarsProps) {
  const full = Math.round(rating)
  return (
    <span className={`inline-flex items-center gap-0.5 text-gold ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.75}
          // Lucide guideline "nie farbig gefüllt" gilt für Icons; Sterne sind Rating-Glyphen → gefüllt.
          fill={i < full ? 'currentColor' : 'none'}
          className={i < full ? '' : 'opacity-40'}
        />
      ))}
    </span>
  )
}
