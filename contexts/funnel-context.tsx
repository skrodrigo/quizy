"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

interface Step {
  id: string;
  label: string;
}

interface FunnelContextType {
  steps: Step[];
  setSteps: (steps: Step[]) => void;
  addStep: () => void;
  deleteStep: (id: string) => void;
  renameStep: (id: string, newLabel: string) => void;
  reorderSteps: (steps: Step[]) => void;
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

export function FunnelProvider({ children }: { children: ReactNode }) {
  const [steps, setSteps] = useState<Step[]>([
    { id: "1", label: "Etapa 1" },
    { id: "2", label: "Etapa 2" },
    { id: "3", label: "Etapa 3" },
  ]);

  const addStep = () => {
    const newId = String(Date.now());
    setSteps([...steps, { id: newId, label: `Etapa ${steps.length + 1}` }]);
  };

  const deleteStep = (id: string) => {
    setSteps((items) => items.filter((item) => item.id !== id));
  };

  const renameStep = (id: string, newLabel: string) => {
    setSteps((items) =>
      items.map((item) =>
        item.id === id ? { ...item, label: newLabel } : item,
      ),
    );
  };

  const reorderSteps = (newSteps: Step[]) => {
    setSteps(newSteps);
  };

  return (
    <FunnelContext.Provider
      value={{
        steps,
        setSteps,
        addStep,
        deleteStep,
        renameStep,
        reorderSteps,
      }}
    >
      {children}
    </FunnelContext.Provider>
  );
}

export function useFunnel() {
  const context = useContext(FunnelContext);
  if (context === undefined) {
    throw new Error("useFunnel must be used within a FunnelProvider");
  }
  return context;
}
