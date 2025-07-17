import { useState, useEffect } from "react";
import UserCard from "../../components/UserCard";
import AdminUserTableRow from "../../components/AdminUserTableRow";
import AdminAddUserModal from "../../components/AdminAddUserModal";
import { userStatisticsData } from "../../constants/usersData";
import { useAdminUserSearch } from "../../hooks/useAdminUserSearch";
import { useAdminUsers } from "../../context/AdminContext";
import { type AdminUser } from "../../constants/adminUsersTableData";
import { useUsers } from "../../context/UserContext";
import images from "../../constants/images";

const ManageAdmin = () => {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Online" | "Offline"
  >("All");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // Get users from context
  const { users: contextUsers } = useUsers();
  const { adminUsers } = useAdminUsers();

  // Transform context users to admin table format (only admin roles)
  const transformedAdminUsers = contextUsers
    .filter((user) => user.role && user.role !== "User") // Only admin roles
    .map((user, index) => ({
      id:
        parseInt(
          user.id
            .split("")
            .filter((char) => !isNaN(parseInt(char)))
            .join("")
        ) || Date.now() + index, // Convert string ID to number
      name: user.username,
      email: user.email,
      role: user.role || "Customer Care", // Use role instead of phone
      orders: 10, // Default orders count
      dateRegistered: user.dateRegistered,
      isOnline: user.isOnline || false,
      avatar: user.profileImage || "/assets/users/adewale.png", // Use uploaded image or default
    }));

  // Combine admin context data with transformed users from user context
  const allUsers = [...adminUsers, ...transformedAdminUsers];

  // Use custom search hook for easy backend integration
  const {
    searchTerm,
    filteredData,
    isSearching,
    handleSearchChange,
    handleSearchSubmit,
    clearSearch,
  } = useAdminUserSearch(allUsers);

  const filterButtons = [
    { label: "All", value: "All" as const },
    { label: "Online", value: "Online" as const },
    { label: "Offline", value: "Offline" as const },
  ];

  const roleFilterOptions = [
    { label: "All", value: "All" },
    { label: "Editor", value: "Editor" },
    { label: "Customer Care", value: "Customer Care" },
    { label: "Chief Editor", value: "Chief Editor" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
        setIsRoleDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectUser = (userId: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers(finalFilteredUsers.map((user: AdminUser) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Apply both search and filter
  const finalFilteredUsers = filteredData.filter((user: AdminUser) => {
    // Apply status filter
    let statusMatch = true;
    if (activeFilter === "Online") statusMatch = user.isOnline;
    if (activeFilter === "Offline") statusMatch = !user.isOnline;

    // Apply role filter
    let roleMatch = true;
    if (roleFilter !== "All") {
      roleMatch = user.role === roleFilter;
    }

    return statusMatch && roleMatch;
  });

  // Calculate dynamic statistics
  const totalUsers = allUsers.length;
  const onlineUsers = allUsers.filter((user) => user.isOnline).length;
  const activeUsers = allUsers.filter((user) => user.orders > 5).length;

  // Dynamic statistics data
  const dynamicAdminStatistics = [
    {
      id: "1",
      title: "Total Admins",
      value: totalUsers.toLocaleString(),
      icon: userStatisticsData[0].icon,
      backgroundIcon: userStatisticsData[0].backgroundIcon,
    },
    {
      id: "2",
      title: "Online Admins",
      value: onlineUsers.toLocaleString(),
      icon: userStatisticsData[1].icon,
      backgroundIcon: userStatisticsData[1].backgroundIcon,
    },
    {
      id: "3",
      title: "Active Admins",
      value: activeUsers.toLocaleString(),
      icon: userStatisticsData[2].icon,
      backgroundIcon: userStatisticsData[2].backgroundIcon,
    },
  ];

  return (
    <>
      <div className="ml-5 mr-5 mt-10">
        {/* Cards Section */}
        <div className="flex flex-row gap-10">
          {dynamicAdminStatistics.map((stat) => (
            <div key={stat.id}>
              <UserCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                backgroundIcon={stat.backgroundIcon}
              />
            </div>
          ))}
        </div>

        {/* Filter Buttons Section */}
        <div className="mt-8 flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex bg-[#F5F5F5] p-1 rounded-lg border border-[#DADADA]"
              style={{ width: "250px", height: "50px" }}
            >
              {filterButtons.map((button) => (
                <button
                  key={button.value}
                  onClick={() => setActiveFilter(button.value)}
                  className={`flex-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    activeFilter === button.value
                      ? "bg-[#992C55] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>

            {/* Role Filter Button */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer min-w-[150px]"
              >
                <span>{roleFilter === "All" ? "Role" : roleFilter}</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Role Dropdown Menu */}
              {isRoleDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <div className="py-3">
                    {roleFilterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setRoleFilter(option.value);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors ${
                          roleFilter === option.value
                            ? "text-[#992C55] bg-gray-50"
                            : "text-gray-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Date Button */}
            <div className="relative">
              <button className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer min-w-[120px]">
                <span>Date</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Bulk Action Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between bg-[#992C55] text-white rounded-lg px-4 py-3 text-sm font-medium hover:bg-[#7d1f44] cursor-pointer min-w-[120px]"
              >
                <span>Bulk Action</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Export CSV
                    </button>
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Export PDF
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      Ban
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Add New User Button */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="flex items-center bg-[#992C55] text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-[#7d1f44] cursor-pointer"
            >
              Add new user
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex flex-row justify-between items-center mt-8">
          <div>
            <p className="font-bold text-2xl">Admin Users</p>
          </div>
          <div>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center bg-white rounded-lg border border-gray-200 shadow-sm px-3 py-2 w-80 transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <img
                  src={images.MagnifyingGlass}
                  alt="Search"
                  className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
                />
                <input
                  type="text"
                  placeholder="Search Admin Users..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
                />
                {isSearching && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600 ml-2"></div>
                )}
                {searchTerm && !isSearching && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Users Table Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-[#DADADA] max-w-full">

<div className="flex flex-row justify-between items-center p-5 border border-[#DADADA] bg-[#F5F5F5] rounded-t-2xl">
          <div>
            <p className="font-bold text-2xl">Admin Users</p>
          </div>
          <div>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center bg-white rounded-lg border border-gray-200 shadow-sm px-3 py-2 w-80 transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <img
                  src={images.MagnifyingGlass}
                  alt="Search"
                  className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
                />
                <input
                  type="text"
                  placeholder="Search Admin Users..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
                />
                {isSearching && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600 ml-2"></div>
                )}
                {searchTerm && !isSearching && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>


          <div className="w-full">
            <table className="w-full table-fixed">
              <thead className="bg-white">
                <tr>
                  <th className="px-1 py-4 text-left w-[3%]">
                    <input
                      type="checkbox"
                      checked={
                        selectedUsers.length === finalFilteredUsers.length &&
                        finalFilteredUsers.length > 0
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded border-gray-300 ml-3 focus:ring-purple-500"
                    />
                  </th>
                  <th className="px-2 py-4 text-left text-sm font-medium text-black w-[14%]">
                    Name
                  </th>
                  <th className="px-2 py-4 text-left text-sm font-medium text-black w-[18%]">
                    Email
                  </th>
                  <th className="px-2 py-4 text-left text-sm font-medium text-black w-[10%]">
                    Role
                  </th>
                  <th className="px-2 py-4 text-center text-sm font-medium text-black w-[12%]">
                    No of orders
                  </th>
                  <th className="px-2 py-4 text-left text-sm font-medium text-black w-[20%]">
                    Date registered
                  </th>
                  <th className="px-2 py-4 text-center text-sm font-medium text-black w-[9%]">
                    Online status
                  </th>
                  <th className="px-2 py-4 text-center text-sm font-medium text-black w-[13%]">
                    More
                  </th>
                </tr>
              </thead>
              <tbody>
                {finalFilteredUsers.map((user: AdminUser) => (
                  <AdminUserTableRow
                    key={user.id}
                    user={user}
                    isSelected={selectedUsers.includes(user.id)}
                    onSelectChange={handleSelectUser}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <AdminAddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
      />
    </>
  );
};

export default ManageAdmin;
