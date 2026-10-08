import type { Transition, Variants } from 'framer-motion'

/** Design-Brief easing: easeOutQuint-like */
export const EASE = [0.22, 1, 0.36, 1] as const

export const DURATION = { hover: 0.2, reveal: 0.7, image: 0.9 } as const

export const STAGGER = 0.08

export const VIEWPORT = { once: true, margin: '-10% 0px' } as const

export const revealTransition: Transition = { duration: DURATION.reveal, ease: EASE }

/** Opacity-only fallback for prefers-reduced-motion */
const reducedTransition: Transition = { duration: 0.2, ease: 'linear' }

export function revealVariants(reduced: boolean | null): Variants {
  return reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: reducedTransition } }
    : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: revealTransition } }
}

export function imageRevealVariants(reduced: boolean | null): Variants {
  return reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: reducedTransition } }
    : {
        hidden: { clipPath: 'inset(12% 0% 0% 0%)', scale: 1.08 },
        show: {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          transition: { duration: DURATION.image, ease: EASE },
        },
      }
}

export function staggerContainer(reduced: boolean | null): Variants {
  return { hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : STAGGER } } }
}

export const SHEET_SPRING: Transition = { type: 'spring', stiffness: 380, damping: 36 }
