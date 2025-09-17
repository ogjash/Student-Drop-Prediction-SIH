import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import DarkButton from '../../components/ui/DarkButton'
import { BackgroundRippleEffect } from '../../components/ui/BackgroundRippleEffect'
import { registerUniversity } from '../../api/auth'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    domain: '',
    university: '',
    password: '',
    confirmPassword: '',
    contactNumber: '' // add contactNumber
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      await registerUniversity({
        username: formData.username,
        domain: formData.domain,
        universityName: formData.university,
        password: formData.password,
        contactNumber: formData.contactNumber // add contactNumber
      })
      navigate('/dashboard')
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Signup failed. Please check your details.'
      )
    }
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
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Create Account</h2>
            {error && (
              <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
            )}
            <form className="space-y-6">
              <div className="space-y-2">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-600">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="ram"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 
                        focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-400"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-600">Domain</label>
                    <input
                      type="text"
                      name="domain"
                      placeholder="university.edu"
                      value={formData.domain}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 
                        focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-400"
                    />
                  </div>
                </div>
                {(formData.username || formData.domain) && (
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.username}@{formData.domain}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600">University Name</label>
                <input
                  type="text"
                  name="university"
                  placeholder="State University of Technology"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 
                    focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-400"
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

              <div className="relative">
                <label className="text-sm text-gray-600">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 
                      focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Enter contact number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 
                    focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-400"
                />
              </div>

              <DarkButton
                text="Sign Up"
                className="w-full justify-center"
                onClick={handleSignup}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Signup
