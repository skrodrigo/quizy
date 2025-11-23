"use client";

import { IconMaximize, IconMinus, IconPlus } from "@tabler/icons-react";
import {
  Panel,
  type PanelProps,
  useReactFlow,
  useStore,
  useViewport,
} from "@xyflow/react";
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export const ZoomSlider = forwardRef<
  HTMLDivElement,
  Omit<PanelProps, "children">
>(({ className, ...props }, ref) => {
  const { zoom } = useViewport();
  const { zoomTo, zoomIn, zoomOut, fitView } = useReactFlow();
  const minZoom = useStore((state) => state.minZoom);
  const maxZoom = useStore((state) => state.maxZoom);

  return (
    <Panel
      className={cn(
        "flex gap-1 rounded-md bg-primary-foreground p-1 text-foreground",
        className,
      )}
      ref={ref}
      {...props}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => zoomOut({ duration: 300 })}
      >
        <IconMinus className="h-4 w-4" />
      </Button>
      <Slider
        className="w-[140px]"
        value={[zoom]}
        min={minZoom}
        max={maxZoom}
        step={0.01}
        onValueChange={(values) => zoomTo(values[0])}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => zoomIn({ duration: 300 })}
      >
        <IconPlus className="h-4 w-4" />
      </Button>
      <Button
        className="min-w-20 tabular-nums"
        variant="ghost"
        onClick={() => zoomTo(1, { duration: 300 })}
      >
        {(100 * zoom).toFixed(0)}%
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => fitView({ duration: 300 })}
      >
        <IconMaximize className="h-4 w-4" />
      </Button>
    </Panel>
  );
});

ZoomSlider.displayName = "ZoomSlider";
