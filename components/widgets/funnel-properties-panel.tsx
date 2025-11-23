"use client";

import Color from "color";
import { useState } from "react";
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "@/components/color-pick";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFunnel } from "@/contexts/funnel-context";

export function FunnelPropertiesPanel() {
  const [activeTab, setActiveTab] = useState("componente");
  const { selectedStepId, selectedWidgetId, steps, updateWidget } = useFunnel();

  const currentStep = steps.find((step) => step.id === selectedStepId);
  const selectedWidget = currentStep?.widgets.find(
    (widget) => widget.id === selectedWidgetId,
  );

  const handleUpdateContent = (field: string, value: unknown) => {
    if (!selectedStepId || !selectedWidgetId || !selectedWidget) return;
    updateWidget(selectedStepId, selectedWidgetId, {
      ...selectedWidget,
      content: { ...selectedWidget.content, [field]: value },
    });
  };

  const handleUpdateStyle = (field: string, value: string) => {
    if (!selectedStepId || !selectedWidgetId || !selectedWidget) return;
    updateWidget(selectedStepId, selectedWidgetId, {
      ...selectedWidget,
      style: { ...selectedWidget.style, [field]: value },
    });
  };

  return (
    <div className="bg-[#ffffff] border rounded-xl m-1 w-[300px] h-[calc(90vh)]  flex flex-col overflow-hidden">
      <div className="flex justify-between items-center gap-2 p-2 border-b flex-shrink-0">
        <Button
          variant={activeTab === "componente" ? "secondary" : "ghost"}
          onClick={() => setActiveTab("componente")}
          size="sm"
        >
          Componente
        </Button>
        <Button
          variant={activeTab === "estilo" ? "secondary" : "ghost"}
          onClick={() => setActiveTab("estilo")}
          size="sm"
        >
          Estilo
        </Button>
        <Button
          variant={activeTab === "exibicao" ? "secondary" : "ghost"}
          onClick={() => setActiveTab("exibicao")}
          size="sm"
        >
          Exibição
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {!selectedWidget ? (
            <div className="text-center text-sm text-muted-foreground py-8">
              Selecione um widget para editar
            </div>
          ) : (
            <>
              {activeTab === "componente" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="component-id">Id</Label>
                    <Input
                      type="text"
                      id="component-id"
                      placeholder="Digite o ID"
                      value={selectedWidget.id}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="widget-type">Tipo</Label>
                    <Input
                      type="text"
                      id="widget-type"
                      value={selectedWidget.type}
                      disabled
                    />
                  </div>

                  {selectedWidget.type === "botao" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="button-text">Texto do Botão</Label>
                        <Input
                          type="text"
                          id="button-text"
                          placeholder="Digite o texto"
                          value={
                            (selectedWidget.content as { label?: string })
                              ?.label || ""
                          }
                          onChange={(e) =>
                            handleUpdateContent("label", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="navigation-type">
                          Tipo de navegação
                        </Label>
                        <Select
                          value={
                            (
                              selectedWidget.content as {
                                navigationType?: string;
                              }
                            )?.navigationType || ""
                          }
                          onValueChange={(value) =>
                            handleUpdateContent("navigationType", value)
                          }
                        >
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
                    </>
                  )}

                  {selectedWidget.type === "texto" && (
                    <div className="space-y-2">
                      <Label htmlFor="text-content">Texto</Label>
                      <Input
                        type="text"
                        id="text-content"
                        placeholder="Digite o texto"
                        value={
                          (selectedWidget.content as { text?: string })?.text ||
                          ""
                        }
                        onChange={(e) =>
                          handleUpdateContent("text", e.target.value)
                        }
                      />
                    </div>
                  )}

                  {selectedWidget.type === "progresso" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="progress-value">Valor (%)</Label>
                        <Input
                          type="number"
                          id="progress-value"
                          min="0"
                          max="100"
                          placeholder="0"
                          value={
                            (selectedWidget.content as { value?: number })
                              ?.value || 0
                          }
                          onChange={(e) =>
                            handleUpdateContent("value", Number(e.target.value))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="progress-label">Label</Label>
                        <Input
                          type="text"
                          id="progress-label"
                          placeholder="Digite o label"
                          value={
                            (selectedWidget.content as { label?: string })
                              ?.label || ""
                          }
                          onChange={(e) =>
                            handleUpdateContent("label", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  {selectedWidget.type === "timer" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="timer-duration">
                          Duração (segundos)
                        </Label>
                        <Input
                          type="number"
                          id="timer-duration"
                          min="0"
                          placeholder="60"
                          value={
                            (selectedWidget.content as { duration?: number })
                              ?.duration || 60
                          }
                          onChange={(e) =>
                            handleUpdateContent(
                              "duration",
                              Number(e.target.value),
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timer-label">Label</Label>
                        <Input
                          type="text"
                          id="timer-label"
                          placeholder="Digite o label"
                          value={
                            (selectedWidget.content as { label?: string })
                              ?.label || ""
                          }
                          onChange={(e) =>
                            handleUpdateContent("label", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  {selectedWidget.type === "video" && (
                    <div className="space-y-2">
                      <Label htmlFor="video-url">URL do Vídeo</Label>
                      <Input
                        type="url"
                        id="video-url"
                        placeholder="https://..."
                        value={
                          (selectedWidget.content as { url?: string })?.url ||
                          ""
                        }
                        onChange={(e) =>
                          handleUpdateContent("url", e.target.value)
                        }
                      />
                    </div>
                  )}

                  {selectedWidget.type === "audio" && (
                    <div className="space-y-2">
                      <Label htmlFor="audio-url">URL do Áudio</Label>
                      <Input
                        type="url"
                        id="audio-url"
                        placeholder="https://..."
                        value={
                          (selectedWidget.content as { url?: string })?.url ||
                          ""
                        }
                        onChange={(e) =>
                          handleUpdateContent("url", e.target.value)
                        }
                      />
                    </div>
                  )}

                  {selectedWidget.type === "espaco" && (
                    <div className="space-y-2">
                      <Label htmlFor="space-height">Altura (px)</Label>
                      <Input
                        type="number"
                        id="space-height"
                        min="0"
                        placeholder="20"
                        value={
                          (selectedWidget.content as { height?: number })
                            ?.height || 20
                        }
                        onChange={(e) =>
                          handleUpdateContent("height", Number(e.target.value))
                        }
                      />
                    </div>
                  )}

                  {selectedWidget.type === "alerta" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="alert-message">Mensagem</Label>
                        <Input
                          type="text"
                          id="alert-message"
                          placeholder="Digite a mensagem"
                          value={
                            (selectedWidget.content as { message?: string })
                              ?.message || ""
                          }
                          onChange={(e) =>
                            handleUpdateContent("message", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alert-type">Tipo</Label>
                        <Select
                          value={
                            (selectedWidget.content as { type?: string })
                              ?.type || "info"
                          }
                          onValueChange={(value) =>
                            handleUpdateContent("type", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="info">Info</SelectItem>
                            <SelectItem value="success">Sucesso</SelectItem>
                            <SelectItem value="warning">Aviso</SelectItem>
                            <SelectItem value="error">Erro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {selectedWidget.type === "preco" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="price-value">Valor</Label>
                        <Input
                          type="number"
                          id="price-value"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={
                            (selectedWidget.content as { value?: number })
                              ?.value || 0
                          }
                          onChange={(e) =>
                            handleUpdateContent("value", Number(e.target.value))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price-currency">Moeda</Label>
                        <Input
                          type="text"
                          id="price-currency"
                          placeholder="R$"
                          value={
                            (selectedWidget.content as { currency?: string })
                              ?.currency || "R$"
                          }
                          onChange={(e) =>
                            handleUpdateContent("currency", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  {selectedWidget.type === "loading" && (
                    <div className="space-y-2">
                      <Label htmlFor="loading-message">Mensagem</Label>
                      <Input
                        type="text"
                        id="loading-message"
                        placeholder="Carregando..."
                        value={
                          (selectedWidget.content as { message?: string })
                            ?.message || ""
                        }
                        onChange={(e) =>
                          handleUpdateContent("message", e.target.value)
                        }
                      />
                    </div>
                  )}
                </>
              )}

              {activeTab === "estilo" && (
                <>
                  <div className="space-y-2">
                    <Label>Largura</Label>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={parseInt(
                          selectedWidget?.style?.width?.replace("%", "") ||
                          "100",
                        )}
                        onChange={(e) =>
                          handleUpdateStyle("width", `${e.target.value}%`)
                        }
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        disabled={!selectedWidget}
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">10%</span>
                        <span className="font-medium text-primary">
                          {selectedWidget?.style?.width || "100%"}
                        </span>
                        <span className="text-muted-foreground">100%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Ajuste a largura para colocar múltiplos widgets lado a
                        lado
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Cor de fundo</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2 h-10"
                          disabled={!selectedWidget}
                        >
                          <div
                            className="h-5 w-5 rounded border"
                            style={{
                              backgroundColor:
                                selectedWidget?.style?.backgroundColor ||
                                "#ffffff",
                            }}
                          />
                          <span className="text-sm">
                            {selectedWidget?.style?.backgroundColor ||
                              "#ffffff"}
                          </span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <ColorPicker
                          value={
                            selectedWidget?.style?.backgroundColor || "#ffffff"
                          }
                          onChange={(value) => {
                            const color = Color.rgb(value).hex();
                            handleUpdateStyle("backgroundColor", color);
                          }}
                        >
                          <ColorPickerSelection />
                          <div className="space-y-3">
                            <ColorPickerHue />
                            <ColorPickerAlpha />
                          </div>
                          <div className="flex items-center gap-2">
                            <ColorPickerEyeDropper />
                            <ColorPickerFormat className="flex-1" />
                            <ColorPickerOutput />
                          </div>
                        </ColorPicker>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Cor do texto</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2 h-10"
                          disabled={!selectedWidget}
                        >
                          <div
                            className="h-5 w-5 rounded border"
                            style={{
                              backgroundColor:
                                selectedWidget?.style?.textColor || "#000000",
                            }}
                          />
                          <span className="text-sm">
                            {selectedWidget?.style?.textColor || "#000000"}
                          </span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <ColorPicker
                          value={selectedWidget?.style?.textColor || "#000000"}
                          onChange={(value) => {
                            const color = Color.rgb(value).hex();
                            handleUpdateStyle("textColor", color);
                          }}
                        >
                          <ColorPickerSelection />
                          <div className="space-y-3">
                            <ColorPickerHue />
                            <ColorPickerAlpha />
                          </div>
                          <div className="flex items-center gap-2">
                            <ColorPickerEyeDropper />
                            <ColorPickerFormat className="flex-1" />
                            <ColorPickerOutput />
                          </div>
                        </ColorPicker>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="border-radius">Borda arredondada</Label>
                    <Select
                      value={selectedWidget?.style?.borderRadius || ""}
                      onValueChange={(value) =>
                        handleUpdateStyle("borderRadius", value)
                      }
                      disabled={!selectedWidget}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Nenhuma</SelectItem>
                        <SelectItem value="4px">Pequena</SelectItem>
                        <SelectItem value="8px">Média</SelectItem>
                        <SelectItem value="12px">Grande</SelectItem>
                        <SelectItem value="9999px">Completa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="font-size">Tamanho da fonte</Label>
                    <Select
                      value={selectedWidget?.style?.fontSize || ""}
                      onValueChange={(value) =>
                        handleUpdateStyle("fontSize", value)
                      }
                      disabled={!selectedWidget}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12px">Muito pequena</SelectItem>
                        <SelectItem value="14px">Pequena</SelectItem>
                        <SelectItem value="16px">Normal</SelectItem>
                        <SelectItem value="18px">Grande</SelectItem>
                        <SelectItem value="24px">Muito grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="font-weight">Peso da fonte</Label>
                    <Select
                      value={selectedWidget?.style?.fontWeight || ""}
                      onValueChange={(value) =>
                        handleUpdateStyle("fontWeight", value)
                      }
                      disabled={!selectedWidget}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">Leve</SelectItem>
                        <SelectItem value="400">Normal</SelectItem>
                        <SelectItem value="500">Médio</SelectItem>
                        <SelectItem value="600">Semi-negrito</SelectItem>
                        <SelectItem value="700">Negrito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {activeTab === "exibicao" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="show-delay">Atraso para exibição</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        id="show-delay"
                        placeholder="0"
                        className="flex-1"
                        value={
                          (selectedWidget?.content as { showDelay?: number })
                            ?.showDelay || 0
                        }
                        onChange={(e) =>
                          handleUpdateContent(
                            "showDelay",
                            Number(e.target.value),
                          )
                        }
                        disabled={!selectedWidget}
                      />
                      <Select
                        value={
                          (
                            selectedWidget?.content as {
                              showDelayUnit?: string;
                            }
                          )?.showDelayUnit || "seconds"
                        }
                        onValueChange={(value) =>
                          handleUpdateContent("showDelayUnit", value)
                        }
                        disabled={!selectedWidget}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seconds">Segundos</SelectItem>
                          <SelectItem value="minutes">Minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hide-delay">Atraso para ocultar</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        id="hide-delay"
                        placeholder="0"
                        className="flex-1"
                        value={
                          (selectedWidget?.content as { hideDelay?: number })
                            ?.hideDelay || 0
                        }
                        onChange={(e) =>
                          handleUpdateContent(
                            "hideDelay",
                            Number(e.target.value),
                          )
                        }
                        disabled={!selectedWidget}
                      />
                      <Select
                        value={
                          (
                            selectedWidget?.content as {
                              hideDelayUnit?: string;
                            }
                          )?.hideDelayUnit || "seconds"
                        }
                        onValueChange={(value) =>
                          handleUpdateContent("hideDelayUnit", value)
                        }
                        disabled={!selectedWidget}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seconds">Segundos</SelectItem>
                          <SelectItem value="minutes">Minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="visibility">Visibilidade</Label>
                    <Select
                      value={
                        (selectedWidget?.content as { visibility?: string })
                          ?.visibility || "always"
                      }
                      onValueChange={(value) =>
                        handleUpdateContent("visibility", value)
                      }
                      disabled={!selectedWidget}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="always">Sempre visível</SelectItem>
                        <SelectItem value="desktop">Apenas desktop</SelectItem>
                        <SelectItem value="mobile">Apenas mobile</SelectItem>
                        <SelectItem value="hidden">Oculto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="animation">Animação de entrada</Label>
                    <Select
                      value={
                        (selectedWidget?.content as { animation?: string })
                          ?.animation || "none"
                      }
                      onValueChange={(value) =>
                        handleUpdateContent("animation", value)
                      }
                      disabled={!selectedWidget}
                    >
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
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
