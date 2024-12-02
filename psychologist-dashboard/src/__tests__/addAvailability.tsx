import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddAvailability from '../components/AddAvailability'

jest.mock('../services/psychologist', () => {
  return {
    psychologistService: {
      postAvailability: jest.fn()
    }
  }
})

describe('AddAvailability', () => {
  test('renders AddAvailability component', () => {
    render(
      <AddAvailability psychologistId={123} onAddAvailability={jest.fn()} />
    )
    const addAvailability = screen.getByText(/add availability/i)
    expect(addAvailability).toBeInTheDocument()
  })

  test('all input should be field', () => {
    render(
      <AddAvailability psychologistId={123} onAddAvailability={jest.fn()} />
    )

    const addButton = screen.getByRole('button', { name: /add/i })
    userEvent.click(addButton)
    const errorMessage = screen.getByText(/please fill all fields/i)
    expect(errorMessage).toBeInTheDocument()
  })

  test('date should be in the future', () => {
    render(
      <AddAvailability psychologistId={123} onAddAvailability={jest.fn()} />
    )

    const dateInput = screen.getByLabelText(/date/i)
    userEvent.type(dateInput, '2021-01-01')
    const startTimeInput = screen.getByLabelText(/start time/i)
    userEvent.type(startTimeInput, '10:00')
    const endTimeInput = screen.getByLabelText(/end time/i)
    userEvent.type(endTimeInput, '11:00')
    const addButton = screen.getByRole('button', { name: /add/i })
    userEvent.click(addButton)
    const errorMessage = screen.getByText(/date must be today or later/i)
    expect(errorMessage).toBeInTheDocument()
  })

  test('end time should be after start time', () => {
    render(
      <AddAvailability psychologistId={123} onAddAvailability={jest.fn()} />
    )

    const dateInput = screen.getByLabelText(/date/i)
    userEvent.type(dateInput, '2050-01-01')
    const startTimeInput = screen.getByLabelText(/start time/i)
    userEvent.type(startTimeInput, '11:00')
    const endTimeInput = screen.getByLabelText(/end time/i)
    userEvent.type(endTimeInput, '10:00')
    const addButton = screen.getByRole('button', { name: /add/i })
    userEvent.click(addButton)
    const errorMessage = screen.getByText(
      /start time must be earlier than end time/i
    )
    expect(errorMessage).toBeInTheDocument()
  })

  test('should add availability', async () => {
    const mockOnAddAvailability = jest.fn()
    render(
      <AddAvailability
        psychologistId={123}
        onAddAvailability={mockOnAddAvailability}
      />
    )

    const dateInput = screen.getByLabelText(/date/i)
    userEvent.type(dateInput, '2050-01-01')
    const startTimeInput = screen.getByLabelText(/start time/i)
    userEvent.type(startTimeInput, '10:00')
    const endTimeInput = screen.getByLabelText(/end time/i)
    userEvent.type(endTimeInput, '11:00')
    const addButton = screen.getByRole('button', { name: /add/i })
    userEvent.click(addButton)
    const successMessage = await screen.findByText(
      /availability added successfully/i
    )
    expect(successMessage).toBeInTheDocument()
    expect(mockOnAddAvailability).toHaveBeenCalledTimes(1)
  })
})
