import { useState, useCallback, useEffect } from "react";
import type { TableData } from "../constants/tableData";

// Custom hook for order search functionality
// Backend developers can modify this hook to integrate with their API
export const useOrderSearch = (initialData: TableData[]) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TableData[]>(initialData);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Update filtered data when initial data changes (but not when search term changes)
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(initialData);
    } else {
      // Only re-apply search if we have a search term and data changed
      const filtered = initialData.filter(
        (item) =>
          item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.amount.toString().includes(searchTerm) ||
          item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.editor.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [initialData]); // Removed searchTerm dependency

  // Search function - replace with actual API call
  const performSearch = useCallback(
    async (query: string) => {
      setIsSearching(true);
      setError(null);

      try {
        // TODO: Replace with actual API call
        // Example API integration:
        // const response = await fetch(`/api/orders/search?q=${encodeURIComponent(query)}`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        // })
        //
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`)
        // }
        //
        // const data = await response.json()
        // setFilteredData(data.orders || [])

        // For now, filter locally (remove this when API is integrated)
        await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate API delay

        if (query.trim() === "") {
          setFilteredData(initialData);
        } else {
          const filtered = initialData.filter(
            (item) =>
              item.customerName.toLowerCase().includes(query.toLowerCase()) ||
              item.serviceName.toLowerCase().includes(query.toLowerCase()) ||
              item.editor.toLowerCase().includes(query.toLowerCase()) ||
              item.status.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredData(filtered);
        }
      } catch (error) {
        console.error("Search error:", error);
        setError(error instanceof Error ? error.message : "Search failed");
        // Keep previous data on error
      } finally {
        setIsSearching(false);
      }
    },
    [initialData]
  );

  // Handle search input change - allow free typing without restrictions
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Immediate local filtering without debounce for better UX
    if (value.trim() === "") {
      setFilteredData(initialData);
    } else {
      const filtered = initialData.filter(
        (item) =>
          item.customerName.toLowerCase().includes(value.toLowerCase()) ||
          item.serviceName.toLowerCase().includes(value.toLowerCase()) ||
          item.editor.toLowerCase().includes(value.toLowerCase()) ||
          item.status.toLowerCase().includes(value.toLowerCase()) ||
          item.amount.toString().includes(value) ||
          item.date.toLowerCase().includes(value.toLowerCase())
      );
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

  // Manual search function that can be triggered by form submit
  const triggerSearch = useCallback(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(initialData);
    } else {
      performSearch(searchTerm);
    }
  }, [searchTerm, initialData, performSearch]);

  return {
    searchTerm,
    filteredData,
    isSearching,
    error,
    handleSearchChange,
    handleSearchSubmit,
    clearSearch,
    performSearch,
    triggerSearch,
  };
};

// Advanced search hook with filters (for future use)
export const useAdvancedOrderSearch = (initialData: TableData[]) => {
  const basicSearch = useOrderSearch(initialData);
  const [filters, setFilters] = useState({
    status: "",
    dateRange: { start: "", end: "" },
    amountRange: { min: 0, max: 0 },
  });

  // Apply filters function
  const applyFilters = useCallback(
    (data: TableData[]) => {
      return data.filter((item) => {
        if (filters.status && item.status !== filters.status) return false;
        // Add more filter logic here
        return true;
      });
    },
    [filters]
  );

  return {
    ...basicSearch,
    filters,
    setFilters,
    applyFilters,
  };
};
