/**
 * Single source of truth for all site content.
 * Only verified facts (research/FACTS.md). No prices, no invented reviews.
 */
import type { ImageName } from './images.generated'

/* ------------------------------------------------------------------ types */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6 // 0 = Montag … 6 = Sonntag

export interface DayHours {
  day: Weekday
  /** "HH:MM", 24h, Europe/Vienna */
  open: string
  close: string
}

export interface SiteImage {
  name: ImageName
  alt: string
  /** CSS object-position, used to keep subjects (and hide details) in frame */
  position?: string
}

export interface Review {
  author: string
  /** 1–5 */
  rating: number
  text: string
  /** ISO date, e.g. "2026-10-04" */
  date: string
  source: 'google'
}

export interface FoodHighlight {
  id: string
  title: string
  text: string
  image: SiteImage
}

export interface MenuItem {
  name: string
  /** Zutaten / Varianten, muted dargestellt */
  detail?: string
  spicy?: boolean
}

export interface MenuCategory {
  id: string
  title: string
  note?: string
  items: MenuItem[]
}

export interface Reel {
  id: string
  url: string
  /** ISO date */
  date: string
  title: string
  note?: string
  image: SiteImage
}

export interface TimelineEntry {
  id: string
  /** Anzeige-Datum, z.B. "29.09." */
  label: string
  /** ISO date for <time>, optional for "Heute" */
  date?: string
  title: string
  text: string
  muted?: string
}

/* ------------------------------------------------------------------- data */

export const business = {
  name: 'Westside Imbiss',
  shortName: 'Westside',
  category: 'Imbiss',
  district: 'Ottakring',
  openingDate: '2026-10-02',
  claims: {
    primary: 'Frisch. Lecker. Westside.',
    bite: 'Bite the Best!',
    offer: 'Döner • Pizza • Snacks',
    love: 'Frisch, lecker und mit Liebe gemacht',
    logo: 'Qualität Genuss am Ottakring',
  },
} as const

export const address = {
  street: 'Thaliastraße 148',
  zip: '1160',
  city: 'Wien',
  district: 'Ottakring',
  geo: { lat: 48.213, lng: 16.3103631 },
} as const

export const phone = {
  display: '0660 6513300',
  href: 'tel:+436606513300',
  international: '+43 660 6513300',
} as const

const DAILY = { open: '10:00', close: '22:00' } as const

export const hours: DayHours[] = ([0, 1, 2, 3, 4, 5, 6] as const).map((day) => ({ day, ...DAILY }))

export const deliveryHours = { open: '11:00', close: '22:00' } as const

export const links = {
  maps: 'https://maps.app.goo.gl/fCozB7o1wJLzNsuW7',
  reviews: 'https://maps.app.goo.gl/fCozB7o1wJLzNsuW7',
  /** No place-ID available → the Maps profile is where guests can write a review. */
  writeReview: 'https://maps.app.goo.gl/fCozB7o1wJLzNsuW7',
  route:
    'https://www.google.com/maps/dir/?api=1&destination=Westside+Imbiss+Thaliastra%C3%9Fe+148+1160+Wien',
  mapEmbed:
    'https://www.google.com/maps?q=Westside+Imbiss,+Thaliastra%C3%9Fe+148,+1160+Wien&output=embed',
  instagram: 'https://www.instagram.com/westside_imbiss16/',
  instagramHandle: '@westside_imbiss16',
  wolt: 'https://wolt.com/de/aut/vienna/restaurant/westside-imbiss',
  foodora: 'https://www.foodora.at/restaurant/icgp/westside-imbiss',
  impressum: '/impressum.html',
  datenschutz: '/datenschutz.html',
} as const

export const orderPlatforms = [
  { id: 'wolt', name: 'Wolt', href: links.wolt },
  { id: 'foodora', name: 'foodora', href: links.foodora },
] as const

export const rating = {
  value: 5.0,
  count: 6,
  source: 'Google',
} as const

/** Echte Google-Reviews hier eintragen – ReviewCards erscheinen automatisch. */
export const reviews: Review[] = []

