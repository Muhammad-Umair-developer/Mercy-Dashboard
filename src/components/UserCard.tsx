interface UserCardProps {
  title: string
  value: string | number
  icon: string
  backgroundIcon: string
}

const UserCard = ({ title, value, icon, backgroundIcon }: UserCardProps) => {
  return (
    <div className='bg-white rounded-2xl w-[330px] h-[155px] p-4 relative shadow-sm border border-gray-100'>
      <div className='flex flex-col h-full justify-between'>
        <div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3`}>
            <img src={icon} alt="" />
          </div>
          <p className='text-gray-600 text-sm font-medium'>{title}</p>
          <p className='font-bold text-[30px] text-gray-900 mt-1'>{value}</p>
        </div>
      </div>
      <div className={`absolute mb-[-18px] bottom-2 right-15 opacity-10`}>
        <img src={backgroundIcon} alt="" className='w-16 h-16' />
      </div>
    </div>
  )
}

export default UserCard
