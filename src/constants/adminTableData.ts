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

export const adminTableData: AdminUser[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@admin.com",
    role: "Super Admin",
    orders: 45,
    dateRegistered: "15/07/25 - 09:30 AM",
    isOnline: true,
    avatar: "/public/assets/layout/admin.png",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@admin.com",
    role: "Admin",
    orders: 32,
    dateRegistered: "12/07/25 - 02:15 PM",
    isOnline: false,
    avatar: "/public/assets/layout/Sasha.png",
  },
  {
    id: 3,
    name: "Michael Davis",
    email: "michael.davis@admin.com",
    role: "Moderator",
    orders: 28,
    dateRegistered: "10/07/25 - 11:45 AM",
    isOnline: true,
    avatar: "/public/assets/layout/admin.png",
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.chen@admin.com",
    role: "Editor",
    orders: 22,
    dateRegistered: "08/07/25 - 04:20 PM",
    isOnline: true,
    avatar: "/public/assets/layout/Sasha.png",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@admin.com",
    role: "Admin",
    orders: 38,
    dateRegistered: "05/07/25 - 08:10 AM",
    isOnline: false,
    avatar: "/public/assets/layout/admin.png",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@admin.com",
    role: "Moderator",
    orders: 19,
    dateRegistered: "03/07/25 - 01:30 PM",
    isOnline: true,
    avatar: "/public/assets/layout/Sasha.png",
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.taylor@admin.com",
    role: "Editor",
    orders: 15,
    dateRegistered: "01/07/25 - 10:45 AM",
    isOnline: true,
    avatar: "/public/assets/layout/admin.png",
  },
  {
    id: 8,
    name: "Jessica Brown",
    email: "jessica.brown@admin.com",
    role: "Super Admin",
    orders: 52,
    dateRegistered: "28/06/25 - 03:15 PM",
    isOnline: false,
    avatar: "/public/assets/layout/Sasha.png",
  },
];

// Admin statistics based on the admin data
export const getAdminStats = () => {
  const totalAdmins = adminTableData.length;
  const onlineAdmins = adminTableData.filter((admin) => admin.isOnline).length;
  const activeAdmins = adminTableData.filter(
    (admin) => admin.orders > 20
  ).length;

  return {
    total: totalAdmins,
    online: onlineAdmins,
    active: activeAdmins,
  };
};

// Role-based filtering
export const getAdminsByRole = (role?: string) => {
  if (!role || role === "All") {
    return adminTableData;
  }
  return adminTableData.filter((admin) => admin.role === role);
};

// Available roles for filtering
export const adminRoles = ["All", "Customer Care", "Editor", "Chief Editor"];
