import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import tripStopApi from '../api/tripStopApi'
import activityApi from '../api/activityApi'
import { formatDate } from '../utils/formatDate'

const ItineraryViewPage = () => {
  const { tripId } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const stops = await tripStopApi.getByTrip(tripId)
      const enriched = await Promise.all(
        stops.map(async (s) => ({
          ...s,
          activities: await activityApi.getByStop(s.id),
        }))
      )
      setData(enriched)
      setLoading(false)
    }
    load()
  }, [tripId])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Itinerary</h1>
      {data.length === 0 ? (
        <p className="text-gray-500">No stops added yet.</p>
      ) : (
        <div className="space-y-6">
          {data.map((stop) => (
            <div key={stop.id} className="card border-l-4 border-primary">
              <h2 className="text-xl font-bold">
                {stop.cityName}, {stop.country}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                {formatDate(stop.arrivalDate)} - {formatDate(stop.departureDate)}
              </p>
              {stop.activities.length === 0 ? (
                <p className="text-gray-400 italic">No activities planned</p>
              ) : (
                <ul className="space-y-2">
                  {stop.activities.map((a) => (
                    <li key={a.id} className="flex justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <span className="font-medium">{a.name}</span>
                        {a.category && (
                          <span className="ml-2 text-xs bg-primary-light text-primary-dark px-2 py-0.5 rounded">
                            {a.category}
                          </span>
                        )}
                        <p className="text-xs text-gray-500">
                          {formatDate(a.activityDate)} {a.activityTime}
                        </p>
                      </div>
                      <span className="text-accent font-semibold">
                        ${a.estimatedCost || 0}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ItineraryViewPage