import { createContext, useState, useEffect } from 'react'
import userApi from '../api/userApi'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore user from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  // LOGIN
  const login = async (email, password) => {
    const loggedInUser = await userApi.login(email, password)
    setUser(loggedInUser)
    localStorage.setItem('user', JSON.stringify(loggedInUser))
    localStorage.setItem('userId', loggedInUser.id)
    return loggedInUser
  }

  // SIGNUP
  const signup = async (data) => {
    const newUser = await userApi.create(data)
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    localStorage.setItem('userId', newUser.id)
    return newUser
  }

  // LOGOUT
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
  }

  // UPDATE current user
  const updateUser = (updated) => {
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}