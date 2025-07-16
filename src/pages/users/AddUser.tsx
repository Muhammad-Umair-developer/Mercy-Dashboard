import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard";
import EditUserModal from "../../components/EditUserModal";
import type { UserField, User } from "../../types/user";
import { useUsers } from "../../context/UserContext";
import { activityData, type ActivityItem } from "../../constants/activityData";
// Import components for add user functionality
import AddUserModal from "../../components/AddUserModal";
import images from "../../constants/images";
// Import components for orders functionality
import OrderCard from "../../components/OrderCard";
import OrderDetailsModal from "../../components/OrderDetailsModal";
import ChatModal from "../../components/ChatModal";
import { tableData } from "../../constants/tableData";
// Import components for chats functionality
import ChatUserTableRow from "../../components/ChatUserTableRow";
import {
  chatTableData,
  type ChatTableData,
} from "../../constants/chatTableData";

const AddUser = () => {
  const { currentUserId, setCurrentUserId, getUserById, updateUser } =
    useUsers();

  // State for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // State for activity data
  const [activities, setActivities] = useState<ActivityItem[]>(activityData);
  const [selectAllActivities, setSelectAllActivities] = useState(false);

  // State for bulk action dropdown
  const [isBulkDropdownOpen, setIsBulkDropdownOpen] = useState(false);

  // State for tab navigation
  const [activeTab, setActiveTab] = useState<"activity" | "chats" | "orders">(
    "activity"
  );

  // State for credit score functionality (when chats tab is active)
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Online" | "Offline"
  >("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // State for chats table functionality
  const [selectedChats, setSelectedChats] = useState<string[]>([]);
  const [chatData] = useState<ChatTableData[]>(chatTableData);
  const [chatSearchTerm, setChatSearchTerm] = useState("");
  const [isChatSearching, setIsChatSearching] = useState(false);

  // State for orders functionality (when orders tab is active)
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);
  const [isOrdersSecondDropdownOpen, setIsOrdersSecondDropdownOpen] =
    useState(false);
  const [isOrdersDateDropdownOpen, setIsOrdersDateDropdownOpen] =
    useState(false);
  const [isOrdersBulkActionDropdownOpen, setIsOrdersBulkActionDropdownOpen] =
    useState(false);
  const [selectedOrdersFilter, setSelectedOrdersFilter] = useState("All");
  const [selectedOrdersSecondFilter, setSelectedOrdersSecondFilter] =
    useState("All");
  const [selectedOrdersDateFilter, setSelectedOrdersDateFilter] =
    useState("Date");
  const [ordersSearchTerm, setOrdersSearchTerm] = useState("");

  // Order modal states
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderData, setSelectedOrderData] = useState<
    (typeof tableData)[0] | null
  >(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedAgentName, setSelectedAgentName] = useState<string>("");
  const [isQuestionnaireModalOpen, setIsQuestionnaireModalOpen] =
    useState(false);
  const [selectedChatData, setSelectedChatData] =
    useState<ChatTableData | null>(null);

  // Share modal states
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareSearchTerm, setShareSearchTerm] = useState("");

  // Check if we have a stored user ID from the table view
  useEffect(() => {
    const storedContextUserId = localStorage.getItem("selectedContextUserId");
    console.log(
      "AddUser: Checking stored context user ID:",
      storedContextUserId
    );
    console.log("AddUser: Current user ID:", currentUserId);

    if (storedContextUserId && storedContextUserId !== currentUserId) {
      console.log(
        "Setting current user from localStorage:",
        storedContextUserId
      );
      setCurrentUserId(storedContextUserId);
    }
  }, [currentUserId, setCurrentUserId]);

  // Ensure we're working with the latest user data
  useEffect(() => {
    // When the component loads, clear any stale edit modal state
    setIsEditModalOpen(false);
    console.log("AddUser: Current user loaded:", currentUserId);
  }, [currentUserId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isBulkDropdownOpen) {
        setIsBulkDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBulkDropdownOpen]);

  // Add location and navigate hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Handle URL parameters for modal opening
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const openModal = urlParams.get("openModal");
    const userId = urlParams.get("userId");

    console.log("URL Params detected:", {
      openModal,
      userId,
      search: location.search,
    });

    if (openModal && userId) {
      console.log("Processing modal opening for:", openModal, userId);

      // Find the chat data for this user
      const chatData = chatTableData.find((chat) => chat.id === userId);

      if (chatData) {
        setSelectedChatData(chatData);

        if (openModal === "chat") {
          console.log("Opening chat modal");
          setIsChatModalOpen(true);
          setSelectedAgentName(chatData.agentName);
        } else if (openModal === "questionnaire") {
          console.log("Opening questionnaire modal");
          setIsQuestionnaireModalOpen(true);
        }
      }

      // Clean up URL parameters
      setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 100);
    }
  }, [location.search, navigate, location.pathname]);

  // Handle user data from localStorage (when coming from credit-score page)
  const [selectedUserFromStorage, setSelectedUserFromStorage] =
    useState<any>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("selectedUser");
    const referrer = localStorage.getItem("userProfileReferrer");

    // Check for admin user data from manage admin page
    const storedTableRowUser = localStorage.getItem("selectedTableRowUser");

    if (storedTableRowUser) {
      try {
        const adminUserData = JSON.parse(storedTableRowUser);
        console.log(
          "Loading admin user data from manage admin page:",
          adminUserData
        );

        // Store the admin user data in component state
        setSelectedUserFromStorage(adminUserData);

        // Don't try to set currentUserId for admin users since they don't exist in user context
        // The fallback logic will handle displaying their data
      } catch (error) {
        console.error("Error parsing stored admin user data:", error);
      }
    } else if (storedUserData && referrer === "credit-score") {
      try {
        const userData = JSON.parse(storedUserData);
        console.log("Loading user data from credit-score page:", userData);

        // Store the user data in component state
        setSelectedUserFromStorage(userData);

        // Set the current user ID to display this user's data
        setCurrentUserId(userData.id.toString());

        // Don't clean up localStorage immediately - wait for page to fully load
        // Clean up localStorage after a delay to ensure data persists through reload
        setTimeout(() => {
          localStorage.removeItem("selectedUser");
          localStorage.removeItem("userProfileReferrer");
        }, 2000);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, [setCurrentUserId]);

  // Get current user data - prioritize selectedUserFromStorage if available
  const currentUser = selectedUserFromStorage || getUserById(currentUserId);

  // If we have selectedUserFromStorage but no currentUser from context, create a minimal user object
  const displayUser =
    currentUser ||
    (selectedUserFromStorage
      ? {
          id: selectedUserFromStorage.id,
          username: selectedUserFromStorage.name,
          email: selectedUserFromStorage.email,
          phoneNumber: selectedUserFromStorage.phone,
          profileImage: selectedUserFromStorage.avatar,
          isOnline: selectedUserFromStorage.isOnline,
          dateRegistered: selectedUserFromStorage.dateRegistered,
          password: "********",
          role: selectedUserFromStorage.role, // Add role for admin users
        }
      : null);

  // Check if user came from manage admin page
  const isFromManageAdmin = (() => {
    try {
      const storedTableRowUser = localStorage.getItem("selectedTableRowUser");
      if (storedTableRowUser) {
        const parsedData = JSON.parse(storedTableRowUser);
        return parsedData.isFromManageAdmin === true;
      }
    } catch (error) {
      console.error("Error checking manage admin flag:", error);
    }
    return false;
  })();

  // Create user fields with static user data
  const userFields: UserField[] = displayUser
    ? [
        {
          id: "username",
          label: "Username",
          value: selectedUserFromStorage
            ? selectedUserFromStorage.name
            : displayUser.username,
          type: "text",
        },
        {
          id: "password",
          label: "Password",
          value: selectedUserFromStorage ? "********" : displayUser.password,
          type: "password",
        },
        {
          id: "email",
          label: "Email",
          value: selectedUserFromStorage
            ? selectedUserFromStorage.email
            : displayUser.email,
          type: "email",
        },
        // Conditionally show role or phone based on source
        isFromManageAdmin
          ? {
              id: "role",
              label: "Role",
              value:
                selectedUserFromStorage && selectedUserFromStorage.role
                  ? selectedUserFromStorage.role
                  : (displayUser as any).role || "User",
              type: "text",
            }
          : {
              id: "phoneNumber",
              label: "Phone number",
              value: selectedUserFromStorage
                ? selectedUserFromStorage.phone
                : displayUser.phoneNumber,
              type: "tel",
            },
        {
          id: "dateRegistered",
          label: "Date Registered",
          value: selectedUserFromStorage
            ? selectedUserFromStorage.dateRegistered
            : displayUser.dateRegistered || "Not available",
          type: "date",
        },
      ]
    : [];

  // Handle user actions
  const handleEdit = () => {
    // Check if display user is properly loaded before opening edit modal
    if (displayUser && displayUser.id) {
      console.log(
        "Opening edit modal for user:",
        displayUser.id,
        displayUser.username
      );
      setIsEditModalOpen(true);
    } else {
      console.error("Cannot edit: No user loaded or invalid user data");
      alert("User data is not fully loaded. Please try again in a moment.");
    }
  };

  const handleNotification = (userId: string) => {
    console.log("Send notification to user:", userId);
    // Implement notification functionality
  };

  const handleError = (userId: string) => {
    console.log("Report error for user:", userId);
    // Implement error reporting functionality
  };

  const handleUpdateUser = (id: string, userData: Partial<User>) => {
    updateUser(id, userData);
  };

  // Credit Score functionality (for chats tab)
  const filterButtons = [
    { label: "All", value: "All" as const },
    { label: "Online", value: "Online" as const },
    { label: "Offline", value: "Offline" as const },
  ];

  // Handle activity checkbox changes
  const handleActivityCheck = (activityId: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === activityId
          ? { ...activity, checked: !activity.checked }
          : activity
      )
    );
  };

  // Handle select all activities
  const handleSelectAllActivities = () => {
    const newSelectAll = !selectAllActivities;
    setSelectAllActivities(newSelectAll);
    setActivities((prev) =>
      prev.map((activity) => ({ ...activity, checked: newSelectAll }))
    );
  };

  // Handle bulk action dropdown
  const handleBulkAction = (action: string) => {
    setIsBulkDropdownOpen(false);
    console.log("Bulk action:", action);
    // Implement specific bulk actions here
  };

  // Orders functionality helpers
  const getOrdersSearchFilteredData = () => {
    if (ordersSearchTerm.trim() === "") {
      return tableData;
    }

    return tableData.filter(
      (item) =>
        item.customerName
          .toLowerCase()
          .includes(ordersSearchTerm.toLowerCase()) ||
        item.serviceName
          .toLowerCase()
          .includes(ordersSearchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(ordersSearchTerm.toLowerCase()) ||
        item.amount.toLowerCase().includes(ordersSearchTerm.toLowerCase()) ||
        item.date.toLowerCase().includes(ordersSearchTerm.toLowerCase()) ||
        item.editor.toLowerCase().includes(ordersSearchTerm.toLowerCase())
    );
  };

  const getOrdersFilteredData = () => {
    let data = getOrdersSearchFilteredData();

    // Filter by status (first filter)
    if (selectedOrdersFilter !== "All") {
      data = data.filter((item) => item.status === selectedOrdersFilter);
    }

    // Filter by service type (second filter)
    if (selectedOrdersSecondFilter !== "All") {
      data = data.filter(
        (item) => item.serviceName === selectedOrdersSecondFilter
      );
    }

    // Filter by date (third filter)
    if (selectedOrdersDateFilter !== "Date") {
      const today = new Date();
      data = data.filter((item) => {
        const itemDate = new Date(item.date);

        switch (selectedOrdersDateFilter) {
          case "Today":
            return itemDate.toDateString() === today.toDateString();
          case "This Week":
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return itemDate >= weekAgo;
          case "This Month":
            return (
              itemDate.getMonth() === today.getMonth() &&
              itemDate.getFullYear() === today.getFullYear()
            );
          default:
            return true;
        }
      });
    }

    return data;
  };

  const finalOrdersFilteredData = getOrdersFilteredData();

  // Calculate order statistics
  const getOrderStats = () => {
    const data = finalOrdersFilteredData;
    return {
      total: data.length,
      active: data.filter((item) => item.status === "Pending").length,
      completed: data.filter((item) => item.status === "Completed").length,
      failed: data.filter((item) => item.status === "Failed").length,
    };
  };

  const orderStats = getOrderStats();

  // Chat functionality helpers
  const handleChatSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChatSearchTerm(value);
    setIsChatSearching(true);

    // Simulate search delay
    setTimeout(() => {
      setIsChatSearching(false);
    }, 300);
  };

  const handleChatSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Chat search submitted:", chatSearchTerm);
  };

  const clearChatSearch = () => {
    setChatSearchTerm("");
    setIsChatSearching(false);
  };

  const handleSelectChat = (chatId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedChats([...selectedChats, chatId]);
    } else {
      setSelectedChats(selectedChats.filter((id) => id !== chatId));
    }
  };

  const handleSelectAllChats = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedChats(finalFilteredChats.map((chat) => chat.id));
    } else {
      setSelectedChats([]);
    }
  };

  // Apply search and filter to chat data
  const getFilteredChatData = () => {
    let data = chatData;

    // Apply search filter
    if (chatSearchTerm.trim() !== "") {
      data = data.filter(
        (chat) =>
          chat.agentName.toLowerCase().includes(chatSearchTerm.toLowerCase()) ||
          chat.service.toLowerCase().includes(chatSearchTerm.toLowerCase()) ||
          chat.orderAmount
            .toLowerCase()
            .includes(chatSearchTerm.toLowerCase()) ||
          chat.date.toLowerCase().includes(chatSearchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (activeFilter === "Online") {
      data = data.filter((chat) => chat.isOnline);
    } else if (activeFilter === "Offline") {
      data = data.filter((chat) => !chat.isOnline);
    }

    return data;
  };

  const finalFilteredChats = getFilteredChatData();

  // Order modal handlers
  const handleViewOrder = (orderData: (typeof tableData)[0]) => {
    setSelectedOrderData(orderData);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrderData(null);
  };

  const handleViewChat = (agentName: string) => {
    setSelectedAgentName(agentName);
    setIsChatModalOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedAgentName("");
  };

  // Questionnaire modal handlers
  const handleOpenQuestionnaireModal = (chatData: ChatTableData) => {
    setSelectedChatData(chatData);
    setIsQuestionnaireModalOpen(true);
  };

  const handleCloseQuestionnaireModal = () => {
    setIsQuestionnaireModalOpen(false);
    setSelectedChatData(null);
  };

  // Share modal handlers
  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
    setShareSearchTerm("");
  };

  // Order filter handlers
  const handleOrdersFilterSelect = (filter: string) => {
    setSelectedOrdersFilter(filter);
    setIsOrdersDropdownOpen(false);
  };

  const handleOrdersSecondFilterSelect = (filter: string) => {
    setSelectedOrdersSecondFilter(filter);
    setIsOrdersSecondDropdownOpen(false);
  };

  const handleOrdersDateFilterSelect = (filter: string) => {
    setSelectedOrdersDateFilter(filter);
    setIsOrdersDateDropdownOpen(false);
  };

  const handleOrdersBulkActionSelect = (action: string) => {
    setIsOrdersBulkActionDropdownOpen(false);
    console.log(`Executing bulk action: ${action}`);
    switch (action) {
      case "export-csv":
        // Handle export CSV logic
        break;
      case "export-pdf":
        // Handle export PDF logic
        break;
      case "ban":
        // Handle ban logic
        break;
    }
  };

  // Order search handlers
  const handleOrdersSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrdersSearchTerm(e.target.value);
  };

  const handleOrdersSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const clearOrdersSearch = () => {
    setOrdersSearchTerm("");
  };

  if (!currentUser) {
    // Try to load user from localStorage as a last resort
    const storedUserData = localStorage.getItem("selectedTableRowUser");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        console.log(
          "Using stored table row user data as fallback",
          parsedUserData
        );

        // Create user fields from table row data
        const fallbackUserFields: UserField[] = [
          {
            id: "name",
            label: "Name",
            value: parsedUserData.name || "N/A",
            type: "text",
          },
          {
            id: "email",
            label: "Email",
            value: parsedUserData.email || "N/A",
            type: "email",
          },
          // Conditionally show role or phone based on source
          parsedUserData.isFromManageAdmin
            ? {
                id: "role",
                label: "Role",
                value: parsedUserData.role || "N/A",
                type: "text",
              }
            : {
                id: "phone",
                label: "Phone number",
                value: parsedUserData.phone || "N/A",
                type: "tel",
              },
          {
            id: "dateRegistered",
            label: "Date Registered",
            value: parsedUserData.dateRegistered || "N/A",
            type: "date",
          },
        ];

        return (
          <>
            {/* User Profile Card with Table Row Data */}
            <UserProfileCard
              userId={parsedUserData.id?.toString() || "temp"}
              profileImage={parsedUserData.avatar || undefined} // Use admin avatar if available
              isOnline={parsedUserData.isOnline || false}
              userFields={fallbackUserFields}
              onEdit={() => {
                console.log(
                  "Edit functionality not available in fallback mode"
                );
                alert(
                  "Full edit functionality requires context data. Please navigate from the User Management page for complete access."
                );
              }}
              onNotification={() => {
                console.log(
                  "Notification functionality not available in fallback mode"
                );
                alert(
                  "Notification functionality requires context data. Please navigate from the User Management page for complete access."
                );
              }}
              onError={() => {
                console.log(
                  "Error reporting functionality not available in fallback mode"
                );
                alert(
                  "Error reporting functionality requires context data. Please navigate from the User Management page for complete access."
                );
              }}
            />

            {/* Limited Activity Section */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 text-center">
                <div className="text-gray-500 mb-4">
                  <svg
                    className="w-12 h-12 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Limited View Mode
                </h3>
                <p className="text-gray-600 mb-4">
                  You're viewing basic user information from the Credit Score
                  page. For full functionality including activity history and
                  complete user management, please navigate from the User
                  Management page.
                </p>
                <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
                  <strong>Note:</strong> Some features are not available in this
                  view mode.
                </div>
              </div>
            </div>
          </>
        );
      } catch (error) {
        console.error("Error parsing stored user data", error);
      }
    }
    return <div className="p-6">Loading user data...</div>;
  }

  return (
    <>
      {/* User Profile Card - Only show for activity and orders tabs */}
      {/* {activeTab !== "chats" && (
        <UserProfileCard
          userId={currentUser.id}
          profileImage={currentUser.profileImage}
          isOnline={currentUser.isOnline}
          userFields={userFields}
          onEdit={handleEdit}
          onNotification={handleNotification}
          onError={handleError}
          disableNavigation={true}
          activeTab={
            activeTab === "activity"
              ? "Activity"
              : activeTab === "chats"
              ? "Chats"
              : "Orders"
          }
          onTabChange={(tab: string) => {
            if (tab === "Activity") setActiveTab("activity");
            else if (tab === "Chats") setActiveTab("chats");
            else if (tab === "Orders") setActiveTab("orders");
          }}
        />
      )} */}

      {/* User Profile Card - Only show for activity and orders tabs */}
      {/* {(activeTab === "activity" || activeTab === "orders") && (
        <UserProfileCard
          userId={currentUser.id}
          profileImage={currentUser.profileImage}
          isOnline={currentUser.isOnline}
          userFields={userFields}
          onEdit={handleEdit}
          onNotification={handleNotification}
          onError={handleError}
          disableNavigation={true}
          activeTab={
            activeTab === "activity"
              ? "Activity"
              : activeTab === "orders"
              ? "Orders"
              : "Chats"
          }
          onTabChange={(tab: string) => {
            if (tab === "Activity") setActiveTab("activity");
            else if (tab === "Chats") setActiveTab("chats");
            else if (tab === "Orders") setActiveTab("orders");
          }}
        />
      )} */}

      {activeTab === "activity" && (
        <UserProfileCard
          userId={displayUser.id}
          profileImage={
            selectedUserFromStorage
              ? selectedUserFromStorage.avatar
              : displayUser.profileImage
          }
          isOnline={
            selectedUserFromStorage
              ? selectedUserFromStorage.isOnline
              : displayUser.isOnline
          }
          userFields={userFields}
          onEdit={handleEdit}
          onNotification={handleNotification}
          onError={handleError}
          disableNavigation={true}
          activeTab="Activity"
          onTabChange={(tab: string) => {
            if (tab === "Activity") setActiveTab("activity");
            else if (tab === "Chats") setActiveTab("chats");
            else if (tab === "Orders") setActiveTab("orders");
          }}
        />
      )}

      {/* Tab Content */}
      {activeTab === "activity" && (
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Activity Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Date Filter Dropdown */}
              <div className="relative">
                <select className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option value="date">Date</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              {/* Bulk Action Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsBulkDropdownOpen(!isBulkDropdownOpen)}
                  className="flex items-center justify-between bg-[#992C55] text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-[#7d1f44] cursor-pointer min-w-[120px]"
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
                {isBulkDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="py-2">
                      <button
                        onClick={() => handleBulkAction("export-csv")}
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
                        onClick={() => handleBulkAction("export-pdf")}
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
                        onClick={() => handleBulkAction("ban")}
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
          </div>

          {/* Activity Content */}
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Activity</h2>

            {/* Activity Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectAllActivities}
                        onChange={handleSelectAllActivities}
                        className="rounded border-gray-300 text-[#992C55] focus:ring-[#992C55]"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={activity.checked || false}
                          onChange={() => handleActivityCheck(activity.id)}
                          className="rounded border-gray-300 text-[#992C55] focus:ring-[#992C55]"
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {activity.description}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {activity.date} - {activity.time}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Standalone Tab Navigation for Chats */}
      {activeTab === "chats" && (
        <div className="mr-5 ml-5 mt-5">
          <div className="flex justify-end mt-5">
            <div
              className="flex bg-gray-100 p-1 rounded-lg border border-gray-200"
              style={{ width: "280px", height: "50px" }}
            >
              <button
                onClick={() => setActiveTab("activity")}
                className="flex-1 py-2 px-4 rounded-md font-medium transition-colors cursor-pointer text-gray-600 hover:text-gray-800"
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab("chats")}
                className="flex-1 py-2 px-4 rounded-md font-medium transition-colors cursor-pointer bg-[#992C55] text-white shadow-sm"
              >
                Chats
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className="flex-1 py-2 px-4 rounded-md font-medium transition-colors cursor-pointer text-gray-600 hover:text-gray-800"
              >
                Orders
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chats Tab Content - Credit Score Page */}
      {activeTab === "chats" && (
        <div className="ml-5 mr-5 mt-10">
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
          <div className="flex flex-row justify-between items-center mt-8">
            <div>
              <p className="font-bold text-2xl">Agents</p>
            </div>
            <div>
              <form onSubmit={handleChatSearchSubmit} className="relative">
                <div className="relative flex items-center bg-white rounded-lg border border-gray-200 shadow-sm px-3 py-2 w-80 transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <img
                    src={images.MagnifyingGlass}
                    alt="Search"
                    className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
                  />
                  <input
                    type="text"
                    placeholder="Search Agents..."
                    value={chatSearchTerm}
                    onChange={handleChatSearchChange}
                    className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
                    disabled={isChatSearching}
                  />
                  {isChatSearching && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600 ml-2"></div>
                  )}
                  {chatSearchTerm && !isChatSearching && (
                    <button
                      type="button"
                      onClick={clearChatSearch}
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

          {/* Agents Table Section */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 max-w-full">
            <div className="w-full">
              <table className="w-full table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-1 py-4 text-left w-[3%]">
                      <input
                        type="checkbox"
                        checked={
                          selectedChats.length === finalFilteredChats.length &&
                          finalFilteredChats.length > 0
                        }
                        onChange={(e) => handleSelectAllChats(e.target.checked)}
                        className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                      />
                    </th>
                    <th className="px-2 py-4 text-left text-sm font-medium text-gray-700 w-[15%]">
                      Agent Name
                    </th>
                    <th className="px-2 py-4 text-left text-sm font-medium text-gray-700 w-[15%]">
                      Service
                    </th>
                    <th className="px-2 py-4 text-left text-sm font-medium text-gray-700 w-[12%]">
                      Order amount
                    </th>
                    <th className="px-2 py-4 text-center text-sm font-medium text-gray-700 w-[10%]">
                      No of photos
                    </th>
                    <th className="px-2 py-4 text-left text-sm font-medium text-gray-700 w-[18%]">
                      Date
                    </th>
                    <th className="px-2 py-4 text-center text-sm font-medium text-gray-700 w-[8%]">
                      status
                    </th>
                    <th className="px-2 py-4 text-center text-sm font-medium text-gray-700 w-[19%]">
                      More
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {finalFilteredChats.map((chat) => (
                    <ChatUserTableRow
                      key={chat.id}
                      chatData={chat}
                      isSelected={selectedChats.includes(chat.id)}
                      onSelectChange={handleSelectChat}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab Content */}
      {activeTab === "orders" && (
        <div className="mr-5 ml-5 mt-5">
          {/* Standalone Tab Navigation for Orders */}
          <div className="flex justify-end mt-5">
            <div
              className="flex bg-gray-100 p-1 rounded-lg border border-gray-200"
              style={{ width: "280px", height: "50px" }}
            >
              <button
                onClick={() => setActiveTab("activity")}
                className="flex-1 py-2 px-4 rounded-md font-medium transition-colors cursor-pointer text-gray-600 hover:text-gray-800"
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab("chats")}
                className="flex-1 py-2 px-4 rounded-md font-medium transition-colors cursor-pointer text-gray-600 hover:text-gray-800"
              >
                Chats
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className="flex-1 py-2 px-4 rounded-md font-medium transition-colors cursor-pointer bg-[#992C55] text-white shadow-sm"
              >
                Orders
              </button>
            </div>
          </div>

          {/* Order Statistics Cards */}
          <div className="flex flex-row gap-8 mt-10 justify-start">
            <OrderCard
              icon={images.totalOrders}
              title="Total Orders"
              value={orderStats.total}
              iconAlt="Total Orders"
            />

            <OrderCard
              icon={images.totalOrders}
              title="Active"
              value={orderStats.active}
              iconAlt="Active Orders"
            />

            <OrderCard
              icon={images.completeOrders}
              title="Completed"
              value={orderStats.completed}
              iconAlt="Completed Orders"
            />
          </div>

          {/* Action Buttons Row */}
          <div className="flex gap-3 mt-8">
            {/* Status Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsOrdersDropdownOpen(!isOrdersDropdownOpen)}
                className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer min-w-[120px]"
              >
                <span>{selectedOrdersFilter}</span>
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

              {isOrdersDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-full">
                  <button
                    onClick={() => handleOrdersFilterSelect("All")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleOrdersFilterSelect("Completed")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => handleOrdersFilterSelect("Pending")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleOrdersFilterSelect("Failed")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Failed
                  </button>
                </div>
              )}
            </div>

            {/* Service Type Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  setIsOrdersSecondDropdownOpen(!isOrdersSecondDropdownOpen)
                }
                className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer min-w-[150px]"
              >
                <span>
                  {selectedOrdersSecondFilter === "All"
                    ? "Service Type"
                    : selectedOrdersSecondFilter}
                </span>
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

              {isOrdersSecondDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-full">
                  <button
                    onClick={() => handleOrdersSecondFilterSelect("All")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
                  >
                    All
                  </button>
                  <button
                    onClick={() =>
                      handleOrdersSecondFilterSelect("Photo Editing")
                    }
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
                  >
                    Photo Editing
                  </button>
                  <button
                    onClick={() =>
                      handleOrdersSecondFilterSelect("Photo Manipulation")
                    }
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
                  >
                    Photo Manipulation
                  </button>
                </div>
              )}
            </div>

            {/* Date Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  setIsOrdersDateDropdownOpen(!isOrdersDateDropdownOpen)
                }
                className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer min-w-[120px]"
              >
                <span>{selectedOrdersDateFilter}</span>
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

              {isOrdersDateDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-full">
                  <button
                    onClick={() => handleOrdersDateFilterSelect("Date")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Date
                  </button>
                  <button
                    onClick={() => handleOrdersDateFilterSelect("Today")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => handleOrdersDateFilterSelect("This Week")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
                  >
                    This Week
                  </button>
                  <button
                    onClick={() => handleOrdersDateFilterSelect("This Month")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
                  >
                    This Month
                  </button>
                  <button
                    onClick={() => handleOrdersDateFilterSelect("Custom Range")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
                  >
                    Custom Range
                  </button>
                </div>
              )}
            </div>

            {/* Bulk Action Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  setIsOrdersBulkActionDropdownOpen(
                    !isOrdersBulkActionDropdownOpen
                  )
                }
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

              {isOrdersBulkActionDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    <button
                      onClick={() => handleOrdersBulkActionSelect("export-csv")}
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
                      onClick={() => handleOrdersBulkActionSelect("export-pdf")}
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
                      onClick={() => handleOrdersBulkActionSelect("ban")}
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

          {/* Orders Title and Search Bar */}
          <div className="flex justify-between items-center mt-4 mb-4">
            <div>
              <p className="font-bold text-2xl">Orders</p>
              {/* Active Filters Display */}
              {(selectedOrdersFilter !== "All" ||
                selectedOrdersSecondFilter !== "All" ||
                selectedOrdersDateFilter !== "Date") && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {selectedOrdersFilter !== "All" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Status: {selectedOrdersFilter}
                      <button
                        onClick={() => setSelectedOrdersFilter("All")}
                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedOrdersSecondFilter !== "All" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Service: {selectedOrdersSecondFilter}
                      <button
                        onClick={() => setSelectedOrdersSecondFilter("All")}
                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-600"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedOrdersDateFilter !== "Date" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Date: {selectedOrdersDateFilter}
                      <button
                        onClick={() => setSelectedOrdersDateFilter("Date")}
                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-600"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
            <div>
              <form onSubmit={handleOrdersSearchSubmit} className="relative">
                <div className="relative flex items-center bg-white rounded-lg border border-gray-200 shadow-sm px-3 py-2 w-80 transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <img
                    src={images.MagnifyingGlass}
                    alt="Search"
                    className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
                  />
                  <input
                    type="text"
                    placeholder="Search Orders..."
                    value={ordersSearchTerm}
                    onChange={handleOrdersSearchChange}
                    className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
                  />
                  {ordersSearchTerm && (
                    <button
                      type="button"
                      onClick={clearOrdersSearch}
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

          {/* Orders Table */}
          <div className="mt-4">
            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
              Showing {finalOrdersFilteredData.length} of {tableData.length}{" "}
              orders
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {finalOrdersFilteredData.length === 0 &&
              (ordersSearchTerm ||
                selectedOrdersFilter !== "All" ||
                selectedOrdersSecondFilter !== "All" ||
                selectedOrdersDateFilter !== "Date") ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-12 h-12 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No orders found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    No orders match your current filters. Try adjusting your
                    search terms or filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedOrdersFilter("All");
                      setSelectedOrdersSecondFilter("All");
                      setSelectedOrdersDateFilter("Date");
                      setOrdersSearchTerm("");
                    }}
                    className="bg-[#992C55] text-white px-4 py-2 rounded-lg hover:bg-[#7d1f44] transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Agent Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Editor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {finalOrdersFilteredData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                <img
                                  src={item.customerImage}
                                  alt={item.customerName}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLElement;
                                    target.style.display = "none";
                                    const parent = target.parentElement;
                                    if (parent) {
                                      parent.innerHTML = `<div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                                        <span class="text-white font-medium text-sm">${item.customerName.charAt(
                                          0
                                        )}</span>
                                      </div>`;
                                    }
                                  }}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.customerName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.serviceName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                <img
                                  src={item.editorImage}
                                  alt={item.editor}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLElement;
                                    target.style.display = "none";
                                    const parent = target.parentElement;
                                    if (parent) {
                                      parent.innerHTML = `<div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                        <span class="text-gray-600 font-medium text-sm">${item.editor.charAt(
                                          0
                                        )}</span>
                                      </div>`;
                                    }
                                  }}
                                />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.editor}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.date} - {item.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                item.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : item.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleViewOrder(item)}
                                className="bg-[#992C55] cursor-pointer hover:bg-[#7a1e42] text-white px-4 py-3 rounded-2xl  text-xs"
                              >
                                View Order
                              </button>
                              <button
                                onClick={() =>
                                  handleViewChat(item.customerName)
                                }
                                className="bg-[#004B51] cursor-pointer hover:bg-teal-700 text-white px-4 py-3 rounded-2xl  text-xs"
                              >
                                View Chat
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal for Chats Tab */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
      />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={currentUser}
        onUpdateUser={handleUpdateUser}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        orderData={selectedOrderData}
      />

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={handleCloseChatModal}
        orderData={
          selectedAgentName
            ? {
                id: 999,
                customerName: selectedAgentName,
                customerImage: "",
                serviceName: "Photo Editing",
                status: "Pending",
                amount: "$0.00",
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                editor: "Support Agent",
                editorImage: "",
              }
            : null
        }
      />

      {/* Questionnaire Modal */}
      {isQuestionnaireModalOpen && selectedChatData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[95vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="font-medium text-lg">Questionnaire</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-500 cursor-pointer hover:text-gray-700">
                  <img src={images.send} alt="" />
                </button>
                <button
                  onClick={handleShareClick}
                  className="text-gray-500 cursor-pointer hover:text-gray-700"
                >
                  <img src={images.share} alt="" />
                </button>
                <button
                  onClick={handleCloseQuestionnaireModal}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <svg
                    className="w-6 h-6"
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
              </div>
            </div>

            {/* Questionnaire Content */}
            <div className="p-4 max-h-[75vh] overflow-y-auto">
              {/* Face Section */}
              <div className="mb-6">
                <div className="bg-[#992C55] text-white p-3 rounded-t-lg flex items-center gap-2">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-[#992C55] text-sm font-bold">1</span>
                  </div>
                  <span className="font-medium">Face</span>
                </div>
                <div className="bg-pink-50 p-3 rounded-b-lg">
                  <p className="text-sm text-gray-600 mb-3">
                    Select one or multiple options
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <span className="text-sm text-gray-800">
                        Little/natural Makeup
                      </span>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <span className="text-sm text-gray-800">
                        Excess Makeup
                      </span>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <span className="text-sm text-gray-800">No Makeup</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skin Section */}
              <div className="mb-6">
                <div className="bg-[#992C55] text-white p-3 rounded-t-lg flex items-center gap-2">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-[#992C55] text-sm font-bold">2</span>
                  </div>
                  <span className="font-medium">Skin</span>
                </div>
                <div className="bg-pink-50 p-3 rounded-b-lg">
                  <p className="text-sm text-gray-600 mb-3">
                    Select one or multiple options
                  </p>

                  <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                    <span className="text-sm text-gray-800 font-medium">
                      Maintain skin tone
                    </span>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                    <div className="mb-2">
                      <span className="text-sm text-gray-800 font-medium">
                        Lighter
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="little"
                          name="lighter"
                          className="w-3 h-3"
                        />
                        <label
                          htmlFor="little"
                          className="text-sm text-gray-600"
                        >
                          A little
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="veryLight"
                          name="lighter"
                          className="w-3 h-3"
                        />
                        <label
                          htmlFor="veryLight"
                          className="text-sm text-gray-600"
                        >
                          Very light
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="extremelyLight"
                          name="lighter"
                          className="w-3 h-3"
                        />
                        <label
                          htmlFor="extremelyLight"
                          className="text-sm text-gray-600"
                        >
                          Extremely light
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="mb-2">
                      <span className="text-sm text-gray-800 font-medium">
                        Darker
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="littleDark"
                          name="darker"
                          className="w-3 h-3"
                        />
                        <label
                          htmlFor="littleDark"
                          className="text-sm text-gray-600"
                        >
                          A little
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="veryDark"
                          name="darker"
                          className="w-3 h-3"
                        />
                        <label
                          htmlFor="veryDark"
                          className="text-sm text-gray-600"
                        >
                          Very Dark
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="extremelyDark"
                          name="darker"
                          className="w-3 h-3"
                        />
                        <label
                          htmlFor="extremelyDark"
                          className="text-sm text-gray-600"
                        >
                          Extremely Dark
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCloseShareModal}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="font-medium text-lg">Share to</span>
              </div>
              <button
                onClick={handleCloseShareModal}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
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
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search Chats"
                  value={shareSearchTerm}
                  onChange={(e) => setShareSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent"
                />
              </div>
            </div>

            {/* Contacts List */}
            <div className="max-h-[60vh] overflow-y-auto">
              {Array.from({ length: 9 }, (_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="/assets/layout/Sasha.png"
                        alt="Sasha"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Sasha</div>
                      <div className="text-xs text-gray-500">
                        Last chat with Adewale
                      </div>
                    </div>
                  </div>
                  <button className="bg-[#992C55] text-white px-4 py-1 rounded text-sm hover:bg-[#7d1f44] cursor-pointer">
                    Share
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUser;
