"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TextWidgetContent, WidgetStyle } from "../types";

interface TextWidgetConfigProps {
  content: TextWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: TextWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function TextWidgetConfig({
  content,
  style,
  onContentChange,
  onStyleChange,
}: TextWidgetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Título</Label>
        <Input
          value={content.heading || ""}
          onChange={(e) =>
            onContentChange({ ...content, heading: e.target.value })
          }
          placeholder="Digite o título"
        />
      </div>

      <div className="space-y-2">
        <Label>Texto</Label>
        <Textarea
          value={content.text}
          onChange={(e) =>
            onContentChange({ ...content, text: e.target.value })
          }
          placeholder="Digite o texto"
          rows={4}
        />
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
          value={style.fontSize || "16px"}
          onChange={(e) =>
            onStyleChange({ ...style, fontSize: e.target.value })
          }
          placeholder="16px"
        />
      </div>

      <div className="space-y-2">
        <Label>Alinhamento</Label>
        <select
          className="w-full h-10 px-3 rounded-md border border-input bg-background"
          value={style.textAlign || "left"}
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
