import axios from './axiosConfig'

const activityApi = {
  // POST /api/activities
  create: (data) => axios.post('/activities', data).then((r) => r.data),

  // GET /api/activities/stop/{stopId}
  getByStop: (stopId) =>
    axios.get(`/activities/stop/${stopId}`).then((r) => r.data),

  // GET /api/activities/{id}
  getById: (id) => axios.get(`/activities/${id}`).then((r) => r.data),

  // PUT /api/activities/{id}
  update: (id, data) =>
    axios.put(`/activities/${id}`, data).then((r) => r.data),

  // DELETE /api/activities/{id}
  delete: (id) => axios.delete(`/activities/${id}`).then((r) => r.data),
}

export default activityApi