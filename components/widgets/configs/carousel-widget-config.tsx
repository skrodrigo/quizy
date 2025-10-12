"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CarouselWidgetContent, WidgetStyle } from "../types";

interface CarouselWidgetConfigProps {
  content: CarouselWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: CarouselWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function CarouselWidgetConfig({
  content,
  onContentChange,
}: CarouselWidgetConfigProps) {
  const addItem = () => {
    onContentChange({
      ...content,
      items: [...content.items, { id: String(Date.now()), content: "" }],
    });
  };

  const removeItem = (index: number) => {
    onContentChange({
      ...content,
      items: content.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, value: unknown) => {
    const newItems = [...content.items];
    newItems[index] = { ...newItems[index], content: value };
    onContentChange({ ...content, items: newItems });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={content.autoplay || false}
          onCheckedChange={(checked) =>
            onContentChange({ ...content, autoplay: checked as boolean })
          }
        />
        <Label className="cursor-pointer">Autoplay</Label>
      </div>

      <div className="space-y-2">
        <Label>Intervalo (ms)</Label>
        <Input
          type="number"
          value={content.interval || 3000}
          onChange={(e) =>
            onContentChange({ ...content, interval: Number(e.target.value) })
          }
          placeholder="3000"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label>Itens</Label>
        <Button variant="outline" size="sm" onClick={addItem}>
          <IconPlus className="size-4" />
        </Button>
      </div>

      {content.items.map((item, index) => (
        <div key={item.id} className="space-y-2 p-3 border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Item {index + 1}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
            >
              <IconTrash className="size-4" />
            </Button>
          </div>
          <Textarea
            value={String(item.content)}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder="Conteúdo do item"
            rows={3}
          />
        </div>
      ))}
    </div>
  );
}
