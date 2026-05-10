import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import useFetch from '../hooks/useFetch'
import activityApi from '../api/activityApi'
import { ACTIVITY_CATEGORIES } from '../utils/constants'

const ActivitySearchPage = () => {
  const { tripId, stopId } = useParams()
  const navigate = useNavigate()
  const { data: activities, refetch } = useFetch(
    () => activityApi.getByStop(stopId), [stopId]
  )
  const [form, setForm] = useState({
    name: '', description: '', category: 'Sightseeing',
    activityDate: '', activityTime: '', estimatedCost: 0,
  })

  const submit = async (e) => {
    e.preventDefault()
    await activityApi.create({ ...form, tripStopId: Number(stopId) })
    setForm({ ...form, name: '', description: '', estimatedCost: 0 })
    refetch()
  }

  const remove = async (id) => {
    await activityApi.delete(id)
    refetch()
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Activities for this Stop</h1>

      <form onSubmit={submit} className="card mb-6">
        <h2 className="font-semibold mb-3">Add Activity</h2>
        <div className="grid grid-cols-2 gap-3">
          <input className="input-field" placeholder="Activity Name *" required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <select className="input-field" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {ACTIVITY_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input type="date" className="input-field"
            value={form.activityDate}
            onChange={(e) => setForm({ ...form, activityDate: e.target.value })} />
          <input type="time" className="input-field"
            value={form.activityTime}
            onChange={(e) => setForm({ ...form, activityTime: e.target.value })} />
          <input type="number" step="0.01" className="input-field" placeholder="Estimated Cost"
            value={form.estimatedCost}
            onChange={(e) => setForm({ ...form, estimatedCost: Number(e.target.value) })} />
          <input className="input-field" placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <button type="submit" className="btn-primary mt-4 flex items-center gap-2">
          <Plus size={18} /> Add
        </button>
      </form>

      <div className="space-y-3">
        {activities?.map((a) => (
          <div key={a.id} className="card flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{a.name}</h3>
              <p className="text-sm text-gray-500">{a.category} · ${a.estimatedCost}</p>
            </div>
            <button onClick={() => remove(a.id)} className="text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => navigate(`/trips/${tripId}/itinerary`)}
        className="btn-secondary mt-6">
        ← Back to Itinerary
      </button>
    </div>
  )
}

export default ActivitySearchPage