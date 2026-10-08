import type { FoodHighlight } from '../../data/westside'
import { ImageReveal } from '../ui/Reveal'
import { Picture } from '../ui/Picture'
import { ReelChip } from '../ui/ReelChip'

/** 4:5 portrait card – title + one line inside the graded image. Hover zooms the photo only. */
export function FoodCard({ item }: { item: FoodHighlight }) {
  return (
    <article className="group relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-surface">
      <ImageReveal className="absolute inset-0">
        <Picture
          image={item.image}
          sizes="(min-width: 1280px) 384px, (min-width: 1024px) 30vw, 82vw"
          className="img-graded size-full object-cover transition-transform duration-[600ms] ease-brand group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
        />
      </ImageReveal>
      <div className="grade-overlay" aria-hidden="true" />
      <ReelChip className="absolute top-4 left-4" />
      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
        <h3 className="font-display-upper text-h3 font-extrabold">{item.title}</h3>
        <p className="mt-3 text-body text-text/85">{item.text}</p>
      </div>
    </article>
  )
}
