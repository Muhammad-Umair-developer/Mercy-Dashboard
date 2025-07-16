import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { agentsData, type ChatAgent } from '../constants/agentsData'

interface AgentChatModalProps {
  isOpen: boolean
  onClose: () => void
  agentName?: string
}

const AgentChatModal = ({ isOpen, onClose, agentName }: AgentChatModalProps) => {
  // Get data from centralized source
  const [agents] = useState<ChatAgent[]>(agentsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // If agentName is provided, find that specific agent and show individual chat
  const specificAgent = agentName ? agents.find(agent => agent.name === agentName) : null
  const isIndividualChat = !!specificAgent

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Photo Editing':
        return 'bg-red-100 text-red-700'
      case 'Photo Manipulation':
        return 'bg-purple-100 text-purple-700'
      case 'Design':
        return 'bg-blue-100 text-blue-700'
      case 'Video Editing':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  // Filter agents based on search term and filters
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || agent.type === filterType
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'online' && agent.isOnline) ||
                         (filterStatus === 'offline' && !agent.isOnline)
    
    return matchesSearch && matchesType && matchesStatus
  })

  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    // Add body class to prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    
    // Handle escape key to close modal
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    window.addEventListener('keydown', handleEscape)
    
    return () => {
      setMounted(false)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])
  
  if (!isOpen || !mounted) return null
  
  const modalContent = (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]" 
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-900">
              {isIndividualChat ? `Chat with ${specificAgent?.name}` : 'All Active Agents'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filters - Only show for all agents view */}
        {!isIndividualChat && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="Photo Editing">Photo Editing</option>
              <option value="Photo Manipulation">Photo Manipulation</option>
              <option value="Design">Design</option>
              <option value="Video Editing">Video Editing</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>
        )}

        {/* Agents List */}
        <div className="overflow-y-auto max-h-[60vh]">
          <div className="divide-y divide-gray-100">
            {(isIndividualChat ? [specificAgent].filter(Boolean) : filteredAgents).map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                {/* Avatar and Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-medium text-sm">${agent.name.charAt(0)}</span>
                          </div>`;
                        }
                      }}
                    />
                    {/* Online Status Indicator */}
                    {agent.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Chat Info */}
                  <div>
                    <p className="font-medium text-sm">{agent.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{agent.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{agent.timestamp}</p>
                  </div>
                </div>

                {/* Type Badge and Actions */}
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full ${getTypeColor(agent.type)}`}>
                    {agent.type}
                  </span>
                  
                  <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                    {agent.isOnline ? 'Online' : 'Offline'}
                  </span>

                  <button className="bg-[#992C55] hover:bg-[#7a1e42] text-white px-3 py-1 rounded-md text-xs font-medium">
                    View Chat
                  </button>
                  
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
                    Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {filteredAgents.length} of {agents.length} agents
            </span>
            <button
              onClick={onClose}
              className="bg-gray-600 cursor-pointer hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
          <div className="mt-4"></div> {/* Extra space at the bottom */}
        </div>
      </div>
    </div>
  )
  
  // Use portal to render modal outside of the layout hierarchy
  return createPortal(modalContent, document.body)
}

export default AgentChatModal
