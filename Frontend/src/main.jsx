import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Signup from './pages/Auth/Signup.jsx'
import Login from './pages/Auth/Login.jsx'
import AuthLayout from './pages/Auth/AuthLayout'
import DashboardLayout from './pages/Dashboard/DashboardLayout'
import Overview from './pages/Dashboard/Overview'
import Students from './pages/Dashboard/Students'
import StudentDetail from './pages/Dashboard/StudentDetail'
import Settings from './pages/Dashboard/Settings'
import Reports from './pages/Dashboard/Reports'
import Alerts from './pages/Dashboard/Alerts'
import AddUser from './pages/Dashboard/AddUser'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home/>} />
      <Route path='auth' element={<AuthLayout />}>
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
      </Route>
      <Route path='dashboard' element={<DashboardLayout />}>
        <Route path='' element={<Overview />} />
        <Route path='students' element={<Students />} />
        <Route path='student/:id' element={<StudentDetail />} />
        <Route path='settings' element={<Settings />} />
        <Route path='reports' element={<Reports />} />
        <Route path='alerts' element={<Alerts />} />
        <Route path='add-user' element={<AddUser />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
