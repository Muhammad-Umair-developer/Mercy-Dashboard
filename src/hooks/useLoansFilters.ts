import { useState, useMemo } from "react";
import { tableData } from "../constants/tableData";

export const useLoansFilters = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSecondFilter, setSelectedSecondFilter] = useState("All");
  const [selectedDateFilter, setSelectedDateFilter] = useState("Date");
  const [searchTerm, setSearchTerm] = useState("");

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

    if (selectedFilter !== "All") {
      data = data.filter((item) => item.status === selectedFilter);
    }

    if (selectedSecondFilter !== "All") {
      data = data.filter((item) => item.serviceName === selectedSecondFilter);
    }

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
    },
    setters: {
      setSelectedFilter,
      setSelectedSecondFilter,
      setSelectedDateFilter,
      setSearchTerm,
    },
    data: {
      finalFilteredData,
      orderStats,
      totalRecords: tableData.length,
    },
    actions: {
      clearAllFilters,
    },
  };
};
