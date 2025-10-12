"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertWidgetConfig,
  ArgumentWidgetConfig,
  AudioWidgetConfig,
  ButtonWidgetConfig,
  CaptureWidgetConfig,
  CarouselWidgetConfig,
  ChartWidgetConfig,
  FAQWidgetConfig,
  HeightWidgetConfig,
  ImageWidgetConfig,
  LoadingWidgetConfig,
  MetricsWidgetConfig,
  NotificationWidgetConfig,
  OptionWidgetConfig,
  PriceWidgetConfig,
  ProgressWidgetConfig,
  SpacerWidgetConfig,
  TestimonialWidgetConfig,
  TextWidgetConfig,
  TimerWidgetConfig,
  VideoWidgetConfig,
  WeightWidgetConfig,
} from "./configs";
import type { WidgetConfig } from "./types";

interface WidgetConfigPanelProps {
  widget: WidgetConfig | null;
  onUpdate: (widget: WidgetConfig) => void;
}

export function WidgetConfigPanel({
  widget,
  onUpdate,
}: WidgetConfigPanelProps) {
  if (!widget) {
    return (
      <div className="border rounded-xl m-1 min-w-[280px] max-w-[280px] h-[calc(100vh-60px)] flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Selecione um widget para configurar
        </p>
      </div>
    );
  }

  const renderConfig = () => {
    const props = {
      content: widget.content,
      style: widget.style,
      onContentChange: (content: typeof widget.content) =>
        onUpdate({ ...widget, content }),
      onStyleChange: (style: typeof widget.style) =>
        onUpdate({ ...widget, style }),
    };

    switch (widget.type) {
      case "alerta":
        return <AlertWidgetConfig {...props} />;
      case "altura":
        return <HeightWidgetConfig {...props} />;
      case "argumentos":
        return <ArgumentWidgetConfig {...props} />;
      case "audio":
        return <AudioWidgetConfig {...props} />;
      case "botao":
        return <ButtonWidgetConfig {...props} />;
      case "captura":
        return <CaptureWidgetConfig {...props} />;
      case "carrosel":
        return <CarouselWidgetConfig {...props} />;
      case "depoimentos":
        return <TestimonialWidgetConfig {...props} />;
      case "espaco":
        return <SpacerWidgetConfig {...props} />;
      case "faq":
        return <FAQWidgetConfig {...props} />;
      case "graficos":
        return <ChartWidgetConfig {...props} />;
      case "loading":
        return <LoadingWidgetConfig {...props} />;
      case "metricas":
        return <MetricsWidgetConfig {...props} />;
      case "notificacao":
        return <NotificationWidgetConfig {...props} />;
      case "opcao":
        return <OptionWidgetConfig {...props} />;
      case "peso":
        return <WeightWidgetConfig {...props} />;
      case "preco":
        return <PriceWidgetConfig {...props} />;
      case "progresso":
        return <ProgressWidgetConfig {...props} />;
      case "texto":
        return <TextWidgetConfig {...props} />;
      case "timer":
        return <TimerWidgetConfig {...props} />;
      case "video":
        return <VideoWidgetConfig {...props} />;
      default:
        return (
          <p className="text-muted-foreground text-sm">
            Configuração não disponível para este widget
          </p>
        );
    }
  };

  return (
    <div className="border rounded-xl m-1 min-w-[280px] max-w-[280px] h-[calc(100vh-60px)] overflow-hidden">
      <Tabs defaultValue="content" className="h-full flex flex-col">
        <div className="border-b px-4 py-3">
          <h3 className="font-semibold text-sm">Configurações</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {widget.type.charAt(0).toUpperCase() + widget.type.slice(1)}
          </p>
        </div>

        <TabsList className="w-full rounded-none border-b">
          <TabsTrigger value="content" className="flex-1">
            Conteúdo
          </TabsTrigger>
          <TabsTrigger value="style" className="flex-1">
            Estilo
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="content" className="p-4 m-0">
            {renderConfig()}
          </TabsContent>

          <TabsContent value="style" className="p-4 m-0">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Estilos específicos do widget
              </p>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
