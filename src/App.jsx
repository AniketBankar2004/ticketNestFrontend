import LandingPage from './pages/LandingPage'
import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/home' element={<HomePage/>}></Route>
    </Routes>
    </>
  )
}

export default App