"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProgressWidgetContent, WidgetStyle } from "../types";

interface ProgressWidgetConfigProps {
  content: ProgressWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: ProgressWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function ProgressWidgetConfig({
  content,
  style,
  onContentChange,
  onStyleChange,
}: ProgressWidgetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Valor Atual</Label>
        <Input
          type="number"
          value={content.value}
          onChange={(e) =>
            onContentChange({ ...content, value: Number(e.target.value) })
          }
          placeholder="50"
        />
      </div>

      <div className="space-y-2">
        <Label>Valor Máximo</Label>
        <Input
          type="number"
          value={content.max}
          onChange={(e) =>
            onContentChange({ ...content, max: Number(e.target.value) })
          }
          placeholder="100"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="show-label"
          checked={content.showLabel !== false}
          onCheckedChange={(checked) =>
            onContentChange({ ...content, showLabel: checked as boolean })
          }
        />
        <Label htmlFor="show-label" className="cursor-pointer">
          Mostrar porcentagem
        </Label>
      </div>

      <div className="space-y-2">
        <Label>Cor da Barra</Label>
        <Input
          type="color"
          value={style.backgroundColor || "#000000"}
          onChange={(e) =>
            onStyleChange({ ...style, backgroundColor: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Altura</Label>
        <Input
          value={style.height || "8px"}
          onChange={(e) => onStyleChange({ ...style, height: e.target.value })}
          placeholder="8px"
        />
      </div>
    </div>
  );
}
