"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CaptureWidgetContent, WidgetStyle } from "../types";

interface CaptureWidgetConfigProps {
  content: CaptureWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: CaptureWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function CaptureWidgetConfig({
  content,
  onContentChange,
}: CaptureWidgetConfigProps) {
  const addField = () => {
    onContentChange({
      ...content,
      fields: [
        ...content.fields,
        { name: "", type: "text", label: "", required: false },
      ],
    });
  };

  const removeField = (index: number) => {
    onContentChange({
      ...content,
      fields: content.fields.filter((_, i) => i !== index),
    });
  };

  const updateField = (
    index: number,
    updates: Partial<(typeof content.fields)[0]>,
  ) => {
    const newFields = [...content.fields];
    newFields[index] = { ...newFields[index], ...updates };
    onContentChange({ ...content, fields: newFields });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>URL da Imagem</Label>
        <Input
          value={content.image || ""}
          onChange={(e) => onContentChange({ ...content, image: e.target.value })}
          placeholder="https://exemplo.com/imagem.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label>Proporção da Imagem</Label>
        <Select
          value={content.imageAspectRatio || "video"}
          onValueChange={(value) =>
            onContentChange({ ...content, imageAspectRatio: value as "square" | "video" | "portrait" })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="square">Quadrado (1:1)</SelectItem>
            <SelectItem value="video">Vídeo (16:9)</SelectItem>
            <SelectItem value="portrait">Retrato (3:4)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Texto do Botão</Label>
        <Input
          value={content.submitLabel}
          onChange={(e) =>
            onContentChange({ ...content, submitLabel: e.target.value })
          }
          placeholder="Enviar"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label>Campos</Label>
        <Button variant="outline" size="sm" onClick={addField}>
          <IconPlus className="size-4" />
        </Button>
      </div>

      {content.fields.map((field, index) => (
        <div key={field.label} className="space-y-2 p-3 border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Campo {index + 1}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeField(index)}
            >
              <IconTrash className="size-4" />
            </Button>
          </div>
          <Input
            value={field.label}
            onChange={(e) => updateField(index, { label: e.target.value })}
            placeholder="Label"
          />
          <Input
            value={field.name}
            onChange={(e) => updateField(index, { name: e.target.value })}
            placeholder="Nome do campo"
          />
          <select
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
            value={field.type}
            onChange={(e) =>
              updateField(index, { type: e.target.value as typeof field.type })
            }
          >
            <option value="text">Texto</option>
            <option value="email">Email</option>
            <option value="tel">Telefone</option>
            <option value="number">Número</option>
          </select>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={field.required}
              onCheckedChange={(checked) =>
                updateField(index, { required: checked as boolean })
              }
            />
            <Label className="cursor-pointer">Obrigatório</Label>
          </div>
        </div>
      ))}
    </div>
  );
}
