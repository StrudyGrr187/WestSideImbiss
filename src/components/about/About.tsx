import { business, images } from '../../data/westside'
import { Picture } from '../ui/Picture'
import { ImageReveal } from '../ui/Reveal'
import { ReelChip } from '../ui/ReelChip'
import { SectionHeader } from '../ui/SectionHeader'
import { Timeline } from './Timeline'

/** Short, fact-only story: the first week in Ottakring as a timeline. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y border-t border-line">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeader
            id="about-title"
            eyebrow={business.claims.logo}
            title={
              <>
                Neu in der <span className="text-gold">Thaliastraße</span>
              </>
            }
            intro="Seit 02.10.2026 gibt’s bei uns in Ottakring Döner, Pizza & Snacks. Frisch. Lecker. Westside."
          />
          <div className="mt-14">
            <Timeline />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <figure className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-surface">
              <ImageReveal className="absolute inset-0">
                <Picture
                  image={images.openingCrowd}
                  sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
                  className="img-graded size-full object-cover"
                />
              </ImageReveal>
              <div className="grade-overlay" aria-hidden="true" />
              <ReelChip className="absolute top-4 left-4" />
            </div>
            <figcaption className="mt-4 text-small text-muted">Eröffnungstag, 02.10.2026 – das Lokal ist voll.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
