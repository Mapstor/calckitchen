"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

// Color palette for charts
export const CHART_COLORS = {
  primary: "#E8604C", // coral
  secondary: "#5B8C5A", // sage green
  tertiary: "#3B82F6", // blue
  quaternary: "#F59E0B", // amber
  protein: "#EF4444", // red
  carbs: "#3B82F6", // blue
  fat: "#22C55E", // green
  fiber: "#A855F7", // purple
  calories: "#F59E0B", // amber
};

const MACRO_COLORS = [
  CHART_COLORS.protein,
  CHART_COLORS.carbs,
  CHART_COLORS.fat,
];

// Macro Pie Chart - for showing protein/carb/fat distribution
interface MacroPieChartProps {
  protein: number;
  carbs: number;
  fat: number;
  showLegend?: boolean;
  size?: number;
}

export function MacroPieChart({
  protein,
  carbs,
  fat,
  showLegend = true,
  size = 200,
}: MacroPieChartProps) {
  const data = [
    { name: "Protein", value: protein, color: CHART_COLORS.protein },
    { name: "Carbs", value: carbs, color: CHART_COLORS.carbs },
    { name: "Fat", value: fat, color: CHART_COLORS.fat },
  ].filter((d) => d.value > 0);

  if (data.length === 0) return null;

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width={size} height={size}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.25}
            outerRadius={size * 0.4}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value ?? 0}%`}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      {showLegend && (
        <div className="flex gap-4 mt-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Comparison Bar Chart - for comparing two or more values
interface ComparisonBarChartProps {
  data: Array<{
    name: string;
    value: number;
    fill?: string;
  }>;
  height?: number;
  showValue?: boolean;
  unit?: string;
}

export function ComparisonBarChart({
  data,
  height = 200,
  showValue = true,
  unit = "",
}: ComparisonBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={100}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value) => `${value ?? 0}${unit}`}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.fill || CHART_COLORS.primary}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// Progress Ring - circular progress indicator
interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

export function ProgressRing({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  color = CHART_COLORS.primary,
  label,
  sublabel,
}: ProgressRingProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
        />
        {/* Center text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="-0.1em"
          className="text-xl font-bold fill-gray-900"
        >
          {Math.round(percentage)}%
        </text>
        {sublabel && (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy="1.2em"
            className="text-xs fill-gray-500"
          >
            {sublabel}
          </text>
        )}
      </svg>
      {label && <p className="text-sm text-gray-600 mt-1">{label}</p>}
    </div>
  );
}

// Time Comparison Chart - for showing time savings or comparisons
interface TimeComparisonChartProps {
  original: { label: string; minutes: number };
  converted: { label: string; minutes: number };
  height?: number;
}

export function TimeComparisonChart({
  original,
  converted,
  height = 100,
}: TimeComparisonChartProps) {
  const maxTime = Math.max(original.minutes, converted.minutes);
  const savings = original.minutes - converted.minutes;
  const savingsPercent = Math.round((savings / original.minutes) * 100);

  const data = [
    { name: original.label, value: original.minutes, fill: "#9CA3AF" },
    { name: converted.label, value: converted.minutes, fill: CHART_COLORS.primary },
  ];

  return (
    <div className="space-y-2">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" domain={[0, maxTime]} hide />
          <YAxis
            type="category"
            dataKey="name"
            width={80}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => `${value ?? 0} min`}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {savings > 0 && (
        <p className="text-sm text-green-600 text-center font-medium">
          Save {savings} minutes ({savingsPercent}% faster)
        </p>
      )}
    </div>
  );
}

// Temperature Comparison Chart
interface TempComparisonChartProps {
  original: { label: string; temp: number };
  converted: { label: string; temp: number };
  unit?: "F" | "C";
  height?: number;
}

export function TempComparisonChart({
  original,
  converted,
  unit = "F",
  height = 100,
}: TempComparisonChartProps) {
  const data = [
    { name: original.label, value: original.temp, fill: "#9CA3AF" },
    { name: converted.label, value: converted.temp, fill: CHART_COLORS.primary },
  ];

  const diff = original.temp - converted.temp;

  return (
    <div className="space-y-2">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            width={80}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => `${value ?? 0}°${unit}`}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {diff !== 0 && (
        <p className="text-sm text-gray-600 text-center">
          {diff > 0 ? "Reduced by" : "Increased by"} {Math.abs(diff)}°{unit}
        </p>
      )}
    </div>
  );
}

// Nutrient Bar - horizontal progress bar for daily values
interface NutrientBarProps {
  name: string;
  value: number;
  dailyValue: number;
  unit: string;
  color?: string;
}

export function NutrientBar({
  name,
  value,
  dailyValue,
  unit,
  color = CHART_COLORS.primary,
}: NutrientBarProps) {
  const percentage = Math.min((value / dailyValue) * 100, 150);
  const isOver100 = percentage > 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">{name}</span>
        <span className="text-gray-600">
          {value}{unit} / {dailyValue}{unit} ({Math.round(percentage)}%)
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: isOver100 ? "#EF4444" : color,
          }}
        />
      </div>
    </div>
  );
}

// Daily Values reference for nutrition
export const DAILY_VALUES = {
  calories: 2000,
  protein: 50, // grams
  carbs: 300, // grams
  fat: 65, // grams
  fiber: 25, // grams
  saturatedFat: 20, // grams
  sodium: 2300, // mg
  cholesterol: 300, // mg
  potassium: 4700, // mg
  vitaminA: 900, // mcg
  vitaminC: 90, // mg
  calcium: 1300, // mg
  iron: 18, // mg
};

// Cooking Timeline Step Component
interface TimelineStepProps {
  time: string;
  label: string;
  description?: string;
  isActive?: boolean;
  isComplete?: boolean;
}

export function TimelineStep({
  time,
  label,
  description,
  isActive = false,
  isComplete = false,
}: TimelineStepProps) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full border-2 ${
            isComplete
              ? "bg-green-500 border-green-500"
              : isActive
                ? "bg-coral border-coral"
                : "bg-white border-gray-300"
          }`}
        />
        <div className="w-0.5 h-full bg-gray-200 my-1" />
      </div>
      <div className="pb-4">
        <p className="text-sm font-medium text-gray-900">{time}</p>
        <p className="text-sm text-gray-700">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}

