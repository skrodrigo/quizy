"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CartesianChartWidgetContent } from "../types";

interface CartesianChartRendererProps {
  content: CartesianChartWidgetContent;
}

export function CartesianChartRenderer({ content }: CartesianChartRendererProps) {
  if (!content.dataPoints || content.dataPoints.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>Adicione pontos de dados para visualizar o gráfico</p>
      </div>
    );
  }

  const data = content.dataPoints.map((point) => ({
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
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            {content.showGrid !== false && <CartesianGrid strokeDasharray="3 3" opacity={0.3} />}
            <XAxis dataKey="name" />
            <YAxis />
            {content.showTooltip !== false && <Tooltip />}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        );

      case "line":
        return (
          <LineChart {...commonProps}>
            {content.showGrid !== false && <CartesianGrid strokeDasharray="3 3" opacity={0.3} />}
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
            {content.showGrid !== false && <CartesianGrid strokeDasharray="3 3" opacity={0.3} />}
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
      {content.title && (
        <h3 className="font-semibold text-lg text-center">{content.title}</h3>
      )}

      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>

      {content.dataPoints.some(p => p.formula) && (
        <div className="rounded-lg bg-muted p-3 space-y-2">
          <p className="font-medium text-sm">Fórmulas:</p>
          {content.dataPoints
            .filter(p => p.formula)
            .map((point, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <span className="font-medium">{point.label}:</span>
                <code className="rounded bg-background px-2 py-1 font-mono">
                  {point.formula}
                </code>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
