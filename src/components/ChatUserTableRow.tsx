import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface ChatTableData {
  id: string;
  agentName: string;
  avatar: string;
  service: string;
  serviceType:
    | "Photo Editing"
    | "Photo Manipulation"
    | "Design"
    | "Video Editing";
  orderAmount: string;
  numberOfPhotos: number;
  date: string;
  status: "active" | "inactive";
  isOnline: boolean;
}

interface ChatUserTableRowProps {
  chatData: ChatTableData;
  isSelected: boolean;
  onSelectChange: (id: string, selected: boolean) => void;
}

const ChatUserTableRow: React.FC<ChatUserTableRowProps> = ({
  chatData,
  isSelected,
  onSelectChange,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleButtonAction = (action: "chat" | "questionnaire") => {
    if (action === "chat") {
      // Navigate to chat modal with the correct parameter format
      const params = new URLSearchParams(searchParams);
      params.set("openModal", "chat");
      params.set("userId", chatData.id);
      navigate(`?${params.toString()}`, { replace: true });
    } else if (action === "questionnaire") {
      // Navigate to questionnaire modal with the correct parameter format
      const params = new URLSearchParams(searchParams);
      params.set("openModal", "questionnaire");
      params.set("userId", chatData.id);
      navigate(`?${params.toString()}`, { replace: true });
    }
  };

  const getNotificationCount = (action: "chat" | "questionnaire"): number => {
    // Return notification count based on action and agent
    if (action === "chat") {
      // Some agents might have unread messages
      return chatData.id === "1" ||
        chatData.id === "3" ||
        chatData.id === "4" ||
        chatData.id === "9"
        ? 1
        : 0;
    }
    return 0;
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      {/* Checkbox */}
      <td className="px-1 py-4 w-[3%]">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelectChange(chatData.id, e.target.checked)}
          className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
        />
      </td>

      {/* Agent Name with Avatar */}
      <td className="px-2 py-4 w-[15%]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={chatData.avatar}
              alt={chatData.agentName}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/assets/layout/admin.png";
              }}
            />
          </div>
          <span className="text-sm font-medium text-gray-900 truncate">
            {chatData.agentName}
          </span>
        </div>
      </td>

      {/* Service */}
      <td className="px-2 py-4 w-[15%]">
        <span className="text-sm text-gray-600">{chatData.service}</span>
      </td>

      {/* Order Amount */}
      <td className="px-2 py-4 w-[12%]">
        <span className="text-sm font-medium text-gray-900">
          {chatData.orderAmount}
        </span>
      </td>

      {/* No of Photos */}
      <td className="px-2 py-4 text-center w-[10%]">
        <span className="text-sm text-gray-600">{chatData.numberOfPhotos}</span>
      </td>

      {/* Date */}
      <td className="px-2 py-4 w-[18%]">
        <span className="text-sm text-gray-600">{chatData.date}</span>
      </td>

      {/* Status */}
      <td className="px-2 py-4 text-center w-[8%]">
        <div className="flex justify-center">
          <div
            className={`w-3 h-3 rounded-full ${
              chatData.status === "active" ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </div>
      </td>

      {/* More Actions */}
      <td className="px-2 py-4 w-[19%]">
        <div className="flex gap-2 justify-center">
          {/* View Chat Button */}
          <button
            onClick={() => handleButtonAction("chat")}
            className="relative bg-[#992C55] text-white px-3.5 py-2.5 rounded-md text-xs font-medium hover:bg-[#7d1f44] transition-colors"
          >
            View Chat
            {getNotificationCount("chat") > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {getNotificationCount("chat")}
              </span>
            )}
          </button>

          {/* Questionnaire Button */}
          <button
            onClick={() => handleButtonAction("questionnaire")}
            className="relative bg-[#004B51] text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-[#003a3f] transition-colors"
          >
            Questionnaire
            {getNotificationCount("questionnaire") > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {getNotificationCount("questionnaire")}
              </span>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ChatUserTableRow;
