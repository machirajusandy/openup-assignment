import axios from 'axios'

export const deleteAppointment = async (
  clientId: string,
  appointmentId: string
) => {
  const response = await axios.delete(
    `https://localhost:44302/Client/${clientId}/bookings/${appointmentId}`
  )
  return response.data
}
