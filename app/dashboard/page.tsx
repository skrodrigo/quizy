import { BoxIcon, HouseIcon, PanelsTopLeftIcon, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "@/components/user-profile";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="tab-1">
        <header className="border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between gap-4 py-3">
              <Image
                src="/quizy.svg"
                alt="Quizy"
                width={100}
                height={100}
                className="w-16 flex-shrink-0"
              />

              <div className="flex-1">
                <ScrollArea>
                  <TabsList className="before:bg-border relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
                    <TabsTrigger
                      value="tab-1"
                      className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                    >
                      <HouseIcon
                        className="-ms-0.5 me-1.5 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="tab-2"
                      className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                    >
                      <PanelsTopLeftIcon
                        className="-ms-0.5 me-1.5 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Projetos
                    </TabsTrigger>
                    <TabsTrigger
                      value="tab-3"
                      className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                    >
                      <BoxIcon
                        className="-ms-0.5 me-1.5 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Pacotes
                    </TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>

              <UserProfile />
            </div>
          </div>
        </header>

        <TabsContent value="tab-1">
          <main className="container mx-auto px-6 py-24">
            <div className="flex items-center justify-center min-h-[60vh]">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Novo Funil
              </Button>
            </div>
          </main>
        </TabsContent>
        <TabsContent value="tab-2">
          <main className="container mx-auto px-6 py-24">
            <p className="text-muted-foreground text-center">
              Content for Tab 2
            </p>
          </main>
        </TabsContent>
        <TabsContent value="tab-3">
          <main className="container mx-auto px-6 py-24">
            <p className="text-muted-foreground text-center">
              Content for Tab 3
            </p>
          </main>
        </TabsContent>
      </Tabs>
    </div>
  );
}
