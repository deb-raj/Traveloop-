import AppRoutes from './routes/AppRoutes'
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
    </div>
  )
}

export default App