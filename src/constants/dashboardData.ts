import images from './images'

export interface DashboardCardData {
  id: number
  icon: string
  backgroundIcon: string
  title: string
  value: string
  iconBgColor?: string
  marginBottom?: string
  marginRight?: string
}

export const dashboardCardsData: DashboardCardData[] = [
  {
    id: 1,
    icon: images.totalUsers,
    backgroundIcon: images.Users,
    title: 'Total Users',
    value: '2,500',
    iconBgColor: 'bg-red-50',
    marginBottom: 'mb-[-15px]',
    marginRight: 'mr-[-8px]'
  },
  {
    id: 2,
    icon: images.Money,
    backgroundIcon: images.Money1,
    title: 'Amount Generated',
    value: 'N246,500',
    iconBgColor: 'bg-green-50',
    marginBottom: 'mb-[-17px]',
    marginRight: 'mr-[-8px]'
  },
  {
    id: 3,
    icon: images.totalOrders,
    backgroundIcon: images.totalOrders1,
    title: 'Active Orders',
    value: '20',
    iconBgColor: 'bg-blue-50',
    marginBottom: 'mb-[-8px]',
    marginRight: 'mr-[-8px]'
  },
  {
    id: 4,
    icon: images.completeOrders,
    backgroundIcon: images.completeOrders1,
    title: 'Completed Orders',
    value: '10',
    iconBgColor: 'bg-purple-50',
    marginBottom: 'mb-[-8px]',
    marginRight: 'mr-[-8px]'
  }
]
