import { Navigate, useLocation, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const location = useLocation()
  const isAuthenticated = false // Replace with your auth check logic

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  )
}

export default AuthLayout
