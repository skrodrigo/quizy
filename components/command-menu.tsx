"use client";

import { LayoutDashboard, SearchIcon, Workflow } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "text-foreground hover:text-foreground/80 w-8 h-8",
          )}
        >
          <SearchIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogTitle className="sr-only" />
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Buscar páginas..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup heading="Páginas">
              <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
                <LayoutDashboard />
                <span>Dashboard</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/funis"))}>
                <Workflow />
                <span>Funis</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
