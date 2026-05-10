import { Link } from 'react-router-dom'
import { Plus, MapPin, Globe } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import useFetch from '../hooks/useFetch'
import tripApi from '../api/tripApi'
import TripCard from '../components/trip/TripCard'

const DashboardPage = () => {
  const { user } = useAuth()
  const { data: trips, loading } = useFetch(
    () => tripApi.getByUser(user.id),
    [user.id]
  )
  const { data: publicTrips } = useFetch(() => tripApi.getPublic(), [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}! ✈️</h1>
          <p className="text-gray-500 mt-1">Plan your next adventure</p>
        </div>
        <Link to="/trips/create" className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Trip
        </Link>
      </div>

      {/* My Trips */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-primary" /> Your Trips
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : trips?.length === 0 ? (
          <div className="card text-center text-gray-500">
            No trips yet. <Link to="/trips/create" className="text-primary">Create one</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips?.map((trip) => <TripCard key={trip.id} trip={trip} />)}
          </div>
        )}
      </section>

      {/* Public Trips */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe size={20} className="text-accent" /> Inspiration: Public Trips
        </h2>
        {publicTrips?.length === 0 ? (
          <p className="text-gray-500">No public trips yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publicTrips?.slice(0, 6).map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default DashboardPage