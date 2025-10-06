import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "@/components/user-profile";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header>
        <div className="container mx-auto px-6 flex justify-between border-b">
          <div className="flex items-center justify-between gap-4">
            <Image
              src="/quizy.svg"
              alt="Quizy"
              width={100}
              height={100}
              className="w-16 flex-shrink-0"
            />
            <Tabs defaultValue="tab-1" className="items-center">
              <TabsList className="text-foreground h-auto gap-2 rounded-none bg-transparent px-0 py-1">
                <TabsTrigger
                  value="tab-1"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2.5 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="tab-2"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Funis
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="my-1">
            <UserProfile />
          </div>
        </div>
      </header>
    </div>
  );
}
