"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        <Tabs
          value={content.variant || "spinner"}
          onValueChange={(value) =>
            onContentChange({
              ...content,
              variant: value as "spinner" | "dots" | "pulse",
            })
          }
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="spinner">Spinner</TabsTrigger>
            <TabsTrigger value="dots">Dots</TabsTrigger>
            <TabsTrigger value="pulse">Pulse</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
