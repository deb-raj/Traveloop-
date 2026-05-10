import axios from './axiosConfig'

const tripApi = {
  // POST /api/trips
  create: (data) => axios.post('/trips', data).then((r) => r.data),

  // GET /api/trips
  getAll: () => axios.get('/trips').then((r) => r.data),

  // GET /api/trips/{id}
  getById: (id) => axios.get(`/trips/${id}`).then((r) => r.data),

  // GET /api/trips/user/{userId}
  getByUser: (userId) => axios.get(`/trips/user/${userId}`).then((r) => r.data),

  // GET /api/trips/public
  getPublic: () => axios.get('/trips/public').then((r) => r.data),

  // PUT /api/trips/{id}
  update: (id, data) => axios.put(`/trips/${id}`, data).then((r) => r.data),

  // DELETE /api/trips/{id}
  delete: (id) => axios.delete(`/trips/${id}`).then((r) => r.data),
}

export default tripApi