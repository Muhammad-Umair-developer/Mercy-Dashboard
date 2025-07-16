import React from "react";

interface ActiveFilter {
  type: string;
  value: string;
  onRemove: () => void;
  bgColor: string;
  textColor: string;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters }) => {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <span className="text-sm text-gray-600">Active filters:</span>
      {filters.map((filter, index) => (
        <span
          key={index}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${filter.bgColor} ${filter.textColor}`}
        >
          {filter.type}: {filter.value}
          <button
            onClick={filter.onRemove}
            className={`ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-opacity-20`}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
};

export default ActiveFilters;
