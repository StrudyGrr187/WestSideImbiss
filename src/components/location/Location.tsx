import { Bike, Navigation, Phone, ShoppingBag } from 'lucide-react'
import { address, deliveryHours, hours, links, phone } from '../../data/westside'
import { groupHours } from '../../lib/openStatus'
import { OpenStatusPill } from '../OpenStatus'
import { useOrderSheet } from '../order/orderSheetContext'
import { Button, ButtonLink } from '../ui/Button'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { MapEmbed } from './MapEmbed'

export function Location() {
  const { openOrderSheet } = useOrderSheet()
  const grouped = groupHours(hours)

  return (
    <section id="location" aria-labelledby="location-title" className="section-y border-t border-line">
      <div className="container-site">
        <SectionHeader id="location-title" eyebrow="Location" title="Du findest uns hier" />

        <div className="mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <RevealGroup className="flex flex-col gap-10 lg:col-span-5">
            <Reveal inGroup>
              <address className="not-italic">
                <h3 className="font-display-upper text-h3 font-extrabold">{address.street}</h3>
                <p className="mt-3 text-lead text-text/85">
                  {address.zip} {address.city} · {address.district}
                </p>
              </address>
            </Reveal>

            <Reveal inGroup className="flex flex-col gap-5">
              <OpenStatusPill variant="inline" />
              <table className="w-full text-body">
                <caption className="sr-only">Öffnungszeiten</caption>
                <tbody>
                  {grouped.map((row) => (
                    <tr key={row.days} className="border-y border-line">
                      <th scope="row" className="py-4 text-left font-medium text-text">
                        <abbr title={row.daysLong} className="no-underline">
                          {row.days}
                        </abbr>
                      </th>
                      <td className="py-4 text-right tabular-nums text-text">{row.time} Uhr</td>
                    </tr>
                  ))}
                  <tr className="border-b border-line">
                    <th scope="row" className="py-4 text-left font-medium text-muted">
                      <span className="inline-flex items-center gap-2">
                        <Bike size={20} strokeWidth={1.75} aria-hidden="true" />
                        Lieferung
                      </span>
                    </th>
                    <td className="py-4 text-right tabular-nums text-muted">
                      {deliveryHours.open} – {deliveryHours.close} Uhr
                    </td>
                  </tr>
                </tbody>
              </table>
            </Reveal>

            <Reveal inGroup className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={links.route} external icon={Navigation}>
                Route planen
              </ButtonLink>
              <ButtonLink href={phone.href} variant="secondary" icon={Phone}>
                Anrufen
                <span className="sr-only">: {phone.display}</span>
              </ButtonLink>
              <Button variant="secondary" icon={ShoppingBag} onClick={openOrderSheet} aria-haspopup="dialog">
                Bestellen
              </Button>
            </Reveal>

            <Reveal inGroup as="p" className="text-small text-muted">
              Telefon:{' '}
              <a href={phone.href} className="text-text underline decoration-line-strong underline-offset-4 hover:decoration-gold">
                {phone.display}
              </a>
            </Reveal>
          </RevealGroup>

          <Reveal className="lg:col-span-7">
            <MapEmbed />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
