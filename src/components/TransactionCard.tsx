import React from "react";
import images from "../constants/images";

interface TransactionCardProps {
  icon: string;
  title: string;
  value: string | number;
  iconAlt?: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  // icon,
  title,
  value,
  iconAlt = "",
}) => {
  return (
    <div className="flex flex-row justify-between bg-white rounded-2xl w-[363px] h-[139px] ">
      <div className="flex flex-col p-4 gap-1.5">
        <div>
          <img src={images.order} alt={iconAlt} className="w-13 h-13" />
        </div>
        <div>
          <p>{title}</p>
        </div>
        <div>
          <p className="font-bold text-2xl">{value}</p>
        </div>
      </div>
      <div className="mt-17" >
        <img src={images.Notepad1} alt="" />
      </div>
    </div>
  );
};

export default TransactionCard;
