import React from 'react'
import UpcomingSessions from '../components/UpcomingSessions'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('../services/client', () => {
  return {
    clientService: {
      deleteAppointment: jest.fn()
    }
  }
})

describe('UpcomingSessions', () => {
  test('renders UpcomingSessions component', () => {
    render(
      <UpcomingSessions
        appointments={[
          {
            id: '1',
            clientId: 123,
            from: '2022-01-01T09:00:00.000Z',
            to: '2022-01-01T10:00:00.000Z'
          }
        ]}
        onDeleteAppointment={jest.fn()}
      />
    )
    const upcomingSessions = screen.getByText(/upcoming sessions/i)
    expect(upcomingSessions).toBeInTheDocument()
  })

  test('should call onDeleteAppointment', async () => {
    const mockOnDeleteAppointment = jest.fn()
    render(
      <UpcomingSessions
        appointments={[
          {
            id: '1',
            clientId: 123,
            from: '2022-01-01T09:00:00.000Z',
            to: '2022-01-01T10:00:00.000Z'
          }
        ]}
        onDeleteAppointment={mockOnDeleteAppointment}
      />
    )
    expect(screen.getByText(/2022-01-01/)).toBeInTheDocument()

    const removeButton = screen.getByRole('button', { name: /remove/i })
    userEvent.click(removeButton)
    await waitFor(() => {
      expect(mockOnDeleteAppointment).toHaveBeenCalled()
    })
  })
})
