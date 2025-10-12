"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VideoWidgetContent, WidgetStyle } from "../types";

interface VideoWidgetConfigProps {
  content: VideoWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: VideoWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function VideoWidgetConfig({
  content,
  style,
  onContentChange,
  onStyleChange,
}: VideoWidgetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>URL do Vídeo</Label>
        <Input
          value={content.url}
          onChange={(e) => onContentChange({ ...content, url: e.target.value })}
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="autoplay"
          checked={content.autoplay || false}
          onCheckedChange={(checked) =>
            onContentChange({ ...content, autoplay: checked as boolean })
          }
        />
        <Label htmlFor="autoplay" className="cursor-pointer">
          Reproduzir automaticamente
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="controls"
          checked={content.controls !== false}
          onCheckedChange={(checked) =>
            onContentChange({ ...content, controls: checked as boolean })
          }
        />
        <Label htmlFor="controls" className="cursor-pointer">
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

      <div className="space-y-2">
        <Label>Altura</Label>
        <Input
          value={style.height || "auto"}
          onChange={(e) => onStyleChange({ ...style, height: e.target.value })}
          placeholder="auto"
        />
      </div>

      <div className="space-y-2">
        <Label>Borda Arredondada</Label>
        <Input
          value={style.borderRadius || "8px"}
          onChange={(e) =>
            onStyleChange({ ...style, borderRadius: e.target.value })
          }
          placeholder="8px"
        />
      </div>
    </div>
  );
}
