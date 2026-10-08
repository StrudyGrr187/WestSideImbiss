import type { Review } from '../../data/westside'
import { formatDate } from '../../lib/format'
import { Stars } from '../ui/Stars'

/** Only ever rendered with real, verbatim Google reviews from `reviews[]`. */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-6">
      <Stars rating={review.rating} size={16} />
      <span className="sr-only">{review.rating} von 5 Sternen</span>
      <blockquote className="text-body text-text/90">
        <p>„{review.text}“</p>
      </blockquote>
      <figcaption className="mt-auto text-small text-muted">
        {review.author} · <time dateTime={review.date}>{formatDate(review.date)}</time> · Google
      </figcaption>
    </figure>
  )
}
