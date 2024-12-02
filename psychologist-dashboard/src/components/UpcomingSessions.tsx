import React from 'react'
import Card from './Card'
import Button from './Button'
import dayjs from 'dayjs'
import { Appointment } from '../types'
import { clientService } from '../services/client'

const UpcomingSessions = ({
  appointments,
  onDeleteAppointment
}: {
  appointments: Appointment[] | null
  onDeleteAppointment: () => void
}) => {
  const removeSession = async (clientId: string, appointmentId: string) => {
    try {
      await clientService.deleteAppointment(clientId, appointmentId)
      onDeleteAppointment()
    } catch (error) {
      console.error('Error removing session:', error)
    }
  }

  return (
    <Card title="Upcoming Sessions">
      <ul className="space-y-4">
        {!appointments?.length && (
          <li className="p-4 text-center">No upcoming sessions</li>
        )}
        {appointments?.map((appointment) => (
          <li key={appointment.id} className="p-4 ">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-300" />
              <div className="flex-1">
                <p className="text-lg font-semibold">
                  Client ID: {appointment.clientId}
                </p>
                <p className="text-sm text-gray-500">
                  {dayjs(appointment.from).format('YYYY-MM-DD')} at{' '}
                  {dayjs(appointment.from).format('HH:mm')}
                </p>
              </div>
              <div>
                <Button
                  onClick={() =>
                    removeSession(String(appointment.clientId), appointment.id)
                  }
                >
                  Remove
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default UpcomingSessions
