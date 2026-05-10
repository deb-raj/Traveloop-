import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/common/ProtectedRoute'

// Public pages
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import PublicItineraryPage from '../pages/PublicItineraryPage'

// Protected pages
import DashboardPage from '../pages/DashboardPage'
import CreateTripPage from '../pages/CreateTripPage'
import MyTripsPage from '../pages/MyTripsPage'
import TripDetailPage from '../pages/TripDetailPage'
import ItineraryBuilderPage from '../pages/ItineraryBuilderPage'
import ItineraryViewPage from '../pages/ItineraryViewPage'
import CitySearchPage from '../pages/CitySearchPage'
import ActivitySearchPage from '../pages/ActivitySearchPage'
import BudgetPage from '../pages/BudgetPage'
import ChecklistPage from '../pages/ChecklistPage'
import NotesPage from '../pages/NotesPage'
import ProfilePage from '../pages/ProfilePage'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/public-trips" element={<PublicItineraryPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips/create"
        element={
          <ProtectedRoute>
            <CreateTripPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips"
        element={
          <ProtectedRoute>
            <MyTripsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips/:tripId"
        element={
          <ProtectedRoute>
            <TripDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips/:tripId/itinerary/build"
        element={
          <ProtectedRoute>
            <ItineraryBuilderPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips/:tripId/itinerary"
        element={
          <ProtectedRoute>
            <ItineraryViewPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips/:tripId/cities"
        element={
          <ProtectedRoute>
            <CitySearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips/:tripId/stops/:stopId/activities"
        element={
          <ProtectedRoute>
            <ActivitySearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips/:tripId/budget"
        element={
          <ProtectedRoute>
            <BudgetPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips/:tripId/checklist"
        element={
          <ProtectedRoute>
            <ChecklistPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips/:tripId/notes"
        element={
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default AppRoutes