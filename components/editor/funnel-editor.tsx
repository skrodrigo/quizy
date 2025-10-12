/** biome-ignore-all lint/a11y/useSemanticElements: <> */
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
import { IconTrash } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { WidgetConfig } from "@/components/widgets/types";
import { useFunnel } from "@/contexts/funnel-context";
import { WidgetRenderer } from "./widget-renderer";

interface SortableWidgetProps {
  widget: WidgetConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

function SortableWidget({
  widget,
  isSelected,
  onSelect,
  onDelete
}: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });
  const [isDraggingState, setIsDraggingState] = useState(false);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = () => {
    if (!isDraggingState) {
      onSelect(widget.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group"
    >
      <div
        {...attributes}
        {...listeners}
        role="button"
        tabIndex={0}
        onMouseDown={() => setIsDraggingState(false)}
        onMouseMove={() => setIsDraggingState(true)}
        onMouseUp={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick();
          }
        }}
        className={`w-full cursor-grab active:cursor-grabbing transition-all ${isSelected
          ? "border border-chart-3"
          : "hover:ring-2 hover:ring-muted-foreground/20"
          }`}
      >
        <WidgetRenderer widget={widget} />
      </div>
      {isSelected && (
        <div className="absolute -top-3 right-2 flex gap-1 bg-chart-3 border rounded-md shadow-md p-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-4 w-4 hover:bg-transparent"
            onClick={() => onDelete(widget.id)}
          >
            <IconTrash className="text-secondary" />
          </Button>
        </div>
      )}
    </div>
  );
}

export function FunnelEditor() {
  const {
    selectedStepId,
    steps,
    selectedWidgetId,
    setSelectedWidgetId,
    reorderWidgets,
    deleteWidget,
  } = useFunnel();

  const editorContentRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const currentStep = steps.find((step) => step.id === selectedStepId);

  const handleEditorClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === editorContentRef.current) {
      setSelectedWidgetId(null);
    }
  };

  if (!currentStep) {
    return toast.error("Etapa não encontrada");
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && selectedStepId) {
      const oldIndex = currentStep.widgets.findIndex((w) => w.id === active.id);
      const newIndex = currentStep.widgets.findIndex((w) => w.id === over.id);
      const reorderedWidgets = arrayMove(
        currentStep.widgets,
        oldIndex,
        newIndex,
      );
      reorderWidgets(selectedStepId, reorderedWidgets);
    }
  };

  const handleDelete = (widgetId: string) => {
    if (!selectedStepId) return;
    deleteWidget(selectedStepId, widgetId);
    setSelectedWidgetId(null);
  };

  if (currentStep.widgets.length === 0) {
    return <div className="flex-1 flex justify-center items-center "></div>;
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="px-12 h-full">
        <div
          ref={editorContentRef}
          onClick={handleEditorClick}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setSelectedWidgetId(null);
            }
          }}
          role="region"
          tabIndex={-1}
          className="bg-background rounded-lg shadow-sm h-full p-6 space-y-4"
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={currentStep.widgets}
              strategy={verticalListSortingStrategy}
            >
              {currentStep.widgets.map((widget) => (
                <SortableWidget
                  key={widget.id}
                  widget={widget}
                  isSelected={selectedWidgetId === widget.id}
                  onSelect={setSelectedWidgetId}
                  onDelete={handleDelete}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
