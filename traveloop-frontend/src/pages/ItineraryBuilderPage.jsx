import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import useFetch from '../hooks/useFetch'
import tripStopApi from '../api/tripStopApi'
import { formatDate } from '../utils/formatDate'

const ItineraryBuilderPage = () => {
  const { tripId } = useParams()
  const { data: stops, refetch } = useFetch(
    () => tripStopApi.getByTrip(tripId), [tripId]
  )
  const [form, setForm] = useState({
    cityName: '', country: '', arrivalDate: '', departureDate: '', stopOrder: 1,
  })

  const addStop = async (e) => {
    e.preventDefault()
    await tripStopApi.create({ ...form, tripId: Number(tripId) })
    setForm({ cityName: '', country: '', arrivalDate: '', departureDate: '', stopOrder: (stops?.length || 0) + 2 })
    refetch()
  }

  const removeStop = async (id) => {
    await tripStopApi.delete(id)
    refetch()
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Build Your Itinerary</h1>

      <form onSubmit={addStop} className="card mb-6">
        <h2 className="font-semibold mb-3">Add a City Stop</h2>
        <div className="grid grid-cols-2 gap-3">
          <input className="input-field" placeholder="City *" required
            value={form.cityName}
            onChange={(e) => setForm({ ...form, cityName: e.target.value })} />
          <input className="input-field" placeholder="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })} />
          <input type="date" className="input-field"
            value={form.arrivalDate}
            onChange={(e) => setForm({ ...form, arrivalDate: e.target.value })} />
          <input type="date" className="input-field"
            value={form.departureDate}
            onChange={(e) => setForm({ ...form, departureDate: e.target.value })} />
          <input type="number" className="input-field" placeholder="Stop order"
            value={form.stopOrder}
            onChange={(e) => setForm({ ...form, stopOrder: Number(e.target.value) })} />
        </div>
        <button type="submit" className="btn-primary mt-4 flex items-center gap-2">
          <Plus size={18} /> Add Stop
        </button>
      </form>

      <div className="space-y-3">
        {stops?.map((s) => (
          <div key={s.id} className="card flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">
                #{s.stopOrder} {s.cityName}, {s.country}
              </h3>
              <p className="text-sm text-gray-500">
                {formatDate(s.arrivalDate)} → {formatDate(s.departureDate)}
              </p>
            </div>
            <div className="flex gap-2">
              <Link to={`/trips/${tripId}/stops/${s.id}/activities`}
                className="btn-secondary text-sm">+ Activities</Link>
              <button onClick={() => removeStop(s.id)}
                className="text-red-500 hover:text-red-700">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItineraryBuilderPage