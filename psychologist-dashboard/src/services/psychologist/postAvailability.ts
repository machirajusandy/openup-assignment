import axios from 'axios'

export const postAvailability = async (
  id: string | number,
  availability: { from: string; to: string }
) => {
  const response = await axios.post(
    `https://localhost:44302/psychologist/${id}/available-timeslots`,
    availability
  )
  return response.data
}
