import React from 'react'
import EditAvailability from '../components/EditAvailability'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('../services/psychologist', () => {
  return {
    psychologistService: {
      patchAvailability: jest.fn()
    }
  }
})

describe('EditAvailability', () => {
  test('renders EditAvailability component', () => {
    render(
      <EditAvailability
        psychologistId={'123'}
        availabilities={[]}
        onSaveAvailability={jest.fn()}
      />
    )
    const editAvailability = screen.getByText(/edit availability/i)
    expect(editAvailability).toBeInTheDocument()
  })

  test('should call onSaveAvailability', async () => {
    const mockOnSaveAvailability = jest.fn()
    render(
      <EditAvailability
        psychologistId={'123'}
        availabilities={[
          {
            id: '1',
            from: '2022-01-01T09:00:00.000Z',
            to: '2022-01-01T10:00:00.000Z'
          }
        ]}
        onSaveAvailability={mockOnSaveAvailability}
      />
    )
    expect(screen.getByText(/2022-01-01/)).toBeInTheDocument()

    const editButton = screen.getByRole('button', { name: /edit/i })
    userEvent.click(editButton)
    const saveButton = await screen.findByRole('button', { name: /save/i })

    const dateInput = screen.getByLabelText(/date/i)
    userEvent.type(dateInput, '2022-01-01')
    const startTimeInput = screen.getByLabelText(/start time/i)
    userEvent.type(startTimeInput, '10:00')
    const endTimeInput = screen.getByLabelText(/end time/i)
    userEvent.type(endTimeInput, '11:00')
    userEvent.click(saveButton)
    await waitFor(() => {
      expect(mockOnSaveAvailability).toHaveBeenCalled()
    })
  })
})
