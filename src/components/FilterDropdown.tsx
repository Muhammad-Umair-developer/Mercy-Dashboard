import React from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelect?: (value: string) => void;
  onChange?: (value: string) => void;
  selectedValue?: string;
  value?: string;
  options: FilterOption[] | string[];
  className?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isOpen,
  onToggle,
  onSelect,
  onChange,
  selectedValue,
  value,
  options,
  className = "",
}) => {
  // Determine the display value
  const displayValue = value || selectedValue || "";

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    if (onSelect) onSelect(optionValue);
    if (onChange) onChange(optionValue);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={onToggle}
        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-3 whitespace-nowrap min-w-fit"
      >
        {displayValue}
        <svg
          className="w-4 h-4 flex-shrink-0"
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
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-full">
          {options.map((option, index) => {
            // Handle both string options and FilterOption objects
            const optionValue =
              typeof option === "string" ? option : option.value;
            const optionLabel =
              typeof option === "string" ? option : option.label;

            return (
              <button
                key={index}
                onClick={() => handleSelect(optionValue)}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
              >
                {optionLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
