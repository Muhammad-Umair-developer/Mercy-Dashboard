import React from 'react'

interface TransactionCardProps {
  icon: string
  title: string
  value: string | number
  iconAlt?: string
}

const TransactionCard: React.FC<TransactionCardProps> = ({ 
  icon, 
  title, 
  value, 
  iconAlt = "" 
}) => {
  return (
    <div className='flex flex-col bg-white rounded-2xl w-[363px] h-[139px] p-5 gap-1'>
      <div>
        <img src={icon} alt={iconAlt} />
      </div>
      <div>
        <p>{title}</p>
      </div>
      <div>
        <p className='font-bold text-2xl'>{value}</p>
      </div>
    </div>
  )
}

export default TransactionCard
