"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export function FunnelConfig() {
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
    <div className="flex-1 flex flex-col relative">
      {showTopFade && (
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      )}

      <ScrollArea ref={scrollRef} className="h-[calc(100vh-50px)]">
        <div className="px-8 pt-8 pb-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl mb-2">Configurações do Funil</h2>
            <p className="text-muted-foreground">
              Configure as opções gerais do seu funil
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="funnel-name">Nome do Funil</Label>
                  <Input
                    id="funnel-name"
                    placeholder="Ex: Funil de Vendas Principal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="funnel-description">Descrição</Label>
                  <Input
                    id="funnel-description"
                    placeholder="Descreva o objetivo deste funil"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO e Compartilhamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Título da Página</Label>
                  <Input id="meta-title" placeholder="Título para SEO" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Descrição</Label>
                  <Input
                    id="meta-description"
                    placeholder="Descrição para mecanismos de busca"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Domínio e URL</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-domain">Domínio Personalizado</Label>
                  <Input
                    id="custom-domain"
                    placeholder="seudominio.com.br"
                    type="url"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url-slug">Slug da URL</Label>
                  <Input id="url-slug" placeholder="meu-funil" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar Configurações</Button>
            </div>
          </div>
        </div>
      </ScrollArea>

      {showBottomFade && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      )}
    </div>
  );
}
