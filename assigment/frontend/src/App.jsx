import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import StudioList from './pages/studio/StudioList'
import CreateStudio from './pages/studio/CreateStudio'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route  element={<Layout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/studios'element={<StudioList/>}/>
          <Route path='/creteStudio'element={<CreateStudio/>}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}