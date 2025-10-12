"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        { title: "", description: "", icon: "" },
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
      <div className="flex items-center justify-between">
        <Label>Argumentos</Label>
        <Button variant="outline" size="sm" onClick={addArgument}>
          <IconPlus className="size-4" />
        </Button>
      </div>

      {content.arguments.map((arg, index) => (
        <div key={arg.title} className="space-y-2 p-3 border rounded-lg">
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
          <Input
            value={arg.icon || ""}
            onChange={(e) => updateArgument(index, "icon", e.target.value)}
            placeholder="Ícone (opcional)"
          />
        </div>
      ))}
    </div>
  );
}
