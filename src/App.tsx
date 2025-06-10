import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginForm from './pages/Login'
import RegisterForm from './pages/Register'
import Dasboard from './pages/Dasboard'
import ProtectedRoute from './components/layout/ProtectedRoute'

function App() {

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Routes>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/dashboard' element={
            <ProtectedRoute>
                <Dasboard/>
            </ProtectedRoute>
          }/>
      </Routes>
    </div>
  )
}

export default App
