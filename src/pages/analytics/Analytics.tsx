import { useState } from "react";
import BarChart from "../../components/BarChart";
import FilterDropdown from "../../components/FilterDropdown";
import StatisticsCards from "../../components/StatisticsCards";
import {
  analyticsData,
  photoEditingData,
  categoryOptions,
  photoEditOptions,
  timeOptions,
} from "../../constants/analyticsData";

const Analytics = () => {
  const [selectedCategory, setSelectedCategory] = useState("Users");
  const [selectedPhotoEdit, setSelectedPhotoEdit] = useState("All");
  const [selectedTime, setSelectedTime] = useState("Year");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isPhotoEditDropdownOpen, setIsPhotoEditDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Get current data based on selected filters
  const getCurrentData = () => {
    const timeKey =
      selectedTime.toLowerCase() as keyof typeof analyticsData.users;

    // If a photo editing category is selected and it's not "All"
    if (selectedPhotoEdit !== "All") {
      const photoEditKeyMap: Record<string, keyof typeof photoEditingData> = {
        "Photo Editing": "photo editing",
        "Photo Manipulation": "photo manipulation",
        Design: "design",
        "Video Editing": "video editing",
      };
      const photoEditKey = photoEditKeyMap[selectedPhotoEdit];
      return photoEditingData[photoEditKey][timeKey];
    }

    // If "All" is selected in photo editing, show aggregated photo editing data
    if (selectedPhotoEdit === "All" && selectedCategory === "Users") {
      return photoEditingData.all[timeKey];
    }

    // Default behavior for main categories
    const categoryKey =
      selectedCategory.toLowerCase() as keyof typeof analyticsData;
    return analyticsData[categoryKey][timeKey];
  };

  const currentData = getCurrentData();

  // Calculate max value for better chart scaling
  const maxValue = Math.max(...currentData.map((d) => d.value));
  const chartMaxValue = Math.ceil(maxValue / 100) * 100; // Round up to nearest 100

  // Get appropriate bar color based on category
  const getBarColor = () => {
    // Photo editing category colors
    if (selectedPhotoEdit !== "All") {
      switch (selectedPhotoEdit) {
        case "Photo Editing":
          return "#A84672";
        case "Photo Manipulation":
          return "#8B5CF6";
        case "Design":
          return "#10B981";
        case "Video Editing":
          return "#F59E0B";
        default:
          return "#A84672";
      }
    }

    // Default category colors
    switch (selectedCategory) {
      case "Users":
        return "#A84672";
      case "Orders":
        return "#6366F1";
      case "Revenue":
        return "#10B981";
      default:
        return "#A84672";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Chart Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Chart Header with Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              {/* Left side filters */}
              <div className="flex items-center gap-4">
                <FilterDropdown
                  value={selectedCategory}
                  options={categoryOptions}
                  onChange={setSelectedCategory}
                  isOpen={isCategoryDropdownOpen}
                  onToggle={() =>
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                />
                <FilterDropdown
                  value={selectedPhotoEdit}
                  options={photoEditOptions}
                  onChange={setSelectedPhotoEdit}
                  isOpen={isPhotoEditDropdownOpen}
                  onToggle={() =>
                    setIsPhotoEditDropdownOpen(!isPhotoEditDropdownOpen)
                  }
                />
              </div>

              {/* Right side filter */}
              <div className="flex items-center">
                <FilterDropdown
                  value={selectedTime}
                  options={timeOptions}
                  onChange={setSelectedTime}
                  isOpen={isTimeDropdownOpen}
                  onToggle={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedPhotoEdit !== "All"
                    ? selectedPhotoEdit
                    : selectedCategory}{" "}
                  Analytics
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedTime}ly overview of{" "}
                  {selectedPhotoEdit !== "All"
                    ? selectedPhotoEdit.toLowerCase()
                    : selectedCategory.toLowerCase()}
                </p>
              </div>

              {/* Summary Stats */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {currentData
                      .reduce((sum, item) => sum + item.value, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    Total{" "}
                    {selectedPhotoEdit !== "All"
                      ? selectedPhotoEdit
                      : selectedCategory}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: getBarColor() }}
                  >
                    {Math.round(
                      currentData.reduce((sum, item) => sum + item.value, 0) /
                        currentData.length
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Average</div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="p-6">
            <BarChart
              data={currentData}
              maxValue={chartMaxValue}
              height={400}
              barColor={getBarColor()}
              hoveredIndex={hoveredBarIndex}
              onBarHover={setHoveredBarIndex}
            />
          </div>
        </div>

        {/* Insights Section */}
        {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getBarColor() }}></div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Peak Performance</h3>
            </div>
            <div className="mt-4">
              {(() => {
                const maxItem = currentData.reduce((max, item) => item.value > max.value ? item : max)
                return (
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{maxItem.value.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Highest in {maxItem.month}</div>
                  </div>
                )
              })()}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Growth Trend</h3>
            </div>
            <div className="mt-4">
              {(() => {
                const firstHalf = currentData.slice(0, Math.ceil(currentData.length / 2))
                const secondHalf = currentData.slice(Math.ceil(currentData.length / 2))
                const firstAvg = firstHalf.reduce((sum, item) => sum + item.value, 0) / firstHalf.length
                const secondAvg = secondHalf.reduce((sum, item) => sum + item.value, 0) / secondHalf.length
                const growth = ((secondAvg - firstAvg) / firstAvg * 100)
                
                return (
                  <div>
                    <div className={`text-2xl font-bold ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Period over period</div>
                  </div>
                )
              })()}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Consistency Score</h3>
            </div>
            <div className="mt-4">
              {(() => {
                const average = currentData.reduce((sum, item) => sum + item.value, 0) / currentData.length
                const variance = currentData.reduce((sum, item) => sum + Math.pow(item.value - average, 2), 0) / currentData.length
                const consistency = Math.max(0, 100 - (Math.sqrt(variance) / average * 100))
                
                return (
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{consistency.toFixed(0)}%</div>
                    <div className="text-sm text-gray-600">Data consistency</div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div> */}

        <div className="flex flex-row mt-5 justify-between">
          <div>
            <div
              className="flex bg-[#F5F5F5] p-1 rounded-lg border border-[#DADADA]"
              style={{ width: "280px", height: "50px" }}
            >
              <button className="flex-1 py-2 px-4 rounded-md font-medium transition-colors cursor-pointer bg-[#992C55] text-white shadow-sm">
                Activity
              </button>
              <button className="flex-1 py-2 px-4 rounded-md font-medium transition-colors cursor-pointer text-gray-600 hover:text-gray-800">
                Chats
              </button>
              <button className="flex-1 py-2 px-4 rounded-md font-medium transition-colors cursor-pointer text-gray-600 hover:text-gray-800">
                Orders
              </button>
            </div>
          </div>
          <div>
            <button className="bg-[#992C55] px-5 py-3 text-white rounded-2xl cursor-pointer">
              Export
            </button>
          </div>
        </div>

        <StatisticsCards />
      </div>
    </div>
  );
};

export default Analytics;
