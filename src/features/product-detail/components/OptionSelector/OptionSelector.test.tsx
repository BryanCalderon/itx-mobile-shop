import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { OptionSelector } from './OptionSelector'

const storages = [
  { code: 2000, name: '16 GB' },
  { code: 2001, name: '32 GB' },
]

it('shows the options as a group of radio buttons with the selected one checked', () => {
  render(
    <OptionSelector
      legend="Almacenamiento"
      options={storages}
      selectedCode={2001}
      onChange={vi.fn()}
    />,
  )

  expect(screen.getByRole('group', { name: 'Almacenamiento' })).toBeInTheDocument()
  expect(screen.getByRole('radio', { name: '16 GB' })).not.toBeChecked()
  expect(screen.getByRole('radio', { name: '32 GB' })).toBeChecked()
})

it('notifies the code of the chosen option', async () => {
  const onChange = vi.fn()
  render(
    <OptionSelector
      legend="Almacenamiento"
      options={storages}
      selectedCode={null}
      onChange={onChange}
    />,
  )

  await userEvent.click(screen.getByRole('radio', { name: '32 GB' }))

  expect(onChange).toHaveBeenCalledWith(2001)
})
