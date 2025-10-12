"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OptionWidgetContent, WidgetStyle } from "../types";

interface OptionWidgetConfigProps {
  content: OptionWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: OptionWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function OptionWidgetConfig({
  content,
  onContentChange,
}: OptionWidgetConfigProps) {
  const addOption = () => {
    onContentChange({
      ...content,
      options: [
        ...content.options,
        { id: String(Date.now()), label: "", value: "" },
      ],
    });
  };

  const removeOption = (index: number) => {
    onContentChange({
      ...content,
      options: content.options.filter((_, i) => i !== index),
    });
  };

  const updateOption = (
    index: number,
    field: "label" | "value",
    value: string,
  ) => {
    const newOptions = [...content.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    onContentChange({ ...content, options: newOptions });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={content.multiple || false}
          onCheckedChange={(checked) =>
            onContentChange({ ...content, multiple: checked as boolean })
          }
        />
        <Label className="cursor-pointer">Seleção múltipla</Label>
      </div>

      <div className="flex items-center justify-between">
        <Label>Opções</Label>
        <Button variant="outline" size="sm" onClick={addOption}>
          <IconPlus className="size-4" />
        </Button>
      </div>

      {content.options.map((option, index) => (
        <div key={option.id} className="flex gap-2">
          <Input
            value={option.label}
            onChange={(e) => updateOption(index, "label", e.target.value)}
            placeholder="Label"
            className="flex-1"
          />
          <Input
            value={option.value}
            onChange={(e) => updateOption(index, "value", e.target.value)}
            placeholder="Valor"
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeOption(index)}
          >
            <IconTrash className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
