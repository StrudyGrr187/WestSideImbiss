import { Star } from 'lucide-react'
import { images, links, ownQuote, rating, reviews } from '../../data/westside'
import { formatRating } from '../../lib/format'
import { ButtonLink } from '../ui/Button'
import { Picture } from '../ui/Picture'
import { ImageReveal, Reveal, RevealGroup } from '../ui/Reveal'
import { Stars } from '../ui/Stars'
import { ReviewCard } from './ReviewCard'

function RatingBlock() {
  return (
    <div className="flex flex-col gap-5">
      <p className="flex items-end gap-3">
        <span className="font-display-upper text-rating font-black text-gold">{formatRating(rating.value)}</span>
        <span className="mb-3 font-display-upper text-h3 font-extrabold text-muted">/ 5</span>
        <span className="sr-only">Sterne auf {rating.source}</span>
      </p>
      <Stars rating={rating.value} size={24} className="mt-3" />
      <p className="text-lead text-text">
        aus {rating.count} {rating.source}-Bewertungen
      </p>
    </div>
  )
}

function ReviewCtas() {
  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row lg:flex-col">
      <ButtonLink href={links.reviews} external>
        Alle Bewertungen ansehen
      </ButtonLink>
      <ButtonLink href={links.writeReview} external variant="secondary" icon={Star}>
        Bewerte uns auf Google
      </ButtonLink>
    </div>
  )
}

/** "TAG 1": honest rating display + own opening-day quote. ReviewCards only appear once real reviews exist. */
export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section-y border-t border-line">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <RevealGroup className="flex flex-col gap-8 lg:col-span-5">
            <Reveal inGroup>
              <h2 id="reviews-title" className="eyebrow text-gold">
                Das sagen unsere Gäste
              </h2>
            </Reveal>
            <Reveal inGroup>
              <RatingBlock />
            </Reveal>
            <Reveal inGroup className="hidden lg:block">
              <ReviewCtas />
            </Reveal>
          </RevealGroup>

          <figure className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-surface sm:aspect-[16/10]">
              <ImageReveal className="absolute inset-0">
                <Picture
                  image={images.openingQueue}
                  sizes="(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 100vw"
                  className="img-graded size-full object-cover"
                />
              </ImageReveal>
              <div className="grade-overlay" aria-hidden="true" />
              <span className="eyebrow absolute top-4 left-4 inline-flex h-8 items-center rounded-full bg-surface/80 px-3 text-[11px] text-gold backdrop-blur-md">
                Tag 1 – von uns
              </span>
              <figcaption className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
                <blockquote>
                  <p className="font-display-upper text-h3 leading-[1.02] font-extrabold text-text">„{ownQuote.text}“</p>
                </blockquote>
                <p className="mt-4 text-small text-muted">— {ownQuote.attribution}</p>
              </figcaption>
            </div>
          </figure>

          <Reveal className="lg:hidden">
            <ReviewCtas />
          </Reveal>
        </div>

        {reviews.length > 0 && (
          <RevealGroup as="ul" className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <Reveal inGroup as="li" key={`${review.author}-${review.date}`}>
                <ReviewCard review={review} />
              </Reveal>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  )
}
