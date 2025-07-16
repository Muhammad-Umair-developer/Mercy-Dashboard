import React from 'react'

interface ChartDataPoint {
  month: string
  value: number
}

interface BarChartProps {
  data: ChartDataPoint[]
  maxValue?: number
  height?: number
  barColor?: string
  hoveredIndex?: number | null
  onBarHover?: (index: number | null) => void
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  maxValue,
  height = 300,
  barColor = '#A84672',
  hoveredIndex,
  onBarHover
}) => {
  const chartMaxValue = maxValue || Math.max(...data.map(d => d.value))
  const chartHeight = height - 60 // Leave space for labels
  
  // Y-axis labels
  const yAxisLabels = [0, 50, 100, 200, 500, 1000]
  
  return (
    <div className="relative bg-white p-6 rounded-lg">
      {/* Chart Container */}
      <div className="relative flex items-end justify-between" style={{ height: `${height}px` }}>
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-0 flex flex-col justify-between h-full text-sm text-gray-500 pr-4">
          {yAxisLabels.reverse().map((label) => (
            <div key={label} className="h-0 flex items-center">
              {label}
            </div>
          ))}
        </div>
        
        {/* Bars Container */}
        <div className="flex-1 flex items-end justify-between ml-12 relative">
          {data.map((item, index) => {
            const barHeight = (item.value / chartMaxValue) * chartHeight
            const isHovered = hoveredIndex === index
            
            return (
              <div
                key={item.month}
                className="relative flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => onBarHover?.(index)}
                onMouseLeave={() => onBarHover?.(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-12 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg z-10 whitespace-nowrap">
                    <div className="text-xs text-gray-600">Users in {item.month}</div>
                    <div className="font-semibold">{item.value}</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200"></div>
                  </div>
                )}
                
                {/* Bar */}
                <div
                  className={`w-12 transition-all duration-200 rounded-t-sm ${
                    isHovered ? 'opacity-80 scale-105' : ''
                  }`}
                  style={{
                    height: `${barHeight}px`,
                    backgroundColor: barColor,
                    minHeight: '2px'
                  }}
                />
                
                {/* Month Label */}
                <div className="mt-2 text-sm text-gray-600 font-medium">
                  {item.month}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BarChart
