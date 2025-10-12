"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { NotificationWidgetContent, WidgetStyle } from "../types";

interface NotificationWidgetConfigProps {
  content: NotificationWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: NotificationWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function NotificationWidgetConfig({
  content,
  onContentChange,
}: NotificationWidgetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Mensagem</Label>
        <Input
          value={content.message}
          onChange={(e) =>
            onContentChange({ ...content, message: e.target.value })
          }
          placeholder="Notificação"
        />
      </div>

      <div className="space-y-2">
        <Label>Tipo</Label>
        <select
          className="w-full h-10 px-3 rounded-md border border-input bg-background"
          value={content.type || "info"}
          onChange={(e) =>
            onContentChange({
              ...content,
              type: e.target.value as "info" | "success" | "warning" | "error",
            })
          }
        >
          <option value="info">Info</option>
          <option value="success">Sucesso</option>
          <option value="warning">Aviso</option>
          <option value="error">Erro</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          checked={content.dismissible !== false}
          onCheckedChange={(checked) =>
            onContentChange({ ...content, dismissible: checked as boolean })
          }
        />
        <Label className="cursor-pointer">Pode fechar</Label>
      </div>
    </div>
  );
}
