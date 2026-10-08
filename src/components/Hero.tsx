import type { CSSProperties } from 'react'
import { InstagramIcon } from './ui/InstagramIcon'
import { address, images, links, rating } from '../data/westside'
import { imageManifest } from '../data/images.generated'
import { formatRating } from '../lib/format'
import { OpenStatusPill } from './OpenStatus'
import { ButtonLink } from './ui/Button'
import { fallbackSrc, srcSet } from '../lib/images'
import { Stars } from './ui/Stars'

const DESKTOP_MQ = '(min-width: 1024px)'

/** Art-directed hero photo: portrait Spieß on mobile, landscape counter shot on desktop. */
function HeroPicture() {
  const desktop = images.heroDesktop
  const mobile = images.heroMobile
  const meta = imageManifest[mobile.name]
  return (
    <picture>
      <source media={DESKTOP_MQ} type="image/avif" srcSet={srcSet(desktop.name, 'avif')} sizes="100vw" />
      <source media={DESKTOP_MQ} type="image/webp" srcSet={srcSet(desktop.name, 'webp')} sizes="100vw" />
      <source media={DESKTOP_MQ} srcSet={srcSet(desktop.name, 'jpg')} sizes="100vw" />
      <source type="image/avif" srcSet={srcSet(mobile.name, 'avif')} sizes="100vw" />
      <source type="image/webp" srcSet={srcSet(mobile.name, 'webp')} sizes="100vw" />
      <img
        src={fallbackSrc(mobile.name)}
        srcSet={srcSet(mobile.name, 'jpg')}
        sizes="100vw"
        width={meta.width}
        height={meta.height}
        alt={mobile.alt}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        className="img-graded absolute inset-0 size-full object-cover object-[var(--pos-m)] lg:object-[var(--pos-d)]"
        style={{ '--pos-m': mobile.position, '--pos-d': desktop.position } as CSSProperties}
      />
    </picture>
  )
}

/** CSS-only entrance (no wait for the async motion chunk); reduced motion handled globally in index.css */
const enter = (delayMs: number) => ({
  className: 'animate-hero-in',
  style: { animationDelay: `${delayMs}ms` },
})

function withEnter(delayMs: number, className = '') {
  const e = enter(delayMs)
  return { className: `${e.className} ${className}`.trim(), style: e.style }
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[max(640px,min(100svh,177.78vw))] items-end overflow-hidden lg:min-h-[max(640px,100svh)]"
    >
      <HeroPicture />
      <div className="grade-overlay" aria-hidden="true" />
      {/* Mobile: the portrait Spieß is bright → stronger bottom-up shade for legible copy */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(11,10,9,.95)_0%,rgba(11,10,9,.75)_40%,rgba(11,10,9,.35)_70%,rgba(11,10,9,.15)_100%)] lg:hidden"
        aria-hidden="true"
      />
      {/* Desktop: extra left-side shade so the copy column reads over the bright counter */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(11,10,9,.7)_0%,rgba(11,10,9,.35)_45%,transparent_70%)] lg:block"
        aria-hidden="true"
      />

      <div className="container-site relative pt-28 pb-24 lg:pb-32">
        <div className="flex max-w-[min(100%,72rem)] flex-col items-start gap-6 lg:gap-8">
          <div {...enter(0)}>
            <OpenStatusPill live />
          </div>

          <h1 id="hero-title" className="font-display-upper text-display-xl leading-[0.88] font-black">
            <span {...withEnter(100, 'block')}>Dein Hunger.</span>
            <span {...withEnter(200, 'block text-gold')}>Unsere Antwort.</span>
          </h1>

          <p {...withEnter(300, 'max-w-xl text-lead text-text/90')}>
            Döner, Pizza & Snacks – mitten in Ottakring. {address.street}, {address.zip} {address.city}.
          </p>

          <div {...withEnter(400, 'flex w-full flex-col gap-3 sm:w-auto sm:flex-row')}>
            <ButtonLink href={links.route} external>
              Jetzt vorbeikommen
            </ButtonLink>
            <ButtonLink href={links.instagram} external variant="secondary" icon={InstagramIcon} className="bg-bg/30">
              Instagram
            </ButtonLink>
          </div>

          <a
            href={links.reviews}
            target="_blank"
            rel="noopener noreferrer"
            {...withEnter(500, 'group inline-flex min-h-12 items-center gap-3 text-small text-text/90')}
          >
            <Stars rating={rating.value} size={16} />
            <span>
              <strong className="font-bold text-text">{formatRating(rating.value)}</strong> auf {rating.source}
              <span className="text-muted"> · {rating.count} Bewertungen</span>
            </span>
            <span className="sr-only"> – Bewertungen auf Google Maps ansehen (öffnet in neuem Tab)</span>
          </a>
        </div>
      </div>
    </section>
  )
}
