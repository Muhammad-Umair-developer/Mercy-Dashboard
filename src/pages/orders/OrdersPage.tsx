import { useState } from "react";
import images from "../../constants/images";
import OrderCard from "../../components/OrderCard";
import OrderDetailsModal from "../../components/OrderDetailsModal";
import ChatModal from "../../components/ChatModal";
import { useOrderFilters } from "../../hooks/useOrderFilters";
import { tableData } from "../../constants/tableData";

const OrdersPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderData, setSelectedOrderData] = useState<
    (typeof tableData)[0] | null
  >(null);

  // Chat modal state
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedAgentName, setSelectedAgentName] = useState<string>("");

  const {
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
    data: { finalFilteredData, orderStats },
  } = useOrderFilters();

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Handle modal functions
  const handleViewOrder = (orderData: (typeof tableData)[0]) => {
    setSelectedOrderData(orderData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderData(null);
  };

  // Handle chat modal functions
  const handleViewChat = (agentName: string) => {
    setSelectedAgentName(agentName);
    setIsChatModalOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedAgentName("");
  };

  // Handle filter selection
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
  };

  const handleSecondFilterSelect = (filter: string) => {
    setSelectedSecondFilter(filter);
    setIsSecondDropdownOpen(false);
  };

  const handleDateFilterSelect = (filter: string) => {
    setSelectedDateFilter(filter);
    setIsDateDropdownOpen(false);
  };

  const clearAllFilters = () => {
    setSelectedFilter("All");
    setSelectedSecondFilter("All");
    setSelectedDateFilter("Date");
    setSearchTerm("");
  };

  const handleBulkActionSelect = (action: string) => {
    setIsBulkActionDropdownOpen(false);

    // Handle bulk actions
    console.log(`Executing bulk action: ${action}`);
    // Add specific bulk action logic here
    switch (action) {
      case "export-csv":
        // Handle export CSV logic
        break;
      case "export-pdf":
        // Handle export PDF logic
        break;
      case "ban":
        // Handle ban logic
        break;
    }
  };

  return (
    <div className="mr-5 ml-5 mt-5">
      <div className="flex flex-row gap-8 mt-10 justify-start">
        <OrderCard
          icon={images.totalOrders}
          title="Total Orders"
          value={orderStats.total}
          iconAlt="Total Orders"
        />

        <OrderCard
          icon={images.totalOrders}
          title="Active"
          value={orderStats.active}
          iconAlt="Active Orders"
        />

        <OrderCard
          icon={images.completeOrders}
          title="Completed"
          value={orderStats.completed}
          iconAlt="Completed Orders"
        />
      </div>

      {/* Action Buttons Row - Left Side */}
      <div className="flex gap-3 mt-8">
        {/* First Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-3 whitespace-nowrap min-w-fit"
          >
            {selectedFilter}
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
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-full">
              <button
                onClick={() => handleFilterSelect("All")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                All
              </button>
              <button
                onClick={() => handleFilterSelect("Completed")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Completed
              </button>
              <button
                onClick={() => handleFilterSelect("Pending")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Pending
              </button>
              <button
                onClick={() => handleFilterSelect("Failed")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Failed
              </button>
            </div>
          )}
        </div>

        {/* Second Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSecondDropdownOpen(!isSecondDropdownOpen)}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-3 whitespace-nowrap min-w-fit"
          >
            {selectedSecondFilter}
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
          {isSecondDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-full">
              <button
                onClick={() => handleSecondFilterSelect("All")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                All
              </button>
              <button
                onClick={() => handleSecondFilterSelect("Photo Editing")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
              >
                Photo Editing
              </button>
              <button
                onClick={() => handleSecondFilterSelect("Photo Manipulation")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
              >
                Photo Manipulation
              </button>
            </div>
          )}
        </div>

        {/* Date Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-3 whitespace-nowrap min-w-fit"
          >
            {selectedDateFilter}
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
          {isDateDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-full">
              <button
                onClick={() => handleDateFilterSelect("Date")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Date
              </button>
              <button
                onClick={() => handleDateFilterSelect("Today")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Today
              </button>
              <button
                onClick={() => handleDateFilterSelect("This Week")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
              >
                This Week
              </button>
              <button
                onClick={() => handleDateFilterSelect("This Month")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
              >
                This Month
              </button>
              <button
                onClick={() => handleDateFilterSelect("Custom Range")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
              >
                Custom Range
              </button>
            </div>
          )}
        </div>

        {/* Bulk Action Dropdown */}
        <div className="relative">
          <button
            onClick={() =>
              setIsBulkActionDropdownOpen(!isBulkActionDropdownOpen)
            }
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

          {/* Dropdown Menu */}
          {isBulkActionDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="py-2">
                <button
                  onClick={() => handleBulkActionSelect("export-csv")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
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
                  Export CSV
                </button>
                <button
                  onClick={() => handleBulkActionSelect("export-pdf")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
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
                  Export PDF
                </button>
                <hr className="my-2" />
                <button
                  onClick={() => handleBulkActionSelect("ban")}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
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
                  Ban
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Orders Title and Search Bar */}
      <div className="flex justify-between items-center mt-4 mb-4">
        <div>
          <p className="font-bold text-2xl">Orders</p>
          {/* Active Filters Display */}
          {(selectedFilter !== "All" ||
            selectedSecondFilter !== "All" ||
            selectedDateFilter !== "Date") && (
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedFilter !== "All" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Status: {selectedFilter}
                  <button
                    onClick={() => setSelectedFilter("All")}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSecondFilter !== "All" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Service: {selectedSecondFilter}
                  <button
                    onClick={() => setSelectedSecondFilter("All")}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedDateFilter !== "Date" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Date: {selectedDateFilter}
                  <button
                    onClick={() => setSelectedDateFilter("Date")}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-600"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
        <div className="relative w-1/3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img
                src={images.MagnifyingGlass}
                alt="Search"
                className="w-4 h-4"
              />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#992C55] focus:border-[#992C55] sm:text-sm"
              placeholder="Search Orders..."
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mt-4">
        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {finalFilteredData.length} of {tableData.length} orders
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {finalFilteredData.length === 0 &&
          (searchTerm ||
            selectedFilter !== "All" ||
            selectedSecondFilter !== "All" ||
            selectedDateFilter !== "Date") ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500 mb-4">
                No orders match your current filters. Try adjusting your search
                terms or filters.
              </p>
              <div className="flex gap-2 justify-center">
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Clear search
                  </button>
                )}
                {(selectedFilter !== "All" ||
                  selectedSecondFilter !== "All" ||
                  selectedDateFilter !== "Date") && (
                  <button
                    onClick={clearAllFilters}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Agent Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Service Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Editor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {finalFilteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.serviceName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                            <img
                              src={item.editorImage}
                              alt={item.editor}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLElement;
                                target.style.display = "none";
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span class="text-gray-600 font-medium text-sm">${item.editor.charAt(
                                      0
                                    )}</span>
                                  </div>`;
                                }
                              }}
                            />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {item.editor}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.date} - {item.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewOrder(item)}
                            className="bg-[#992C55] cursor-pointer hover:bg-[#7a1e42] text-white px-4 py-3 rounded-2xl text-xs"
                          >
                            View Order
                          </button>
                          <button
                            onClick={() => handleViewChat(item.customerName)}
                            className="bg-[#004B51] cursor-pointer hover:bg-teal-700 text-white px-4 py-3 rounded-2xl text-xs"
                          >
                            View Chat
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        orderData={selectedOrderData}
      />

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={handleCloseChatModal}
        orderData={
          selectedAgentName
            ? {
                id: 999,
                customerName: selectedAgentName,
                customerImage: "",
                serviceName: "Photo Editing",
                status: "Pending",
                amount: "$0.00",
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                editor: "Support Agent",
                editorImage: "",
              }
            : null
        }
      />
    </div>
  );
};

export default OrdersPage;
