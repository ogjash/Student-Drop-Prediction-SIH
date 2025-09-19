import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import DarkButton from '../../components/ui/DarkButton'
import { BackgroundRippleEffect } from '../../components/ui/BackgroundRippleEffect'
import { login as loginApi } from '../../api/auth'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await loginApi(formData)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Login failed. Please check your credentials.'
      )
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-4 relative flex items-center justify-center overflow-hidden">
      <BackgroundRippleEffect />
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 p-2 text-zinc-500 hover:text-zinc-800 transition-colors z-10"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <div className="w-full max-w-md relative z-10">
        <Card className="border border-zinc-300 bg-zinc-50 shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Login</h2>
            {error && (
              <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
            )}
            <form className="space-y-6">
              <div>
                <label className="text-sm text-zinc-500">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="ram@unviersity.edu"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-800 
                    focus:outline-none focus:ring-2 focus:ring-zinc-400 placeholder-zinc-400"
                />
              </div>

              <div className="relative">
                <label className="text-sm text-zinc-500">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-zinc-100 border border-zinc-300 rounded-md text-zinc-800 
                      focus:outline-none focus:ring-2 focus:ring-zinc-500 placeholder-zinc-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <DarkButton
                text="Login"
                className="w-full justify-center"
                onClick={handleLogin}
              />
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-500">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/auth/signup')}
                  className="text-zinc-700 hover:text-zinc-900 font-medium underline transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
