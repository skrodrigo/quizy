"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PriceWidgetContent, WidgetStyle } from "../types";

interface PriceWidgetConfigProps {
  content: PriceWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: PriceWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function PriceWidgetConfig({
  content,
  style,
  onContentChange,
  onStyleChange,
}: PriceWidgetConfigProps) {
  const [newFeature, setNewFeature] = useState("");

  const addFeature = () => {
    if (newFeature.trim()) {
      onContentChange({
        ...content,
        features: [...(content.features || []), newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    onContentChange({
      ...content,
      features: content.features?.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Título do Plano</Label>
        <Input
          value={content.title}
          onChange={(e) =>
            onContentChange({ ...content, title: e.target.value })
          }
          placeholder="Plano Premium"
        />
      </div>

      <div className="space-y-2">
        <Label>Badge (opcional)</Label>
        <Input
          value={content.badge || ""}
          onChange={(e) =>
            onContentChange({ ...content, badge: e.target.value })
          }
          placeholder="15% Off"
        />
      </div>

      <div className="space-y-2">
        <Label>Preço</Label>
        <Input
          type="number"
          value={content.price}
          onChange={(e) =>
            onContentChange({ ...content, price: Number(e.target.value) })
          }
          placeholder="39.90"
        />
      </div>

      <div className="space-y-2">
        <Label>Moeda</Label>
        <Input
          value={content.currency}
          onChange={(e) =>
            onContentChange({ ...content, currency: e.target.value })
          }
          placeholder="R$"
        />
      </div>

      <div className="space-y-2">
        <Label>Período</Label>
        <Input
          value={content.period || ""}
          onChange={(e) =>
            onContentChange({ ...content, period: e.target.value })
          }
          placeholder="à vista"
        />
      </div>

      <div className="space-y-2">
        <Label>Características</Label>
        <div className="space-y-2">
          {content.features?.map((feature, index) => (
            <div key={feature} className="flex items-center gap-2">
              <Input value={feature} readOnly className="flex-1" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFeature(index)}
              >
                <IconTrash className="size-4" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Nova característica"
              onKeyDown={(e) => e.key === "Enter" && addFeature()}
            />
            <Button variant="outline" size="icon" onClick={addFeature}>
              <IconPlus className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Cor do Preço</Label>
        <Input
          type="color"
          value={style.textColor || "#000000"}
          onChange={(e) =>
            onStyleChange({ ...style, textColor: e.target.value })
          }
        />
      </div>
    </div>
  );
}
