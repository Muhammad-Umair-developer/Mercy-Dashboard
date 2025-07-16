interface StatisticCardProps {
  title: string;
  value: string;
}

const StatisticCard = ({ title, value }: StatisticCardProps) => {
  return (
    <div className="flex flex-col bg-white gap-1 border-[#989898] border-[0.5px] rounded-2xl p-5 w-[173px] h-[93px]">
      <div>
        <p className="text-[#00000080] text-1xl">{title}</p>
      </div>
      <div>
        <p className="text-2xl">{value}</p>
      </div>
    </div>
  );
};

const StatisticsCards = () => {
  const statistics = [
    { title: "Total Users", value: "20,000" },
    { title: "Online Users", value: "14,00" },
    { title: "Active Users", value: "300" },
    { title: "Bounce Rate", value: "200" },
    { title: "Deleted Accounts", value: "20" },
    { title: "Total Revenue", value: "N20,000" },
  ];

  return (
    <div className="flex flex-row gap-7 mt-5">
      {statistics.map((stat, index) => (
        <StatisticCard key={index} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
};

export default StatisticsCards;
