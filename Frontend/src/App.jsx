import React from 'react'
import Footer from './components/Footer.jsx'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import {ReactLenis} from './lib/lenis.js'

const App = () => {
  const { pathname } = useLocation()
  const isAuthPage = pathname.includes('/auth/')

  return (
    <ReactLenis root>
      {!isAuthPage && <Navbar />}
      <Outlet />
      {!isAuthPage && <Footer />}
    </ReactLenis>
  )
}

export default App