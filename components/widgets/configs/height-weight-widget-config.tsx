"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { HeightWidgetContent, WeightWidgetContent, WidgetStyle } from "../types";

interface HeightWidgetConfigProps {
  content: HeightWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: HeightWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function HeightWidgetConfig({
  content,
  onContentChange,
}: HeightWidgetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Valor</Label>
        <Input
          type="number"
          value={content.value}
          onChange={(e) =>
            onContentChange({ ...content, value: Number(e.target.value) })
          }
          placeholder="170"
        />
      </div>

      <div className="space-y-2">
        <Label>Unidade</Label>
        <select
          className="w-full h-10 px-3 rounded-md border border-input bg-background"
          value={content.unit}
          onChange={(e) =>
            onContentChange({
              ...content,
              unit: e.target.value as "cm" | "m" | "ft" | "in",
            })
          }
        >
          <option value="cm">cm</option>
          <option value="m">m</option>
          <option value="ft">ft</option>
          <option value="in">in</option>
        </select>
      </div>
    </div>
  );
}

interface WeightWidgetConfigProps {
  content: WeightWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: WeightWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function WeightWidgetConfig({
  content,
  onContentChange,
}: WeightWidgetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Valor</Label>
        <Input
          type="number"
          value={content.value}
          onChange={(e) =>
            onContentChange({ ...content, value: Number(e.target.value) })
          }
          placeholder="70"
        />
      </div>

      <div className="space-y-2">
        <Label>Unidade</Label>
        <select
          className="w-full h-10 px-3 rounded-md border border-input bg-background"
          value={content.unit}
          onChange={(e) =>
            onContentChange({
              ...content,
              unit: e.target.value as "kg" | "lb" | "g",
            })
          }
        >
          <option value="kg">kg</option>
          <option value="lb">lb</option>
          <option value="g">g</option>
        </select>
      </div>
    </div>
  );
}
