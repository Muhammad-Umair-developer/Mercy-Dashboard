import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  adminUsersTableData,
  type AdminUser,
} from "../constants/adminUsersTableData";

interface AdminContextType {
  adminUsers: AdminUser[];
  addAdminUser: (
    userData: Omit<AdminUser, "id" | "dateRegistered" | "orders">
  ) => void;
  updateAdminUser: (id: number, userData: Partial<AdminUser>) => void;
  deleteAdminUser: (id: number) => void;
  getAdminUserById: (id: number) => AdminUser | undefined;
  currentAdminUserId: number | null;
  setCurrentAdminUserId: (id: number | null) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdminUsers = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminUsers must be used within an AdminProvider");
  }
  return context;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [currentAdminUserId, setCurrentAdminUserId] = useState<number | null>(
    null
  );

  // Initialize admin users from localStorage or use default data
  useEffect(() => {
    const storedAdminUsers = localStorage.getItem("adminUsers");
    if (storedAdminUsers) {
      const parsedAdminUsers = JSON.parse(storedAdminUsers);
      setAdminUsers(parsedAdminUsers);
    } else {
      setAdminUsers(adminUsersTableData);
    }
  }, []);

  // Save admin users to localStorage whenever adminUsers array changes
  useEffect(() => {
    if (adminUsers.length > 0) {
      localStorage.setItem("adminUsers", JSON.stringify(adminUsers));
    }
  }, [adminUsers]);

  const addAdminUser = useCallback(
    (userData: Omit<AdminUser, "id" | "dateRegistered" | "orders">) => {
      const newAdminUser: AdminUser = {
        ...userData,
        id: Date.now(), // Simple ID generation
        dateRegistered:
          new Date().toLocaleDateString("en-GB") +
          " - " +
          new Date().toLocaleTimeString("en-GB", { hour12: true }),
        orders: 0, // New admin users start with 0 orders
      };

      setAdminUsers((prev) => [...prev, newAdminUser]);
      console.log("Admin user added:", newAdminUser);
    },
    []
  );

  const updateAdminUser = useCallback(
    (id: number, userData: Partial<AdminUser>) => {
      setAdminUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, ...userData } : user))
      );
    },
    []
  );

  const deleteAdminUser = useCallback((id: number) => {
    setAdminUsers((prev) => prev.filter((user) => user.id !== id));
  }, []);

  const getAdminUserById = useCallback(
    (id: number) => {
      return adminUsers.find((user) => user.id === id);
    },
    [adminUsers]
  );

  const value: AdminContextType = {
    adminUsers,
    addAdminUser,
    updateAdminUser,
    deleteAdminUser,
    getAdminUserById,
    currentAdminUserId,
    setCurrentAdminUserId,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContext;
