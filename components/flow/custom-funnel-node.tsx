import { type NodeProps, Position } from "@xyflow/react";
import { BaseHandle } from "./base-handle";
import { BaseNode, BaseNodeContent } from "./base-node";

export function CustomFunnelNode({ data }: NodeProps) {
  return (
    <BaseNode className="min-w-[240px] shadow-lg">
      <BaseHandle type="target" position={Position.Top} />

      <BaseNodeContent className="px-6 py-4">
        <div className="text-base font-semibold text-foreground text-center">
          {String(data?.label || "")}
        </div>
      </BaseNodeContent>

      <BaseHandle type="source" position={Position.Bottom} />
    </BaseNode>
  );
}
