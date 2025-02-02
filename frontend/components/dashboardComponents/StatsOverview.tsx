import React from "react";
import { StatsData, StatCardProps } from "@/types/DashboardTypes";

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  return (
    <div className={`bg-${color}-100 p-4 rounded-lg shadow-md`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

const StatsOverview: React.FC<{ stats: StatsData }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <StatCard title="Total Jobs" value={stats.totalJobs} color="purple" />
      <StatCard title="Applied" value={stats.totalApplied} color="blue" />
      <StatCard title="Rejected" value={stats.totalRejected} color="red" />
      <StatCard
        title="Interviews/OA"
        value={stats.totalInterviewsOrOAs}
        color="green"
      />
      <StatCard
        title="No Response"
        value={stats.totalNoResponse}
        color="yellow"
      />
    </div>
  );
};

export default StatsOverview;
