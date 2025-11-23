"use client";

import {
  IconCheck,
  IconChevronLeft,
  IconCopy,
  IconDeviceMobile,
  IconPlayerPlay,
  IconShare2,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FunnelEditor } from "@/components/editor/funnel-editor";
import { FunnelFlow } from "@/components/flow/funnel-flow";
import { FunnelConfig } from "@/components/funnel-config";
import { FunnelSteps } from "@/components/steps/funnel-steps";
import { Android } from "@/components/ui/android";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Iphone } from "@/components/ui/iphone";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FunnelPropertiesPanel } from "@/components/widgets/funnel-properties-panel";
import { FunnelWidgets } from "@/components/widgets/funnel-widgets";
import { FunnelProvider, useFunnel } from "@/contexts/funnel-context";

function FunnelPageContent() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "constructor",
  });
  const router = useRouter();
  const { steps } = useFunnel();

  // Estados para funcionalidades
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [deviceType, setDeviceType] = useState<"ios" | "android">("ios");

  // Detectar tipo de dispositivo
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMac = userAgent.includes("mac");
    const isIOS = userAgent.includes("iphone") || userAgent.includes("ipad");
    const isWindows = userAgent.includes("windows");
    const isAndroid = userAgent.includes("android");

    if (isMac || isIOS) {
      setDeviceType("ios");
    } else if (isWindows || isAndroid) {
      setDeviceType("android");
    }
  }, []);

  // Função para gerar link compartilhável
  const generateShareLink = () => {
    const baseUrl = window.location.origin;
    const funnelId = window.location.pathname.split("/").pop();
    const generatedLink = `${baseUrl}/funnel/${funnelId}`;
    setShareLink(generatedLink);
    setLinkGenerated(true);
  };

  // Função para copiar link
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar link:", err);
    }
  };

  // Função para alternar visualização mobile
  const toggleMobileView = () => {
    setMobileView(!mobileView);
  };

  // Função para abrir preview em nova aba
  const openPreview = () => {
    const funnelId = window.location.pathname.split("/").pop();

    // Salvar dados atuais do funil para o preview
    const currentFunnelData = {
      id: funnelId,
      name: "Funil 1 - Produto A",
      steps: steps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "preview",
    };

    // Salvar no localStorage para o preview acessar
    localStorage.setItem(
      `preview_funnel_${funnelId}`,
      JSON.stringify(currentFunnelData),
    );

    const previewUrl = `/preview/${funnelId}`;
    window.open(previewUrl, "_blank", "noopener,noreferrer");
  };

  // Função para salvar funil no localStorage
  const saveFunnel = () => {
    try {
      const funnelId = window.location.pathname.split("/").pop();
      const funnelData = {
        id: funnelId,
        name: "Funil 1 - Produto A", // Em produção, isso seria editável
        steps: steps,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "draft",
      };

      // Salvar no localStorage
      const existingFunnels = JSON.parse(
        localStorage.getItem("funnels") || "[]",
      );
      const funnelIndex = existingFunnels.findIndex(
        (f: any) => f.id === funnelId,
      );

      if (funnelIndex >= 0) {
        existingFunnels[funnelIndex] = {
          ...existingFunnels[funnelIndex],
          ...funnelData,
          updatedAt: new Date().toISOString(),
        };
      } else {
        existingFunnels.push(funnelData);
      }

      localStorage.setItem("funnels", JSON.stringify(existingFunnels));
      toast.success("Funil salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar funil:", error);
      toast.error("Erro ao salvar funil");
    }
  };

  // Função para publicar funil (versão de produção)
  const publishFunnel = () => {
    try {
      const funnelId = window.location.pathname.split("/").pop();
      const funnelData = {
        id: funnelId,
        name: "Funil 1 - Produto A",
        steps: steps,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "published",
        publishedAt: new Date().toISOString(),
        publicUrl: `${window.location.origin}/funnel/${funnelId}`,
      };

      // Salvar versão publicada
      const existingFunnels = JSON.parse(
        localStorage.getItem("funnels") || "[]",
      );
      const funnelIndex = existingFunnels.findIndex(
        (f: any) => f.id === funnelId,
      );

      if (funnelIndex >= 0) {
        existingFunnels[funnelIndex] = {
          ...existingFunnels[funnelIndex],
          ...funnelData,
        };
      } else {
        existingFunnels.push(funnelData);
      }

      localStorage.setItem("funnels", JSON.stringify(existingFunnels));

      // Salvar também versão pública para acesso direto
      localStorage.setItem(
        `public_funnel_${funnelId}`,
        JSON.stringify(funnelData),
      );

      toast.success(
        "Funil publicado com sucesso! Agora está disponível para o público.",
      );
    } catch (error) {
      console.error("Erro ao publicar funil:", error);
      toast.error("Erro ao publicar funil");
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#f3f3f3]">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <header className="flex-shrink-0">
          <div className="w-full mx-auto px-2">
            <div className="flex items-center gap-2 sm:gap-4 min-h-12 max-h-12">

              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push("/dashboard")}
              >
                <IconChevronLeft stroke={2} className="size-4" />
              </Button>

              <div className="flex bg-[#ffffff] items-center gap-2 sm:gap-4 px-4 rounded-lg border">
                <span className="text-muted-foreground text-sm">
                  Funil 1 - Produto A
                </span>
                <TabsList className="text-foreground h-auto gap-1 sm:gap-2 rounded-none bg-transparent px-0 py-1 w-auto">
                  <TabsTrigger
                    value="constructor"
                    className="text-xs sm:text-sm hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-[5px] after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Construtor
                  </TabsTrigger>
                  <TabsTrigger
                    value="fluxo"
                    className="text-xs sm:text-sm hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-[5px] after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Fluxo
                  </TabsTrigger>
                  <TabsTrigger
                    value="config"
                    className="text-xs sm:text-sm hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-[5px] after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Configurações
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 ml-auto">
                <ButtonGroup>
                  <Dialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <IconShare2 stroke={2} className="size-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Compartilhar Funil</DialogTitle>
                        <DialogDescription>
                          Gere um link compartilhável para seu funil
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {!linkGenerated ? (
                          <Button
                            onClick={generateShareLink}
                            className="w-full"
                          >
                            Gerar Link Compartilhável
                          </Button>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Input
                                value={shareLink}
                                readOnly
                                className="flex-1"
                              />
                              <Button
                                size="sm"
                                onClick={copyToClipboard}
                                variant={linkCopied ? "default" : "outline"}
                              >
                                {linkCopied ? (
                                  <IconCheck className="size-4" />
                                ) : (
                                  <IconCopy className="size-4" />
                                )}
                              </Button>
                            </div>
                            {linkCopied && (
                              <p className="text-sm text-green-600">
                                Link copiado para a área de transferência!
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant={mobileView ? "default" : "outline"}
                    onClick={toggleMobileView}
                  >
                    <IconDeviceMobile stroke={2} className="size-4" />
                    Mobile
                  </Button>

                  <Button variant="outline" onClick={openPreview}>
                    <IconPlayerPlay stroke={2} className="size-4" />
                    Preview
                  </Button>
                </ButtonGroup>

                <div className="w-[0.5px] bg-muted h-4 hidden sm:block mx-3" />

                <Button
                  variant="outline"
                  className="text-xs sm:text-sm px-2 sm:px-4"
                  onClick={saveFunnel}
                >
                  Salvar
                </Button>
                <Button
                  variant="default"
                  className="text-xs sm:text-sm px-2 sm:px-4"
                  onClick={publishFunnel}
                >
                  Publicar
                </Button>
              </div>

            </div>
          </div>
        </header>

        <main className="flex w-full flex-1 overflow-hidden justify-center items-center">
          {activeTab === "constructor" && (
            <>
              <FunnelSteps />
              <FunnelWidgets />
              {mobileView ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative max-w-sm w-full p-4">
                    {deviceType === "ios" ? (
                      <div className="relative">
                        <Iphone className="w-full" />
                        <FunnelEditor />
                      </div>
                    ) : (
                      <div className="relative">
                        <Android className="w-full" />
                        <div className="h-full w-full scale-75 origin-top-left transform">
                          <FunnelEditor />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <FunnelEditor />
              )}
              <FunnelPropertiesPanel />
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
    </div >
  );
}

export default function Page() {
  return (
    <FunnelProvider>
      <FunnelPageContent />
    </FunnelProvider>
  );
}
