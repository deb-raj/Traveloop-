import { Link } from 'react-router-dom'
import { Calendar, Trash2 } from 'lucide-react'
import { formatDateRange } from '../../utils/formatDate'

const TripCard = ({ trip, onDelete }) => {
  return (
    <div className="card hover:scale-[1.02] transition-transform">
      {trip.coverPhotoUrl ? (
        <img src={trip.coverPhotoUrl} alt={trip.name}
          className="w-full h-40 object-cover rounded-lg mb-3" />
      ) : (
        <div className="w-full h-40 bg-gradient-to-br from-primary to-accent rounded-lg mb-3" />
      )}
      <h3 className="text-xl font-bold">{trip.name}</h3>
      <p className="text-sm text-gray-500 line-clamp-2">{trip.description}</p>
      <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
        <Calendar size={14} /> {formatDateRange(trip.startDate, trip.endDate)}
      </div>
      <div className="flex gap-2 mt-4">
        <Link to={`/trips/${trip.id}`} className="btn-primary flex-1 text-center text-sm">
          View
        </Link>
        {onDelete && (
          <button onClick={onDelete} className="btn-secondary text-red-500 border-red-300">
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default TripCard