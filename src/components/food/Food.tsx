import { foodHighlights } from '../../data/westside'
import { SectionHeader } from '../ui/SectionHeader'
import { FoodCard } from './FoodCard'
import { MenuBoard } from './MenuBoard'

export function Food() {
  return (
    <section id="food" aria-labelledby="food-title" className="section-y">
      <div className="container-site">
        <SectionHeader
          id="food-title"
          eyebrow="Döner • Pizza • Snacks"
          title="Was dich erwartet"
          intro="Frisch, lecker und mit Liebe gemacht – Döner, Pizza & Snacks."
        />

        {/* Mobile: snap scroller (next card peeks in) · Desktop: asymmetric 3-col, middle card offset */}
        <ul
          className="scrollbar-none -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:mt-20 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-16"
          aria-label="Food-Highlights"
        >
          {foodHighlights.map((item, i) => (
            <li key={item.id} className={`w-[82vw] max-w-[420px] shrink-0 snap-start lg:w-auto lg:max-w-none ${i === 1 ? 'lg:mt-16' : ''}`}>
              <FoodCard item={item} />
            </li>
          ))}
        </ul>

        <MenuBoard />
      </div>
    </section>
  )
}
