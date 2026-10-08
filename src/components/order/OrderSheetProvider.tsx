import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { OrderSheet } from './OrderSheet'
import { OrderSheetContext } from './orderSheetContext'

/** Provides one shared Wolt/foodora sheet for MobileBar, Location and Menu CTAs. */
export function OrderSheetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openOrderSheet = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const api = useMemo(() => ({ openOrderSheet }), [openOrderSheet])

  return (
    <OrderSheetContext.Provider value={api}>
      {children}
      <OrderSheet open={open} onClose={close} />
    </OrderSheetContext.Provider>
  )
}
