import axios from './axiosConfig'

const budgetApi = {
  // POST /api/budgets
  create: (data) => axios.post('/budgets', data).then((r) => r.data),

  // GET /api/budgets/trip/{tripId}
  getByTrip: (tripId) =>
    axios.get(`/budgets/trip/${tripId}`).then((r) => r.data),

  // GET /api/budgets/{id}
  getById: (id) => axios.get(`/budgets/${id}`).then((r) => r.data),

  // PUT /api/budgets/{id}
  update: (id, data) => axios.put(`/budgets/${id}`, data).then((r) => r.data),

  // DELETE /api/budgets/{id}
  delete: (id) => axios.delete(`/budgets/${id}`).then((r) => r.data),

  // Helper: compute total estimated/actual for a trip
  getSummary: async (tripId) => {
    const items = await axios
      .get(`/budgets/trip/${tripId}`)
      .then((r) => r.data)
    const totalEstimated = items.reduce(
      (sum, b) => sum + (b.estimatedAmount || 0),
      0
    )
    const totalActual = items.reduce(
      (sum, b) => sum + (b.actualAmount || 0),
      0
    )
    return { items, totalEstimated, totalActual }
  },
}

export default budgetApi