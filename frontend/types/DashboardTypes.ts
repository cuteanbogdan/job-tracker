export interface StatsData {
  totalJobs: number;
  totalApplied: number;
  totalRejected: number;
  totalInterviewsOrOAs: number;
  totalNoResponse: number;
}

export interface StatCardProps {
  title: string;
  value: number;
  color: "blue" | "green" | "red" | "purple" | "gray" | "yellow";
}

export interface MonthlyApplicationData {
  _id: {
    year: number;
    month: number;
  };
  count: number;
}

export interface MonthlyChartProps {
  data: MonthlyApplicationData[];
}

export interface JobStatusData {
  totalApplied: number;
  totalRejected: number;
  totalInterviewsOrOAs: number;
  totalNoResponse: number;
}

export interface JobStatusPieChartProps {
  data: JobStatusData;
}
