"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TermsWidgetContent, WidgetStyle } from "../types";

interface TermsWidgetConfigProps {
  content: TermsWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: TermsWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function TermsWidgetConfig({
  content,
  onContentChange,
}: TermsWidgetConfigProps) {
  const addTerm = () => {
    onContentChange({
      ...content,
      terms: [...(content.terms || []), { label: "Novo termo", url: "#" }],
    });
  };

  const removeTerm = (index: number) => {
    onContentChange({
      ...content,
      terms: content.terms.filter((_, i) => i !== index),
    });
  };

  const updateTerm = (index: number, field: "label" | "url", value: string) => {
    const updatedTerms = [...content.terms];
    updatedTerms[index] = { ...updatedTerms[index], [field]: value };
    onContentChange({ ...content, terms: updatedTerms });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Texto Introdutório</Label>
        <Textarea
          value={content.text}
          onChange={(e) =>
            onContentChange({ ...content, text: e.target.value })
          }
          placeholder="Ao clicar em alguma das opções, você concorda com os"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Termos</Label>
          <Button size="sm" variant="outline" onClick={addTerm}>
            <IconPlus className="h-4 w-4 mr-1" />
            Adicionar
          </Button>
        </div>

        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {content.terms?.map((term, index) => (
            <div key={term.label} className="rounded-lg border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{term.label}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeTerm(index)}
                >
                  <IconTrash className="h-4 w-4" />
                </Button>
              </div>

              <Input
                placeholder="Label"
                value={term.label}
                onChange={(e) => updateTerm(index, "label", e.target.value)}
                className="text-sm"
              />

              <Input
                placeholder="URL"
                value={term.url}
                onChange={(e) => updateTerm(index, "url", e.target.value)}
                className="text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
