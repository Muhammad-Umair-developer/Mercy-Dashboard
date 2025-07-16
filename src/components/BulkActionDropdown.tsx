import React from "react";

interface BulkAction {
  value: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

interface BulkActionDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (action: string) => void;
  actions: BulkAction[];
}

const BulkActionDropdown: React.FC<BulkActionDropdownProps> = ({
  isOpen,
  onToggle,
  onSelect,
  actions,
}) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
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

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="py-2">
            {actions.map((action, index) => (
              <React.Fragment key={action.value}>
                {index === 2 && <hr className="my-2" />}
                <button
                  onClick={() => onSelect(action.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center ${
                    action.className || "text-gray-700"
                  }`}
                >
                  {action.icon}
                  {action.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActionDropdown;
