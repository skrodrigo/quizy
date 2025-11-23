"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CartesianChartWidgetContent } from "../types";

interface CartesianChartRendererProps {
  content: CartesianChartWidgetContent;
}

export function CartesianChartRenderer({
  content,
}: CartesianChartRendererProps) {
  // Dados de exemplo para quando não há dados configurados
  const defaultDataPoints = [
    { label: "Pouco", value: 10, formula: "" },
    { label: "Médio", value: 45, formula: "calc({{peso}})/({{altura}})" },
    { label: "Muito", value: 75, formula: "" },
  ];

  const dataPoints =
    content.dataPoints && content.dataPoints.length > 0
      ? content.dataPoints
      : defaultDataPoints;

  const data = dataPoints.map((point) => ({
    name: point.label,
    value: point.value,
    formula: point.formula,
  }));

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    switch (content.chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff6b6b" stopOpacity={0.8} />
                <stop offset="25%" stopColor="#feca57" stopOpacity={0.7} />
                <stop offset="50%" stopColor="#48dbfb" stopOpacity={0.6} />
                <stop offset="75%" stopColor="#0abde3" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#00d2d3" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            {content.showGrid !== false && (
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            )}
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            {content.showTooltip !== false && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
            )}
            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#colorValue)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        );

      case "line":
        return (
          <LineChart {...commonProps}>
            {content.showGrid !== false && (
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            )}
            <XAxis dataKey="name" />
            <YAxis />
            {content.showTooltip !== false && <Tooltip />}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
            />
          </LineChart>
        );

      case "bar":
        return (
          <BarChart {...commonProps}>
            {content.showGrid !== false && (
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            )}
            <XAxis dataKey="name" />
            <YAxis />
            {content.showTooltip !== false && <Tooltip />}
            <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-4 w-full">
      <div className="text-center">
        <h3 className="font-semibold text-lg">{content.title || "Seu IMC:"}</h3>
        <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-gray-900 text-white rounded-full text-sm">
          <span>Seu imc:</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>

      {dataPoints.some((p) => p.formula) && (
        <div className="rounded-lg bg-muted p-4 space-y-3">
          <p className="font-medium text-sm text-gray-700 dark:text-gray-300">
            Fórmulas:
          </p>
          {dataPoints
            .filter((p) => p.formula)
            .map((point, idx) => (
              <div
                key={`formula-${point.label}-${idx}`}
                className="flex items-center gap-2 text-xs"
              >
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  {point.label}:
                </span>
                <code className="rounded bg-background px-2 py-1 font-mono text-blue-600 dark:text-blue-400">
                  {point.formula}
                </code>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
