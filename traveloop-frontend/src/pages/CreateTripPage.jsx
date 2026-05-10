import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import tripApi from '../api/tripApi'

const CreateTripPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', description: '', startDate: '', endDate: '',
    coverPhotoUrl: '', isPublic: false,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const trip = await tripApi.create({ ...form, userId: user.id })
      navigate(`/trips/${trip.id}`)
    } catch (err) {
      alert('Failed to create trip')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Trip</h1>
      <form onSubmit={handleSubmit} className="card space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Trip Name *</label>
          <input
            type="text" className="input-field" required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g., Europe Adventure 2026"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="input-field" rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date *</label>
            <input
              type="date" className="input-field" required
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date *</label>
            <input
              type="date" className="input-field" required
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cover Photo URL</label>
          <input
            type="url" className="input-field"
            value={form.coverPhotoUrl}
            onChange={(e) => setForm({ ...form, coverPhotoUrl: e.target.value })}
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isPublic}
            onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
          />
          <span className="text-sm">Make this trip public (shareable)</span>
        </label>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Create Trip'}
        </button>
      </form>
    </div>
  )
}

export default CreateTripPage