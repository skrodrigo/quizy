"use client";

import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RulerSlider } from "@/components/ui/ruler-slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CartesianChartRenderer } from "@/components/widgets/renderers/cartesian-chart-renderer";
import type {
  ArgumentWidgetContent,
  CaptureWidgetContent,
  CartesianChartWidgetContent,
  CarouselWidgetContent,
  LoadingWidgetContent,
  OptionWidgetContent,
  TermsWidgetContent,
  WidgetConfig,
} from "@/components/widgets/types";

interface WidgetRendererProps {
  widget: WidgetConfig;
}

function LoadingWidgetRenderer({ content }: { content: LoadingWidgetContent }) {
  const variant = content.variant || "spinner";
  const message = content.message || "Carregando...";

  const renderSpinner = () => {
    switch (variant) {
      case "spinner":
        return <LoaderIcon className="h-6 w-6 animate-spin text-primary" />;

      case "dots":
        return (
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
            <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
            <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
          </div>
        );

      case "pulse":
        return (
          <div className="relative h-6 w-6">
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
            <div className="relative h-6 w-6 rounded-full bg-primary" />
          </div>
        );

      default:
        return <LoaderIcon className="h-6 w-6 animate-spin text-primary" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      {renderSpinner()}
      {message && (
        <p className="text-sm text-muted-foreground text-center">{message}</p>
      )}
    </div>
  );
}

function WeightWidgetRenderer({ widget }: WidgetRendererProps) {
  const content = widget.content as {
    value?: number;
    unit?: "kg" | "lb" | "g";
  };
  const [value, setValue] = useState(content.value || 70);
  const [unit, setUnit] = useState(content.unit || "kg");

  const getMinMax = (unit: string) => {
    switch (unit) {
      case "kg":
        return { min: 20, max: 200, step: 0.5 };
      case "lb":
        return { min: 40, max: 440, step: 1 };
      case "g":
        return { min: 20000, max: 200000, step: 100 };
      default:
        return { min: 20, max: 200, step: 0.5 };
    }
  };

  const { min, max, step } = getMinMax(unit);

  return (
    <div className="p-6 space-y-4">
      <Tabs
        value={unit}
        onValueChange={(value) => setUnit(value as "kg" | "lb" | "g")}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="kg">kg</TabsTrigger>
          <TabsTrigger value="lb">lb</TabsTrigger>
          <TabsTrigger value="g">g</TabsTrigger>
        </TabsList>
      </Tabs>

      <RulerSlider
        value={value}
        onChange={setValue}
        min={min}
        max={max}
        step={step}
        unit={unit}
      />
    </div>
  );
}

function HeightWidgetRenderer({ widget }: WidgetRendererProps) {
  const content = widget.content as {
    value?: number;
    unit?: "cm" | "m" | "ft" | "in";
  };
  const [value, setValue] = useState(content.value || 170);
  const [unit, setUnit] = useState(content.unit || "cm");

  const getMinMax = (unit: string) => {
    switch (unit) {
      case "cm":
        return { min: 50, max: 250, step: 1 };
      case "m":
        return { min: 0.5, max: 2.5, step: 0.01 };
      case "ft":
        return { min: 2, max: 8, step: 0.1 };
      case "in":
        return { min: 20, max: 100, step: 1 };
      default:
        return { min: 50, max: 250, step: 1 };
    }
  };

  const { min, max, step } = getMinMax(unit);

  return (
    <div className="p-6 space-y-4">
      <Tabs
        value={unit}
        onValueChange={(value) => setUnit(value as "cm" | "m" | "ft" | "in")}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cm">cm</TabsTrigger>
          <TabsTrigger value="m">m</TabsTrigger>
          <TabsTrigger value="ft">ft</TabsTrigger>
          <TabsTrigger value="in">in</TabsTrigger>
        </TabsList>
      </Tabs>

      <RulerSlider
        value={value}
        onChange={setValue}
        min={min}
        max={max}
        step={step}
        unit={unit}
      />
    </div>
  );
}

export function WidgetRenderer({ widget }: WidgetRendererProps) {
  const style = {
    backgroundColor: widget.style.backgroundColor,
    color: widget.style.textColor,
    borderRadius: widget.style.borderRadius,
    padding: widget.style.padding,
    margin: widget.style.margin,
    fontSize: widget.style.fontSize,
    fontWeight: widget.style.fontWeight,
    textAlign: widget.style.textAlign,
    width: widget.style.width,
    height: widget.style.height,
  };

  switch (widget.type) {
    case "texto":
      return (
        <div style={style} className="p-4">
          <p className="text-foreground">
            {(widget.content as { text?: string }).text ||
              "Digite seu texto aqui"}
          </p>
        </div>
      );

    case "botao":
      return (
        <div className="p-4">
          <Button style={style}>
            {(widget.content as { label?: string }).label || "Clique aqui"}
          </Button>
        </div>
      );

    case "progresso":
      return (
        <div className="p-4 space-y-2">
          <Progress
            value={(widget.content as { value?: number }).value || 0}
            className="w-full"
          />
          {(widget.content as { showLabel?: boolean }).showLabel !== false && (
            <p className="text-sm text-muted-foreground text-center">
              {(widget.content as { value?: number }).value || 0}%
            </p>
          )}
        </div>
      );

    case "timer":
      return (
        <div style={style} className="p-4 text-center">
          <p className="text-2xl font-bold">
            {(widget.content as { format?: string }).format === "hh:mm:ss"
              ? "00:00:00"
              : "00:00"}
          </p>
        </div>
      );

    case "video":
      return (
        <div className="p-4">
          <div
            style={style}
            className="bg-muted rounded-lg flex items-center justify-center aspect-video"
          >
            <p className="text-muted-foreground">Vídeo Player</p>
          </div>
        </div>
      );

    case "audio": {
      const audioContent = widget.content as {
        url?: string;
        style?: "whatsapp" | "instagram";
        duration?: string;
      };
      const audioStyle = audioContent.style || "whatsapp";
      const duration = audioContent.duration || "0:00";

      if (audioStyle === "whatsapp") {
        return (
          <div className="p-4 max-w-xs">
            <div className="bg-[#1f2c33] rounded-lg p-3 flex items-center gap-3">
              <button type="button" className="size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg className="size-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-label="Play">
                  <title>Play</title>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 flex items-center gap-0.5 h-8">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={`waveform-${i}`}
                      className="w-0.5 bg-white/30 rounded-full transition-all"
                      style={{
                        height: `${Math.random() * 100}%`,
                        minHeight: "20%",
                      }}
                    />
                  ))}
                </div>
              </div>

              <span className="text-white/60 text-xs font-medium whitespace-nowrap">
                {duration}
              </span>
            </div>
          </div>
        );
      }

      return (
        <div className="p-4 max-w-2xl">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 flex items-center gap-6">
            <button type="button" className="size-16 rounded-full bg-white hover:bg-white/90 flex items-center justify-center transition-colors shadow-lg">
              <svg className="size-8 text-slate-900 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-label="Play">
                <title>Play</title>
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-1 h-16">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={`wave-${i}`}
                    className="w-1 bg-white rounded-full transition-all"
                    style={{
                      height: `${Math.random() * 100}%`,
                      minHeight: "25%",
                    }}
                  />
                ))}
              </div>
              <button type="button" className="text-white/80 hover:text-white text-sm transition-colors">
                Ver transcrição
              </button>
            </div>

            <span className="text-white text-lg font-medium">
              {duration}
            </span>
          </div>
        </div>
      );
    }

    case "espaco":
      return (
        <div
          style={{
            height: (widget.content as { height?: string }).height || "40px",
          }}
        />
      );

    case "alerta":
      return (
        <div style={style} className="p-4 border rounded-lg">
          <p className="font-semibold">
            {(widget.content as { title?: string }).title || "Alerta"}
          </p>
          <p className="text-sm mt-1">
            {(widget.content as { message?: string }).message ||
              "Mensagem do alerta"}
          </p>
        </div>
      );

    case "preco": {
      const priceContent = widget.content as {
        title?: string;
        badge?: string;
        price?: number;
        currency?: string;
        period?: string;
      };
      
      return (
        <div className="w-full max-w-md mx-auto overflow-hidden rounded-lg border bg-card">
          <div className="bg-foreground px-6 py-3 text-center">
            <h3 className="font-semibold text-background text-sm">
              {priceContent.title || "Mais Popular"}
            </h3>
          </div>
          
          <div className="p-6 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="font-bold text-2xl">
                {priceContent.title || "Plano Premium"}
              </h2>
            </div>
            
            <div className="rounded-lg bg-muted px-4 py-3 text-right">
              {priceContent.badge && (
                <p className="text-muted-foreground text-xs mb-1">
                  {priceContent.badge}
                </p>
              )}
              <p className="font-bold text-2xl">
                {priceContent.currency || "R$"} {priceContent.price || "0"}
              </p>
              {priceContent.period && (
                <p className="text-muted-foreground text-xs mt-1">
                  {priceContent.period}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    case "loading":
      return (
        <LoadingWidgetRenderer
          content={widget.content as LoadingWidgetContent}
        />
      );

    case "peso":
      return <WeightWidgetRenderer widget={widget} />;

    case "altura":
      return <HeightWidgetRenderer widget={widget} />;

    case "carrosel": {
      const carouselContent = widget.content as CarouselWidgetContent;
      const aspectRatioMap = {
        square: 1,
        video: 16 / 9,
        portrait: 3 / 4,
      };
      const ratio = aspectRatioMap[carouselContent.aspectRatio || "video"];

      return (
        <div className="w-full max-w-3xl mx-auto p-6">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {carouselContent.items?.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="p-2">
                    <AspectRatio ratio={ratio}>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.alt || "Slide"}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                          <p className="text-muted-foreground">Adicione uma imagem</p>
                        </div>
                      )}
                    </AspectRatio>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      );
    }

    case "cartesiano":
      return (
        <CartesianChartRenderer
          content={widget.content as CartesianChartWidgetContent}
        />
      );

    case "termos": {
      const termsContent = widget.content as TermsWidgetContent;
      return (
        <div className="p-6 text-center">
          <p className="text-muted-foreground text-sm mb-2">
            {termsContent.text || "Ao clicar em alguma das opções, você concorda com os"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1 text-sm">
            {termsContent.terms?.map((term, index) => (
              <span key={index}>
                <a
                  href={term.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline hover:text-primary"
                >
                  {term.label}
                </a>
                {index < termsContent.terms.length - 1 && (
                  <span className="text-muted-foreground">
                    {index === termsContent.terms.length - 2 ? " e " : ", "}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      );
    }

    case "opcao": {
      const optionContent = widget.content as OptionWidgetContent;
      const columns = optionContent.columns || 2;
      const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
      }[columns];

      return (
        <div className="p-6">
          <RadioGroup defaultValue={optionContent.options?.[0]?.id}>
            <div className={`grid ${gridCols} gap-4`}>
              {optionContent.options?.map((option) => (
                <div key={option.id} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <label
                    htmlFor={option.id}
                    className="flex-1 text-sm font-medium cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      );
    }

    case "argumento": {
      const argumentContent = widget.content as ArgumentWidgetContent;
      const columns = argumentContent.columns || 3;
      const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
      }[columns];

      return (
        <div className="p-6">
          <div className={`grid ${gridCols} gap-6`}>
            {argumentContent.arguments?.map((arg) => (
              <div key={arg.id} className="flex flex-col gap-4 p-6 border rounded-xl hover:shadow-lg transition-shadow bg-card">
                {arg.image && (
                  <div className="w-full aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={arg.image}
                      alt={arg.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold">{arg.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {arg.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "captura": {
      const captureContent = widget.content as CaptureWidgetContent;
      const aspectRatioMap = {
        square: 1,
        video: 16 / 9,
        portrait: 3 / 4,
      };
      const ratio = aspectRatioMap[captureContent.imageAspectRatio || "video"];

      return (
        <div className="p-6 max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {captureContent.image && (
              <div className="w-full">
                <AspectRatio ratio={ratio}>
                  <img
                    src={captureContent.image}
                    alt="Captura"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </AspectRatio>
              </div>
            )}
            <div className="space-y-4">
              {captureContent.fields?.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </div>
              ))}
              <Button className="w-full">
                {captureContent.submitLabel || "Enviar"}
              </Button>
            </div>
          </div>
        </div>
      );
    }

    default:
      return (
        <div className="p-4 border border-dashed border-muted rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            Widget: {widget.type}
          </p>
        </div>
      );
  }
}