// Stat Card - for displaying key statistics
interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: React.ReactNode;
  color?: "coral" | "green" | "blue" | "amber" | "purple" | "gray";
}

export function StatCard({
  label,
  value,
  sublabel,
  icon,
  color = "coral",
}: StatCardProps) {
  const colorClasses = {
    coral: "bg-coral/10 text-coral",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    purple: "bg-purple-100 text-purple-700",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <div className={`p-4 rounded-lg ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-sm opacity-80">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {sublabel && <p className="text-xs opacity-70 mt-0.5">{sublabel}</p>}
    </div>
  );
}

// Comparison Table Component
interface ComparisonTableProps {
  headers: string[];
  rows: Array<{
    label: string;
    values: (string | number)[];
    highlight?: boolean;
  }>;
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-3 font-medium text-gray-700" />
            {headers.map((header, i) => (
              <th
                key={i}
                className="text-center py-2 px-3 font-medium text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-gray-100 ${
                row.highlight ? "bg-coral/5" : ""
              }`}
            >
              <td className="py-2 px-3 font-medium text-gray-700">
                {row.label}
              </td>
              {row.values.map((value, j) => (
                <td key={j} className="text-center py-2 px-3 text-gray-600">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Info Card with tips/insights
interface InsightCardProps {
  type: "tip" | "warning" | "info" | "success";
  title?: string;
  children: React.ReactNode;
}

export function InsightCard({ type, title, children }: InsightCardProps) {
  const styles = {
    tip: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: "💡",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      icon: "⚠️",
    },
    info: {
      bg: "bg-gray-50",
      border: "border-gray-200",
      text: "text-gray-800",
      icon: "ℹ️",
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      icon: "✓",
    },
  };

  const s = styles[type];

  return (
    <div className={`p-4 rounded-lg border ${s.bg} ${s.border}`}>
      {title && (
        <p className={`font-medium ${s.text} mb-1`}>
          {s.icon} {title}
        </p>
      )}
      <div className={`text-sm ${s.text}`}>{children}</div>
    </div>
  );
}
