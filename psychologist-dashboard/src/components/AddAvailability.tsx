import React, { useState } from 'react'
import Card from './Card'
import Button from './Button'
import dayjs from 'dayjs'
import { psychologistService } from '../services/psychologist'

const AddAvailability = ({
  psychologistId,
  onAddAvailability
}: {
  psychologistId: string | number
  onAddAvailability: () => void
}) => {
  const [fromDate, setFromDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [registrationStatus, setRegistrationStatus] = useState({
    error: false,
    message: ''
  })

  const isFormValid = () => {
    if (!fromDate || !startTime || !endTime) {
      return {
        error: 'Please fill all fields',
        isValid: false
      }
    }
    if (dayjs(fromDate).isBefore(dayjs().startOf('day'))) {
      return {
        error: 'Date must be today or later',
        isValid: false
      }
    }
    const start = dayjs(`${fromDate}T${startTime}`)
    const end = dayjs(`${fromDate}T${endTime}`)

    if (start.isAfter(end)) {
      return {
        error: 'Start time must be earlier than end time',
        isValid: false
      }
    }
    return {
      error: '',
      isValid: true
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setRegistrationStatus({ error: false, message: '' })
    if (!isFormValid().isValid) {
      setRegistrationStatus({ error: true, message: isFormValid().error })
      return
    }
    try {
      await psychologistService.postAvailability(psychologistId, {
        from: dayjs(`${fromDate}T${startTime}:00.000Z`).toISOString(),
        to: dayjs(`${fromDate}T${endTime}:00.000Z`).toISOString()
      })
      if (onAddAvailability) {
        onAddAvailability()
      }
      setRegistrationStatus({
        error: false,
        message: 'Availability added successfully'
      })
      // clear form
      setFromDate('')
      setStartTime('')
      setEndTime('')
    } catch (error) {
      setRegistrationStatus({
        error: true,
        message: 'Failed to add availability'
      })
      return
    }
  }

  return (
    <Card title="Add Availability">
      <div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label
            htmlFor="fromDate"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <div className="mt-1">
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <label
            htmlFor="fromTime"
            className="block text-sm font-medium text-gray-700"
          >
            Start Time
          </label>
          <div className="mt-1">
            <input
              type="time"
              id="fromTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <label
            htmlFor="toTime"
            className="block text-sm font-medium text-gray-700"
          >
            End Time
          </label>
          <div className="mt-1">
            <input
              type="time"
              id="toTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <Button type="submit" className="mt-4 w-full">
            Add
          </Button>
        </form>
        {registrationStatus.message && (
          <p
            className={
              registrationStatus.error
                ? 'text-red-500 text-center'
                : 'text-green-500 text-center'
            }
          >
            {registrationStatus.message}
          </p>
        )}
      </div>
    </Card>
  )
}

export default AddAvailability
