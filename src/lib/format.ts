const ratingFormatter = new Intl.NumberFormat('de-AT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const dateFormatter = new Intl.DateTimeFormat('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Vienna' })

/** 5 → "5,0" */
export const formatRating = (value: number): string => ratingFormatter.format(value)

/** "2026-10-05" → "05.10.2026" */
export const formatDate = (iso: string): string => dateFormatter.format(new Date(`${iso}T12:00:00Z`))
