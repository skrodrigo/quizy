"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CartesianChartWidgetContent, WidgetStyle } from "../types";

interface CartesianChartWidgetConfigProps {
  content: CartesianChartWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: CartesianChartWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function CartesianChartWidgetConfig({
  content,
  onContentChange,
}: CartesianChartWidgetConfigProps) {
  const addDataPoint = () => {
    const newPoint = {
      label: `Ponto ${content.dataPoints.length + 1}`,
      value: 0,
      formula: "",
    };
    onContentChange({
      ...content,
      dataPoints: [...content.dataPoints, newPoint],
    });
  };

  const removeDataPoint = (index: number) => {
    onContentChange({
      ...content,
      dataPoints: content.dataPoints.filter((_, i) => i !== index),
    });
  };

  const updateDataPoint = (index: number, field: string, value: string | number) => {
    const updated = [...content.dataPoints];
    updated[index] = { ...updated[index], [field]: value };
    onContentChange({ ...content, dataPoints: updated });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Título</Label>
        <Input
          value={content.title}
          onChange={(e) => onContentChange({ ...content, title: e.target.value })}
          placeholder="Ex: Análise"
        />
      </div>

      <div className="space-y-2">
        <Label>Tipo de Gráfico</Label>
        <Tabs
          value={content.chartType}
          onValueChange={(value) =>
            onContentChange({ ...content, chartType: value as "area" | "line" | "bar" })
          }
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="area">Área</TabsTrigger>
            <TabsTrigger value="line">Linha</TabsTrigger>
            <TabsTrigger value="bar">Barra</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Dados</Label>
          <Button size="sm" variant="outline" onClick={addDataPoint}>
            <Plus className="h-4 w-4 mr-1" />
            Adicionar
          </Button>
        </div>

        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {content.dataPoints.map((point, index) => (
            <div key={index} className="rounded-lg border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{point.label || `Ponto ${index + 1}`}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeDataPoint(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Input
                  placeholder="Label"
                  value={point.label}
                  onChange={(e) => updateDataPoint(index, "label", e.target.value)}
                  className="text-sm"
                />

                <Input
                  type="number"
                  placeholder="Valor"
                  value={point.value}
                  onChange={(e) => updateDataPoint(index, "value", Number(e.target.value))}
                  className="text-sm"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Fórmula (opcional)"
                      value={point.formula || ""}
                      onChange={(e) => updateDataPoint(index, "formula", e.target.value)}
                      className="text-sm font-mono"
                    />
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Ex: calc(peso/altura^2)
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Eixo X</Label>
        <Input
          value={content.xAxisLabel || ""}
          onChange={(e) => onContentChange({ ...content, xAxisLabel: e.target.value })}
          placeholder="Label do eixo X"
        />
      </div>

      <div className="space-y-2">
        <Label>Eixo Y</Label>
        <Input
          value={content.yAxisLabel || ""}
          onChange={(e) => onContentChange({ ...content, yAxisLabel: e.target.value })}
          placeholder="Label do eixo Y"
        />
      </div>
    </div>
  );
}
