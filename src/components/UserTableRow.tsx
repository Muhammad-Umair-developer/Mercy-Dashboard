import images from "../constants/images";
import type { User } from "../constants/usersTableData";
import { useUsers } from "../context/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserTableRowProps {
  user: User;
  isSelected: boolean;
  onSelectChange: (userId: number, isSelected: boolean) => void;
}

const UserTableRow = ({
  user,
  isSelected,
  onSelectChange,
}: UserTableRowProps) => {
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
        `Mapped table user ${user.name} (${user.id}) to context user ID: ${matchingUser.id}`
      );
    } else {
      console.warn(
        `Could not find context user for table user: ${user.name} (${user.email})`
      );
    }
  }, [user.email, user.id, user.name, contextUsers]);

  // Handle view more click - navigate directly to AddUser
  const handleViewMore = () => {
    try {
      console.log("View More clicked for user:", user.name, user.email);

      // Store original table row information in localStorage
      const tableRowData = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dateRegistered: user.dateRegistered,
        isOnline: user.isOnline,
      };
      localStorage.setItem(
        "selectedTableRowUser",
        JSON.stringify(tableRowData)
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
        console.log("Found matching user by email:", matchedUser.id);
        setCurrentUserId(matchedUser.id);
        localStorage.setItem("selectedContextUserId", matchedUser.id);
      } else {
        // If no match found, just use the first user as fallback
        console.log("No matching user found, using first user as fallback");
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
      <td className="px-2 py-4">
        <div className="flex items-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="font-medium text-black">{user.name}</span>
        </div>
      </td>
      <td className="px-1 py-4 text-black">{user.email}</td>
      <td className="px-1 py-4 text-black">{user.phone}</td>
      <td className="px-1 py-4 text-black text-center">{user.orders}</td>
      <td className="px-3 py-4 text-black">{user.dateRegistered}</td>
      <td className="px-2 py-4">
        <div className="flex items-center justify-center">
          <div
            className={`w-4 h-4 rounded-sm ${
              user.isOnline ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </div>
      </td>
      <td className="px-2 py-4">
        <div className="flex items-center gap-3 justify-between">
          <a
            href="/user-mgt/add"
            onClick={(e) => {
              e.preventDefault();
              handleViewMore();
            }}
            className="bg-[#992C55] cursor-pointer text-white py-2 px-3 rounded-md text-sm hover:bg-[#7d1f44] transition-colors font-medium flex justify-center items-center no-underline"
            style={{ width: "100px", textDecoration: "none" }}
          >
            View More
          </a>
          <img className="cursor-pointer" src={images.dots} alt="" />
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
