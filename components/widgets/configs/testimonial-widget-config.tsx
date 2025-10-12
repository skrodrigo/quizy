"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TestimonialWidgetContent, WidgetStyle } from "../types";

interface TestimonialWidgetConfigProps {
  content: TestimonialWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: TestimonialWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function TestimonialWidgetConfig({
  content,
  onContentChange,
}: TestimonialWidgetConfigProps) {
  const addItem = () => {
    onContentChange({
      ...content,
      items: [
        ...content.items,
        { name: "", text: "", role: "", avatar: "", rating: 5 },
      ],
    });
  };

  const removeItem = (index: number) => {
    onContentChange({
      ...content,
      items: content.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (
    index: number,
    field: keyof (typeof content.items)[0],
    value: string | number,
  ) => {
    const newItems = [...content.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onContentChange({ ...content, items: newItems });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Depoimentos</Label>
        <Button variant="outline" size="sm" onClick={addItem}>
          <IconPlus className="size-4" />
        </Button>
      </div>

      {content.items.map((item, index) => (
        <div key={item.name} className="space-y-2 p-3 border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Depoimento {index + 1}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
            >
              <IconTrash className="size-4" />
            </Button>
          </div>
          <Input
            value={item.name}
            onChange={(e) => updateItem(index, "name", e.target.value)}
            placeholder="Nome"
          />
          <Input
            value={item.role || ""}
            onChange={(e) => updateItem(index, "role", e.target.value)}
            placeholder="Cargo/Função"
          />
          <Input
            value={item.avatar || ""}
            onChange={(e) => updateItem(index, "avatar", e.target.value)}
            placeholder="URL do Avatar"
          />
          <Textarea
            value={item.text}
            onChange={(e) => updateItem(index, "text", e.target.value)}
            placeholder="Depoimento"
            rows={3}
          />
          <div className="space-y-2">
            <Label>Avaliação (1-5)</Label>
            <Input
              type="number"
              min="1"
              max="5"
              value={item.rating || 5}
              onChange={(e) =>
                updateItem(index, "rating", Number(e.target.value))
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
