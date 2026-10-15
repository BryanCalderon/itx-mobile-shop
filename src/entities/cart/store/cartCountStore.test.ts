import { describe, expect, it, vi } from 'vitest'
import { CART_COUNT_STORAGE_KEY } from '../constants'
import { getCartCount, incrementCartCount, subscribeToCartCount } from './cartCountStore'

describe('cartCountStore', () => {
  it('starts with an empty cart', () => {
    expect(getCartCount()).toBe(0)
  })

  it('accumulates the units added and persists them', () => {
    incrementCartCount(1)
    incrementCartCount(2)

    expect(getCartCount()).toBe(3)
    expect(localStorage.getItem(CART_COUNT_STORAGE_KEY)).toBe('3')
  })

  it('ignores an invalid persisted value', () => {
    localStorage.setItem(CART_COUNT_STORAGE_KEY, 'not a number')

    expect(getCartCount()).toBe(0)
  })

  it('notifies its subscribers until they unsubscribe', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeToCartCount(listener)

    incrementCartCount(1)
    unsubscribe()
    incrementCartCount(1)

    expect(listener).toHaveBeenCalledOnce()
  })

  it('notifies changes made in other tabs', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeToCartCount(listener)

    window.dispatchEvent(new StorageEvent('storage', { key: CART_COUNT_STORAGE_KEY }))
    window.dispatchEvent(new StorageEvent('storage', { key: 'another-key' }))
    unsubscribe()

    expect(listener).toHaveBeenCalledOnce()
  })
})
