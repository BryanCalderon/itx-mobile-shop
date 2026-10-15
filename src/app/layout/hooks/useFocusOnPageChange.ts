import { type RefObject, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/**
 * Moves the focus to the given element when the user navigates to another page, so keyboard and
 * screen reader users start from the new content instead of the link they used. Only path changes
 * count: the search query also lives in the URL and must not take the focus away from its input.
 */
export function useFocusOnPageChange(elementRef: RefObject<HTMLElement | null>) {
  const { pathname } = useLocation()
  const isFirstPage = useRef(true)

  useEffect(() => {
    if (isFirstPage.current) {
      isFirstPage.current = false
      return
    }
    // The scroll position is managed by the router, so focusing must not change it
    elementRef.current?.focus({ preventScroll: true })
  }, [pathname, elementRef])
}
