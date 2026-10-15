import { CART_COUNT_STORAGE_KEY } from '../constants'

/**
 * Number of products in the cart, persisted in localStorage so it survives page reloads and is
 * shared between tabs. It follows the external store contract of `useSyncExternalStore`.
 */
type Listener = () => void

const listeners = new Set<Listener>()

export function getCartCount(): number {
  const storedCount = Number(readStoredCount())
  return Number.isInteger(storedCount) && storedCount > 0 ? storedCount : 0
}

export function incrementCartCount(units: number): void {
  writeStoredCount(getCartCount() + units)
  listeners.forEach((listener) => listener())
}

export function subscribeToCartCount(listener: Listener): () => void {
  // Other tabs update the count through the storage event
  function handleStorage(event: StorageEvent) {
    if (event.key === CART_COUNT_STORAGE_KEY) {
      listener()
    }
  }
  listeners.add(listener)
  window.addEventListener('storage', handleStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', handleStorage)
  }
}

/** Storage can be unavailable, e.g. in some private browsing modes: the count then starts at zero. */
function readStoredCount(): string | null {
  try {
    return localStorage.getItem(CART_COUNT_STORAGE_KEY)
  } catch {
    return null
  }
}

function writeStoredCount(count: number): void {
  try {
    localStorage.setItem(CART_COUNT_STORAGE_KEY, String(count))
  } catch {
    // The count is not persisted, but adding to the cart has already succeeded
  }
}
