"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MetricsWidgetContent, WidgetStyle } from "../types";

interface MetricsWidgetConfigProps {
  content: MetricsWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: MetricsWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function MetricsWidgetConfig({
  content,
  onContentChange,
}: MetricsWidgetConfigProps) {
  const addMetric = () => {
    onContentChange({
      ...content,
      metrics: [...content.metrics, { label: "", value: "", icon: "" }],
    });
  };

  const removeMetric = (index: number) => {
    onContentChange({
      ...content,
      metrics: content.metrics.filter((_, i) => i !== index),
    });
  };

  const updateMetric = (
    index: number,
    field: keyof (typeof content.metrics)[0],
    value: string | number,
  ) => {
    const newMetrics = [...content.metrics];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    onContentChange({ ...content, metrics: newMetrics });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Métricas</Label>
        <Button variant="outline" size="sm" onClick={addMetric}>
          <IconPlus className="size-4" />
        </Button>
      </div>

      {content.metrics.map((metric, index) => (
        <div key={metric.label} className="space-y-2 p-3 border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Métrica {index + 1}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeMetric(index)}
            >
              <IconTrash className="size-4" />
            </Button>
          </div>
          <Input
            value={metric.label}
            onChange={(e) => updateMetric(index, "label", e.target.value)}
            placeholder="Label"
          />
          <Input
            value={metric.value}
            onChange={(e) => updateMetric(index, "value", e.target.value)}
            placeholder="Valor"
          />
          <Input
            value={metric.icon || ""}
            onChange={(e) => updateMetric(index, "icon", e.target.value)}
            placeholder="Ícone (opcional)"
          />
        </div>
      ))}
    </div>
  );
}
