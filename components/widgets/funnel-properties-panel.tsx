"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

export function FunnelPropertiesPanel() {
  const [activeTab, setActiveTab] = useState("componente");

  return (
    <div className="border rounded-xl m-1 w-[320px] h-[calc(100vh-8px)] flex flex-col overflow-hidden">
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
            {activeTab === "componente" && (
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
                  <Label htmlFor="navigation-type">Tipo de navegação</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="redirect">Redirecionamento</SelectItem>
                      <SelectItem value="next-step">Próxima etapa</SelectItem>
                      <SelectItem value="external">Link externo</SelectItem>
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

            {activeTab === "estilo" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="bg-color">Cor de fundo</Label>
                  <Input type="color" id="bg-color" className="h-10 w-full" />
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
                  <Label htmlFor="border-radius">Borda arredondada</Label>
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
                      <SelectItem value="xs">Muito pequena</SelectItem>
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
                      <SelectItem value="semibold">Semi-negrito</SelectItem>
                      <SelectItem value="bold">Negrito</SelectItem>
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
                    />
                    <Select>
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
                    />
                    <Select>
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
                  <Select>
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
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhuma</SelectItem>
                      <SelectItem value="fade">Fade</SelectItem>
                      <SelectItem value="slide-up">Deslizar para cima</SelectItem>
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
  );
}
