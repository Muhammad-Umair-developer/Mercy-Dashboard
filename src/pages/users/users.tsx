import { useState } from "react";
import UserCard from "../../components/UserCard";
import UserTableRow from "../../components/UserTableRow";
import AddUserModal from "../../components/AddUserModal";
import { userStatisticsData } from "../../constants/usersData";
import { useUserSearch } from "../../hooks/useUserSearch";
import { useUsers } from "../../context/UserContext";
import images from "../../constants/images";

const Users = () => {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Online" | "Offline"
  >("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // Get users from context
  const { users: contextUsers } = useUsers();

  // Transform context users to table format
  const transformedUsers = contextUsers.map((user, index) => ({
    id:
      parseInt(
        user.id
          .split("")
          .filter((char) => !isNaN(parseInt(char)))
          .join("")
      ) || Date.now() + index, // Convert string ID to number
    name: user.username,
    email: user.email,
    phone: user.phoneNumber,
    orders: 10, // Default orders count
    dateRegistered: user.dateRegistered,
    isOnline: user.isOnline || false,
    avatar: user.profileImage || "/assets/users/adewale.png", // Use uploaded image or default
  }));

  // Use only transformed users
  const allUsers = transformedUsers;

  // Use custom search hook for easy backend integration
  const {
    searchTerm,
    filteredData,
    isSearching,
    handleSearchChange,
    handleSearchSubmit,
    clearSearch,
  } = useUserSearch(allUsers);

  const filterButtons = [
    { label: "All", value: "All" as const },
    { label: "Online", value: "Online" as const },
    { label: "Offline", value: "Offline" as const },
  ];

  const handleSelectUser = (userId: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers(finalFilteredUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Apply both search and filter
  const finalFilteredUsers = filteredData.filter((user) => {
    if (activeFilter === "Online") return user.isOnline;
    if (activeFilter === "Offline") return !user.isOnline;
    return true;
  });

  // Calculate dynamic statistics
  const totalUsers = allUsers.length;
  const onlineUsers = allUsers.filter((user) => user.isOnline).length;
  const activeUsers = 156; // Dummy number for active users

  // Dynamic statistics data
  const dynamicUserStatistics = [
    {
      id: "1",
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: userStatisticsData[0].icon,
      backgroundIcon: userStatisticsData[0].backgroundIcon,
    },
    {
      id: "2",
      title: "Online Users",
      value: onlineUsers.toLocaleString(),
      icon: userStatisticsData[1].icon,
      backgroundIcon: userStatisticsData[1].backgroundIcon,
    },
    {
      id: "3",
      title: "Active Users",
      value: activeUsers.toLocaleString(),
      icon: userStatisticsData[2].icon,
      backgroundIcon: userStatisticsData[2].backgroundIcon,
    },
  ];

  return (
    <>
      <div className="ml-5 mr-5 mt-10">
        {/* Cards Section */}
        <div className="flex flex-row gap-5">
          {dynamicUserStatistics.map((stat) => (
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
            <div className="relative">
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
        {/* <div className="flex flex-row justify-between items-center mt-8">
          <div>
            <p className="font-bold text-2xl">Users</p>
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
                  placeholder="Search Users..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
                  disabled={isSearching}
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
        </div> */}

        {/* Search Results Summary */}
        {searchTerm && (
          <div className="mt-4 text-sm text-gray-600">
            {isSearching ? (
              <span>Searching...</span>
            ) : (
              <span>
                Found {finalFilteredUsers.length} user
                {finalFilteredUsers.length !== 1 ? "s" : ""} for "{searchTerm}"
                {finalFilteredUsers.length === 0 && (
                  <button
                    onClick={clearSearch}
                    className="ml-2 text-[#992C55] hover:text-[#7d1f44] underline cursor-pointer"
                  >
                    Clear search
                  </button>
                )}
              </span>
            )}
          </div>
        )}

        {/* Users Table Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-[#DADADA] max-w-full">



<div className="flex flex-row justify-between items-center p-5 roundblack bg-[#F5F5F5] border  border-[#DADADA]">
          <div>
            <p className="font-bold text-2xl">Users</p>
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
                  placeholder="Search Users..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
                  disabled={isSearching}
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
            {finalFilteredUsers.length === 0 && searchTerm ? (
              // No users found state
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No users found
                </h3>
                <p className="text-gray-500 mb-4">
                  No users match your search criteria for "{searchTerm}". Try
                  adjusting your search terms.
                </p>
                <button
                  onClick={clearSearch}
                  className="bg-[#992C55] hover:bg-[#7d1f44] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            ) : (
              // Users table
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
                        className="w-4 h-4 text-purple-600 rounded border-gray-300 ml-2 focus:ring-purple-500"
                      />
                    </th>
                    <th className="px-2 py-4 text-left text-sm font-medium text-black w-[14%]">
                      Name
                    </th>
                    <th className="px-2 py-4 text-left text-sm font-medium text-black w-[18%]">
                      Email
                    </th>
                    <th className="px-2 py-4 text-left text-sm font-medium text-black w-[10%]">
                      Phone number
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
                  {finalFilteredUsers.map((user) => (
                    <UserTableRow
                      key={user.id}
                      user={user}
                      isSelected={selectedUsers.includes(user.id)}
                      onSelectChange={handleSelectUser}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
      />
    </>
  );
};

export default Users;
