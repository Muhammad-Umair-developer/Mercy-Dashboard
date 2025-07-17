import { useState } from "react";
import { agentsData, type ChatAgent } from "../constants/agentsData";

interface AgentChatCardProps {
  onViewAll: () => void;
  maxVisible?: number;
}

const AgentChatCard = ({ onViewAll, maxVisible = 4 }: AgentChatCardProps) => {
  // Sample data - Backend developers can replace this with API call
  const [agents] = useState<ChatAgent[]>(agentsData);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Photo Editing":
        return "bg-red-50 text-red-500";
      case "Photo Manipulation":
        return "bg-purple-50 text-purple-500";
      case "Design":
        return "bg-blue-50 text-blue-500";
      case "Video Editing":
        return "bg-green-50 text-green-500";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  // Get only the visible agents based on maxVisible prop
  const visibleAgents = agents.slice(0, maxVisible);

  return (
    <div className="bg-white rounded-xl border border-[#DADADA] h-83 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
        <h3 className="font-medium text-gray-900 text-sm">
          Active Agents Chats
        </h3>
        <button
          onClick={onViewAll}
          className="bg-[#992C55] cursor-pointer hover:bg-[#7a1e42] text-white text-xs px-3.5 py-2.5 rounded-md font-medium"
        >
          View All
        </button>
      </div>

      {/* Agents List */}
      <div className="divide-y divide-gray-100">
        {visibleAgents.map((agent) => (
          <div key={agent.id} className="px-4 py-2 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span class="text-white font-medium text-xs">${agent.name.charAt(
                          0
                        )}</span>
                      </div>`;
                    }
                  }}
                />
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-xs">{agent.name}</p>
                    <p className="text-xs text-gray-600 truncate">
                      {agent.message}
                    </p>
                  </div>
                  <div className="flex flex-col items-end ml-2">
                    <span
                      className={`text-xs px-2 py-0.5 border-[#FF0000] border rounded-full ${getTypeColor(
                        agent.type
                      )}`}
                    >
                      {agent.type}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {agent.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentChatCard;
