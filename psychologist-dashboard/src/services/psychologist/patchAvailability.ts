import axios from 'axios'

export const patchAvailability = async (
  id: string,
  timeSlotId: string,
  data: {
    from: string
    to: string
  }
) => {
  const response = await axios.patch(
    `https://localhost:44302/psychologist/${id}/available-timeslots/${timeSlotId}`,
    data
  )
  return response.data
}
