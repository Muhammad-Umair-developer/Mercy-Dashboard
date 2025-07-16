import React from "react";

interface DashboardCardProps {
  icon: string;
  backgroundIcon: string;
  title: string;
  value: string;
  iconBgColor?: string;
  marginBottom?: string;
  marginRight?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  backgroundIcon,
  title,
  value,
  iconBgColor = "bg-red-50",
  marginBottom = "mb-[-8px]",
  marginRight = "mr-[-8px]",
}) => {
  return (
    <div className="bg-white rounded-2xl w-full min-w-[250px] h-[155px] p-4 relative shadow-sm border border-gray-100">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div
            className={`w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center mb-3`}
          >
            <img src={icon} alt="" />
          </div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="font-bold text-[30px] text-gray-900 mt-1">{value}</p>
        </div>
      </div>
      <div
        className={`absolute bottom-2 right-2 ${marginBottom} ${marginRight} opacity-10`}
      >
        <img src={backgroundIcon} alt="" className="w-16 h-16" />
      </div>
    </div>
  );
};

export default DashboardCard;
