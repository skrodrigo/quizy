"use client";

import dagre from "@dagrejs/dagre";
import {
  addEdge,
  Background,
  type Connection,
  type Edge,
  type EdgeTypes,
  MiniMap,
  type Node,
  type NodeTypes,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useEffect } from "react";
import "@xyflow/react/dist/style.css";
import { useFunnel } from "@/contexts/funnel-context";
import { CustomFunnelNode } from "./custom-funnel-node";
import { DataEdge } from "./data-edge";
import { GroupNode } from "./labeled-group-node";
import { PlaceholderNode } from "./placeholder-node";
import { ZoomSlider } from "./zoom-slider";

const nodeTypes: NodeTypes = {
  custom: CustomFunnelNode,
  group: GroupNode,
  placeholder: PlaceholderNode,
};

const edgeTypes: EdgeTypes = {
  data: DataEdge,
};

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 240;
const nodeHeight = 100;

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = "LR",
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, nodesep: 100, ranksep: 150 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode: Node = {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

export function FunnelFlow() {
  const { steps } = useFunnel();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    const newNodes: Node[] = steps.map((step) => ({
      id: step.id,
      type: "custom",
      data: { label: step.label },
      position: { x: 0, y: 0 },
    }));

    const newEdges: Edge[] = steps.slice(0, -1).map((step, index) => ({
      id: `e${step.id}-${steps[index + 1].id}`,
      source: step.id,
      target: steps[index + 1].id,
      type: "data",
      data: {
        path: "smoothstep",
      },
      animated: true,
      className: "stroke-muted-foreground stroke-[2.5] [stroke-dasharray:8,4]",
    }));

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      newEdges,
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [steps, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        ...params,
        id: `${params.source}-${params.target}`,
        type: "data",
        data: {
          path: "smoothstep",
        },
        animated: true,
        className:
          "stroke-muted-foreground stroke-[2.5] [stroke-dasharray:8,4]",
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges],
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        className="bg-background"
        defaultEdgeOptions={{
          animated: true,
          className:
            "stroke-muted-foreground stroke-[2.5] [stroke-dasharray:8,4]",
        }}
      >
        <Background className="[&>*]:stroke-muted-foreground/10" />
        <ZoomSlider
          position="bottom-left"
          className="bg-card backdrop-blur-md border border-border rounded-xl"
        />
        <MiniMap className="bg-card backdrop-blur-md border border-border rounded-xl" />
      </ReactFlow>
    </div>
  );
}
