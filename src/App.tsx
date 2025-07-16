import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Users from "./pages/users/users";
import AddUser from "./pages/users/AddUser";
import OrdersPage from "./pages/orders/OrdersPage";
import Chats from "./pages/chats/chats";
import Transactions from "./pages/transactions/Transactions";
import ManageAdmin from "./pages/manageAdmin/manageAdmin";
import Notifications from "./pages/Notifications/Notifications";
import Analytics from "./pages/analytics/Analytics";
import Settings from "./pages/settings/Settings";
import { UserProvider } from "./context/UserContext";
import { AdminProvider } from "./context/AdminContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import RoutedContent from "./components/RoutedContent";
import React from "react";

// ProtectedRoute component checks if user is authenticated
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#992C55] border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

// AppRoutes component that uses the AuthContext
const AppRoutes = () => {
  return (
    <RoutedContent>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes wrapped in Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Index route - redirect to dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Explicit route definitions */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/manageAdmin" element={<ManageAdmin />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />

          {/* Fallback route for any unmatched paths */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Default redirect for any unexpected routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </RoutedContent>
  );
};

function App() {
  return (
    <UserProvider>
      <AdminProvider>
        <Router>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </Router>
      </AdminProvider>
    </UserProvider>
  );
}

export default App;
