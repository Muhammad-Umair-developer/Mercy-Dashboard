import React, { useState } from "react";
import images from "../../constants/images";
import OrderDetailsModal from "../../components/OrderDetailsModal";
import ChatModal from "../../components/ChatModal";
import TransactionCard from "../../components/TransactionCard";
import FilterDropdown from "../../components/FilterDropdown";
import BulkActionDropdown from "../../components/BulkActionDropdown";
import SearchBar from "../../components/SearchBar";
import ActiveFilters from "../../components/ActiveFilters";
import DataTable from "../../components/DataTable";
import EmptyState from "../../components/EmptyState";
import { useTransactionFilters } from "../../hooks/useTransactionFilters";
import { tableData } from "../../constants/tableData";

const Transactions = () => {
  // Filter states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isBulkActionDropdownOpen, setIsBulkActionDropdownOpen] =
    useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderData, setSelectedOrderData] = useState<
    (typeof tableData)[0] | null
  >(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedAgentName, setSelectedAgentName] = useState<string>("");

  // Custom hook for filters and data
  const { filters, setters, data, actions } = useTransactionFilters();

  // Filter options
  const statusOptions = [
    { value: "All", label: "All" },
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
    { value: "Failed", label: "Failed" },
  ];

  const serviceOptions = [
    { value: "All", label: "All" },
    { value: "Photo Editing", label: "Photo Editing" },
    { value: "Photo Manipulation", label: "Photo Manipulation" },
  ];

  const dateOptions = [
    { value: "Date", label: "Date" },
    { value: "Today", label: "Today" },
    { value: "This Week", label: "This Week" },
    { value: "This Month", label: "This Month" },
    { value: "Custom Range", label: "Custom Range" },
  ];

  const bulkActions = [
    {
      value: "export-csv",
      label: "Export CSV",
      icon: (
        <svg
          className="w-4 h-4 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      value: "export-pdf",
      label: "Export PDF",
      icon: (
        <svg
          className="w-4 h-4 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      value: "ban",
      label: "Ban",
      className: "text-red-600 hover:bg-red-50",
      icon: (
        <svg
          className="w-4 h-4 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      ),
    },
  ];

  // Table columns
  const tableColumns = [
    {
      key: "customerName",
      header: "Agent Name",
      render: (item: any) => (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src={item.customerImage}
              alt={item.customerName}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-medium text-sm">${item.customerName.charAt(
                      0
                    )}</span>
                  </div>`;
                }
              }}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {item.customerName}
            </div>
          </div>
        </div>
      ),
    },
    { key: "serviceName", header: "Service Name" },
    { key: "amount", header: "Amount" },
    // {
    //   key: "editor",
    //   header: "Editor",
    //   render: (item: any) => (
    //     <div className="flex items-center">
    //       <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
    //         <img
    //           src={item.editorImage}
    //           alt={item.editor}
    //           className="w-full h-full object-cover"
    //           onError={(e) => {
    //             const target = e.target as HTMLElement;
    //             target.style.display = "none";
    //             const parent = target.parentElement;
    //             if (parent) {
    //               parent.innerHTML = `<div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
    //                 <span class="text-gray-600 font-medium text-sm">${item.editor.charAt(
    //                   0
    //                 )}</span>
    //               </div>`;
    //             }
    //           }}
    //         />
    //       </div>
    //       <div className="ml-3">
    //         <div className="text-sm font-medium text-gray-900">
    //           {item.editor}
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      key: "date",
      header: "Date",
      render: (item: any) => `${item.date} - ${item.time}`,
    },
    {
      key: "status",
      header: "Status",
      render: (item: any) => (
        <span
          className={`inline-flex px-2 py-1 border border-[#008000] text-xs font-semibold rounded-full ${
            item.status === "Completed"
              ? "bg-green-100 text-green-800"
              : item.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  // Event handlers
  const handleBulkActionSelect = (action: string) => {
    console.log("Bulk action selected:", action);
    setIsBulkActionDropdownOpen(false);
  };

  const handleViewOrder = (orderData: (typeof tableData)[0]) => {
    setSelectedOrderData(orderData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderData(null);
  };

  // const handleViewChat = (agentName: string) => {
  //   setSelectedAgentName(agentName);
  //   setIsChatModalOpen(true);
  // };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedAgentName("");
  };

  // Active filters for display
  const activeFilters = [
    ...(filters.selectedFilter !== "All"
      ? [
          {
            type: "Status",
            value: filters.selectedFilter,
            onRemove: () => setters.setSelectedFilter("All"),
            bgColor: "bg-blue-100",
            textColor: "text-blue-800",
          },
        ]
      : []),
    ...(filters.selectedSecondFilter !== "All"
      ? [
          {
            type: "Service",
            value: filters.selectedSecondFilter,
            onRemove: () => setters.setSelectedSecondFilter("All"),
            bgColor: "bg-green-100",
            textColor: "text-green-800",
          },
        ]
      : []),
    ...(filters.selectedDateFilter !== "Date"
      ? [
          {
            type: "Date",
            value: filters.selectedDateFilter,
            onRemove: () => setters.setSelectedDateFilter("Date"),
            bgColor: "bg-purple-100",
            textColor: "text-purple-800",
          },
        ]
      : []),
  ];

  const emptyStateActions = [
    ...(filters.searchTerm
      ? [
          {
            label: "Clear search",
            onClick: () => setters.setSearchTerm(""),
            variant: "primary" as const,
          },
        ]
      : []),
    ...(activeFilters.length > 0
      ? [
          {
            label: "Clear filters",
            onClick: actions.clearAllFilters,
            variant: "secondary" as const,
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Transaction Cards */}
      <div className="flex flex-row gap-5 mt-5 ml-5">
        <TransactionCard
          icon={images.transection}
          title="Total Transactions"
          value={data.transactionStats.total}
          iconAlt="Total Transactions"
        />
        <TransactionCard
          icon={images.transection}
          title="Successful Txns"
          value={data.transactionStats.successful}
          iconAlt="Successful Transactions"
        />
        <TransactionCard
          icon={images.transection}
          title="Amount Generated"
          value={data.transactionStats.amount}
          iconAlt="Amount Generated"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-3 mt-8 ml-5">
        <FilterDropdown
          isOpen={isDropdownOpen}
          onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
          onSelect={(value) => {
            setters.setSelectedFilter(value);
            setIsDropdownOpen(false);
          }}
          selectedValue={filters.selectedFilter}
          options={statusOptions}
        />

        <FilterDropdown
          isOpen={isSecondDropdownOpen}
          onToggle={() => setIsSecondDropdownOpen(!isSecondDropdownOpen)}
          onSelect={(value) => {
            setters.setSelectedSecondFilter(value);
            setIsSecondDropdownOpen(false);
          }}
          selectedValue={filters.selectedSecondFilter}
          options={serviceOptions}
        />

        <FilterDropdown
          isOpen={isDateDropdownOpen}
          onToggle={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
          onSelect={(value) => {
            setters.setSelectedDateFilter(value);
            setIsDateDropdownOpen(false);
          }}
          selectedValue={filters.selectedDateFilter}
          options={dateOptions}
        />

        <BulkActionDropdown
          isOpen={isBulkActionDropdownOpen}
          onToggle={() =>
            setIsBulkActionDropdownOpen(!isBulkActionDropdownOpen)
          }
          onSelect={handleBulkActionSelect}
          actions={bulkActions}
        />
      </div>

      {/* Orders Title and Search */}
      {/* <div className="flex justify-between items-center mt-8 mb-4 ml-5 mr-5">
        <div>
          <p className="font-bold text-2xl">Orders</p>
          <ActiveFilters filters={activeFilters} />
        </div>
        <SearchBar
          value={filters.searchTerm}
          onChange={setters.setSearchTerm}
          onSubmit={(e) => e.preventDefault()}
          onClear={() => setters.setSearchTerm("")}
          placeholder="Search Orders..."
          className="w-1/3"
        />
      </div> */}

      {/* Results Count and Table */}
      <div className="mt-5 ml-5 mr-5 rounded-2xl border border-[#DADADA]">

      <div className="flex justify-between items-center p-5 border border-[#DADADA] rounded-t-2xl">
        <div>
          <p className="font-bold text-2xl">Orders</p>
          <ActiveFilters filters={activeFilters} />
        </div>
        <SearchBar
          value={filters.searchTerm}
          onChange={setters.setSearchTerm}
          onSubmit={(e) => e.preventDefault()}
          onClear={() => setters.setSearchTerm("")}
          placeholder="Search Orders..."
          className="w-1/3"
        />
      </div>

        {/* <div className="mb-4 text-sm text-gray-600">
          Showing {data.finalFilteredData.length} of {data.totalRecords} orders
        </div> */}

        <DataTable
          data={data.finalFilteredData}
          columns={tableColumns}
          onRowClick={handleViewOrder}
          selectable={true}
          emptyState={
            <EmptyState
              title="No orders found"
              description="No orders match your current filters. Try adjusting your search terms or filters."
              actions={emptyStateActions}
            />
          }
        />
      </div>

      {/* Modals */}
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        orderData={selectedOrderData}
      />

      <ChatModal
        isOpen={isChatModalOpen}
        onClose={handleCloseChatModal}
        agentName={selectedAgentName}
      />
    </>
  );
};

export default Transactions;
