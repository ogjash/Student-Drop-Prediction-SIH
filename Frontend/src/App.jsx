import React from 'react'
import Footer from './components/Footer.jsx'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

const App = () => {
  return (
    <>
      <Navbar />
       <Outlet />
      <Footer />
    </>
  )
}

export default App