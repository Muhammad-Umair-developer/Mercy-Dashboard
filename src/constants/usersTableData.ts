export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
  dateRegistered: string;
  isOnline: boolean;
  avatar: string;
  role?: string;
}

export const usersTableData: User[] = [
  {
    id: 1,
    name: "Adewale",
    email: "abcdefg@gmail.com",
    phone: "08012345678",
    orders: 10,
    dateRegistered: "05/09/25 - 07:22 AM",
    isOnline: true,
    avatar: "/public/assets/layout/Sasha.png",
  },
  {
    id: 2,
    name: "Adewale",
    email: "abcdefg@gmail.com",
    phone: "08012345678",
    orders: 10,
    dateRegistered: "05/09/25 - 07:22 AM",
    isOnline: false,
    avatar: "/public/assets/layout/Sasha.png",
  },
  {
    id: 3,
    name: "Adewale",
    email: "abcdefg@gmail.com",
    phone: "08012345678",
    orders: 10,
    dateRegistered: "05/09/25 - 07:22 AM",
    isOnline: true,
    avatar: "/public/assets/layout/Sasha.png",
  },
  {
    id: 4,
    name: "Adewale",
    email: "abcdefg@gmail.com",
    phone: "08012345678",
    orders: 10,
    dateRegistered: "05/09/25 - 07:22 AM",
    isOnline: true,
    avatar: "/public/assets/layout/Sasha.png",
  },
  {
    id: 5,
    name: "Adewale",
    email: "abcdefg@gmail.com",
    phone: "08012345678",
    orders: 10,
    dateRegistered: "05/09/25 - 07:22 AM",
    isOnline: false,
    avatar: "/public/assets/layout/Sasha.png",
  },
  {
    id: 6,
    name: "Adewale",
    email: "abcdefg@gmail.com",
    phone: "08012345678",
    orders: 10,
    dateRegistered: "05/09/25 - 07:22 AM",
    isOnline: true,
    avatar: "/public/assets/layout/Sasha.png",
  },
  {
    id: 7,
    name: "Adewale",
    email: "abcdefg@gmail.com",
    phone: "08012345678",
    orders: 10,
    dateRegistered: "05/09/25 - 07:22 AM",
    isOnline: true,
    avatar: "/public/assets/layout/Sasha.png",
  },
];
