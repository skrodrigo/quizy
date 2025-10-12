"use client";

import {
  IconAlertTriangle,
  IconArrowsShuffle,
  IconChartArcs3,
  IconChartBar,
  IconCircuitPushbutton,
  IconClock,
  IconDeviceAudioTape,
  IconDeviceMobile,
  IconGripHorizontal,
  IconHelp,
  IconLoader,
  IconMessageCircle,
  IconPlayerPlay,
  IconPlus,
  IconPrinter,
  IconRuler2,
  IconScale,
  IconShare2,
  IconSpacingVertical,
  IconStar,
  IconTag,
  IconTypography,
  IconVideo,
} from "@tabler/icons-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const widgets = [
  { id: "alerta", name: "Alerta", icon: IconAlertTriangle },
  { id: "altura", name: "Altura", icon: IconRuler2 },
  { id: "argumentos", name: "Argumentos", icon: IconChartArcs3 },
  { id: "audio", name: "Áudio", icon: IconDeviceAudioTape },
  { id: "botao", name: "Botão", icon: IconCircuitPushbutton },
  { id: "captura", name: "Captura", icon: IconPrinter },
  { id: "carrosel", name: "Carrosel", icon: IconArrowsShuffle },
  { id: "depoimentos", name: "Depoimentos", icon: IconMessageCircle },
  { id: "espaco", name: "Espaço", icon: IconSpacingVertical },
  { id: "faq", name: "FAQ", icon: IconHelp },
  { id: "graficos", name: "Gráficos", icon: IconChartBar },
  { id: "loading", name: "Loading", icon: IconLoader },
  { id: "metricas", name: "Métricas", icon: IconChartBar },
  { id: "nivel", name: "Nível", icon: IconStar },
  { id: "notificacao", name: "Notificação", icon: IconAlertTriangle },
  { id: "opcao", name: "Opção", icon: IconCircuitPushbutton },
  { id: "peso", name: "Peso", icon: IconScale },
  { id: "preco", name: "Preço", icon: IconTag },
  { id: "texto", name: "Texto", icon: IconTypography },
  { id: "timer", name: "Timer", icon: IconClock },
  { id: "video", name: "Vídeo", icon: IconVideo },
];

export default function Page() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "funis",
  });
  const { theme } = useTheme();
  return (
    <div className="h-screen flex flex-col">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col flex-1"
      >
        <header className="bg-background border-b">
          <div className="w-full mx-auto px-2">
            <div className="flex items-center gap-2 sm:gap-4 min-h-12 max-h-12">
              <div className="flex items-center gap-2 sm:gap-4">
                <Image
                  src={theme === "dark" ? "/quizy.svg" : "/quizy-black.svg"}
                  alt="Quizy"
                  width={100}
                  height={100}
                  className="w-12 sm:w-16 flex-shrink-0"
                  priority
                />
                <div className="w-[0.5px] bg-muted h-4 hidden sm:block" />
                <TabsList className="text-foreground h-auto gap-1 sm:gap-2 rounded-none bg-transparent px-0 py-1 w-auto">
                  <TabsTrigger
                    value="constructor"
                    className="text-xs sm:text-sm hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Construtor
                  </TabsTrigger>
                  <TabsTrigger
                    value="fluxo"
                    className="text-xs sm:text-sm hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2   after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Fluxo
                  </TabsTrigger>
                  <TabsTrigger
                    value="config"
                    className="text-xs sm:text-sm hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2   after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Configurações
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 ml-auto">
                <ButtonGroup>
                  <Button variant="outline" size="icon">
                    <IconShare2 stroke={1.2} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <IconDeviceMobile stroke={1.2} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <IconPlayerPlay stroke={1.2} />
                  </Button>
                </ButtonGroup>

                <div className="w-[0.5px] bg-muted h-4 hidden sm:block mx-3" />

                <Button
                  variant="outline"
                  className="text-xs sm:text-sm px-2 sm:px-4"
                >
                  Salvar
                </Button>
                <Button
                  variant="default"
                  className="text-xs sm:text-sm px-2 sm:px-4"
                >
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex w-full flex-1 overflow-hidden ">
          <div className="border-r h-full p-1 min-w-[200px] max-w-[200px] space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <IconGripHorizontal stroke={1.2} />
              <span className="text-muted-foreground">Etapa 1</span>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <IconGripHorizontal stroke={1.2} />
              <span className="text-muted-foreground">Etapa 2</span>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <IconGripHorizontal stroke={1.2} />
              <span className="text-muted-foreground">Etapa 3</span>
            </Button>
            <Button variant="link" className="w-full justify-center">
              <IconPlus stroke={1.2} />
              <span className="text-foreground">Adicionar Etapa</span>
            </Button>
          </div>
          <ScrollArea className="max-h-[calc(100vh-48px)]">
            <div className="border-r h-full p-1 min-w-[200px] max-w-[200px] space-y-2">
              {widgets.map((widget) => {
                const Icon = widget.icon;
                return (
                  <Button
                    key={widget.id}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Icon stroke={1.2} />
                    <span className="text-foreground">{widget.name}</span>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
          <div className="flex-1 flex justify-center items-center">
            <span>meio</span>
          </div>
          <div className="border-l h-full">
            <div className="w-full border-b">
              <div className="flex gap-2 p-2">
                <Button variant="ghost">Componente</Button>
                <Button variant="ghost">Estilo</Button>
              </div>
            </div>
          </div>
        </main>
      </Tabs>
    </div>
  );
}
