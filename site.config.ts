/**
 * Absolute production URL (no trailing slash). Used for canonical, Open Graph and JSON-LD.
 * [TODO: echte Domain eintragen] – bis dahin klar erkennbarer Platzhalter.
 * Override at build time: SITE_URL=https://deine-domain.at npm run build
 */
const FALLBACK_URL = 'https://westside-imbiss.example'

export const SITE_URL = (process.env.SITE_URL ?? FALLBACK_URL).replace(/\/$/, '')