export const ownQuote = {
  text: 'Dass unser Imbiss direkt am ersten Tag so voll war, hat uns überwältigt.',
  attribution: 'Westside Imbiss, Eröffnung 02.10.2026',
} as const

export const images = {
  heroDesktop: {
    name: 'hero-spiess',
    alt: 'Zwei Dönerspieße an der Theke, das Westside-Team schneidet frisch auf, dahinter wartende Gäste',
    position: '30% 40%',
  },
  heroMobile: {
    name: 'hero-spiess-mobile',
    // Shared alt for both art-directed hero crops (only one <img> element is rendered).
    alt: 'Frisch gegrillter Dönerspieß an der Theke vom Westside Imbiss',
    position: '50% 30%',
  },
  logo: { name: 'logo', alt: 'Westside Imbiss Logo' },
  openingQueue: {
    name: 'opening-queue',
    alt: 'Lange Schlange vor dem Westside Imbiss in der Thaliastraße am Eröffnungstag',
    position: '50% 50%',
  },
  openingCrowd: {
    name: 'opening-crowd',
    alt: 'Volles Lokal am Eröffnungstag des Westside Imbiss',
    // 4:5 crop centred on the crowd; keeps the price board (left edge) out of frame.
    position: '60% 50%',
  },
  ctaDoener: {
    name: 'cta-doener',
    alt: 'Döner Sandwich vom Westside Imbiss in Nahaufnahme, frisch belegt mit Salat und Soße',
    position: '50% 50%',
  },
  storefront: {
    name: 'storefront',
    alt: 'Außenansicht des Westside Imbiss in der Thaliastraße 148',
    position: '40% 50%',
  },
} as const satisfies Record<string, SiteImage>

export const foodHighlights: FoodHighlight[] = [
  {
    id: 'doener',
    title: 'Döner',
    text: 'Huhn, Steak oder gemischt – frisch vom Spieß als Sandwich, Dürüm, Box oder Teller.',
    image: { name: 'food-doener', alt: 'Dönerspieß in Nahaufnahme', position: '50% 40%' },
  },
  {
    id: 'pizza',
    title: 'Pizza',
    text: 'Von Margherita über Diavolo bis zur Kebab Pizza.',
    image: { name: 'food-pizza', alt: 'Pizza mit Pfefferoni, ein Stück wird herausgehoben', position: '50% 60%' },
  },
  {
    id: 'frisch',
    title: 'Frisch belegt',
    text: 'Salat, Kraut, Zwiebeln & Soße – direkt an der Theke ins Brot.',
    image: { name: 'food-salatbar', alt: 'Salatbar von oben, ein Brot wird mit Döner befüllt', position: '50% 55%' },
  },
]

export const menu: MenuCategory[] = [
  {
    id: 'sandwiches',
    title: 'Sandwiches',
    note: 'mit Salat & Soße',
    items: [{ name: 'Hühner Döner Sandwich' }, { name: 'Steak Döner Sandwich' }, { name: 'Gemischtes Döner Sandwich' }],
  },
  {
    id: 'duerum',
    title: 'Dürüm',
    note: 'mit Salat & Soße',
    items: [{ name: 'Hühner Döner Dürüm' }, { name: 'Steak Döner Dürüm' }, { name: 'Gemischter Döner Dürüm' }],
  },
  {
    id: 'boxen',
    title: 'Boxen',
    note: 'mit Beilage nach Wahl',
    items: [{ name: 'Hühner Döner Box' }, { name: 'Steak Döner Box' }, { name: 'Gemischte Döner Box' }],
  },
  {
    id: 'teller',
    title: 'Teller',
    note: 'mit Beilage nach Wahl',
    items: [{ name: 'Hühner Döner Teller' }, { name: 'Kalb Döner Teller' }, { name: 'Gemischter Döner Teller' }],
  },
  {
    id: 'pizzen',
    title: 'Pizzen',
    items: [
      { name: 'Margherita' },
      { name: 'Funghi' },
      { name: 'Salami' },
      { name: 'Tonno' },
      { name: 'Cardinale' },
      { name: 'Diavolo', spicy: true },
      { name: 'Provenciale' },
      { name: 'Melanzani' },
      { name: 'Quattro Formaggi' },
      { name: 'Kebab Pizza', detail: 'Tomatensoße, Käse, Kebabfleisch Kalb, Huhn' },
    ],
  },
  {
    id: 'salate',
    title: 'Salate',
    items: [
      { name: 'Gemischter Salat', detail: 'Grüner Salat, Kraut, Zwiebeln, Tomaten' },
      { name: 'Griechischer Salat', detail: 'Tomaten, Gurken, Paprika, Zwiebeln, Oliven, Käse' },
      { name: 'Kebab Salat', detail: 'Gemischter Salat, Döner Kebabfleisch Kalb, Huhn' },
    ],
  },
  { id: 'pide', title: 'Pide', items: [{ name: 'Pide nach Wahl' }] },
  { id: 'beilagen', title: 'Beilagen', items: [{ name: 'Reis' }, { name: 'Pizza Stangerl' }] },
  { id: 'desserts', title: 'Desserts', items: [{ name: 'Baklava' }] },
]

