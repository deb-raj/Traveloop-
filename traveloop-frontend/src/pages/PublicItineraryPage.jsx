import useFetch from '../hooks/useFetch'
import tripApi from '../api/tripApi'
import TripCard from '../components/trip/TripCard'

const PublicItineraryPage = () => {
  const { data: trips, loading } = useFetch(() => tripApi.getPublic(), [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold">Public Itineraries</h1>
      <p className="text-gray-500 mb-6">Get inspired by other travelers</p>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips?.map((t) => <TripCard key={t.id} trip={t} />)}
        </div>
      )}
    </div>
  )
}

export default PublicItineraryPage