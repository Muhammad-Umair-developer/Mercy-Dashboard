import { useState, useMemo } from "react";
import type { AdminUser } from "../constants/adminTableData";

export const useAdminSearch = (adminData: AdminUser[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Filter admins based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return adminData;
    }

    const searchLower = searchTerm.toLowerCase();

    return adminData.filter((admin) => {
      // Search in name, email, role
      return (
        admin.name.toLowerCase().includes(searchLower) ||
        admin.email.toLowerCase().includes(searchLower) ||
        admin.role.toLowerCase().includes(searchLower)
      );
    });
  }, [adminData, searchTerm]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Simulate search loading state for better UX
    if (value.trim()) {
      setIsSearching(true);
      const timeoutId = setTimeout(() => {
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setIsSearching(false);
    }
  };

  // Handle search form submission (optional)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this could trigger an API call
    console.log("Admin search submitted:", searchTerm);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  return {
    searchTerm,
    filteredData,
    isSearching,
    handleSearchChange,
    handleSearchSubmit,
    clearSearch,
  };
};
