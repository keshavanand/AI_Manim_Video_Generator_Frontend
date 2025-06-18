import { Routes, Route } from 'react-router-dom'
import LoginForm from './pages/Login'
import RegisterForm from './pages/Register'
import Dasboard from './pages/Dasboard'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Home from './pages/Home'
import Project from './pages/Project'

function App() {
  return (
    <div className="h-screen w-screen bg-black text-white">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/" element={<Project />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dasboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
