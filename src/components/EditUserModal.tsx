import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { User } from '../types/user'

interface EditUserModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
  onUpdateUser: (id: string, userData: Partial<User>) => void
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    password: user.password,
    profileImage: user.profileImage || "/assets/users/adewale.png"
  })

  const [showPassword, setShowPassword] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>(user.profileImage || "/assets/users/adewale.png")
  
  // Update form data when user prop changes
  useEffect(() => {
    console.log('EditUserModal: User data updated', user);
    setFormData({
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      profileImage: user.profileImage || "/assets/users/adewale.png"
    });
    setImagePreview(user.profileImage || "/assets/users/adewale.png");
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check if file is an image
      if (file.type.startsWith('image/')) {
        // Create a URL for the image preview
        const imageUrl = URL.createObjectURL(file)
        setImagePreview(imageUrl)
        setFormData(prev => ({
          ...prev,
          profileImage: imageUrl
        }))
      } else {
        alert('Please select an image file')
      }
    }
  }

  const handleImageReset = () => {
    const originalImage = user.profileImage || "/assets/users/adewale.png"
    setImagePreview(originalImage)
    setFormData(prev => ({
      ...prev,
      profileImage: originalImage
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate user ID before updating
    if (!user || !user.id) {
      console.error('Cannot update user: Invalid user ID');
      return;
    }
    
    // Update user with new data
    onUpdateUser(user.id, {
      username: formData.username,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      profileImage: formData.profileImage
    })
    
    onClose()
  }

  const handleClose = () => {
    // Reset form to original values
    setFormData({
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      profileImage: user.profileImage || "/assets/users/adewale.png"
    })
    setImagePreview(user.profileImage || "/assets/users/adewale.png")
    onClose()
  }

  if (!isOpen) return null

  return createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
      style={{ zIndex: 99999 }}
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl p-6 w-96 max-w-lg mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Edit User</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden relative group">
            <img 
              src={imagePreview} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <label htmlFor="profileImageInput" className="cursor-pointer">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
            </div>
          </div>
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="flex gap-2 mt-2">
            <p className="text-xs text-gray-500">Click to change profile picture</p>
            <button
              type="button"
              onClick={handleImageReset}
              className="text-xs text-[#992C55] hover:text-[#7d1f44] cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#992C55] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#7d1f44] transition-colors cursor-pointer"
          >
            Save Edit
          </button>
        </form>
      </div>
    </div>,
    document.body
  )
}

export default EditUserModal
