import { useState, useMemo } from "react";
import { tableData } from "../constants/tableData";

export const useTransactionFilters = () => {
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

  const transactionStats = useMemo(() => {
    const totalTransactions = finalFilteredData.length;
    const successfulTransactions = finalFilteredData.filter(
      (item) => item.status === "Completed"
    ).length;
    const totalAmount = finalFilteredData.reduce((sum, item) => {
      const amount = item.amount.replace(/[^\d.-]/g, "");
      return sum + (parseFloat(amount) || 0);
    }, 0);

    return {
      total: totalTransactions,
      successful: successfulTransactions,
      amount: `N${totalAmount.toLocaleString()}`,
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
      transactionStats,
      totalRecords: tableData.length,
    },
    actions: {
      clearAllFilters,
    },
  };
};
