import { timeline } from '../../data/westside'
import { Reveal, RevealGroup } from '../ui/Reveal'

/** Vertical line (line-strong) with 10px gold nodes; date in Display 32px. */
export function Timeline() {
  return (
    <RevealGroup as="ol" className="relative">
      <span className="absolute top-2 bottom-2 left-[4px] w-px bg-line-strong" aria-hidden="true" />
      {timeline.map((entry) => (
        <Reveal inGroup as="li" key={entry.id} className="relative pb-12 pl-10 last:pb-0">
          <span className="absolute top-[10px] left-0 size-[10px] rounded-full bg-gold" aria-hidden="true" />
          <p className="font-display-upper text-[32px] font-extrabold text-text">
            {entry.date ? <time dateTime={entry.date}>{entry.label}</time> : entry.label}
          </p>
          <h3 className="mt-3 text-lead font-bold text-text">{entry.title}</h3>
          <p className="mt-1 text-body text-text/80">{entry.text}</p>
          {entry.muted && <p className="mt-2 text-small text-muted">{entry.muted}</p>}
        </Reveal>
      ))}
    </RevealGroup>
  )
}
