import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import DarkButton from '../../components/ui/DarkButton'
import { BackgroundRippleEffect } from '../../components/ui/BackgroundRippleEffect'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-white p-4 relative flex items-center justify-center overflow-hidden">
      <BackgroundRippleEffect className="!opacity-[0.1]" />
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 p-2 text-gray-600 hover:text-gray-900 transition-colors z-10"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <div className="w-full max-w-md relative z-10">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Login</h2>
            
            <form className="space-y-6">
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="ram@unviersity.edu"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 
                    focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400"
                />
              </div>

              <div className="relative">
                <label className="text-sm text-gray-600">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 
                      focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <DarkButton
                text="Login"
                className="w-full justify-center"
                onClick={(e) => {
                  e.preventDefault()
                  // Add your login logic here
                }}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
