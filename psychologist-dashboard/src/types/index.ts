export type Appointment = {
  id: string
  from: string
  to: string
  clientId: number
}

export type TimeSlot = {
  id: string
  from: string
  to: string
}

export type Psychologist = {
  id: number
  name: string
  assignedClients: number[]
  availableTimeSlots: TimeSlot[]

  bookedAppointments: Appointment[]
}
