"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <Label>URL do Áudio</Label>
        <Input
          value={content.url}
          onChange={(e) => onContentChange({ ...content, url: e.target.value })}
          placeholder="https://example.com/audio.mp3"
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

      <div className="flex items-center space-x-2">
        <Checkbox
          id="audio-controls"
          checked={content.controls !== false}
          onCheckedChange={(checked) =>
            onContentChange({ ...content, controls: checked as boolean })
          }
        />
        <Label htmlFor="audio-controls" className="cursor-pointer">
          Mostrar controles
        </Label>
      </div>

      <div className="space-y-2">
        <Label>Largura</Label>
        <Input
          value={style.width || "100%"}
          onChange={(e) => onStyleChange({ ...style, width: e.target.value })}
          placeholder="100%"
        />
      </div>
    </div>
  );
}
