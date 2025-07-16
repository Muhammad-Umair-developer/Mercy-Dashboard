// Analytics data for different categories and time periods
export interface AnalyticsDataPoint {
  month: string
  value: number
}

export const analyticsData = {
  users: {
    year: [
      { month: 'Jan', value: 850 },
      { month: 'Feb', value: 200 },
      { month: 'Mar', value: 45 },
      { month: 'Apr', value: 600 },
      { month: 'May', value: 780 },
      { month: 'Jun', value: 180 },
      { month: 'Jul', value: 40 },
      { month: 'Aug', value: 650 },
      { month: 'Sep', value: 820 },
      { month: 'Oct', value: 200 },
      { month: 'Nov', value: 45 },
      { month: 'Dec', value: 680 }
    ],
    month: [
      { month: 'Week 1', value: 200 },
      { month: 'Week 2', value: 180 },
      { month: 'Week 3', value: 220 },
      { month: 'Week 4', value: 150 }
    ],
    quarter: [
      { month: 'Q1', value: 1095 },
      { month: 'Q2', value: 1560 },
      { month: 'Q3', value: 1510 },
      { month: 'Q4', value: 925 }
    ]
  },
  orders: {
    year: [
      { month: 'Jan', value: 420 },
      { month: 'Feb', value: 180 },
      { month: 'Mar', value: 90 },
      { month: 'Apr', value: 380 },
      { month: 'May', value: 560 },
      { month: 'Jun', value: 120 },
      { month: 'Jul', value: 80 },
      { month: 'Aug', value: 450 },
      { month: 'Sep', value: 620 },
      { month: 'Oct', value: 160 },
      { month: 'Nov', value: 70 },
      { month: 'Dec', value: 490 }
    ],
    month: [
      { month: 'Week 1', value: 120 },
      { month: 'Week 2', value: 95 },
      { month: 'Week 3', value: 140 },
      { month: 'Week 4', value: 85 }
    ],
    quarter: [
      { month: 'Q1', value: 690 },
      { month: 'Q2', value: 1060 },
      { month: 'Q3', value: 1150 },
      { month: 'Q4', value: 720 }
    ]
  },
  revenue: {
    year: [
      { month: 'Jan', value: 25000 },
      { month: 'Feb', value: 18000 },
      { month: 'Mar', value: 12000 },
      { month: 'Apr', value: 22000 },
      { month: 'May', value: 28000 },
      { month: 'Jun', value: 15000 },
      { month: 'Jul', value: 10000 },
      { month: 'Aug', value: 24000 },
      { month: 'Sep', value: 30000 },
      { month: 'Oct', value: 16000 },
      { month: 'Nov', value: 11000 },
      { month: 'Dec', value: 26000 }
    ],
    month: [
      { month: 'Week 1', value: 6500 },
      { month: 'Week 2', value: 5800 },
      { month: 'Week 3', value: 7200 },
      { month: 'Week 4', value: 5500 }
    ],
    quarter: [
      { month: 'Q1', value: 55000 },
      { month: 'Q2', value: 65000 },
      { month: 'Q3', value: 64000 },
      { month: 'Q4', value: 53000 }
    ]
  }
}

