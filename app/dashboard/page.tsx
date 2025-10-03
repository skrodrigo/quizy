import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-8">
              <h1 className="text-lg font-semibold">Quizy</h1>

              <Tabs defaultValue="overview" className="h-14">
                <TabsList className="h-14 bg-transparent border-b-0 rounded-none p-0">
                  <TabsTrigger
                    value="overview"
                    className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="integrations"
                    className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Integrations
                  </TabsTrigger>
                  <TabsTrigger
                    value="deployments"
                    className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Deployments
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Activity
                  </TabsTrigger>
                  <TabsTrigger
                    value="domains"
                    className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Domains
                  </TabsTrigger>
                  <TabsTrigger
                    value="usage"
                    className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Usage
                  </TabsTrigger>
                  <TabsTrigger
                    value="observability"
                    className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Observability
                  </TabsTrigger>
                  <TabsTrigger
                    value="storage"
                    className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Storage
                  </TabsTrigger>
                  <TabsTrigger
                    value="edge"
                    className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Edge
                  </TabsTrigger>
                  <TabsTrigger
                    value="ai-gateway"
                    className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    AI Gateway
                  </TabsTrigger>
                  <TabsTrigger
                    value="agent"
                    className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Agent
                  </TabsTrigger>
                  <TabsTrigger
                    value="support"
                    className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Support
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Settings
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-24">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Novo Funil
          </Button>
        </div>
      </main>
    </div>
  );
}
