import type { ReactNode } from 'react'
import { address, business, hours, images, links, phone } from '../data/westside'
import { groupHours } from '../lib/openStatus'
import { Picture } from './ui/Picture'

function FooterHeading({ children }: { children: ReactNode }) {
  return <h2 className="eyebrow text-gold">{children}</h2>
}

const linkClass =
  'inline-flex min-h-12 items-center text-text/85 underline decoration-transparent underline-offset-4 transition-colors hover:text-text hover:decoration-gold lg:min-h-10'

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
      <span className="sr-only"> (öffnet in neuem Tab)</span>
    </a>
  )
}

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-24">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Picture image={images.logo} sizes="56px" className="size-14 rounded-full" decorative />
            <p className="font-display-upper text-[32px] font-black">{business.name}</p>
          </div>
          <p className="text-small text-muted">
            {business.claims.primary}
            <br />
            {business.claims.offer}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <FooterHeading>Adresse & Kontakt</FooterHeading>
          <address className="text-body not-italic text-text/85">
            {address.street}
            <br />
            {address.zip} {address.city}
          </address>
          <a href={phone.href} className={linkClass}>
            {phone.display}
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <FooterHeading>Öffnungszeiten</FooterHeading>
          <dl className="text-body text-text/85">
            {groupHours(hours).map((row) => (
              <div key={row.days} className="flex gap-3">
                <dt>{row.daysLong}</dt>
                <dd className="tabular-nums">{row.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Weitere Links" className="flex flex-col gap-4">
          <FooterHeading>Folgen & Bestellen</FooterHeading>
          <ul className="flex flex-col">
            <li>
              <ExternalLink href={links.instagram}>Instagram {links.instagramHandle}</ExternalLink>
            </li>
            <li>
              <ExternalLink href={links.maps}>Google Maps</ExternalLink>
            </li>
            <li>
              <ExternalLink href={links.wolt}>Wolt</ExternalLink>
            </li>
            <li>
              <ExternalLink href={links.foodora}>foodora</ExternalLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-6 text-small text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {business.name}
          </p>
          <ul className="flex gap-6">
            <li>
              <a href={links.impressum} className="inline-flex min-h-12 items-center hover:text-text">
                Impressum
              </a>
            </li>
            <li>
              <a href={links.datenschutz} className="inline-flex min-h-12 items-center hover:text-text">
                Datenschutz
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
