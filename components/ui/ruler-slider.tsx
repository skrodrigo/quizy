"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RulerSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  className?: string;
}

export function RulerSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  className,
}: RulerSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(0);

  const pixelsPerStep = 20;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const deltaX = e.clientX - rect.left - centerX;

      setOffset((prev) => prev + deltaX * 0.5);
    },
    [isDragging],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;

    const steps = Math.round(-offset / 20);
    const newValue = Math.max(min, Math.min(max, value + steps * step));
    const finalValue = Math.round(newValue / step) * step;

    onChange(finalValue);
    setOffset(0);
    setIsDragging(false);
  }, [isDragging, offset, value, min, max, step, onChange]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  const renderTicks = () => {
    const ticks = [];
    const visibleRange = 15;

    for (let i = -visibleRange; i <= visibleRange; i++) {
      const tickValue = value + i * step;
      if (tickValue < min || tickValue > max) continue;

      const position = i * pixelsPerStep + offset;
      const isMainTick = tickValue % (step * 5) === 0;
      const isMediumTick = tickValue % (step * 2) === 0;

      ticks.push(
        <div
          key={i}
          className="absolute flex flex-col items-center"
          style={{
            left: `calc(50% + ${position}px)`,
            transform: "translateX(-50%)",
          }}
        >
          <div
            className={cn(
              "bg-muted-foreground/30",
              isMainTick
                ? "h-8 w-0.5"
                : isMediumTick
                  ? "h-6 w-0.5"
                  : "h-4 w-px",
            )}
          />
          {isMainTick && (
            <span className="mt-2 text-muted-foreground text-xs font-medium">
              {tickValue}
            </span>
          )}
        </div>,
      );
    }

    return ticks;
  };

  const currentDisplayValue =
    Math.round((value + (-offset / pixelsPerStep) * step) / step) * step;
  const clampedDisplayValue = Math.max(min, Math.min(max, currentDisplayValue));

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex items-center justify-center gap-2">
        <div className="font-bold text-4xl">
          {clampedDisplayValue}
          <span className="text-2xl">{unit}</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-24 w-full cursor-grab active:cursor-grabbing select-none overflow-hidden"
        onPointerDown={handlePointerDown}
      >
        <div className="absolute inset-0">{renderTicks()}</div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-0.5 bg-foreground pointer-events-none z-10">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[16px] border-l-transparent border-r-transparent border-b-foreground" />
        </div>

        {/* Linha horizontal embaixo do triângulo */}
        <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-full  h-1 bg-muted pointer-events-none z-20" />
      </div>

      <div className="text-center text-muted-foreground text-sm">
        Arraste para ajustar
      </div>
    </div>
  );
}
