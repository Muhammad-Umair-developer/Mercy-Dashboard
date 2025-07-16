import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types/user'
import { sampleUsers, createNewUser } from '../types/user'

interface UserContextType {
  users: User[]
  currentUserId: string
  setCurrentUserId: (id: string) => void
  addUser: (userData: Omit<User, 'id' | 'dateRegistered'>) => User
  updateUser: (id: string, userData: Partial<User>) => void
  deleteUser: (id: string) => void
  getUserById: (id: string) => User | undefined
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUsers = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider')
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([])
  const [currentUserId, setCurrentUserId] = useState<string>('')

  // Initialize users from localStorage or use sample data
  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers)
      setUsers(parsedUsers)
      setCurrentUserId(parsedUsers[0]?.id || '')
    } else {
      setUsers(sampleUsers)
      setCurrentUserId(sampleUsers[0]?.id || '')
    }
  }, [])

  // Save users to localStorage whenever users array changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users))
    }
  }, [users])

  const addUser = (userData: Omit<User, 'id' | 'dateRegistered'>) => {
    const newUser = createNewUser(userData)
    setUsers(prev => [...prev, newUser])
    return newUser
  }

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...user, ...userData } : user
      )
    )
  }

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id))
    if (currentUserId === id) {
      setCurrentUserId(users[0]?.id || '')
    }
  }

  const getUserById = (id: string) => {
    return users.find(user => user.id === id)
  }

  const value: UserContextType = {
    users,
    currentUserId,
    setCurrentUserId,
    addUser,
    updateUser,
    deleteUser,
    getUserById
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
