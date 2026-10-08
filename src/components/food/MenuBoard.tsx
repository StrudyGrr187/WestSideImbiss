import { Flame, ShoppingBag } from 'lucide-react'
import { menu, menuFootnote, type MenuCategory } from '../../data/westside'
import { useOrderSheet } from '../order/orderSheetContext'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

function Category({ category }: { category: MenuCategory }) {
  const headingId = `menu-${category.id}`
  return (
    <section aria-labelledby={headingId} className="mb-10 break-inside-avoid last:mb-0 lg:mb-12">
      <div className="flex items-baseline justify-between gap-4 border-b border-line-strong pb-3">
        <h4 id={headingId} className="font-display-upper text-menu-cat font-extrabold">
          {category.title}
        </h4>
        {category.note && <p className="text-small text-muted">{category.note}</p>}
      </div>
      <ul className="mt-2">
        {category.items.map((item) => (
          <li key={item.name} className="border-b border-line py-3 last:border-b-0">
            <span className="inline-flex items-center gap-2 font-medium text-text">
              {item.name}
              {item.spicy && (
                <>
                  <Flame size={16} strokeWidth={1.75} className="text-flame" aria-hidden="true" />
                  <span className="sr-only">(scharf)</span>
                </>
              )}
            </span>
            {item.detail && <span className="block text-small text-muted">{item.detail}</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Typographic menu board – categories & dishes from the verified Wolt listing, deliberately without prices. */
export function MenuBoard() {
  const { openOrderSheet } = useOrderSheet()
  return (
    <Reveal className="mt-16 rounded-[var(--radius-card)] border border-line-strong bg-surface p-6 sm:p-10 lg:mt-24 lg:p-14">
      <div id="menu" className="flex flex-col gap-4 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow text-gold">Die Karte</p>
          <h3 className="mt-4 font-display-upper text-h3 font-extrabold">Döner · Pizza · Snacks</h3>
        </div>
        <p className="max-w-sm text-small text-muted">
          Keine Preise online – aktuelle Preise bei unseren Lieferpartnern.
        </p>
      </div>

      <div className="mt-10 gap-16 lg:columns-2">
        {menu.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body text-text/90">{menuFootnote}</p>
        <Button variant="secondary" icon={ShoppingBag} onClick={openOrderSheet} aria-haspopup="dialog" className="self-start sm:self-auto">
          Online bestellen
        </Button>
      </div>
    </Reveal>
  )
}
