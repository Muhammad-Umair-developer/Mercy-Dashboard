import type { User } from "../constants/usersTableData";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import images from "../constants/images";
import ChatModal from "./ChatModal";
import { type ChatTableData } from "../constants/chatTableData";

interface CreditScoreUserTableRowProps {
  user: User;
  isSelected: boolean;
  onSelectChange: (userId: number, isSelected: boolean) => void;
}

const chatUserTableRow = ({
  user,
  isSelected,
  onSelectChange,
}: CreditScoreUserTableRowProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Modal states
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedAgentName, setSelectedAgentName] = useState<string>("");
  const [isQuestionnaireModalOpen, setIsQuestionnaireModalOpen] =
    useState(false);
  const [selectedChatData, setSelectedChatData] =
    useState<ChatTableData | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareSearchTerm, setShareSearchTerm] = useState("");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle button actions
  const handleButtonAction = (action: string) => {
    if (action === "more") {
      setIsDropdownOpen(!isDropdownOpen);
      return;
    }

    // Close dropdown when action is selected
    setIsDropdownOpen(false);

    switch (action) {
      case "view-chat":
        console.log("View Chat clicked for user:", user.name);
        setSelectedAgentName(user.name);
        setIsChatModalOpen(true);
        break;
      case "questionnaire":
        console.log("Questionnaire clicked for user:", user.name);
        // Create a dummy chat data object for the modal
        const dummyChatData: ChatTableData = {
          id: user.id.toString(),
          agentName: user.name,
          avatar: user.avatar,
          service: "Photo Editing",
          serviceType: "Photo Editing",
          orderAmount: "$0.00",
          numberOfPhotos: 0,
          date: new Date().toLocaleDateString(),
          status: "active",
          isOnline: user.isOnline,
        };
        setSelectedChatData(dummyChatData);
        setIsQuestionnaireModalOpen(true);
        break;
      case "view-customer-profile":
        console.log("View Customer Profile clicked for user:", user.name);
        // Prepare user data for the AddUser page
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          dateRegistered: user.dateRegistered,
          isOnline: user.isOnline,
          avatar: user.avatar,
          orders: user.orders,
        };

        // Store user data in localStorage for the AddUser page
        localStorage.setItem("selectedUser", JSON.stringify(userData));
        localStorage.setItem("userProfileReferrer", "credit-score");

        // Navigate to AddUser page
        navigate(`/users/add`);
        break;
      default:
        break;
    }
  };

  // Modal handler functions
  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedAgentName("");
  };

  const handleCloseQuestionnaireModal = () => {
    setIsQuestionnaireModalOpen(false);
    setSelectedChatData(null);
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="px-1 py-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelectChange(user.id, e.target.checked)}
            className="w-4 h-4 text-purple-600 rounded border-gray-300 ml-2 focus:ring-purple-500"
          />
        </td>
        <td className="px-2 py-4">
          <div className="flex items-center">
            <img
              src={user.avatar}
              alt=""
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="font-medium text-gray-900">{user.name}</span>
          </div>
        </td>
        <td className="px-1 py-4 text-gray-600">{user.email}</td>
        <td className="px-1 py-4 text-gray-600">{user.phone}</td>
        <td className="px-1 py-4 text-gray-600 text-center">{user.orders}</td>
        <td className="px-3 py-4 text-gray-600">{user.dateRegistered}</td>
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
          <div className="flex items-center justify-center gap-2 relative">
            {/* More Actions - Dots Button */}
            <button
              onClick={() => handleButtonAction("more")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <img src={images.dots} alt="More actions" className="w-10 h-10" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute cursor-pointer mt-5 mr-5 border-[#989898] border-[0.5px]   right-0 top-10 bg-white shadow-lg rounded-2xl  py-2 z-50 w-[260px] h-[192px] p-5"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-row gap-5 ">
                    <div>
                      <img className="w-6 h-6" src={images.chat} alt="" />
                    </div>
                    <div>
                      <button
                        onClick={() => handleButtonAction("view-chat")}
                        className="flex cursor-pointer justify-center items-center"
                      >
                        View Chat
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row gap-5">
                    <div>
                      <img className="w-6 h-6" src={images.Notepad} alt="" />
                    </div>
                    <div>
                      <button
                        onClick={() => handleButtonAction("questionnaire")}
                        className="flex justify-center items-center cursor-pointer"
                      >
                        Questionnaire
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row gap-5">
                    <div>
                      <img className="w-6 h-6" src={images.User} alt="" />
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          handleButtonAction("view-customer-profile")
                        }
                        className="flex justify-center items-center cursor-pointer"
                      >
                        View Customer Profile
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row gap-5">
                    <div>
                      <img className="w-6 h-6" src={images.User} alt="" />
                    </div>
                    <div>
                      <button className="flex justify-center items-center cursor-pointer">
                        View Agent Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </td>
      </tr>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={handleCloseChatModal}
        orderData={
          selectedAgentName
            ? {
                id: 999,
                customerName: selectedAgentName,
                customerImage: user.avatar,
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

export default chatUserTableRow;
