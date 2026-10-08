import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { imageRevealVariants, revealVariants, staggerContainer, VIEWPORT } from '../../lib/motion'

type Tag = 'div' | 'li' | 'ul' | 'ol' | 'section' | 'header' | 'figure' | 'p' | 'article'

interface RevealProps {
  children: ReactNode
  className?: string
  as?: Tag
  /** Use inside a <RevealGroup>: inherits trigger + stagger from parent */
  inGroup?: boolean
}

/** Fade + 24px rise on enter. Reduced motion → opacity only. */
export function Reveal({ children, className, as = 'div', inGroup = false }: RevealProps) {
  const reduced = useReducedMotion()
  const Component = m[as]
  const trigger = inGroup ? {} : { initial: 'hidden', whileInView: 'show', viewport: VIEWPORT }
  return (
    <Component className={className} variants={revealVariants(reduced)} {...trigger}>
      {children}
    </Component>
  )
}

/** Stagger container for <Reveal inGroup> children. */
export function RevealGroup({ children, className, as = 'div' }: Omit<RevealProps, 'inGroup'>) {
  const reduced = useReducedMotion()
  const Component = m[as]
  return (
    <Component
      className={className}
      variants={staggerContainer(reduced)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  )
}

/** Image reveal: clip-path inset(12% 0 0 0) → inset(0) + scale 1.08 → 1 */
export function ImageReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <m.div
      className={className}
      variants={imageRevealVariants(reduced)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </m.div>
  )
}
