import React from 'react'
import {Navbar, Footer} from './components/index.js'
import { Outlet, useLocation } from 'react-router-dom'
import {ReactLenis} from './lib/lenis.js'

const App = () => {
  const { pathname } = useLocation()
  const isAuthPage = pathname.includes('/auth/')
  const isDashboard = pathname.includes('/dashboard')

  if (isDashboard || isAuthPage) {
    // For dashboard and auth pages, render without ReactLenis to avoid scroll conflicts
    return (
      <>
        {!isAuthPage && !isDashboard && <Navbar />}
        <Outlet />
        {!isAuthPage && !isDashboard && <Footer />}
      </>
    )
  }

  return (
    <ReactLenis root>
      {!isAuthPage && !isDashboard && <Navbar />}
      <Outlet />
      {!isAuthPage && !isDashboard && <Footer />}
    </ReactLenis>
  )
}

export default App