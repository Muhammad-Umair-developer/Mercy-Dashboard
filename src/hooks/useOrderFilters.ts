import { useState, useMemo } from "react";
import { tableData } from "../constants/tableData";

export const useOrderFilters = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSecondFilter, setSelectedSecondFilter] = useState("All");
  const [selectedDateFilter, setSelectedDateFilter] = useState("Date");
  const [searchTerm, setSearchTerm] = useState("");
  const [isBulkActionDropdownOpen, setIsBulkActionDropdownOpen] =
    useState(false);

  const searchFilteredData = useMemo(() => {
    if (searchTerm.trim() === "") return tableData;

    return tableData.filter(
      (item) =>
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.editor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const finalFilteredData = useMemo(() => {
    let data = searchFilteredData;

    // Filter by status (first filter)
    if (selectedFilter !== "All") {
      data = data.filter((item) => item.status === selectedFilter);
    }

    // Filter by service type (second filter)
    if (selectedSecondFilter !== "All") {
      data = data.filter((item) => item.serviceName === selectedSecondFilter);
    }

    // Filter by date (third filter)
    if (selectedDateFilter !== "Date") {
      const today = new Date();
      data = data.filter((item) => {
        const itemDate = new Date(item.date);

        switch (selectedDateFilter) {
          case "Today":
            return itemDate.toDateString() === today.toDateString();
          case "This Week":
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return itemDate >= weekAgo;
          case "This Month":
            return (
              itemDate.getMonth() === today.getMonth() &&
              itemDate.getFullYear() === today.getFullYear()
            );
          default:
            return true;
        }
      });
    }

    return data;
  }, [
    searchFilteredData,
    selectedFilter,
    selectedSecondFilter,
    selectedDateFilter,
  ]);

  const orderStats = useMemo(() => {
    const data = finalFilteredData;
    return {
      total: data.length,
      active: data.filter((item) => item.status === "Pending").length,
      completed: data.filter((item) => item.status === "Completed").length,
      failed: data.filter((item) => item.status === "Failed").length,
    };
  }, [finalFilteredData]);

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilter("All");
    setSelectedSecondFilter("All");
    setSelectedDateFilter("Date");
    setSearchTerm("");
  };

  return {
    filters: {
      selectedFilter,
      selectedSecondFilter,
      selectedDateFilter,
      searchTerm,
      isBulkActionDropdownOpen,
    },
    setters: {
      setSelectedFilter,
      setSelectedSecondFilter,
      setSelectedDateFilter,
      setSearchTerm,
      setIsBulkActionDropdownOpen,
    },
    data: {
      finalFilteredData,
      orderStats,
      tableData,
    },
    actions: {
      clearAllFilters,
    },
  };
};
