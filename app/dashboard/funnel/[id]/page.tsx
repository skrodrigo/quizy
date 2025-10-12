"use client";

import {
  IconArrowLeft,
  IconDeviceMobile,
  IconPlayerPlay,
  IconShare2,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { FunnelEditor } from "@/components/editor/funnel-editor";
import { FunnelFlow } from "@/components/flow/funnel-flow";
import { FunnelConfig } from "@/components/funnel-config";
import { FunnelSteps } from "@/components/steps/funnel-steps";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FunnelPropertiesPanel } from "@/components/widgets/funnel-properties-panel";
import { FunnelWidgets } from "@/components/widgets/funnel-widgets";
import { FunnelProvider } from "@/contexts/funnel-context";

export default function Page() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "constructor",
  });
  const router = useRouter();

  return (
    <FunnelProvider>
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
                <FunnelSteps />
                <FunnelWidgets />
                <FunnelEditor />
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
      </div>
    </FunnelProvider>
  );
}
