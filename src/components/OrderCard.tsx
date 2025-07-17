import React from "react";
import images from "../constants/images";

interface OrderCardProps {
  icon: string;
  title: string;
  value: string | number;
  iconAlt?: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  // icon,
  title,
  value,
  iconAlt = "Order icon",
}) => {
  return (
    <div className="flex flex-row justify-between bg-white rounded-2xl w-[363px] h-[139px] shadow-sm border border-[#DADADA]">
      <div className="flex flex-col p-4 gap-1.5">
        <div>
          <img src={images.order} alt={iconAlt} className="w-13 h-13" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
        </div>
        <div>
          <p className="font-bold text-2xl text-gray-900">{value}</p>
        </div>
      </div>

      <div className="mt-17">
        <img src={images.Notepad1} alt="" />
      </div>
    </div>
  );
};

export default OrderCard;