// Photo editing category data
export const photoEditingData = {
  all: {
    year: [
      { month: 'Jan', value: 950 },
      { month: 'Feb', value: 280 },
      { month: 'Mar', value: 125 },
      { month: 'Apr', value: 720 },
      { month: 'May', value: 890 },
      { month: 'Jun', value: 260 },
      { month: 'Jul', value: 120 },
      { month: 'Aug', value: 780 },
      { month: 'Sep', value: 950 },
      { month: 'Oct', value: 280 },
      { month: 'Nov', value: 125 },
      { month: 'Dec', value: 810 }
    ],
    month: [
      { month: 'Week 1', value: 250 },
      { month: 'Week 2', value: 220 },
      { month: 'Week 3', value: 280 },
      { month: 'Week 4', value: 200 }
    ],
    quarter: [
      { month: 'Q1', value: 1355 },
      { month: 'Q2', value: 1870 },
      { month: 'Q3', value: 1850 },
      { month: 'Q4', value: 1215 }
    ]
  },
  'photo editing': {
    year: [
      { month: 'Jan', value: 320 },
      { month: 'Feb', value: 150 },
      { month: 'Mar', value: 80 },
      { month: 'Apr', value: 280 },
      { month: 'May', value: 350 },
      { month: 'Jun', value: 140 },
      { month: 'Jul', value: 70 },
      { month: 'Aug', value: 310 },
      { month: 'Sep', value: 380 },
      { month: 'Oct', value: 160 },
      { month: 'Nov', value: 75 },
      { month: 'Dec', value: 330 }
    ],
    month: [
      { month: 'Week 1', value: 85 },
      { month: 'Week 2', value: 75 },
      { month: 'Week 3', value: 95 },
      { month: 'Week 4', value: 70 }
    ],
    quarter: [
      { month: 'Q1', value: 550 },
      { month: 'Q2', value: 770 },
      { month: 'Q3', value: 760 },
      { month: 'Q4', value: 565 }
    ]
  },
  'photo manipulation': {
    year: [
      { month: 'Jan', value: 180 },
      { month: 'Feb', value: 90 },
      { month: 'Mar', value: 30 },
      { month: 'Apr', value: 160 },
      { month: 'May', value: 210 },
      { month: 'Jun', value: 80 },
      { month: 'Jul', value: 25 },
      { month: 'Aug', value: 175 },
      { month: 'Sep', value: 220 },
      { month: 'Oct', value: 85 },
      { month: 'Nov', value: 30 },
      { month: 'Dec', value: 190 }
    ],
    month: [
      { month: 'Week 1', value: 50 },
      { month: 'Week 2', value: 45 },
      { month: 'Week 3', value: 55 },
      { month: 'Week 4', value: 40 }
    ],
    quarter: [
      { month: 'Q1', value: 300 },
      { month: 'Q2', value: 450 },
      { month: 'Q3', value: 420 },
      { month: 'Q4', value: 305 }
    ]
  },
  design: {
    year: [
      { month: 'Jan', value: 280 },
      { month: 'Feb', value: 120 },
      { month: 'Mar', value: 40 },
      { month: 'Apr', value: 250 },
      { month: 'May', value: 320 },
      { month: 'Jun', value: 110 },
      { month: 'Jul', value: 35 },
      { month: 'Aug', value: 270 },
      { month: 'Sep', value: 340 },
      { month: 'Oct', value: 125 },
      { month: 'Nov', value: 42 },
      { month: 'Dec', value: 290 }
    ],
    month: [
      { month: 'Week 1', value: 75 },
      { month: 'Week 2', value: 65 },
      { month: 'Week 3', value: 85 },
      { month: 'Week 4', value: 60 }
    ],
    quarter: [
      { month: 'Q1', value: 440 },
      { month: 'Q2', value: 680 },
      { month: 'Q3', value: 645 },
      { month: 'Q4', value: 457 }
    ]
  },
  'video editing': {
    year: [
      { month: 'Jan', value: 170 },
      { month: 'Feb', value: 80 },
      { month: 'Mar', value: 20 },
      { month: 'Apr', value: 150 },
      { month: 'May', value: 200 },
      { month: 'Jun', value: 70 },
      { month: 'Jul', value: 15 },
      { month: 'Aug', value: 165 },
      { month: 'Sep', value: 210 },
      { month: 'Oct', value: 75 },
      { month: 'Nov', value: 18 },
      { month: 'Dec', value: 180 }
    ],
    month: [
      { month: 'Week 1', value: 45 },
      { month: 'Week 2', value: 40 },
      { month: 'Week 3', value: 50 },
      { month: 'Week 4', value: 35 }
    ],
    quarter: [
      { month: 'Q1', value: 270 },
      { month: 'Q2', value: 420 },
      { month: 'Q3', value: 390 },
      { month: 'Q4', value: 273 }
    ]
  }
}

export const categoryOptions = ['Users', 'Orders', 'Revenue']
export const photoEditOptions = ['All', 'Photo Editing', 'Photo Manipulation', 'Design', 'Video Editing']
export const timeOptions = ['Year', 'Month', 'Quarter']
