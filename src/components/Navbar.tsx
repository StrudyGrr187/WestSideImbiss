import { useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { address, business, images, links, navItems, phone } from '../data/westside'
import { useModal } from '../hooks/useModal'
import { EASE } from '../lib/motion'
import { OpenStatusPill } from './OpenStatus'
import { ButtonLink } from './ui/Button'
import { Picture } from './ui/Picture'

const SCROLL_THRESHOLD = 24

function useScrolled(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <a href="#top" onClick={onNavigate} className="flex min-h-12 items-center gap-3 rounded-full pr-2" aria-label={`${business.name} – zum Seitenanfang`}>
      <Picture image={images.logo} sizes="40px" className="size-10 max-w-none shrink-0 rounded-full" priority decorative />
      <span className="font-display-upper text-[28px] font-black leading-none">{business.shortName}</span>
    </a>
  )
}

export function Navbar() {
  const scrolled = useScrolled(SCROLL_THRESHOLD)
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-brand ${
        scrolled ? 'border-line bg-bg/72 backdrop-blur-[14px]' : 'border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Hauptnavigation" className="container-site flex h-[72px] items-center justify-between gap-6">
        <Brand />

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="eyebrow inline-flex min-h-12 items-center px-3.5 text-text/85 transition-colors duration-200 hover:text-gold"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <ButtonLink href={links.route} external className="h-11! px-5! text-[13px]!">
              Vorbeikommen
            </ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-full border border-line-strong text-text lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Menü öffnen"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
    {/* Rendered outside <header>: its backdrop-filter would become the containing block for `fixed`. */}
    <MobileMenu open={menuOpen} onClose={close} />
    </>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion()
  const ref = useModal<HTMLDivElement>(open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="mobile-menu"
          id="mobile-menu"
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-bg px-5 pb-[calc(32px+env(safe-area-inset-bottom))] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-line">
            <Brand onNavigate={onClose} />
            <button
              type="button"
              className="inline-flex size-12 items-center justify-center rounded-full border border-line-strong text-text"
              aria-label="Menü schließen"
              onClick={onClose}
            >
              <X size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
          <ul className="mt-6 flex flex-col">
            {navItems.map((item, i) => (
              <m.li
                key={item.href}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: reduced ? 0 : 0.04 * i }}
                className="border-b border-line"
              >
                <a
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-12 items-center py-3 font-display-upper text-h2 font-extrabold transition-colors hover:text-gold"
                >
                  {item.label}
                </a>
              </m.li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-5 pt-10">
            <OpenStatusPill variant="inline" />
            <p className="text-small text-muted">
              {address.street}, {address.zip} {address.city} ·{' '}
              <a href={phone.href} className="underline decoration-line-strong underline-offset-4 hover:text-text">
                {phone.display}
              </a>
            </p>
            <ButtonLink href={links.route} external className="w-full">
              Jetzt vorbeikommen
            </ButtonLink>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
