export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  orders: number;
  dateRegistered: string;
  isOnline: boolean;
  avatar: string;
}

export const adminUsersTableData: AdminUser[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@admin.com",
    role: "Chief Editor",
    orders: 25,
    dateRegistered: "15/07/25 - 09:30 AM",
    isOnline: true,
    avatar: "/public/assets/layout/admin.png",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@admin.com",
    role: "Editor",
    orders: 18,
    dateRegistered: "12/07/25 - 02:15 PM",
    isOnline: false,
    avatar: "/public/assets/layout/Sasha.png",
  },
  {
    id: 3,
    name: "Michael Davis",
    email: "michael.davis@admin.com",
    role: "Customer Care",
    orders: 12,
    dateRegistered: "10/07/25 - 11:45 AM",
    isOnline: true,
    avatar: "/public/assets/layout/admin.png",
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.chen@admin.com",
    role: "Editor",
    orders: 8,
    dateRegistered: "08/07/25 - 04:20 PM",
    isOnline: true,
    avatar: "/public/assets/layout/Sasha.png",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@admin.com",
    role: "Customer Care",
    orders: 22,
    dateRegistered: "05/07/25 - 08:10 AM",
    isOnline: false,
    avatar: "/public/assets/layout/admin.png",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@admin.com",
    role: "Chief Editor",
    orders: 15,
    dateRegistered: "03/07/25 - 01:30 PM",
    isOnline: true,
    avatar: "/public/assets/layout/Sasha.png",
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.taylor@admin.com",
    role: "Editor",
    orders: 9,
    dateRegistered: "01/07/25 - 10:45 AM",
    isOnline: true,
    avatar: "/public/assets/layout/admin.png",
  },
];
