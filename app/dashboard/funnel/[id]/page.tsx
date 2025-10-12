"use client";

import {
  IconAlertTriangle,
  IconArrowLeft,
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
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { FunnelConfig } from "@/components/funnel-config";
import { FunnelFlow } from "@/components/funnel-flow";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    defaultValue: "constructor",
  });
  const [sidebarTab, setSidebarTab] = useState("componente");
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <header className="bg-background border-b flex-shrink-0">
          <div className="w-full mx-auto px-2">
            <div className="flex items-center gap-2 sm:gap-4 min-h-12 max-h-12">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push("/dashboard")}
              >
                <IconArrowLeft stroke={2} className="size-4" />
              </Button>
              <div className="w-[0.5px] bg-muted h-4 hidden sm:block" />
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-muted-foreground text-sm">
                  Funil 1 - Produto A
                </span>
                <TabsList className="text-foreground h-auto gap-1 sm:gap-2 rounded-none bg-transparent px-0 py-1 w-auto">
                  <TabsTrigger
                    value="constructor"
                    className="text-xs sm:text-sm hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2.5 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Construtor
                  </TabsTrigger>
                  <TabsTrigger
                    value="fluxo"
                    className="text-xs sm:text-sm hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2.5   after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Fluxo
                  </TabsTrigger>
                  <TabsTrigger
                    value="config"
                    className="text-xs sm:text-sm hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2.5   after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Configurações
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 ml-auto">
                <ButtonGroup>
                  <Button variant="outline">
                    <IconShare2 stroke={2} className="size-4" />
                  </Button>
                  <Button variant="outline">
                    <IconDeviceMobile stroke={2} className="size-4" />
                    Mobile
                  </Button>
                  <Button variant="outline">
                    <IconPlayerPlay stroke={2} className="size-4" />
                    Preview
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

        <main className="flex w-full flex-1 overflow-hidden">
          {activeTab === "constructor" && (
            <>
              <div className="border rounded-xl m-1 p-1 min-w-[200px] max-w-[200px] space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <IconGripHorizontal stroke={2} className="size-4" />
                  <span className="text-foreground">Etapa 1</span>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <IconGripHorizontal stroke={2} className="size-4" />
                  <span className="text-foreground">Etapa 2</span>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <IconGripHorizontal stroke={2} className="size-4" />
                  <span className="text-foreground">Etapa 3</span>
                </Button>
                <Button variant="link" className="w-full justify-center">
                  <IconPlus stroke={2} className="size-4" />
                  <span className="text-foreground">Adicionar Etapa</span>
                </Button>
              </div>

              <ScrollArea className="max-h-[calc(100vh-50px)] p-1">
                <div className="h-full p-1 min-w-[200px] max-w-[200px] space-y-2">
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

              <div className="flex-1 flex justify-center items-center">
                <span>meio</span>
              </div>

              <div className="border rounded-xl m-1 w-[320px]">
                <div className="w-full h-full flex flex-col">
                  <div className="flex justify-between items-center gap-2 p-2 border-b">
                    <Button
                      variant={
                        sidebarTab === "componente" ? "secondary" : "ghost"
                      }
                      onClick={() => setSidebarTab("componente")}
                      size="sm"
                    >
                      Componente
                    </Button>
                    <Button
                      variant={sidebarTab === "estilo" ? "secondary" : "ghost"}
                      onClick={() => setSidebarTab("estilo")}
                      size="sm"
                    >
                      Estilo
                    </Button>
                    <Button
                      variant={
                        sidebarTab === "exibicao" ? "secondary" : "ghost"
                      }
                      onClick={() => setSidebarTab("exibicao")}
                      size="sm"
                    >
                      Exibição
                    </Button>
                  </div>

                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-4">
                      {sidebarTab === "componente" && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="component-id">Id</Label>
                            <Input
                              type="text"
                              id="component-id"
                              placeholder="Digite o ID"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="button-text">Texto do Botão</Label>
                            <Input
                              type="text"
                              id="button-text"
                              placeholder="Digite o texto"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="navigation-type">
                              Tipo de navegação
                            </Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="redirect">
                                  Redirecionamento
                                </SelectItem>
                                <SelectItem value="next-step">
                                  Próxima etapa
                                </SelectItem>
                                <SelectItem value="external">
                                  Link externo
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="redirect-destination">
                              Destino de redirecionamento
                            </Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="step-1">Etapa 1</SelectItem>
                                <SelectItem value="step-2">Etapa 2</SelectItem>
                                <SelectItem value="step-3">Etapa 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}

                      {sidebarTab === "estilo" && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="bg-color">Cor de fundo</Label>
                            <Input
                              type="color"
                              id="bg-color"
                              className="h-10 w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="text-color">Cor do texto</Label>
                            <Input
                              type="color"
                              id="text-color"
                              className="h-10 w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="border-radius">
                              Borda arredondada
                            </Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">Nenhuma</SelectItem>
                                <SelectItem value="sm">Pequena</SelectItem>
                                <SelectItem value="md">Média</SelectItem>
                                <SelectItem value="lg">Grande</SelectItem>
                                <SelectItem value="full">Completa</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="font-size">Tamanho da fonte</Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="xs">
                                  Muito pequena
                                </SelectItem>
                                <SelectItem value="sm">Pequena</SelectItem>
                                <SelectItem value="base">Normal</SelectItem>
                                <SelectItem value="lg">Grande</SelectItem>
                                <SelectItem value="xl">Muito grande</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="font-weight">Peso da fonte</Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Leve</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="medium">Médio</SelectItem>
                                <SelectItem value="semibold">
                                  Semi-negrito
                                </SelectItem>
                                <SelectItem value="bold">Negrito</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}

                      {sidebarTab === "exibicao" && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="show-after">Mostrar após</Label>
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                id="show-after"
                                placeholder="0"
                                className="flex-1"
                              />
                              <Select>
                                <SelectTrigger className="w-[120px]">
                                  <SelectValue placeholder="Unidade" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="seconds">
                                    Segundos
                                  </SelectItem>
                                  <SelectItem value="minutes">
                                    Minutos
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hide-after">Ocultar após</Label>
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                id="hide-after"
                                placeholder="0"
                                className="flex-1"
                              />
                              <Select>
                                <SelectTrigger className="w-[120px]">
                                  <SelectValue placeholder="Unidade" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="seconds">
                                    Segundos
                                  </SelectItem>
                                  <SelectItem value="minutes">
                                    Minutos
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="display-condition">
                              Condição de exibição
                            </Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="always">Sempre</SelectItem>
                                <SelectItem value="first-visit">
                                  Primeira visita
                                </SelectItem>
                                <SelectItem value="returning">
                                  Visitante recorrente
                                </SelectItem>
                                <SelectItem value="custom">
                                  Regra personalizada
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="animation">
                              Animação de entrada
                            </Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">Nenhuma</SelectItem>
                                <SelectItem value="fade">Fade</SelectItem>
                                <SelectItem value="slide-up">
                                  Deslizar para cima
                                </SelectItem>
                                <SelectItem value="slide-down">
                                  Deslizar para baixo
                                </SelectItem>
                                <SelectItem value="zoom">Zoom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </>
          )}

          {activeTab === "fluxo" && (
            <div className="flex-1 relative">
              <FunnelFlow />
            </div>
          )}

          {activeTab === "config" && <FunnelConfig />}
        </main>
      </Tabs>
    </div>
  );
}
