"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ButtonWidgetContent, WidgetStyle } from "../types";

interface ButtonWidgetConfigProps {
  content: ButtonWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: ButtonWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function ButtonWidgetConfig({
  content,
  style,
  onContentChange,
  onStyleChange,
}: ButtonWidgetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Texto do Botão</Label>
        <Input
          value={content.label}
          onChange={(e) =>
            onContentChange({ ...content, label: e.target.value })
          }
          placeholder="Clique aqui"
        />
      </div>

      <div className="space-y-2">
        <Label>Ação</Label>
        <Input
          value={content.action}
          onChange={(e) =>
            onContentChange({ ...content, action: e.target.value })
          }
          placeholder="URL ou ação"
        />
      </div>

      <div className="space-y-2">
        <Label>Variante</Label>
        <select
          className="w-full h-10 px-3 rounded-md border border-input bg-background"
          value={content.variant || "default"}
          onChange={(e) =>
            onContentChange({
              ...content,
              variant: e.target.value as "default" | "outline" | "ghost",
            })
          }
        >
          <option value="default">Padrão</option>
          <option value="outline">Contorno</option>
          <option value="ghost">Fantasma</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Cor de Fundo</Label>
        <Input
          type="color"
          value={style.backgroundColor || "#000000"}
          onChange={(e) =>
            onStyleChange({ ...style, backgroundColor: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Cor do Texto</Label>
        <Input
          type="color"
          value={style.textColor || "#ffffff"}
          onChange={(e) =>
            onStyleChange({ ...style, textColor: e.target.value })
          }
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
