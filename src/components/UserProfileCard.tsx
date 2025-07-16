import { useState } from "react";
import images from "../constants/images";
import { useNavigate } from "react-router-dom";

interface UserField {
  id: string;
  label: string;
  value: string;
  type?: "text" | "password" | "email" | "tel" | "date";
}

interface UserProfileCardProps {
  userId: string;
  profileImage?: string;
  isOnline?: boolean;
  userFields: UserField[];
  onEdit?: () => void;
  onNotification?: (userId: string) => void;
  onError?: (userId: string) => void;
  disableNavigation?: boolean; // New prop to disable internal navigation
  activeTab?: string; // Allow parent to control active tab
  onTabChange?: (tab: string) => void; // Callback for tab changes
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  userId,
  profileImage = images.adewale,
  isOnline = true,
  userFields,
  onEdit,
  onNotification,
  onError,
  disableNavigation = false,
  activeTab: parentActiveTab,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<"Activity" | "Chats" | "Orders">(
    "Activity"
  );
  const navigate = useNavigate();

  // Use parent's active tab if provided, otherwise use internal state
  const currentActiveTab = parentActiveTab || activeTab;

  const toggleButtons = [
    { label: "Activity", value: "Activity" as const },
    { label: "Chats", value: "Chats" as const },
    { label: "Orders", value: "Orders" as const },
  ];

  const actionButtons = [
    {
      icon: images.edit,
      action: () => onEdit?.(),
      alt: "Edit user",
    },
    {
      icon: images.userNotification,
      action: () => onNotification?.(userId),
      alt: "Send notification",
    },
    {
      icon: images.error,
      action: () => onError?.(userId),
      alt: "Report error",
    },
  ];

  return (
    <div className="mr-5 ml-5 mt-5">
      {/* Toggle Button Group */}
      <div className="flex justify-end mt-5">
        <div
          className="flex bg-gray-100 p-1 rounded-lg border border-gray-200"
          style={{ width: "280px", height: "50px" }}
        >
          {toggleButtons.map((button) => (
            <button
              key={button.value}
              onClick={() => {
                if (disableNavigation) {
                  // Let parent handle tab changes
                  onTabChange?.(button.value);
                } else {
                  // Use original navigation logic
                  if (button.value === "Chats") {
                    // Navigate to the UserChats page when Chats button is clicked
                    navigate("/user-mgt/chats");
                  } else if (button.value === "Orders") {
                    // Navigate to the Orders page when Orders button is clicked
                    navigate("/orders");
                  } else {
                    // Stay on current page for Activity tab
                    setActiveTab(button.value);
                  }
                }
              }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors cursor-pointer ${
                currentActiveTab === button.value
                  ? "bg-[#992C55] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Card */}
      <div className="w-full h-[100px] mt-5 relative">
        <img
          src={images.userbackground}
          alt=""
          className="w-full h-[346px] rounded-2xl object-cover"
        />

        {/* User Profile Card Overlay */}
        <div className="absolute top-6 left-5 right-5 bg-none rounded-xl p-4 shadow-lg w-[1150px] h-[300px]">
          {/* Profile Picture and Online Status */}
          <div className="flex items-start mb-4 gap-8">
            <div className="flex flex-col">
              <div className="flex flex-col items-center">
                <div className="w-[134px] h-[134px] bg-gray-300 rounded-full overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center mt-2">
                  <img
                    className="w-[60px] h-[20px]"
                    src={isOnline ? images.online : "/assets/users/offline.svg"}
                    alt={isOnline ? "Online" : "Offline"}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row gap-2 mt-5">
                {actionButtons.map((button, index) => (
                  <div
                    key={index}
                    className="cursor-pointer hover:opacity-70 transition-opacity duration-200 p-1 rounded-lg hover:bg-gray-100"
                    onClick={button.action}
                  >
                    <img
                      src={button.icon}
                      className="w-15 h-15"
                      alt={button.alt}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* User Information Fields */}
            <div className="flex-1 grid grid-cols-2 gap-4 ml-15">
              {userFields.map((field) => (
                <div key={field.id}>
                  <div className="bg-none rounded-lg p-3 border-[#9D9D9D] border-2 w-100">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      {field.label}
                    </label>
                    <div className="text-gray-900 font-medium">
                      {field.type === "password" ? "**********" : field.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-10 px-5">
        {activeTab === "Activity" && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium mb-4">User Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <p className="text-sm">User logged in today at 08:45 AM</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <p className="text-sm">Updated profile picture 2 days ago</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <p className="text-sm">Placed an order 3 days ago</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                <p className="text-sm">Added payment method 1 week ago</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Chats" && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-center text-gray-500">
              Redirecting to chats page...
            </p>
          </div>
        )}

        {activeTab === "Orders" && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium mb-4">User Orders</h3>
            <p className="text-gray-500">No orders to display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
