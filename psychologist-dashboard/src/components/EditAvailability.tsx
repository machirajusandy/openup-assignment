import React, { useState } from 'react'
import Card from './Card'
import Button from './Button'
import dayjs from 'dayjs'
import { TimeSlot } from '../types'
import { psychologistService } from '../services/psychologist'

const EditAvailability = ({
  psychologistId,
  availabilities,
  onSaveAvailability
}: {
  psychologistId: string
  availabilities: TimeSlot[] | null
  onSaveAvailability: (availability: TimeSlot) => void
}) => {
  const [editRow, setEditRow] = useState({
    date: '',
    startTime: '',
    endTime: '',
    id: ''
  })

  const handleSave = async () => {
    try {
      await psychologistService.patchAvailability(psychologistId, editRow.id, {
        from: dayjs(`${editRow.date}T${editRow.startTime}`).toISOString(),
        to: dayjs(`${editRow.date}T${editRow.endTime}`).toISOString()
      })
      onSaveAvailability({
        id: editRow.id,
        from: dayjs(`${editRow.date}T${editRow.startTime}`).toISOString(),
        to: dayjs(`${editRow.date}T${editRow.endTime}`).toISOString()
      })
    } catch (error) {
      console.error(error)
    }

    setEditRow({ date: '', startTime: '', endTime: '', id: '' })
  }

  return (
    <Card title="Edit Availability">
      <div className="overflow-x-auto">
        {availabilities?.length ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {availabilities?.map((availability, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                    {editRow.id === availability.id ? (
                      <input
                        aria-label="date"
                        type="date"
                        value={editRow.date}
                        onChange={(e) =>
                          setEditRow({ ...editRow, date: e.target.value })
                        }
                      />
                    ) : (
                      dayjs(new Date(availability.from)).format('YYYY-MM-DD')
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editRow.id === availability.id ? (
                      <input
                        aria-label="start time"
                        type="time"
                        value={editRow.startTime}
                        onChange={(e) =>
                          setEditRow({ ...editRow, startTime: e.target.value })
                        }
                      />
                    ) : (
                      dayjs(new Date(availability.from)).format('HH:mm')
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editRow.id === availability.id ? (
                      <input
                        aria-label="end time"
                        type="time"
                        value={editRow.endTime}
                        onChange={(e) =>
                          setEditRow({ ...editRow, endTime: e.target.value })
                        }
                      />
                    ) : (
                      dayjs(availability.to).format('HH:mm')
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editRow.id === availability.id ? (
                      <Button className="mr-2" onClick={handleSave}>
                        Save
                      </Button>
                    ) : (
                      <Button
                        className="mr-2"
                        onClick={() =>
                          setEditRow({
                            date: dayjs(availability.from).format('YYYY-MM-DD'),
                            startTime: dayjs(availability.from).format('HH:mm'),
                            endTime: dayjs(availability.to).format('HH:mm'),
                            id: availability.id
                          })
                        }
                      >
                        Edit
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-center">No available slots</p>
        )}
      </div>
    </Card>
  )
}

export default EditAvailability
