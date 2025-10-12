"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SpacerWidgetContent, WidgetStyle } from "../types";

interface SpacerWidgetConfigProps {
  content: SpacerWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: SpacerWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function SpacerWidgetConfig({
  content,
  onContentChange,
}: SpacerWidgetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Altura do Espaço</Label>
        <Input
          value={content.height}
          onChange={(e) =>
            onContentChange({ ...content, height: e.target.value })
          }
          placeholder="40px"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Use valores como: 20px, 2rem, 5vh
      </p>
    </div>
  );
}
