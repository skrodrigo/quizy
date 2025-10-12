"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AlertWidgetContent, WidgetStyle } from "../types";

interface AlertWidgetConfigProps {
  content: AlertWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: AlertWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function AlertWidgetConfig({
  content,
  style,
  onContentChange,
  onStyleChange,
}: AlertWidgetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Título</Label>
        <Input
          value={content.title}
          onChange={(e) =>
            onContentChange({ ...content, title: e.target.value })
          }
          placeholder="Atenção!"
        />
      </div>

      <div className="space-y-2">
        <Label>Mensagem</Label>
        <Textarea
          value={content.message}
          onChange={(e) =>
            onContentChange({ ...content, message: e.target.value })
          }
          placeholder="Digite a mensagem"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Variante</Label>
        <select
          className="w-full h-10 px-3 rounded-md border border-input bg-background"
          value={content.variant || "info"}
          onChange={(e) =>
            onContentChange({
              ...content,
              variant: e.target.value as "info" | "warning" | "error" | "success",
            })
          }
        >
          <option value="info">Info</option>
          <option value="warning">Aviso</option>
          <option value="error">Erro</option>
          <option value="success">Sucesso</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Cor de Fundo</Label>
        <Input
          type="color"
          value={style.backgroundColor || "#f0f0f0"}
          onChange={(e) =>
            onStyleChange({ ...style, backgroundColor: e.target.value })
          }
        />
      </div>
    </div>
  );
}
