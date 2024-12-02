import axios from 'axios'

export const getPsychologistById = async (id: string | number) => {
  const response = await axios.get(`https://localhost:44302/psychologist/${id}`)
  return response.data
}
