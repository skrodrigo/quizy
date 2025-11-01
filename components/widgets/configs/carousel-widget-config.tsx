"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
      items: [...content.items, { id: String(Date.now()), image: "", alt: "" }],
    });
  };

  const removeItem = (index: number) => {
    onContentChange({
      ...content,
      items: content.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: "image" | "alt", value: string) => {
    const newItems = [...content.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onContentChange({ ...content, items: newItems });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Proporção</Label>
        <Select
          value={content.aspectRatio || "video"}
          onValueChange={(value) =>
            onContentChange({ ...content, aspectRatio: value as "square" | "video" | "portrait" })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="square">Quadrado (1:1)</SelectItem>
            <SelectItem value="video">Vídeo (16:9)</SelectItem>
            <SelectItem value="portrait">Retrato (3:4)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          checked={content.autoplay || false}
          onCheckedChange={(checked) =>
            onContentChange({ ...content, autoplay: checked as boolean })
          }
        />
        <Label className="cursor-pointer">Autoplay</Label>
      </div>

      {content.autoplay && (
        <div className="space-y-2">
          <Label>Intervalo (ms)</Label>
          <Input
            type="number"
            value={content.interval || 3000}
            onChange={(e) =>
              onContentChange({
                ...content,
                interval: Number.parseInt(e.target.value),
              })
            }
            min="1000"
            step="500"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <Label>Imagens</Label>
        <Button variant="outline" size="sm" onClick={addItem}>
          <IconPlus className="size-4" />
        </Button>
      </div>

      {content.items.map((item, index) => (
        <div key={item.id} className="space-y-2 p-3 border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Imagem {index + 1}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
            >
              <IconTrash className="size-4" />
            </Button>
          </div>
          <Input
            value={item.image}
            onChange={(e) => updateItem(index, "image", e.target.value)}
            placeholder="URL da imagem"
          />
          <Input
            value={item.alt || ""}
            onChange={(e) => updateItem(index, "alt", e.target.value)}
            placeholder="Texto alternativo (opcional)"
          />
        </div>
      ))}
    </div>
  );
}
