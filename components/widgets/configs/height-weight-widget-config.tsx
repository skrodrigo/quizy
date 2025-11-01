"use client";

import { Label } from "@/components/ui/label";
import { RulerSlider } from "@/components/ui/ruler-slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { HeightWidgetContent, WeightWidgetContent, WidgetStyle } from "../types";

interface HeightWidgetConfigProps {
  content: HeightWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: HeightWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function HeightWidgetConfig({
  content,
  onContentChange,
}: HeightWidgetConfigProps) {
  const getMinMax = (unit: string) => {
    switch (unit) {
      case "cm":
        return { min: 50, max: 250, step: 1 };
      case "m":
        return { min: 0.5, max: 2.5, step: 0.01 };
      case "ft":
        return { min: 2, max: 8, step: 0.1 };
      case "in":
        return { min: 20, max: 100, step: 1 };
      default:
        return { min: 50, max: 250, step: 1 };
    }
  };

  const { min, max, step } = getMinMax(content.unit);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Unidade</Label>
        <Tabs
          value={content.unit}
          onValueChange={(value) =>
            onContentChange({
              ...content,
              unit: value as "cm" | "m" | "ft" | "in",
            })
          }
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cm">cm</TabsTrigger>
            <TabsTrigger value="m">m</TabsTrigger>
            <TabsTrigger value="ft">ft</TabsTrigger>
            <TabsTrigger value="in">in</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-2">
        <Label>Altura</Label>
        <RulerSlider
          value={content.value}
          onChange={(value) => onContentChange({ ...content, value })}
          min={min}
          max={max}
          step={step}
          unit={content.unit}
        />
      </div>
    </div>
  );
}

interface WeightWidgetConfigProps {
  content: WeightWidgetContent;
  style: WidgetStyle;
  onContentChange: (content: WeightWidgetContent) => void;
  onStyleChange: (style: WidgetStyle) => void;
}

export function WeightWidgetConfig({
  content,
  onContentChange,
}: WeightWidgetConfigProps) {
  const getMinMax = (unit: string) => {
    switch (unit) {
      case "kg":
        return { min: 20, max: 200, step: 0.5 };
      case "lb":
        return { min: 40, max: 440, step: 1 };
      case "g":
        return { min: 20000, max: 200000, step: 100 };
      default:
        return { min: 20, max: 200, step: 0.5 };
    }
  };

  const { min, max, step } = getMinMax(content.unit);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Unidade</Label>
        <Tabs
          value={content.unit}
          onValueChange={(value) =>
            onContentChange({
              ...content,
              unit: value as "kg" | "lb" | "g",
            })
          }
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="kg">kg</TabsTrigger>
            <TabsTrigger value="lb">lb</TabsTrigger>
            <TabsTrigger value="g">g</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-2">
        <Label>Peso</Label>
        <RulerSlider
          value={content.value}
          onChange={(value) => onContentChange({ ...content, value })}
          min={min}
          max={max}
          step={step}
          unit={content.unit}
        />
      </div>
    </div>
  );
}
