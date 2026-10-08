import { createContext, useContext } from 'react'

export interface OrderSheetApi {
  openOrderSheet: () => void
}

export const OrderSheetContext = createContext<OrderSheetApi | null>(null)

export function useOrderSheet(): OrderSheetApi {
  const ctx = useContext(OrderSheetContext)
  if (!ctx) throw new Error('useOrderSheet must be used inside <OrderSheetProvider>')
  return ctx
}
