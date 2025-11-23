"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AudioWidgetContent, WidgetStyle } from "../types";

interface AudioWidgetConfigProps {
  content: AudioWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: AudioWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function AudioWidgetConfig({
  content,
  style,
  onContentChange,
  onStyleChange,
}: AudioWidgetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Estilo</Label>
        <Tabs
          value={content.style || "whatsapp"}
          onValueChange={(value) =>
            onContentChange({
              ...content,
              style: value as "whatsapp" | "instagram",
            })
          }
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-2">
        <Label>URL do Áudio</Label>
        <Input
          value={content.url}
          onChange={(e) => onContentChange({ ...content, url: e.target.value })}
          placeholder="https://example.com/audio.mp3"
        />
      </div>

      <div className="space-y-2">
        <Label>Duração</Label>
        <Input
          value={content.duration || "0:00"}
          onChange={(e) =>
            onContentChange({ ...content, duration: e.target.value })
          }
          placeholder="0:00"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="audio-autoplay"
          checked={content.autoplay || false}
          onCheckedChange={(checked) =>
            onContentChange({ ...content, autoplay: checked as boolean })
          }
        />
        <Label htmlFor="audio-autoplay" className="cursor-pointer">
          Reproduzir automaticamente
        </Label>
      </div>
    </div>
  );
}
