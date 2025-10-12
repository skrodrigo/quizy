"use client";

import {
  IconDeviceMobile,
  IconPlayerPlay,
  IconShare2,
} from "@tabler/icons-react";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "funis",
  });
  return (
    <div className="h-screen flex flex-col">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col flex-1"
      >
        <header className="bg-background border-b">
          <div className="w-full mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 sm:gap-4 min-h-12 max-h-12">
              <div className="flex items-center gap-2 sm:gap-4">
                <Image
                  src="/quizy.svg"
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
                  <Button variant="outline" size='icon'>
                    <IconShare2 />
                  </Button>
                  <Button variant="outline" size='icon'>
                    <IconDeviceMobile />
                  </Button>
                  <Button variant="outline" size='icon'>
                    <IconPlayerPlay />
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

        <main className="flex w-full px-4 flex-1 overflow-hidden sr-only">
          <div className="bg-muted/60 min-w-[340px] rounded-xl m-2 p-2">
            aside esquerdo
          </div>
          <div className="flex-1 items-center justify-center">meio</div>
          <div className="bg-muted/60 min-w-[340px] rounded-xl m-2 p-2">
            aside direito
          </div>
        </main>
      </Tabs>
    </div>
  );
}
