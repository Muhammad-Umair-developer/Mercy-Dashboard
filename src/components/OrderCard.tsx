import React from 'react'

interface OrderCardProps {
  icon: string
  title: string
  value: string | number
  iconAlt?: string
}

const OrderCard: React.FC<OrderCardProps> = ({ 
  icon, 
  title, 
  value, 
  iconAlt = "Order icon"
}) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl w-[363px] h-[139px] p-5 gap-1 shadow-sm border border-gray-200">
      <div>
        <img src={icon} alt={iconAlt} className="w-12 h-12" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
      </div>
      <div>
        <p className="font-bold text-2xl text-gray-900">{value}</p>
      </div>
    </div>
  )
}

export default OrderCard
