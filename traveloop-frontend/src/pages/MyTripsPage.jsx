import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import useFetch from '../hooks/useFetch'
import tripApi from '../api/tripApi'
import TripCard from '../components/trip/TripCard'

const MyTripsPage = () => {
  const { user } = useAuth()
  const { data: trips, loading, refetch } = useFetch(
    () => tripApi.getByUser(user.id), [user.id]
  )

  const handleDelete = async (id) => {
    if (!confirm('Delete this trip?')) return
    await tripApi.delete(id)
    refetch()
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Trips</h1>
        <Link to="/trips/create" className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Trip
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : trips?.length === 0 ? (
        <div className="card text-center text-gray-500">No trips yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onDelete={() => handleDelete(trip.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyTripsPage