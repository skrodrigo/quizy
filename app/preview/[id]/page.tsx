"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WidgetRenderer } from "@/components/editor/widget-renderer";
import type { WidgetConfig } from "@/components/widgets/types";

// Mock data - em produção, isso viria de uma API
const mockFunnelData = {
  id: "1",
  name: "Quiz Exemplo",
  steps: [
    {
      id: "step-1",
      name: "Boas-vindas",
      widgets: [
        {
          id: "widget-1",
          type: "texto",
          content: { text: "Bem-vindo ao nosso quiz!" },
          style: {
            backgroundColor: "transparent",
            textColor: "#000000",
            borderRadius: "8px",
            padding: "16px",
            margin: "8px",
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
            height: "auto",
          },
        },
        {
          id: "widget-2",
          type: "botao",
          content: { label: "Começar Quiz" },
          style: {
            backgroundColor: "#3b82f6",
            textColor: "#ffffff",
            borderRadius: "8px",
            padding: "12px 24px",
            margin: "16px auto",
            fontSize: "16px",
            fontWeight: "500",
            textAlign: "center",
            width: "200px",
            height: "auto",
          },
        },
      ],
    },
    {
      id: "step-2",
      name: "Pergunta 1",
      widgets: [
        {
          id: "widget-3",
          type: "texto",
          content: { text: "Qual é a sua idade?" },
          style: {
            backgroundColor: "transparent",
            textColor: "#000000",
            borderRadius: "8px",
            padding: "16px",
            margin: "8px",
            fontSize: "20px",
            fontWeight: "600",
            textAlign: "center",
            width: "100%",
            height: "auto",
          },
        },
        {
          id: "widget-4",
          type: "opcao",
          content: {
            options: [
              { id: "18-25", label: "18-25 anos" },
              { id: "26-35", label: "26-35 anos" },
              { id: "36-45", label: "36-45 anos" },
              { id: "46+", label: "46+ anos" },
            ],
            columns: 2,
          },
          style: {
            backgroundColor: "transparent",
            textColor: "#000000",
            borderRadius: "8px",
            padding: "16px",
            margin: "8px",
            fontSize: "16px",
            fontWeight: "normal",
            textAlign: "left",
            width: "100%",
            height: "auto",
          },
        },
      ],
    },
    {
      id: "step-3",
      name: "Depoimentos",
      widgets: [
        {
          id: "widget-5",
          type: "texto",
          content: { text: "Veja o que nossos clientes dizem:" },
          style: {
            backgroundColor: "transparent",
            textColor: "#000000",
            borderRadius: "8px",
            padding: "16px",
            margin: "8px",
            fontSize: "20px",
            fontWeight: "600",
            textAlign: "center",
            width: "100%",
            height: "auto",
          },
        },
        {
          id: "widget-6",
          type: "depoimentos",
          content: {},
          style: {
            backgroundColor: "transparent",
            textColor: "#000000",
            borderRadius: "8px",
            padding: "16px",
            margin: "8px",
            fontSize: "16px",
            fontWeight: "normal",
            textAlign: "left",
            width: "100%",
            height: "auto",
          },
        },
      ],
    },
  ],
};

export default function PreviewPage() {
  const params = useParams();
  const funnelId = params.id as string;

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [funnelData, setFunnelData] = useState(mockFunnelData);

  useEffect(() => {
    const loadFunnelData = async () => {
      setIsLoading(true);
      try {
        // Tentar carregar dados do preview primeiro (dados mais recentes)
        const previewData = localStorage.getItem(`preview_funnel_${funnelId}`);

        if (previewData) {
          const funnel = JSON.parse(previewData);
          setFunnelData(funnel);

          // Limpar dados de preview após 5 minutos para não acumular
          setTimeout(
            () => {
              localStorage.removeItem(`preview_funnel_${funnelId}`);
            },
            5 * 60 * 1000,
          );
        } else {
          // Se não houver dados de preview, tentar carregar dados salvos
          const savedFunnels = JSON.parse(
            localStorage.getItem("funnels") || "[]",
          );
          const savedFunnel = savedFunnels.find((f: any) => f.id === funnelId);

          if (savedFunnel) {
            setFunnelData(savedFunnel);
          } else {
            // Fallback para dados mock se não encontrar nada
            setFunnelData(mockFunnelData);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados do funil:", error);
        setFunnelData(mockFunnelData);
      } finally {
        setIsLoading(false);
      }
    };

    loadFunnelData();
  }, [funnelId]);

  const nextStep = () => {
    if (currentStep < funnelData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage =
    ((currentStep + 1) / funnelData.steps.length) * 100;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando quiz...</p>
        </div>
      </div>
    );
  }

  const currentStepData = funnelData.steps[currentStep];

  return (
    <div className="min-h-screen bg-background">
      {/* Header com progresso */}
      <div className="sticky top-0 bg-background border-b z-10">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-semibold">{funnelData.name}</h1>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} de {funnelData.steps.length}
            </span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </div>
      </div>

      {/* Conteúdo do step atual */}
      <main className="max-w-4xl mx-auto p-4">
        <div className="space-y-6">
          {currentStepData.widgets.map((widget) => (
            <WidgetRenderer key={widget.id} widget={widget as WidgetConfig} />
          ))}
        </div>

        {/* Navegação */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Anterior
          </Button>

          <div className="flex gap-2">
            {funnelData.steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep
                    ? "bg-primary"
                    : index < currentStep
                      ? "bg-primary/50"
                      : "bg-muted"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextStep}
            disabled={currentStep === funnelData.steps.length - 1}
          >
            {currentStep === funnelData.steps.length - 1
              ? "Finalizar"
              : "Próximo"}
          </Button>
        </div>
      </main>
    </div>
  );
}
