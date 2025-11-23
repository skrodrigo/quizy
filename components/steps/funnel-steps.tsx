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
import {
  IconDots,
  IconGripVertical,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFunnel } from "@/contexts/funnel-context";

interface Step {
  id: string;
  label: string;
}

interface SortableStepProps {
  step: Step;
  onRename: (id: string, newLabel: string) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function SortableStep({
  step,
  onRename,
  onDelete,
  isSelected,
  onSelect,
}: SortableStepProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: step.id });
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(step.label);
  const inputRef = useRef<HTMLInputElement>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(step.label);
  };

  const handleBlur = () => {
    if (editValue.trim() && editValue !== step.label) {
      onRename(step.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setEditValue(step.label);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <div ref={setNodeRef} style={style}>
        <Input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="h-10"
        />
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group w-full">
      <Button
        variant="outline"
        className={`w-[190px] justify-start gap-2 pr-10 overflow-hidden group/button transition-all ${isSelected
          ? "ring-2 ring-primary shadow-md opacity-100"
          : "opacity-60 hover:opacity-100"
          }`}
        onClick={() => onSelect(step.id)}
        onDoubleClick={handleDoubleClick}
      >
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing flex-shrink-0"
        >
          <IconGripVertical stroke={2} className="size-4" />
        </div>
        <span className="text-foreground flex-1 text-left min-w-0 relative whitespace-nowrap overflow-hidden">
          {step.label}
          <span className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background group-hover/button:from-accent to-transparent dark:from-[#151515] dark:group-hover/button:from-[#1D1D1D] pointer-events-none transition-colors" />
        </span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          >
            <IconDots stroke={2} className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <DropdownMenuItem
            onSelect={() => {
              setIsEditing(true);
              setEditValue(step.label);
            }}
          >
            <IconPencil stroke={2} className="size-4 mr-2" />
            Renomear
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => onDelete(step.id)}
            className="text-destructive focus:text-destructive"
          >
            <IconTrash
              stroke={2}
              className="size-4 mr-2 text-destructive focus:text-destructive"
            />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function FunnelSteps() {
  const {
    steps,
    addStep,
    deleteStep,
    renameStep,
    reorderSteps,
    selectedStepId,
    setSelectedStepId,
  } = useFunnel();
  const [stepId, setStepId] = useQueryState("step");
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const isUpdatingFromUrl = useRef(false);
  const isUpdatingFromContext = useRef(false);

  useEffect(() => {
    if (stepId && stepId !== selectedStepId && !isUpdatingFromContext.current) {
      isUpdatingFromUrl.current = true;
      setSelectedStepId(stepId);
      isUpdatingFromUrl.current = false;
    }
  }, [stepId, selectedStepId, setSelectedStepId]);

  useEffect(() => {
    if (
      selectedStepId &&
      selectedStepId !== stepId &&
      !isUpdatingFromUrl.current
    ) {
      isUpdatingFromContext.current = true;
      setStepId(selectedStepId);
      isUpdatingFromContext.current = false;
    }
  }, [selectedStepId, stepId, setStepId]);

  const handleScroll = useCallback(() => {
    const scrollElement = scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );

    if (!scrollElement) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollElement;
    const newShowTopFade = scrollTop > 0;
    const newShowBottomFade = scrollTop + clientHeight < scrollHeight - 1;

    setShowTopFade((prev) => (prev !== newShowTopFade ? newShowTopFade : prev));
    setShowBottomFade((prev) =>
      prev !== newShowBottomFade ? newShowBottomFade : prev,
    );
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );

    if (!scrollElement) return;

    const timeoutId = setTimeout(handleScroll, 100);
    scrollElement.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timeoutId);
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = steps.findIndex((item) => item.id === active.id);
      const newIndex = steps.findIndex((item) => item.id === over.id);
      reorderSteps(arrayMove(steps, oldIndex, newIndex));
    }
  };

  const handleSelectStep = (id: string) => {
    setSelectedStepId(id);
  };

  return (
    <div className="bg-[#ffffff] border rounded-xl m-1 min-w-[200px] max-w-[200px] h-[calc(70vh)] relative overflow-hidden">
      {showTopFade && (
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none rounded-t-xl transition-opacity duration-200" />
      )}

      <ScrollArea ref={scrollRef}>
        <div className="p-1 space-y-2 py-2">
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
                <SortableStep
                  key={step.id}
                  step={step}
                  onRename={renameStep}
                  onDelete={deleteStep}
                  isSelected={selectedStepId === step.id}
                  onSelect={handleSelectStep}
                />
              ))}
            </SortableContext>
          </DndContext>

          <Button
            variant="link"
            className="w-full justify-center mb-2"
            onClick={addStep}
          >
            <IconPlus stroke={2} className="size-4" />
            <span className="text-foreground">Adicionar Etapa</span>
          </Button>
        </div>
      </ScrollArea>

      {showBottomFade && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none rounded-b-xl transition-opacity duration-200" />
      )}
    </div>
  );
}
