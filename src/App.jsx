import LandingPage from './pages/LandingPage'
import toast, { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <>
    <Toaster />
    <Routes>
      <Route path='/' element={<LandingPage/>} ></Route>
      <Route path="/movies/:id" element={<MovieDetails />}/>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/home' element={<HomePage/>}></Route>
      <Route path='/register' element={<RegisterPage/>}></Route>
    </Routes>
    </>
  )
}

export default App