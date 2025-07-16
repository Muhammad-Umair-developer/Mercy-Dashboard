import images from "../constants/images";
import type { AdminUser } from "../constants/adminTableData";
import { useUsers } from "../context/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AdminTableRowProps {
  user: AdminUser;
  isSelected: boolean;
  onSelectChange: (userId: number, isSelected: boolean) => void;
}

const AdminTableRow = ({
  user,
  isSelected,
  onSelectChange,
}: AdminTableRowProps) => {
  const { setCurrentUserId, users: contextUsers } = useUsers();
  const [contextUserId, setContextUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  // On component mount, find and store the matching context user ID
  useEffect(() => {
    // Find the matching context user by email (most reliable unique identifier)
    const matchingUser = contextUsers.find(
      (ctxUser) => ctxUser.email.toLowerCase() === user.email.toLowerCase()
    );

    if (matchingUser) {
      setContextUserId(matchingUser.id);
      console.log(
        `Mapped admin table user ${user.name} (${user.id}) to context user ID: ${matchingUser.id}`
      );
    } else {
      console.warn(
        `Could not find context user for admin table user: ${user.name} (${user.email})`
      );
    }
  }, [user.email, user.id, user.name, contextUsers]);

  // Handle view more click - navigate directly to AddUser
  const handleViewMore = () => {
    try {
      console.log("View More clicked for admin user:", user.name, user.email);

      // Store original admin table row information in localStorage
      const adminTableRowData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        dateRegistered: user.dateRegistered,
        isOnline: user.isOnline,
      };
      localStorage.setItem(
        "selectedAdminTableRowUser",
        JSON.stringify(adminTableRowData)
      );

      if (contextUserId) {
        // We have already mapped this user to a context user ID
        console.log("Using pre-mapped context user ID:", contextUserId);
        setCurrentUserId(contextUserId);

        // Store the context user ID in localStorage as well for double-check
        localStorage.setItem("selectedContextUserId", contextUserId);
        navigate("/users/add");
        return;
      }

      // Fallback: Try to find the matching context user again
      const matchedUser = contextUsers.find(
        (ctxUser) => ctxUser.email.toLowerCase() === user.email.toLowerCase()
      );

      if (matchedUser) {
        console.log("Found matching admin user by email:", matchedUser.id);
        setCurrentUserId(matchedUser.id);
        localStorage.setItem("selectedContextUserId", matchedUser.id);
      } else {
        // If no match found, just use the first user as fallback
        console.log(
          "No matching admin user found, using first user as fallback"
        );
        if (contextUsers.length > 0) {
          setCurrentUserId(contextUsers[0].id);
          localStorage.setItem("selectedContextUserId", contextUsers[0].id);
        }
      }

      // Force navigation regardless of user match
      console.log("Navigating to AddUser page");
      navigate("/users/add");
    } catch (error) {
      console.error("Navigation error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Get role badge styling based on role
  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "Chief Editor":
        return "bg-red-100 text-red-800 border-red-200";
      case "Editor":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Customer Care":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-1 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelectChange(user.id, e.target.checked)}
          className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
        />
      </td>
      <td className="px-1 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/public/assets/layout/admin.png"; // Fallback image
              }}
            />
          </div>
          <span className="text-black font-medium text-sm">{user.name}</span>
        </div>
      </td>
      <td className="px-1 py-4 text-black text-sm">{user.email}</td>
      <td className="px-1 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeStyle(
            user.role
          )}`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-1 py-4 text-center text-black text-sm">
        {user.orders}
      </td>
      <td className="px-1 py-4 text-black text-sm">{user.dateRegistered}</td>
      <td className="px-1 py-4 text-center">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            user.isOnline
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              user.isOnline ? "bg-green-400" : "bg-red-400"
            }`}
          />
          {user.isOnline ? "Online" : "Offline"}
        </span>
      </td>
      <td className="px-1 py-4 text-center">
        <button
          onClick={handleViewMore}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          title="View More"
        >
          <img src={images.dots} alt="More options" className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default AdminTableRow;
