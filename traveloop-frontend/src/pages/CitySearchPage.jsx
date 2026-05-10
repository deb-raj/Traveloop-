import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import tripStopApi from '../api/tripStopApi'

const POPULAR_CITIES = [
  { city: 'Paris', country: 'France' },
  { city: 'Tokyo', country: 'Japan' },
  { city: 'New York', country: 'USA' },
  { city: 'Rome', country: 'Italy' },
  { city: 'Bali', country: 'Indonesia' },
  { city: 'Barcelona', country: 'Spain' },
  { city: 'London', country: 'UK' },
  { city: 'Dubai', country: 'UAE' },
]

const CitySearchPage = () => {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = POPULAR_CITIES.filter(
    (c) => c.city.toLowerCase().includes(search.toLowerCase())
      || c.country.toLowerCase().includes(search.toLowerCase())
  )

  const addCity = async (city) => {
    await tripStopApi.create({
      cityName: city.city, country: city.country,
      stopOrder: 1, tripId: Number(tripId),
    })
    navigate(`/trips/${tripId}/itinerary/build`)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Discover Cities</h1>
      <input
        type="text" className="input-field mb-6"
        placeholder="Search cities or countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div key={c.city} className="card">
            <h3 className="text-lg font-semibold">{c.city}</h3>
            <p className="text-gray-500">{c.country}</p>
            <button onClick={() => addCity(c)} className="btn-primary mt-3 w-full">
              + Add to Trip
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CitySearchPage