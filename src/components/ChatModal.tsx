import React, { useState } from "react";
import { createPortal } from "react-dom";
import type { TableData } from "../constants/tableData";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: TableData | null;
}

const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  orderData,
}) => {
  if (!isOpen || !orderData) return null;

  const agentName = orderData.editor;
  const customerName = orderData.customerName;
  const orderType = orderData.serviceName;
  const [chatMessages] = useState([
    {
      id: "1",
      type: "system" as const,
      message: "A customer care agent will be with you shortly",
      timestamp: "09:23 AM",
    },
    {
      id: "2",
      type: "system" as const,
      message: `@${agentName} has joined the chat`,
      timestamp: "09:23 AM",
    },
    {
      id: "3",
      type: "agent" as const,
      message: "Welcome to edits by Mercy",
      timestamp: "09:23 AM",
      sender: agentName,
    },
    {
      id: "4",
      type: "user" as const,
      message: "Thank you",
      timestamp: "09:23 AM",
    },
  ]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="font-medium text-lg">Chat - {agentName}</span>
            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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

        {/* New Order Section */}
        <div className="p-4 bg-[#992C55] text-white">
          <div className="flex items-center gap-2 mb-4">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-medium">New Order</span>
          </div>

          <div className="space-y-2">
            <div className="bg-white bg-opacity-30 rounded-lg p-3 flex justify-between items-center">
              <span className="text-sm text-gray-600">Name</span>
              <span className="text-sm font-medium text-gray-800">
                {customerName}
              </span>
            </div>
            <div className="bg-white bg-opacity-30 rounded-lg p-3 flex justify-between items-center">
              <span className="text-sm text-gray-600">Order type</span>
              <span className="text-sm font-medium text-gray-800">
                {orderType}
              </span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
          {chatMessages.map((message) => {
            if (message.type === "system") {
              return (
                <div
                  key={message.id}
                  className={`rounded-lg p-3 text-center ${
                    message.message.includes("customer care")
                      ? "bg-pink-100"
                      : "bg-blue-100"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      message.message.includes("customer care")
                        ? "text-pink-800"
                        : "text-blue-800"
                    }`}
                  >
                    {message.message}
                  </p>
                </div>
              );
            }

            if (message.type === "agent") {
              return (
                <div key={message.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-700">
                      {agentName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3 mb-1">
                      <p className="text-sm text-gray-800">{message.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              );
            }

            if (message.type === "user") {
              return (
                <div key={message.id} className="flex justify-end">
                  <div className="bg-[#992C55] text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">{message.message}</p>
                    <span className="text-xs opacity-75 block mt-1">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ChatModal;
