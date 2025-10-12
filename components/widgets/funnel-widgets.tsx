"use client";

import {
  IconAlertTriangle,
  IconBubble,
  IconCarouselHorizontal,
  IconChartBar,
  IconCircuitPushbutton,
  IconClock,
  IconHandClick,
  IconHelp,
  IconLoader,
  IconProgress,
  IconRuler2,
  IconScale,
  IconScreenshot,
  IconSpacingVertical,
  IconTag,
  IconTypography,
  IconUsers,
  IconVideo,
  IconVolume,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const widgets = [
  { id: "alerta", name: "Alerta", icon: IconAlertTriangle },
  { id: "altura", name: "Altura", icon: IconRuler2 },
  { id: "argumentos", name: "Argumentos", icon: IconBubble },
  { id: "audio", name: "Áudio", icon: IconVolume },
  { id: "botao", name: "Botão", icon: IconHandClick },
  { id: "captura", name: "Captura", icon: IconScreenshot },
  { id: "carrosel", name: "Carrosel", icon: IconCarouselHorizontal },
  { id: "depoimentos", name: "Depoimentos", icon: IconUsers },
  { id: "espaco", name: "Espaço", icon: IconSpacingVertical },
  { id: "faq", name: "FAQ", icon: IconHelp },
  { id: "graficos", name: "Gráficos", icon: IconChartBar },
  { id: "loading", name: "Loading", icon: IconLoader },
  { id: "metricas", name: "Métricas", icon: IconChartBar },
  { id: "progresso", name: "Progresso", icon: IconProgress },
  { id: "notificacao", name: "Notificação", icon: IconAlertTriangle },
  { id: "opcao", name: "Opção", icon: IconCircuitPushbutton },
  { id: "peso", name: "Peso", icon: IconScale },
  { id: "preco", name: "Preço", icon: IconTag },
  { id: "texto", name: "Texto", icon: IconTypography },
  { id: "timer", name: "Timer", icon: IconClock },
  { id: "video", name: "Vídeo", icon: IconVideo },
];

export function FunnelWidgets() {
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );

    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      setShowTopFade(scrollTop > 0);
      setShowBottomFade(scrollTop + clientHeight < scrollHeight - 1);
    };

    handleScroll();
    scrollElement.addEventListener("scroll", handleScroll);
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-w-[200px] max-w-[200px] relative">
      {showTopFade && (
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none transition-opacity duration-700" />
      )}

      <ScrollArea ref={scrollRef} className="h-[calc(100vh-50px)]">
        <div className="p-1 space-y-2">
          {widgets.map((widget) => {
            const Icon = widget.icon;
            return (
              <Button
                key={widget.id}
                variant="outline"
                className="w-full justify-start"
              >
                <Icon stroke={2} className="size-4" />
                <span className="text-foreground">{widget.name}</span>
              </Button>
            );
          })}
        </div>
      </ScrollArea>

      {showBottomFade && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none transition-opacity duration-700" />
      )}
    </div>
  );
}
