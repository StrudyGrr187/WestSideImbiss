import { useSyncExternalStore } from 'react'
import { hours } from '../data/westside'
import { getOpenStatus, type OpenStatus } from '../lib/openStatus'

const TICK_MS = 60_000

/**
 * Shared minute-ticker: one timer for all consumers (Hero, Location, MobileBar, Nav overlay).
 * Re-evaluates on every full minute and when the tab becomes visible again.
 */
let snapshot: OpenStatus = getOpenStatus(hours)
const listeners = new Set<() => void>()
let timeout: number | undefined
let interval: number | undefined

function refresh() {
  const next = getOpenStatus(hours)
  const changed = JSON.stringify(next) !== JSON.stringify(snapshot)
  if (changed) {
    snapshot = next
    listeners.forEach((l) => l())
  }
}

const onVisible = () => {
  if (document.visibilityState === 'visible') refresh()
}

function start() {
  refresh()
  timeout = window.setTimeout(() => {
    refresh()
    interval = window.setInterval(refresh, TICK_MS)
  }, TICK_MS - (Date.now() % TICK_MS))
  document.addEventListener('visibilitychange', onVisible)
}

function stop() {
  window.clearTimeout(timeout)
  window.clearInterval(interval)
  document.removeEventListener('visibilitychange', onVisible)
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) start()
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) stop()
  }
}

const getSnapshot = () => snapshot

export function useOpenStatus(): OpenStatus {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
