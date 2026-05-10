import axios from './axiosConfig'

const tripStopApi = {
  // POST /api/trip-stops
  create: (data) => axios.post('/trip-stops', data).then((r) => r.data),

  // GET /api/trip-stops/trip/{tripId}
  getByTrip: (tripId) =>
    axios.get(`/trip-stops/trip/${tripId}`).then((r) => r.data),

  // GET /api/trip-stops/{id}
  getById: (id) => axios.get(`/trip-stops/${id}`).then((r) => r.data),

  // PUT /api/trip-stops/{id}
  update: (id, data) =>
    axios.put(`/trip-stops/${id}`, data).then((r) => r.data),

  // DELETE /api/trip-stops/{id}
  delete: (id) => axios.delete(`/trip-stops/${id}`).then((r) => r.data),
}

export default tripStopApi