export const menuFootnote = 'Schnitzel & Falafel gibt’s im Lokal – frag an der Theke.'

export const reels: Reel[] = [
  {
    id: 'DeHv-ntKprW',
    url: 'https://www.instagram.com/westside_imbiss16/reel/DeHv-ntKprW/',
    date: '2026-10-05',
    title: 'Adnan Be Halal testet Döner & Pizza',
    image: { name: 'reel-DeHv-ntKprW', alt: 'Reel-Vorschau: Food-Creator Adnan Be Halal beim Westside Imbiss' },
  },
  {
    id: 'DeCqNSYKIay',
    url: 'https://www.instagram.com/westside_imbiss16/reel/DeCqNSYKIay/',
    date: '2026-10-03',
    title: 'Was für eine Eröffnung!',
    image: { name: 'reel-DeCqNSYKIay', alt: 'Reel-Vorschau: Dönerspieße an der Theke am Eröffnungstag' },
  },
  {
    id: 'Dd4JbgaKXOM',
    url: 'https://www.instagram.com/westside_imbiss16/reel/Dd4JbgaKXOM/',
    date: '2026-09-29',
    title: 'Wir eröffnen!',
    note: 'Eröffnungsangebot – beendet',
    image: { name: 'reel-Dd4JbgaKXOM', alt: 'Reel-Vorschau: Ankündigung der Eröffnung vor dem Lokal' },
  },
]

export const timeline: TimelineEntry[] = [
  {
    id: 'announce',
    label: '29.09.',
    date: '2026-09-29',
    title: 'Wir eröffnen!',
    text: 'Auf Instagram kündigen wir den Start in der Thaliastraße an.',
    muted: 'Eröffnungsangebot: 1 € Döner Sandwich (beendet)',
  },
  {
    id: 'opening',
    label: '02.10.',
    date: '2026-10-02',
    title: 'Eröffnung, 11:00 Uhr',
    text: 'Am ersten Tag volles Lokal – und draußen eine Schlange vor der Tür.',
  },
  {
    id: 'creator',
    label: '05.10.',
    date: '2026-10-05',
    title: 'Besuch von Adnan Be Halal',
    text: 'Der Food-Creator testet bei uns Döner & Pizza.',
  },
  {
    id: 'today',
    label: 'Heute',
    title: 'Täglich für dich da',
    text: 'Montag bis Sonntag, 10:00 bis 22:00 Uhr. Komm vorbei.',
  },
]

export const marqueeItems = [
  'Döner',
  'Pizza',
  'Pide',
  'Dürüm',
  'Frisch. Lecker. Westside.',
  'Boxen',
  'Teller',
  'Salate',
  'Baklava',
  'Bite the Best!',
] as const

export const navItems = [
  { href: '#top', label: 'Home' },
  { href: '#food', label: 'Food' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#instagram', label: 'Instagram' },
  { href: '#location', label: 'Location' },
] as const
