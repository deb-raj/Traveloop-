import axios from './axiosConfig'

const tripNoteApi = {
  // POST /api/trip-notes
  create: (data) => axios.post('/trip-notes', data).then((r) => r.data),

  // GET /api/trip-notes/trip/{tripId}
  getByTrip: (tripId) =>
    axios.get(`/trip-notes/trip/${tripId}`).then((r) => r.data),

  // GET /api/trip-notes/{id}
  getById: (id) => axios.get(`/trip-notes/${id}`).then((r) => r.data),

  // PUT /api/trip-notes/{id}
  update: (id, data) =>
    axios.put(`/trip-notes/${id}`, data).then((r) => r.data),

  // DELETE /api/trip-notes/{id}
  delete: (id) => axios.delete(`/trip-notes/${id}`).then((r) => r.data),
}

export default tripNoteApi