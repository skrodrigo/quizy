"use client";

import { IconChevronLeft } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WidgetRenderer } from "@/components/editor/widget-renderer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { WidgetConfig } from "@/components/widgets/types";

interface FunnelData {
  id: string;
  name: string;
  steps: Array<{
    id: string;
    label: string;
    widgets: WidgetConfig[];
  }>;
  status: string;
  publicUrl: string;
}

export default function PublicFunnelPage() {
  const params = useParams();
  const funnelId = params.id as string;

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPublicFunnel = async () => {
      setIsLoading(true);
      try {
        // Tentar carregar funil público do localStorage
        const publicFunnelData = localStorage.getItem(
          `public_funnel_${funnelId}`,
        );

        if (publicFunnelData) {
          const funnel = JSON.parse(publicFunnelData);
          if (funnel.status === "published") {
            setFunnelData(funnel);
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Erro ao carregar funil público:", error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPublicFunnel();
  }, [funnelId]);

  const nextStep = () => {
    if (funnelData && currentStep < funnelData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetFunnel = () => {
    setCurrentStep(0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando funil...</p>
        </div>
      </div>
    );
  }

  if (notFound || !funnelData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-2">Funil não encontrado</h1>
          <p className="text-muted-foreground mb-6">
            O funil que você está procurando não existe ou não foi publicado.
          </p>
          <Button onClick={() => window.history.back()}>
            <IconChevronLeft className="size-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage =
    ((currentStep + 1) / funnelData.steps.length) * 100;
  const currentStepData = funnelData.steps[currentStep];
  const isLastStep = currentStep === funnelData.steps.length - 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Header com progresso */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10">
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
        <div className="space-y-6 min-h-[60vh]">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {currentStepData.label}
            </h2>
          </div>

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
            <IconChevronLeft className="size-4 mr-2" />
            Anterior
          </Button>

          <div className="flex gap-2">
            {funnelData.steps.map((_, index) => (
              <div
                key={`step-${index}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep
                    ? "bg-primary"
                    : index < currentStep
                      ? "bg-primary/50"
                      : "bg-muted"
                }`}
              />
            ))}
          </div>

          {isLastStep ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetFunnel}>
                Recomeçar
              </Button>
              <Button>Finalizar</Button>
            </div>
          ) : (
            <Button onClick={nextStep}>Próximo</Button>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>Powered by Quizy</p>
        </footer>
      </main>
    </div>
  );
}
