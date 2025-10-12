"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FAQWidgetContent, WidgetStyle } from "../types";

interface FAQWidgetConfigProps {
  content: FAQWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: FAQWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function FAQWidgetConfig({
  content,
  onContentChange,
}: FAQWidgetConfigProps) {
  const addItem = () => {
    onContentChange({
      ...content,
      items: [...content.items, { question: "", answer: "" }],
    });
  };

  const removeItem = (index: number) => {
    onContentChange({
      ...content,
      items: content.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (
    index: number,
    field: "question" | "answer",
    value: string,
  ) => {
    const newItems = [...content.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onContentChange({ ...content, items: newItems });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Perguntas e Respostas</Label>
        <Button variant="outline" size="sm" onClick={addItem}>
          <IconPlus className="size-4" />
        </Button>
      </div>

      {content.items.map((item, index) => (
        <div key={item.answer} className="space-y-2 p-3 border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Item {index + 1}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
            >
              <IconTrash className="size-4" />
            </Button>
          </div>
          <Input
            value={item.question}
            onChange={(e) => updateItem(index, "question", e.target.value)}
            placeholder="Pergunta"
          />
          <Textarea
            value={item.answer}
            onChange={(e) => updateItem(index, "answer", e.target.value)}
            placeholder="Resposta"
            rows={2}
          />
        </div>
      ))}
    </div>
  );
}
