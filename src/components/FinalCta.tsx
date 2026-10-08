import { Flame, Phone, ShoppingBag } from 'lucide-react'
import { InstagramIcon } from './ui/InstagramIcon'
import { address, business, hours, images, links, phone } from '../data/westside'
import { ButtonLink } from './ui/Button'
import { ImageReveal, Reveal, RevealGroup } from './ui/Reveal'
import { Picture } from './ui/Picture'
import { ReelChip } from './ui/ReelChip'
import { OpenStatusPill } from './OpenStatus'
import { useOrderSheet } from './order/orderSheetContext'

const STAMP_TEXT = `${business.claims.primary} · ${business.claims.bite} · `.toUpperCase()

/** Rotating gold stamp – "FRISCH. LECKER. WESTSIDE. · BITE THE BEST!" around a flame. */
function Stamp({ className = '' }: { className?: string }) {
  return (
    <div className={`grid size-28 place-items-center rounded-full bg-gold text-bg lg:size-36 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id="stamp-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-current font-sans text-[8.6px] font-bold tracking-[0.12em]">
          <textPath href="#stamp-circle" textLength="230">
            {STAMP_TEXT}
          </textPath>
        </text>
      </svg>
      <Flame size={30} strokeWidth={2} className="relative" />
    </div>
  )
}

const actionLink =
  'inline-flex h-12 items-center gap-2 text-[15px] font-semibold text-text/90 underline-offset-4 transition-colors duration-200 ease-brand hover:text-gold hover:underline'

export function FinalCta() {
  const { openOrderSheet } = useOrderSheet()
  const today = hours[0]

  return (
    <section aria-labelledby="cta-title" className="section-y relative isolate overflow-hidden border-t border-line">
      {/* Giant outlined wordmark – pure texture, street-poster feel */}
      <p
        aria-hidden="true"
        className="text-outline font-display-upper pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-[18%] text-[44vw] leading-[0.8] font-black whitespace-nowrap select-none lg:text-[30vw]"
      >
        Döner
      </p>

      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Visual: the real sandwich, tilted like a poster pinned to the wall */}
        <div className="relative mx-auto w-full max-w-[400px] lg:order-2 lg:col-span-5 lg:max-w-[420px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,138,31,.32),rgba(232,70,30,.12)_50%,transparent_75%)]"
          />
          <ImageReveal>
            <figure className="group relative rotate-[3deg] overflow-hidden rounded-card ring-1 ring-line-strong shadow-[0_40px_90px_-30px_rgba(255,138,31,.45)] transition-transform duration-500 ease-brand hover:rotate-0 hover:scale-[1.02] motion-reduce:rotate-0 motion-reduce:hover:scale-100">
              <Picture
                image={images.ctaDoener}
                sizes="(min-width: 1024px) 420px, min(400px, calc(100vw - 40px))"
                className="img-graded aspect-square w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-105 motion-reduce:group-hover:scale-100"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(11,10,9,.85)_0%,transparent_45%)]" />
              <ReelChip className="absolute top-4 left-4" />
              <figcaption className="font-display-upper absolute right-5 bottom-4 left-5 text-[28px] leading-none font-black">
                Döner Sandwich
              </figcaption>
            </figure>
          </ImageReveal>
          <Stamp className="absolute -top-10 -right-3 sm:-right-8 lg:-top-14 lg:-right-12" />
        </div>

        {/* Copy + actions */}
        <RevealGroup className="flex flex-col items-start gap-7 lg:order-1 lg:col-span-7">
          <Reveal inGroup>
            <OpenStatusPill />
          </Reveal>
          <Reveal inGroup>
            <h2 id="cta-title" className="font-display-upper font-black">
              <span className="block text-display-xl leading-[0.88]">
                Hunger<span className="text-gold">?</span>
              </span>
              <span className="mt-3 block text-h2 text-gold">
                Döner.
                <br />
                Aber richtig.
              </span>
            </h2>
          </Reveal>
          <Reveal inGroup as="p" className="max-w-[36ch] text-lead text-text/90">
            Du weißt, wo du uns findest: <strong className="font-semibold text-text">{address.street}</strong>, mitten
            in {address.district}. Täglich {today.open}–{today.close} Uhr.
          </Reveal>
          <Reveal inGroup className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={links.route} external>
              Jetzt vorbeikommen
            </ButtonLink>
            <ButtonLink href={links.instagram} external variant="secondary" icon={InstagramIcon}>
              Instagram checken
            </ButtonLink>
          </Reveal>
          <Reveal inGroup className="flex flex-wrap items-center gap-x-7 gap-y-1">
            <a href={phone.href} className={actionLink}>
              <Phone aria-hidden="true" size={18} strokeWidth={1.75} className="text-gold" />
              {phone.display}
            </a>
            <button type="button" onClick={openOrderSheet} className={`${actionLink} cursor-pointer`}>
              <ShoppingBag aria-hidden="true" size={18} strokeWidth={1.75} className="text-gold" />
              Online bestellen
            </button>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  )
}
