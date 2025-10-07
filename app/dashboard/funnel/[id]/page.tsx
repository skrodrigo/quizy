"use client"

import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconDeviceMobile,
  IconPlayerPlay,
  IconShare,
  IconX,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-background border-b">
        <div className="w-full mx-auto px-6">
          <div className="flex items-center justify-between h-11">
            {/* Grupo de navegação */}
            <div className="flex items-center space-x-2">
              <Button variant="secondary" className="bg-transparent dark:bg-transparent" size="icon">
                <IconX className="size-5 text-foreground" stroke='1.7' />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="secondary" className="bg-transparent dark:bg-transparent" size="icon" disabled>
                <IconArrowBackUp className="size-5 text-muted-foreground" stroke='1.7' />
              </Button>
              <Button variant="secondary" className="bg-transparent dark:bg-transparent" size="icon" disabled>
                <IconArrowForwardUp className="size-5 text-muted-foreground" stroke='1.7' />
              </Button>
            </div>

            {/* Menu de modos */}
            <div className="flex items-center">
              <Button variant="secondary" className="bg-transparent dark:bg-transparent hover:text-foreground/80 gap-2 rounded-none">
                Construtor
              </Button>
              <Separator orientation="vertical" className="h-4" />
              <Button variant="secondary" className="bg-transparent dark:bg-transparent hover:text-foreground/80 gap-2 rounded-none">
                Fluxo
              </Button>
              <Separator orientation="vertical" className="h-4" />
              <Button variant="secondary" className="bg-transparent dark:bg-transparent hover:text-foreground/80 gap-2 rounded-none">
                Design
              </Button>
              <Separator orientation="vertical" className="h-4" />
              <Button variant="secondary" className="bg-transparent dark:bg-transparent hover:text-foreground/80 gap-2 rounded-none">
                Configurações
              </Button>
            </div>

            {/* Ações */}
            <div className="flex items-center">
              <Button className="border-0 dark:bg-transparent rounded-none" size="icon">
                <IconDeviceMobile className="size-5 text-foreground" stroke='1.7' />
              </Button>
              <Separator orientation="vertical" className="h-4" />
              <Button className="border-0 dark:bg-transparent rounded-none" size="icon">
                <IconShare className="size-5 text-foreground" stroke='1.7' />
              </Button>
              <Separator orientation="vertical" className="h-4" />
              <Button className="border-0 dark:bg-transparent rounded-none" size="icon">
                <IconPlayerPlay className="size-5 text-foreground" stroke='1.7' />
              </Button>
              <div className="ml-5 space-x-2">
                <Button variant="secondary" >
                  Salvar
                </Button>
                <Button className="gap-2 ">
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex w-full px-4 flex-1 overflow-hidden">
        <div className="bg-muted/60 min-w-[340px] rounded-xl m-2 p-2">
          aside esquerdo
        </div>
        <div className="flex-1 items-center justify-center">meio</div>
        <div className="bg-muted/60 min-w-[340px] rounded-xl m-2 p-2">
          aside direito
        </div>
      </main>
    </div>
  );
}
