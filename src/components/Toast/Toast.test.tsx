import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { TOAST_AUTO_DISMISS_MS } from './constants'
import { Toast } from './Toast'

describe('Toast', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows nothing without a notification', () => {
    const { container } = render(<Toast notification={null} onDismiss={vi.fn()} />)

    expect(container).toHaveTextContent('')
  })

  it('closes a success notification by itself', () => {
    vi.useFakeTimers()
    const onDismiss = vi.fn()
    render(<Toast notification={{ variant: 'success', message: 'Hecho' }} onDismiss={onDismiss} />)
    expect(screen.getByText('Hecho')).toBeVisible()

    act(() => vi.advanceTimersByTime(TOAST_AUTO_DISMISS_MS))

    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('keeps an error notification until the user closes it', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const onDismiss = vi.fn()
    render(<Toast notification={{ variant: 'error', message: 'Fallo' }} onDismiss={onDismiss} />)

    act(() => vi.advanceTimersByTime(TOAST_AUTO_DISMISS_MS * 2))
    expect(onDismiss).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent('Fallo')

    await userEvent.click(screen.getByRole('button', { name: 'Cerrar notificación' }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })
})
