import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { address, business, images, links } from '../../data/westside'
import { Button } from '../ui/Button'
import { Picture } from '../ui/Picture'

/**
 * Click-to-load Google Map (GDPR + performance): nothing is requested from Google
 * until the visitor explicitly asks for it.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[560px]">
      {loaded ? (
        <iframe
          title={`Google Maps – ${business.name}, ${address.street}, ${address.zip} ${address.city}`}
          src={links.mapEmbed}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <Picture
            image={images.storefront}
            sizes="(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 100vw"
            className="img-graded absolute inset-0 size-full object-cover"
          />
          <div className="grade-overlay" aria-hidden="true" />
          <div className="absolute inset-0 bg-bg/35" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-6 lg:p-10">
            <span className="inline-flex items-center gap-2 text-small text-text">
              <MapPin size={20} strokeWidth={1.75} className="text-gold" aria-hidden="true" />
              {address.street}, {address.zip} {address.city}
            </span>
            <Button variant="secondary" icon={MapPin} onClick={() => setLoaded(true)} className="bg-bg/60 backdrop-blur-md">
              Karte laden
            </Button>
            <p className="max-w-sm text-small text-muted">
              Beim Laden der Karte werden Daten an Google übertragen.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
