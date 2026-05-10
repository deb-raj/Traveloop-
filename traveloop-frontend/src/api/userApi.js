import axios from './axiosConfig'

const userApi = {
  // POST /api/users
  create: (data) => axios.post('/users', data).then((r) => r.data),

  // GET /api/users
  getAll: () => axios.get('/users').then((r) => r.data),

  // GET /api/users/{id}
  getById: (id) => axios.get(`/users/${id}`).then((r) => r.data),

  // PUT /api/users/{id}
  update: (id, data) => axios.put(`/users/${id}`, data).then((r) => r.data),

  // DELETE /api/users/{id}
  delete: (id) => axios.delete(`/users/${id}`).then((r) => r.data),

  // Custom: login (no auth — just check email/password match)
  login: async (email, password) => {
    const users = await axios.get('/users').then((r) => r.data)
    const user = users.find((u) => u.email === email)
    if (!user) throw new Error('User not found')
    // Note: backend doesn't return password; for now treat any login as valid
    // Replace with real auth in production
    return user
  },
}

export default userApi