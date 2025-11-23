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
  updateWidget: (
    stepId: string,
    widgetId: string,
    widget: WidgetConfig,
  ) => void;
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
    setSteps([
      ...steps,
      { id: newId, label: `Etapa ${steps.length + 1}`, widgets: [] },
    ]);
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

    const getDefaultContent = (widgetType: string) => {
      switch (widgetType) {
        case "cartesiano":
          return {
            title: "Gráfico",
            dataPoints: [],
            chartType: "area",
          };
        case "carrosel":
          return {
            items: [
              { id: "1", image: "", alt: "Slide 1" },
              { id: "2", image: "", alt: "Slide 2" },
              { id: "3", image: "", alt: "Slide 3" },
            ],
            autoplay: false,
            interval: 3000,
            aspectRatio: "video",
          };
        case "termos":
          return {
            text: "Ao clicar em alguma das opções, você concorda com os",
            terms: [],
          };
        case "preco":
          return {
            title: "Plano Premium",
            price: 99.9,
            currency: "R$",
            period: "à vista",
            badge: "",
          };
        case "audio":
          return {
            url: "",
            style: "whatsapp",
            duration: "0:00",
            autoplay: false,
          };
        case "opcao":
          return {
            options: [
              { id: "1", label: "Opção 1", value: "opcao1" },
              { id: "2", label: "Opção 2", value: "opcao2" },
              { id: "3", label: "Opção 3", value: "opcao3" },
            ],
            multiple: false,
            columns: 2,
          };
        case "argumento":
          return {
            arguments: [
              {
                id: "1",
                title: "Argumento 1",
                description: "Descrição do primeiro argumento",
                image: "",
              },
              {
                id: "2",
                title: "Argumento 2",
                description: "Descrição do segundo argumento",
                image: "",
              },
              {
                id: "3",
                title: "Argumento 3",
                description: "Descrição do terceiro argumento",
                image: "",
              },
            ],
            columns: 3,
          };
        case "captura":
          return {
            fields: [
              {
                name: "nome",
                type: "text",
                label: "Nome",
                placeholder: "Digite seu nome",
                required: true,
              },
              {
                name: "email",
                type: "email",
                label: "E-mail",
                placeholder: "seu@email.com",
                required: true,
              },
            ],
            submitLabel: "Enviar",
            image: "",
            imageAspectRatio: "video",
          };
        default:
          return {};
      }
    };

    const newWidget: WidgetConfig = {
      id: widgetId,
      type,
      style: {},
      content: getDefaultContent(type),
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

  const updateWidget = (
    stepId: string,
    widgetId: string,
    widget: WidgetConfig,
  ) => {
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
