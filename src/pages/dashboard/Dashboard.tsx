import { useEffect, useState } from "react";

import { tableData } from "../../constants/tableData";
import { dashboardCardsData } from "../../constants/dashboardData";
import DashboardCard from "../../components/DashboardCard";
import AgentChatCard from "../../components/AgentChatCard";
import AgentChatModal from "../../components/AgentChatModal";
import OrderDetailsModal from "../../components/OrderDetailsModal";
import ChatModal from "../../components/ChatModal";
import images from "../../constants/images";
import { useOrderSearch } from "../../hooks/useOrderSearch";
import type { TableData } from "../../constants/tableData";

const Dashboard = () => {
  // State for active agents modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for order details modal
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderData, setSelectedOrderData] = useState<TableData | null>(
    null
  );

  // State for chat modal
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedChatOrderData, setSelectedChatOrderData] =
    useState<TableData | null>(null);

  // Use custom search hook for easy backend integration
  const {
    searchTerm,
    filteredData,
    isSearching,
    error,
    handleSearchChange,
    handleSearchSubmit,
    clearSearch,
  } = useOrderSearch(tableData);

  // Handle view all agents button click
  const handleViewAllAgents = () => {
    setIsModalOpen(true);
  };

  // Handle order modal functions
  const handleViewOrder = (orderData: TableData) => {
    setSelectedOrderData(orderData);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrderData(null);
  };

  // Handle chat modal functions
  const handleViewChat = (orderData: TableData) => {
    setSelectedChatOrderData(orderData);
    setIsChatModalOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedChatOrderData(null);
  };

  // Initialize data on component mount
  useEffect(() => {
    // TODO: Backend dev can add initial data fetching here
    // Example:
    // const fetchOrders = async () => {
    //   try {
    //     const response = await fetch('/api/orders')
    //     const data = await response.json()
    //     setFilteredData(data)
    //   } catch (error) {
    //     console.error('Error fetching orders:', error)
    //   }
    // }
    // fetchOrders()
  }, []);

  // TODO: Backend Integration Points
  // 1. Replace handleSearch function with actual API call
  // 2. Add error handling and loading states
  // 3. Implement pagination if needed
  // 4. Add real-time updates with WebSocket if required
  // 5. Add advanced filters (date range, status, etc.)

  // Example API integration:
  // const searchOrders = async (query: string, filters?: any) => {
  //   const params = new URLSearchParams({
  //     q: query,
  //     page: '1',
  //     limit: '10',
  //     ...filters
  //   })
  //   const response = await fetch(`/api/orders/search?${params}`)
  //   return response.json()
  // }
  return (
    <>
      <div>
        <div className="flex flex-col">
          {/* Dashboard Cards and Active Agents Section */}
          <div className="flex flex-col xl:flex-row gap-6 mx-5 mt-5">
            {/* Dashboard Cards - Left side */}
            <div className="xl:w-[640px] flex-shrink-0">
              <div className="grid grid-cols-2 gap-5">
                {dashboardCardsData.map((card) => (
                  <DashboardCard
                    key={card.id}
                    icon={card.icon}
                    backgroundIcon={card.backgroundIcon}
                    title={card.title}
                    value={card.value}
                    iconBgColor={card.iconBgColor}
                    marginBottom={card.marginBottom}
                    marginRight={card.marginRight}
                  />
                ))}
              </div>
            </div>

            {/* Active Agents Chats - Right side */}
            <div className="flex-1">
              <AgentChatCard onViewAll={handleViewAllAgents} maxVisible={4} />
            </div>
          </div>

          {/* Modal for viewing all agents */}
          <AgentChatModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />

          {/* <div className="flex flex-row justify-between items-center ml-5 mr-5">
            <div>
              <p className="font-bold text-2xl mt-7 ">Orders</p>
            </div>
            <div className="mt-7">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center bg-white rounded-lg border border-gray-200 shadow-sm px-3 py-2 w-80 transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <img
                    src={images.MagnifyingGlass}
                    alt="Search"
                    className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
                  />
                  <input
                    type="text"
                    placeholder="Search Orders..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
                    disabled={isSearching}
                  />
                  {isSearching && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600 ml-2"></div>
                  )}
                  {searchTerm && !isSearching && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
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
                </div>
              </form>
            </div>
          </div> */}

          {/* Error Message */}
          {error && (
            <div className="mx-5 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Search Results Summary */}
          {searchTerm && (
            <div className="mx-5 mt-4 text-sm text-gray-600">
              {isSearching ? (
                <span>Searching...</span>
              ) : (
                <span>
                  Found {filteredData.length} result
                  {filteredData.length !== 1 ? "s" : ""} for "{searchTerm}"
                  {filteredData.length === 0 && (
                    <button
                      onClick={clearSearch}
                      className="ml-2 text-blue-600 hover:text-blue-800 underline"
                    >
                      Clear search
                    </button>
                  )}
                </span>
              )}
            </div>
          )}

          {/* Table Section */}
          <div className="mt-8 mx-5">
            <div className="bg-white rounded-2xl shadow-sm border border-[#DADADA] overflow-hidden">
              <div className="flex flex-row justify-between items-center pb-5 bg-[#F5F5F5] border border-[#DADADA] ">
                <div>
                  <p className="font-bold text-2xl mt-7 ml-5">Orders</p>
                </div>
                <div className="mt-7 mr-5">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <div className="relative flex items-center bg-white rounded-lg border border-gray-200 shadow-sm px-3 py-2 w-80 transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                      <img
                        src={images.MagnifyingGlass}
                        alt="Search"
                        className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
                      />
                      <input
                        type="text"
                        placeholder="Search Orders..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
                        disabled={isSearching}
                      />
                      {isSearching && (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600 ml-2"></div>
                      )}
                      {searchTerm && !isSearching && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
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
                    </div>
                  </form>
                </div>
              </div>

              {filteredData.length === 0 && searchTerm ? (
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
                    No orders match your search criteria. Try adjusting your
                    search terms.
                  </p>
                  <button
                    onClick={clearSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="black">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                          Customer Name
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
                      {filteredData.map((item) => (
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
                                    // Fallback to initials if image fails to load
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
                                    // Fallback to initials if image fails to load
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
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleViewOrder(item)}
                                className="bg-[#992C55] cursor-pointer hover:bg-[#7a1e42] text-white px-3 py-1 rounded-2xl p-3 pt-4 pb-4 text-xs"
                              >
                                View Order
                              </button>
                              <button
                                onClick={() => handleViewChat(item)}
                                className="bg-[#004B51] cursor-pointer hover:bg-teal-700 text-white px-3 py-1 rounded-2xl p-3 pt-4 pb-4 text-xs"
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

          {/* Modal for viewing all agents */}
          <AgentChatModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />

          {/* Order Details Modal */}
          <OrderDetailsModal
            isOpen={isOrderModalOpen}
            onClose={handleCloseOrderModal}
            orderData={selectedOrderData}
          />

          {/* Chat Modal */}
          <ChatModal
            isOpen={isChatModalOpen}
            onClose={handleCloseChatModal}
            orderData={selectedChatOrderData}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
