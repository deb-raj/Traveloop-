import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Plane, LogOut } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 text-primary">
          <Plane size={24} />
          <span className="text-xl font-bold">Traveloop</span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-primary">
                Dashboard
              </Link>
              <Link to="/trips" className="text-gray-700 hover:text-primary">
                My Trips
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-primary">
                Profile
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-gray-600 hover:text-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">Login</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar