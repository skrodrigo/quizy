"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ArgumentWidgetContent, WidgetStyle } from "../types";

interface ArgumentWidgetConfigProps {
  content: ArgumentWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: ArgumentWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function ArgumentWidgetConfig({
  content,
  onContentChange,
}: ArgumentWidgetConfigProps) {
  const addArgument = () => {
    onContentChange({
      ...content,
      arguments: [
        ...content.arguments,
        { id: String(Date.now()), title: "", description: "", image: "" },
      ],
    });
  };

  const removeArgument = (index: number) => {
    onContentChange({
      ...content,
      arguments: content.arguments.filter((_, i) => i !== index),
    });
  };

  const updateArgument = (
    index: number,
    field: keyof (typeof content.arguments)[0],
    value: string,
  ) => {
    const newArguments = [...content.arguments];
    newArguments[index] = { ...newArguments[index], [field]: value };
    onContentChange({ ...content, arguments: newArguments });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Colunas</Label>
        <Select
          value={String(content.columns || 3)}
          onValueChange={(value) =>
            onContentChange({
              ...content,
              columns: Number(value) as 1 | 2 | 3 | 4,
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 coluna</SelectItem>
            <SelectItem value="2">2 colunas</SelectItem>
            <SelectItem value="3">3 colunas</SelectItem>
            <SelectItem value="4">4 colunas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label>Argumentos</Label>
        <Button variant="outline" size="sm" onClick={addArgument}>
          <IconPlus className="size-4" />
        </Button>
      </div>

      {content.arguments.map((arg, index) => (
        <div key={arg.id} className="space-y-2 p-3 border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Argumento {index + 1}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeArgument(index)}
            >
              <IconTrash className="size-4" />
            </Button>
          </div>
          <Input
            value={arg.image || ""}
            onChange={(e) => updateArgument(index, "image", e.target.value)}
            placeholder="URL da imagem"
          />
          <Input
            value={arg.title}
            onChange={(e) => updateArgument(index, "title", e.target.value)}
            placeholder="Título"
          />
          <Textarea
            value={arg.description}
            onChange={(e) =>
              updateArgument(index, "description", e.target.value)
            }
            placeholder="Descrição"
            rows={2}
          />
        </div>
      ))}
    </div>
  );
}
