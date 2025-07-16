export interface ChatTableData {
  id: string
  agentName: string
  avatar: string
  service: string
  serviceType: 'Photo Editing' | 'Photo Manipulation' | 'Design' | 'Video Editing'
  orderAmount: string
  numberOfPhotos: number
  date: string
  status: 'active' | 'inactive'
  isOnline: boolean
}

export const chatTableData: ChatTableData[] = [
  {
    id: '1',
    agentName: 'Sasha',
    avatar: '/assets/layout/Sasha.png',
    service: 'Photo Editing',
    serviceType: 'Photo Editing',
    orderAmount: '₦25,000',
    numberOfPhotos: 10,
    date: '05/09/25 - 07:22 AM',
    status: 'active',
    isOnline: true
  },
  {
    id: '2',
    agentName: 'Sasha',
    avatar: '/assets/layout/Sasha.png',
    service: 'Photo Editing',
    serviceType: 'Photo Editing',
    orderAmount: '₦25,000',
    numberOfPhotos: 10,
    date: '05/09/25 - 07:22 AM',
    status: 'active',
    isOnline: true
  },
  {
    id: '3',
    agentName: 'Sasha',
    avatar: '/assets/layout/Sasha.png',
    service: 'Photo Editing',
    serviceType: 'Photo Editing',
    orderAmount: '₦25,000',
    numberOfPhotos: 10,
    date: '05/09/25 - 07:22 AM',
    status: 'active',
    isOnline: true
  },
  {
    id: '4',
    agentName: 'Sasha',
    avatar: '/assets/layout/Sasha.png',
    service: 'Photo Editing',
    serviceType: 'Photo Editing',
    orderAmount: '₦25,000',
    numberOfPhotos: 10,
    date: '05/09/25 - 07:22 AM',
    status: 'active',
    isOnline: true
  },
  {
    id: '5',
    agentName: 'Sasha',
    avatar: '/assets/layout/Sasha.png',
    service: 'Photo Editing',
    serviceType: 'Photo Editing',
    orderAmount: '₦25,000',
    numberOfPhotos: 10,
    date: '05/09/25 - 07:22 AM',
    status: 'active',
    isOnline: true
  },
  {
    id: '6',
    agentName: 'Alex',
    avatar: '/assets/layout/admin.png',
    service: 'Photo Manipulation',
    serviceType: 'Photo Manipulation',
    orderAmount: '₦25,000',
    numberOfPhotos: 10,
    date: 'May 21, 2025 - 08:20 AM',
    status: 'active',
    isOnline: true
  },
  {
    id: '7',
    agentName: 'Maria',
    avatar: '/assets/layout/Sasha.png',
    service: 'Design',
    serviceType: 'Design',
    orderAmount: '₦25,000',
    numberOfPhotos: 10,
    date: 'May 21, 2025 - 08:18 AM',
    status: 'active',
    isOnline: false
  },
  {
    id: '8',
    agentName: 'John',
    avatar: '/assets/layout/admin.png',
    service: 'Video Editing',
    serviceType: 'Video Editing',
    orderAmount: '₦25,000',
    numberOfPhotos: 10,
    date: 'May 21, 2025 - 08:15 AM',
    status: 'active',
    isOnline: true
  },
  {
    id: '9',
    agentName: 'Emma',
    avatar: '/assets/layout/Sasha.png',
    service: 'Photo Editing',
    serviceType: 'Photo Editing',
    orderAmount: '₦25,000',
    numberOfPhotos: 10,
    date: 'May 21, 2025 - 08:10 AM',
    status: 'active',
    isOnline: true
  }
]
