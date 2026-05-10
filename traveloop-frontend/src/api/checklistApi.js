import axios from './axiosConfig'

const checklistApi = {
  // POST /api/checklist-items
  create: (data) => axios.post('/checklist-items', data).then((r) => r.data),

  // GET /api/checklist-items/trip/{tripId}
  getByTrip: (tripId) =>
    axios.get(`/checklist-items/trip/${tripId}`).then((r) => r.data),

  // GET /api/checklist-items/{id}
  getById: (id) => axios.get(`/checklist-items/${id}`).then((r) => r.data),

  // PUT /api/checklist-items/{id}
  update: (id, data) =>
    axios.put(`/checklist-items/${id}`, data).then((r) => r.data),

  // PATCH /api/checklist-items/{id}/toggle
  togglePacked: (id) =>
    axios.patch(`/checklist-items/${id}/toggle`).then((r) => r.data),

  // DELETE /api/checklist-items/{id}
  delete: (id) => axios.delete(`/checklist-items/${id}`).then((r) => r.data),
}

export default checklistApi