"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical, IconPlus } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Step {
  id: string;
  label: string;
}

interface SortableStepProps {
  step: Step;
}

function SortableStep({ step }: SortableStepProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Button variant="outline" className="w-full justify-start gap-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
          <IconGripVertical stroke={2} className="size-4" />
        </div>
        <span className="text-foreground">{step.label}</span>
      </Button>
    </div>
  );
}

export function FunnelSteps() {
  const [steps, setSteps] = useState<Step[]>([
    { id: "1", label: "Etapa 1" },
    { id: "2", label: "Etapa 2" },
    { id: "3", label: "Etapa 3" },
    { id: "4", label: "Etapa 4" },
    { id: "5", label: "Etapa 5" },
    { id: "6", label: "Etapa 6" },
    { id: "7", label: "Etapa 7" },
    { id: "8", label: "Etapa 8" },
    { id: "9", label: "Etapa 9" },
    { id: "10", label: "Etapa 10" },
    { id: "11", label: "Etapa 11" },


  ]);

  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    const scrollElement = scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );

    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      setShowTopFade(scrollTop > 0);
      setShowBottomFade(scrollTop + clientHeight < scrollHeight - 1);
    };

    const timeoutId = setTimeout(handleScroll, 100);
    scrollElement.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timeoutId);
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddStep = () => {
    const newId = String(steps.length + 1);
    setSteps([...steps, { id: newId, label: `Etapa ${newId}` }]);
  };

  return (
    <div className="border rounded-xl m-1 min-w-[200px] max-w-[200px] h-[calc(100vh-60px)] relative overflow-hidden">
      {showTopFade && (
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none rounded-t-xl transition-opacity duration-700" />
      )}

      <ScrollArea ref={scrollRef} className="h-[calc(100vh-50px)]">
        <div className="p-1 space-y-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={steps}
              strategy={verticalListSortingStrategy}
            >
              {steps.map((step) => (
                <SortableStep key={step.id} step={step} />
              ))}
            </SortableContext>
          </DndContext>

          <Button
            variant="link"
            className="w-full justify-center mb-2"
            onClick={handleAddStep}
          >
            <IconPlus stroke={2} className="size-4" />
            <span className="text-foreground">Adicionar Etapa</span>
          </Button>
        </div>
      </ScrollArea>

      {showBottomFade && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none rounded-b-xl transition-opacity duration-700" />
      )}
    </div>
  );
}
