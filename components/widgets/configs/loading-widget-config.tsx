"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LoadingWidgetContent, WidgetStyle } from "../types";

interface LoadingWidgetConfigProps {
  content: LoadingWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: LoadingWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function LoadingWidgetConfig({
  content,
  onContentChange,
}: LoadingWidgetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Mensagem</Label>
        <Input
          value={content.message || ""}
          onChange={(e) =>
            onContentChange({ ...content, message: e.target.value })
          }
          placeholder="Carregando..."
        />
      </div>

      <div className="space-y-2">
        <Label>Variante</Label>
        <select
          className="w-full h-10 px-3 rounded-md border border-input bg-background"
          value={content.variant || "spinner"}
          onChange={(e) =>
            onContentChange({
              ...content,
              variant: e.target.value as "spinner" | "dots" | "pulse",
            })
          }
        >
          <option value="spinner">Spinner</option>
          <option value="dots">Dots</option>
          <option value="pulse">Pulse</option>
        </select>
      </div>
    </div>
  );
}
