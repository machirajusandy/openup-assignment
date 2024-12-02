import React, { useEffect } from 'react'
import AddAvailability from './components/AddAvailability'
import EditAvailability from './components/EditAvailability'
import UpcomingSessions from './components/UpcomingSessions'
import { psychologistService } from './services/psychologist'
import { Psychologist, TimeSlot } from './types'

const psychologistId = '210'

function App() {
  const [psychologist, setPsychologist] = React.useState<Psychologist | null>(
    null
  )
  const isMounted = React.useRef(false)

  function getPsychologistById() {
    psychologistService
      .getPsychologistById(psychologistId)
      .then(setPsychologist)
      .catch(console.error)
  }

  function saveAvailability(availability: TimeSlot) {
    console.log('Saving availability:', availability)
    const updatedPsychologist = {
      ...psychologist,
      availableTimeSlots: psychologist?.availableTimeSlots?.map((slot) =>
        slot.id === availability.id ? availability : slot
      )
    }
    setPsychologist(updatedPsychologist)
  }

  function handleDeleteAppointment(clientId: string, appointmentId: string) {
    console.log('Deleting appointment:', clientId, appointmentId)
    const updatedPsychologist = {
      ...psychologist,
      bookedAppointments: psychologist?.bookedAppointments?.filter(
        (appointment) => appointment.id !== appointmentId
      )
    }
    setPsychologist(updatedPsychologist)
  }

  useEffect(() => {
    if (isMounted.current) {
      return
    }
    isMounted.current = true
    getPsychologistById()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Psychologist Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <UpcomingSessions
            appointments={psychologist?.bookedAppointments}
            onDeleteAppointment={handleDeleteAppointment}
          />
          <AddAvailability
            psychologistId={psychologistId}
            onAddAvailability={getPsychologistById}
          />
        </div>
        <div>
          <EditAvailability
            psychologistId={psychologistId}
            availabilities={psychologist?.availableTimeSlots}
            onSaveAvailability={saveAvailability}
          />
        </div>
      </div>
    </div>
  )
}

export default App
