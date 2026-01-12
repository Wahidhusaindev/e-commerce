import React from 'react'
import Navbar from './Components/Navbar.jsx'
import { Route,  Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
   
      <Navbar />
      <Routes>
        <Route path='/' element={<div>Home Page</div>} />
      </Routes>
    </div>
  )
}

export default App