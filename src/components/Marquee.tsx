import { Fragment } from 'react'
import { marqueeItems } from '../data/westside'

function Spark() {
  return (
    <svg viewBox="0 0 24 24" className="size-[0.55em] shrink-0" aria-hidden="true" focusable="false">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
    </svg>
  )
}

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-6 pr-6 lg:gap-8 lg:pr-8" aria-hidden={hidden || undefined}>
      {marqueeItems.map((item) => (
        <Fragment key={item}>
          <li className="whitespace-nowrap">{item}</li>
          <li aria-hidden="true" className="flex items-center">
            <Spark />
          </li>
        </Fragment>
      ))}
    </ul>
  )
}

/** Gold band, rotated -1.5deg, overlapping the hero bottom edge. CSS-only loop; static with reduced motion. */
export function Marquee() {
  return (
    <div className="relative z-10 -mt-10 -ml-[2%] w-[104%] -rotate-[1.5deg] overflow-hidden bg-gold py-4 text-bg lg:-mt-14 lg:py-5">
      <p className="sr-only">Unser Angebot: {marqueeItems.join(', ')}</p>
      <div
        className="flex w-max font-display-upper text-h3 font-extrabold animate-marquee motion-reduce:animate-none"
        aria-hidden="true"
      >
        <Row hidden />
        <Row hidden />
      </div>
    </div>
  )
}
