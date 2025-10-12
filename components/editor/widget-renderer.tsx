"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { WidgetConfig } from "@/components/widgets/types";

interface WidgetRendererProps {
  widget: WidgetConfig;
}

export function WidgetRenderer({ widget }: WidgetRendererProps) {
  const style = {
    backgroundColor: widget.style.backgroundColor,
    color: widget.style.textColor,
    borderRadius: widget.style.borderRadius,
    padding: widget.style.padding,
    margin: widget.style.margin,
    fontSize: widget.style.fontSize,
    fontWeight: widget.style.fontWeight,
    textAlign: widget.style.textAlign,
    width: widget.style.width,
    height: widget.style.height,
  };

  switch (widget.type) {
    case "texto":
      return (
        <div style={style} className="p-4">
          <p className="text-foreground">
            {(widget.content as { text?: string }).text || "Digite seu texto aqui"}
          </p>
        </div>
      );

    case "botao":
      return (
        <div className="p-4">
          <Button style={style}>
            {(widget.content as { label?: string }).label || "Clique aqui"}
          </Button>
        </div>
      );

    case "progresso":
      return (
        <div className="p-4 space-y-2">
          <Progress
            value={(widget.content as { value?: number }).value || 0}
            className="w-full"
          />
          {(widget.content as { showLabel?: boolean }).showLabel !== false && (
            <p className="text-sm text-muted-foreground text-center">
              {(widget.content as { value?: number }).value || 0}%
            </p>
          )}
        </div>
      );

    case "timer":
      return (
        <div style={style} className="p-4 text-center">
          <p className="text-2xl font-bold">
            {(widget.content as { format?: string }).format === "hh:mm:ss"
              ? "00:00:00"
              : "00:00"}
          </p>
        </div>
      );

    case "video":
      return (
        <div className="p-4">
          <div
            style={style}
            className="bg-muted rounded-lg flex items-center justify-center aspect-video"
          >
            <p className="text-muted-foreground">Vídeo Player</p>
          </div>
        </div>
      );

    case "audio":
      return (
        <div className="p-4">
          <div className="bg-muted rounded-lg p-4 flex items-center gap-4">
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary">▶</span>
            </div>
            <div className="flex-1 h-2 bg-muted-foreground/20 rounded-full" />
          </div>
        </div>
      );

    case "espaco":
      return (
        <div
          style={{
            height: (widget.content as { height?: string }).height || "40px",
          }}
        />
      );

    case "alerta":
      return (
        <div style={style} className="p-4 border rounded-lg">
          <p className="font-semibold">
            {(widget.content as { title?: string }).title || "Alerta"}
          </p>
          <p className="text-sm mt-1">
            {(widget.content as { message?: string }).message || "Mensagem do alerta"}
          </p>
        </div>
      );

    case "preco":
      return (
        <div style={style} className="p-6 border rounded-lg text-center">
          <p className="text-4xl font-bold">
            {(widget.content as { currency?: string }).currency || "R$"}
            {(widget.content as { price?: number }).price || "0"}
          </p>
          {(widget.content as { period?: string }).period && (
            <p className="text-sm text-muted-foreground mt-1">
              {(widget.content as { period?: string }).period}
            </p>
          )}
        </div>
      );

    case "loading":
      return (
        <div className="p-4 flex items-center justify-center gap-2">
          <div className="size-4 border border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">
            {(widget.content as { message?: string }).message || "Carregando..."}
          </p>
        </div>
      );

    default:
      return (
        <div className="p-4 border border-dashed border-muted rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            Widget: {widget.type}
          </p>
        </div>
      );
  }
}
