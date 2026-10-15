import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { SlowLoadingNotice } from './SlowLoadingNotice'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

it('explains a slow load only once the wait gets noticeable', () => {
  render(<SlowLoadingNotice delayMs={4_000} />)
  expect(screen.queryByText(/servidor está arrancando/)).not.toBeInTheDocument()

  act(() => vi.advanceTimersByTime(4_000))

  expect(screen.getByText(/servidor está arrancando/)).toBeInTheDocument()
})
