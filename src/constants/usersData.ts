import images from './images'

export interface UserStatistic {
  id: string
  title: string
  value: string | number
  icon: string
  backgroundIcon: string
}

export const userStatisticsData: UserStatistic[] = [
  {
    id: '1',
    title: 'Total Users',
    value: '2,500',
    icon: images.totalUsers,
    backgroundIcon: images.Users1
  },
  {
    id: '2',
    title: 'Online Users',
    value: '150',
    icon: images.totalUsers,
    backgroundIcon: images.Users1
  },
  {
    id: '3',
    title: 'Active Users',
    value: '15',
    icon: images.totalUsers,
    backgroundIcon: images.Users1
  }
]
