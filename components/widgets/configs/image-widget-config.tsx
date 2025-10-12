"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ImageWidgetContent, WidgetStyle } from "../types";

interface ImageWidgetConfigProps {
  content: ImageWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: ImageWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function ImageWidgetConfig({
  content,
  style,
  onContentChange,
  onStyleChange,
}: ImageWidgetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>URL da Imagem</Label>
        <Input
          value={content.url}
          onChange={(e) => onContentChange({ ...content, url: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label>Texto Alternativo</Label>
        <Input
          value={content.alt}
          onChange={(e) => onContentChange({ ...content, alt: e.target.value })}
          placeholder="Descrição da imagem"
        />
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
