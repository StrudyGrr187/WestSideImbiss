import type { ReactNode } from 'react'
import { Reveal, RevealGroup } from './Reveal'

interface SectionHeaderProps {
  id: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  className?: string
  align?: 'left' | 'center'
}

/** Eyebrow (gold label) + H2 in Display + optional lead. `id` is used for aria-labelledby. */
export function SectionHeader({ id, eyebrow, title, intro, className = '', align = 'left' }: SectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : ''
  return (
    <RevealGroup as="header" className={`flex max-w-3xl flex-col gap-5 ${alignment} ${className}`}>
      <Reveal inGroup as="p" className="eyebrow text-gold">
        {eyebrow}
      </Reveal>
      <Reveal inGroup>
        <h2 id={id} className="font-display-upper text-h2 font-extrabold text-text">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal inGroup as="p" className="max-w-xl text-lead text-muted">
          {intro}
        </Reveal>
      )}
    </RevealGroup>
  )
}
