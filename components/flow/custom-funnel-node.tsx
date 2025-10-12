import { Handle, type NodeProps, Position } from "@xyflow/react";

export function CustomFunnelNode({ data }: NodeProps) {
  return (
    <div className="relative bg-card border-2 border-border rounded-2xl shadow-lg hover:shadow-xl hover:border-muted-foreground transition-all min-w-[240px] backdrop-blur-sm">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-4 !h-4 !bg-muted-foreground !border-2 !border-background !rounded-full hover:!bg-foreground hover:!scale-125 transition-all"
      />

      <div className="px-6 py-4">
        <div className="text-base font-semibold text-foreground text-center">
          {String(data?.label || "")}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-4 !h-4 !bg-muted-foreground !border-2 !border-background !rounded-full hover:!bg-foreground hover:!scale-125 transition-all"
      />
    </div>
  );
}
