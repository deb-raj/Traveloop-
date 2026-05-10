import { Link, useParams } from 'react-router-dom'
import { Calendar, MapPin, DollarSign, ListChecks, FileText, Map } from 'lucide-react'
import useFetch from '../hooks/useFetch'
import tripApi from '../api/tripApi'
import { formatDateRange, getTripDuration } from '../utils/formatDate'

const TripDetailPage = () => {
  const { tripId } = useParams()
  const { data: trip, loading } = useFetch(() => tripApi.getById(tripId), [tripId])

  if (loading) return <div className="p-8">Loading...</div>
  if (!trip) return <div className="p-8">Trip not found</div>

  const tabs = [
    { to: `/trips/${tripId}/itinerary`, icon: Map, label: 'Itinerary' },
    { to: `/trips/${tripId}/itinerary/build`, icon: MapPin, label: 'Build Itinerary' },
    { to: `/trips/${tripId}/cities`, icon: MapPin, label: 'Cities' },
    { to: `/trips/${tripId}/budget`, icon: DollarSign, label: 'Budget' },
    { to: `/trips/${tripId}/checklist`, icon: ListChecks, label: 'Checklist' },
    { to: `/trips/${tripId}/notes`, icon: FileText, label: 'Notes' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {trip.coverPhotoUrl && (
        <img src={trip.coverPhotoUrl} alt={trip.name}
          className="w-full h-64 object-cover rounded-xl mb-6" />
      )}
      <h1 className="text-4xl font-bold">{trip.name}</h1>
      <p className="text-gray-600 mt-2">{trip.description}</p>
      <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
        <span className="flex items-center gap-1"><Calendar size={16} />
          {formatDateRange(trip.startDate, trip.endDate)}</span>
        <span>{getTripDuration(trip.startDate, trip.endDate)} days</span>
        {trip.isPublic && <span className="text-accent">🌍 Public</span>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {tabs.map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to}
            className="card flex items-center gap-3 hover:border-primary border-2 border-transparent">
            <Icon className="text-primary" size={24} />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TripDetailPage