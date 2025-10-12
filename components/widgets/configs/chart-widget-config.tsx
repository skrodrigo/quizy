"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ChartWidgetContent, WidgetStyle } from "../types";

interface ChartWidgetConfigProps {
  content: ChartWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: ChartWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function ChartWidgetConfig({
  content,
  onContentChange,
}: ChartWidgetConfigProps) {
  const [newLabel, setNewLabel] = useState("");

  const addLabel = () => {
    if (newLabel.trim()) {
      onContentChange({
        ...content,
        data: {
          ...content.data,
          labels: [...content.data.labels, newLabel.trim()],
        },
      });
      setNewLabel("");
    }
  };

  const removeLabel = (index: number) => {
    onContentChange({
      ...content,
      data: {
        ...content.data,
        labels: content.data.labels.filter((_, i) => i !== index),
      },
    });
  };

  const addDataset = () => {
    onContentChange({
      ...content,
      data: {
        ...content.data,
        datasets: [...content.data.datasets, { label: "", data: [] }],
      },
    });
  };

  const removeDataset = (index: number) => {
    onContentChange({
      ...content,
      data: {
        ...content.data,
        datasets: content.data.datasets.filter((_, i) => i !== index),
      },
    });
  };

  const updateDataset = (
    index: number,
    field: "label" | "data",
    value: string | number[],
  ) => {
    const newDatasets = [...content.data.datasets];
    newDatasets[index] = { ...newDatasets[index], [field]: value };
    onContentChange({
      ...content,
      data: { ...content.data, datasets: newDatasets },
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Tipo de Gráfico</Label>
        <select
          className="w-full h-10 px-3 rounded-md border border-input bg-background"
          value={content.type}
          onChange={(e) =>
            onContentChange({
              ...content,
              type: e.target.value as "bar" | "line" | "pie" | "doughnut",
            })
          }
        >
          <option value="bar">Barras</option>
          <option value="line">Linha</option>
          <option value="pie">Pizza</option>
          <option value="doughnut">Rosca</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Labels</Label>
        <div className="space-y-2">
          {content.data.labels.map((label, index) => (
            <div key={label} className="flex gap-2">
              <Input value={label} readOnly className="flex-1" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeLabel(index)}
              >
                <IconTrash className="size-4" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Nova label"
              onKeyDown={(e) => e.key === "Enter" && addLabel()}
            />
            <Button variant="outline" size="icon" onClick={addLabel}>
              <IconPlus className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Datasets</Label>
          <Button variant="outline" size="sm" onClick={addDataset}>
            <IconPlus className="size-4" />
          </Button>
        </div>

        {content.data.datasets.map((dataset, index) => (
          <div key={dataset.label} className="space-y-2 p-3 border rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Dataset {index + 1}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeDataset(index)}
              >
                <IconTrash className="size-4" />
              </Button>
            </div>
            <Input
              value={dataset.label}
              onChange={(e) => updateDataset(index, "label", e.target.value)}
              placeholder="Nome do dataset"
            />
            <Input
              value={dataset.data.join(", ")}
              onChange={(e) =>
                updateDataset(
                  index,
                  "data",
                  e.target.value.split(",").map((v) => Number(v.trim())),
                )
              }
              placeholder="Valores separados por vírgula"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
