import { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  change: string;
  color: string;
  bg: string;
}

export function DashboardCard({
  icon,
  title,
  value,
  change,
  color,
  bg,
}: DashboardCardProps) {
  const isPositive = change.startsWith("+");
  const isAlert = bg.includes("red");

  return (
    <div className={`${bg} rounded-lg p-6 text-white relative overflow-hidden`}>
      {/* Background gradient effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Header with icon and change percentage */}
        <div className="flex items-start justify-between mb-8">
          <div className={`${color} opacity-80`}>{icon}</div>
          {!isAlert && (
            <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
              <span>{change}</span>
              <TrendingUp size={16} />
            </div>
          )}
          {isAlert && (
            <div className="text-yellow-300 text-sm font-semibold">{change}</div>
          )}
        </div>

        {/* Title */}
        <div className="mb-2">
          <p className="text-sm font-medium opacity-80 uppercase tracking-wider">
            {title}
          </p>
        </div>

        {/* Value */}
        <div>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
