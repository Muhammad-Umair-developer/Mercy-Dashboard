import React from 'react'
import { createPortal } from 'react-dom'
import images from '../constants/images'
import type { TableData } from '../constants/tableData'

interface OrderDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  orderData: TableData | null
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  orderData
}) => {
  if (!isOpen || !orderData) return null

  // Get status-specific styling and icon
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Completed':
        return {
          icon: images.orderCompleted,
          title: 'Order Completed',
          titleColor: 'text-green-600',
          iconBg: 'bg-green-100'
        }
      case 'Pending':
        return {
          icon: images.orderPending,
          title: 'Order Pending',
          titleColor: 'text-orange-600',
          iconBg: 'bg-orange-100'
        }
      case 'Failed':
        return {
          icon: images.orderFailed,
          title: 'Order Failed',
          titleColor: 'text-red-600',
          iconBg: 'bg-red-100'
        }
      default:
        return {
          icon: images.orderPending,
          title: 'Order Status',
          titleColor: 'text-gray-600',
          iconBg: 'bg-gray-100'
        }
    }
  }

  const statusConfig = getStatusConfig(orderData.status)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return createPortal(
    <React.Fragment>
      {/* Dimmed overlay for background */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" onClick={onClose}></div>
      
      {/* Modal centered on page */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
        <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl"
             onClick={(e) => e.stopPropagation()}>
          <div className="relative p-6">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
              >
                <img src={images.close} alt="Close" className="w-6 h-6" />
              </button>
            </div>

            {/* Status Icon and Title */}
            <div className="flex flex-col items-center mb-6">
              <div className={`w-16 h-16 rounded-full ${statusConfig.iconBg} flex items-center justify-center mb-3`}>
                <img src={statusConfig.icon} alt={statusConfig.title} className="w-8 h-8" />
              </div>
              <h3 className={`text-lg font-medium ${statusConfig.titleColor}`}>
                {statusConfig.title}
              </h3>
            </div>

            {/* Order Details Cards */}
            <div className="space-y-4">
              {/* First Card - Basic Details */}
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Agent Name</span>
                    <span className="text-sm font-medium text-gray-900">{orderData.customerName}</span>
                  </div>
                  <hr className="border-pink-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Category</span>
                    <span className="text-sm font-medium text-gray-900">{orderData.serviceName}</span>
                  </div>
                  <hr className="border-pink-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">No of photos</span>
                    <span className="text-sm font-medium text-gray-900">10</span>
                  </div>
                </div>
              </div>

              {/* Second Card - Payment & Transaction */}
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Amount paid</span>
                    <span className="text-sm font-medium text-gray-900">{orderData.amount}</span>
                  </div>
                  <hr className="border-pink-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Txn ID</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">sdkffnsk234jnflkweInivdIn</span>
                      <button
                        onClick={() => copyToClipboard('sdkffnsk234jnflkweInivdIn')}
                        className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>,
    document.body
  )
}

export default OrderDetailsModal
