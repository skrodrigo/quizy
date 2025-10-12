"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TimerWidgetContent, WidgetStyle } from "../types";

interface TimerWidgetConfigProps {
  content: TimerWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: TimerWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function TimerWidgetConfig({
  content,
  style,
  onContentChange,
  onStyleChange,
}: TimerWidgetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Duração (segundos)</Label>
        <Input
          type="number"
          value={content.duration}
          onChange={(e) =>
            onContentChange({ ...content, duration: Number(e.target.value) })
          }
          placeholder="60"
        />
      </div>

      <div className="space-y-2">
        <Label>Formato</Label>
        <select
          className="w-full h-10 px-3 rounded-md border border-input bg-background"
          value={content.format || "mm:ss"}
          onChange={(e) =>
            onContentChange({
              ...content,
              format: e.target.value as "mm:ss" | "hh:mm:ss",
            })
          }
        >
          <option value="mm:ss">MM:SS</option>
          <option value="hh:mm:ss">HH:MM:SS</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Cor do Texto</Label>
        <Input
          type="color"
          value={style.textColor || "#000000"}
          onChange={(e) =>
            onStyleChange({ ...style, textColor: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Tamanho da Fonte</Label>
        <Input
          value={style.fontSize || "24px"}
          onChange={(e) => onStyleChange({ ...style, fontSize: e.target.value })}
          placeholder="24px"
        />
      </div>

      <div className="space-y-2">
        <Label>Alinhamento</Label>
        <select
          className="w-full h-10 px-3 rounded-md border border-input bg-background"
          value={style.textAlign || "center"}
          onChange={(e) =>
            onStyleChange({
              ...style,
              textAlign: e.target.value as "left" | "center" | "right",
            })
          }
        >
          <option value="left">Esquerda</option>
          <option value="center">Centro</option>
          <option value="right">Direita</option>
        </select>
      </div>
    </div>
  );
}
