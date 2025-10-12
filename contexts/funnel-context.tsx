"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import type { WidgetConfig } from "@/components/widgets/types";

interface Step {
  id: string;
  label: string;
  widgets: WidgetConfig[];
}

interface FunnelContextType {
  steps: Step[];
  setSteps: (steps: Step[]) => void;
  addStep: () => void;
  deleteStep: (id: string) => void;
  renameStep: (id: string, newLabel: string) => void;
  reorderSteps: (steps: Step[]) => void;
  selectedStepId: string | null;
  setSelectedStepId: (id: string | null) => void;
  selectedWidgetId: string | null;
  setSelectedWidgetId: (id: string | null) => void;
  addWidget: (stepId: string, type: string) => void;
  updateWidget: (stepId: string, widgetId: string, widget: WidgetConfig) => void;
  deleteWidget: (stepId: string, widgetId: string) => void;
  reorderWidgets: (stepId: string, widgets: WidgetConfig[]) => void;
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

export function FunnelProvider({ children }: { children: ReactNode }) {
  const [steps, setSteps] = useState<Step[]>([
    { id: "1", label: "Etapa 1", widgets: [] },
    { id: "2", label: "Etapa 2", widgets: [] },
    { id: "3", label: "Etapa 3", widgets: [] },
  ]);
  const [selectedStepId, setSelectedStepId] = useState<string | null>("1");
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);

  const handleSetSelectedStepId = (id: string | null) => {
    setSelectedStepId(id);
    setSelectedWidgetId(null);
  };

  const addStep = () => {
    const newId = String(Date.now());
    setSteps([...steps, { id: newId, label: `Etapa ${steps.length + 1}`, widgets: [] }]);
  };

  const deleteStep = (id: string) => {
    setSteps((items) => items.filter((item) => item.id !== id));
    if (selectedStepId === id) {
      setSelectedStepId(null);
    }
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

  const addWidget = (stepId: string, type: string) => {
    const widgetId = String(Date.now());
    const newWidget: WidgetConfig = {
      id: widgetId,
      type,
      style: {},
      content: {},
    };

    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId
          ? { ...step, widgets: [...step.widgets, newWidget] }
          : step,
      ),
    );
    setSelectedWidgetId(widgetId);
  };

  const updateWidget = (stepId: string, widgetId: string, widget: WidgetConfig) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              widgets: step.widgets.map((w) =>
                w.id === widgetId ? widget : w,
              ),
            }
          : step,
      ),
    );
  };

  const deleteWidget = (stepId: string, widgetId: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId
          ? { ...step, widgets: step.widgets.filter((w) => w.id !== widgetId) }
          : step,
      ),
    );
    if (selectedWidgetId === widgetId) {
      setSelectedWidgetId(null);
    }
  };

  const reorderWidgets = (stepId: string, widgets: WidgetConfig[]) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, widgets } : step,
      ),
    );
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
        selectedStepId,
        setSelectedStepId: handleSetSelectedStepId,
        selectedWidgetId,
        setSelectedWidgetId,
        addWidget,
        updateWidget,
        deleteWidget,
        reorderWidgets,
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
