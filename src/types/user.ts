export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateRegistered: string;
  profileImage?: string;
  isOnline?: boolean;
  role?: string;
}

export interface UserField {
  id: string;
  label: string;
  value: string;
  type?: "text" | "password" | "email" | "tel" | "date";
}

// Sample user data - this would typically come from your backend/state management
export const sampleUsers: User[] = [
  {
    id: "1",
    username: "Adewale",
    email: "abcdefg@gmail.com",
    password: "password123",
    phoneNumber: "09012345678",
    dateRegistered: "May 22, 2025 - 08:22 PM",
    isOnline: true,
  },
  {
    id: "2",
    username: "John Doe",
    email: "john.doe@example.com",
    password: "johnpass456",
    phoneNumber: "08098765432",
    dateRegistered: "June 15, 2025 - 02:15 PM",
    isOnline: false,
  },
];

// Function to get current date and time formatted
export const getCurrentDateTime = (): string => {
  const now = new Date();
  return (
    now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) +
    " - " +
    now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
};

// Function to convert user data to field format
export const userToFields = (user: User): UserField[] => [
  {
    id: "username",
    label: "Username",
    value: user.username,
    type: "text",
  },
  {
    id: "password",
    label: "Password",
    value: user.password,
    type: "password",
  },
  {
    id: "email",
    label: "Email",
    value: user.email,
    type: "email",
  },
  {
    id: "phoneNumber",
    label: "Phone number",
    value: user.phoneNumber,
    type: "tel",
  },
  {
    id: "dateRegistered",
    label: "Date Registered",
    value: getCurrentDateTime(), // Use real-time date instead of stored date
    type: "date",
  },
];

// Function to generate a unique user ID
export const generateUserId = (): string => {
  const timestamp = Date.now().toString();
  const randomPart = Math.random().toString(36).substring(2, 11);
  return `user_${timestamp}_${randomPart}`;
};

// Function to create a new user
export const createNewUser = (
  userData: Omit<User, "id" | "dateRegistered">
): User => {
  const now = new Date();
  const dateRegistered =
    now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) +
    " - " +
    now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return {
    id: generateUserId(),
    dateRegistered,
    ...userData,
  };
};
