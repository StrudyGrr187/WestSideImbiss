import type { DayHours, Weekday } from '../data/westside'

export const TIME_ZONE = 'Europe/Vienna'

export type OpenStatus =
  | { isOpen: true; closesAt: string }
  | { isOpen: false; opensAt: string; opensDay: 'today' | 'tomorrow' | Weekday }

const WEEKDAY_INDEX: Record<string, Weekday> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 }

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIME_ZONE,
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

/** Current weekday (0 = Montag) and minutes since midnight in Vienna, independent of the visitor's TZ. */
export function viennaNow(date: Date = new Date()): { day: Weekday; minutes: number } {
  const parts = formatter.formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ''
  return {
    day: WEEKDAY_INDEX[get('weekday')] ?? 0,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

export const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function getOpenStatus(hours: DayHours[], date: Date = new Date()): OpenStatus {
  const { day, minutes } = viennaNow(date)
  const byDay = new Map(hours.map((h) => [h.day, h]))

  const today = byDay.get(day)
  if (today) {
    const open = toMinutes(today.open)
    const close = toMinutes(today.close)
    if (minutes >= open && minutes < close) return { isOpen: true, closesAt: today.close }
    if (minutes < open) return { isOpen: false, opensAt: today.open, opensDay: 'today' }
  }

  for (let offset = 1; offset <= 7; offset++) {
    const next = byDay.get(((day + offset) % 7) as Weekday)
    if (next) {
      return { isOpen: false, opensAt: next.open, opensDay: offset === 1 ? 'tomorrow' : next.day }
    }
  }
  return { isOpen: false, opensAt: '', opensDay: 'today' }
}

export const WEEKDAY_SHORT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as const
export const WEEKDAY_LONG = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'] as const

export function describeStatus(status: OpenStatus): { label: string; detail: string } {
  if (status.isOpen) return { label: 'Jetzt geöffnet', detail: `bis ${status.closesAt}` }
  const when =
    status.opensDay === 'today' ? '' : status.opensDay === 'tomorrow' ? 'morgen ' : `${WEEKDAY_SHORT[status.opensDay]} `
  return { label: 'Geschlossen', detail: `öffnet ${when}${status.opensAt}` }
}

/** Collapses consecutive days with identical hours: "Mo – So · 10:00 – 22:00". */
export function groupHours(hours: DayHours[]): { days: string; daysLong: string; time: string }[] {
  const sorted = [...hours].sort((a, b) => a.day - b.day)
  const groups: { from: Weekday; to: Weekday; open: string; close: string }[] = []
  for (const h of sorted) {
    const last = groups.at(-1)
    if (last && last.open === h.open && last.close === h.close && h.day === last.to + 1) last.to = h.day
    else groups.push({ from: h.day, to: h.day, open: h.open, close: h.close })
  }
  return groups.map((g) => ({
    days: g.from === g.to ? WEEKDAY_SHORT[g.from] : `${WEEKDAY_SHORT[g.from]} – ${WEEKDAY_SHORT[g.to]}`,
    daysLong: g.from === g.to ? WEEKDAY_LONG[g.from] : `${WEEKDAY_LONG[g.from]} – ${WEEKDAY_LONG[g.to]}`,
    time: `${g.open} – ${g.close}`,
  }))
}
