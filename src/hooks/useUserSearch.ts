import { useState, useCallback, useEffect } from "react";
import type { User } from "../constants/usersTableData";

// Custom hook for user search functionality
// Backend developers can modify this hook to integrate with their API
export const useUserSearch = (initialData: User[]) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<User[]>(initialData);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Update filtered data when initial data changes (but not when search term changes)
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(initialData);
    } else {
      // Only re-apply search if we have a search term and data changed
      const filtered = initialData.filter((user) => {
        const searchableFields = [
          user.name,
          user.email,
          user.phone,
          user.dateRegistered,
          user.isOnline ? "online" : "offline",
          user.orders.toString(),
        ];

        return searchableFields.some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  }, [initialData]); // Removed searchTerm dependency

  // Handle search input change - allow free typing without restrictions
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Immediate local filtering without debounce for better UX
    if (value.trim() === "") {
      setFilteredData(initialData);
    } else {
      const filtered = initialData.filter((user) => {
        const searchableFields = [
          user.name,
          user.email,
          user.phone,
          user.dateRegistered,
          user.isOnline ? "online" : "offline",
          user.orders.toString(),
        ];

        return searchableFields.some((field) =>
          field.toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  };

  // Handle search form submission - prevent form submission to avoid page reload
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by handleSearchChange, no need to do anything else
  };

  // Clear search with immediate effect
  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setFilteredData(initialData);
    setError(null);
    setIsSearching(false);
  }, [initialData]);

  return {
    searchTerm,
    filteredData,
    isSearching,
    error,
    handleSearchChange,
    handleSearchSubmit,
    clearSearch,
  };
};
