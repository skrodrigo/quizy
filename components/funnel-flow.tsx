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
import { useCallback } from "react";
import "@xyflow/react/dist/style.css";
import { CustomFunnelNode } from "./flow/custom-funnel-node";
import { DataEdge } from "./flow/data-edge";
import { GroupNode } from "./flow/labeled-group-node";
import { PlaceholderNode } from "./flow/placeholder-node";
import { ZoomSlider } from "./flow/zoom-slider";

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

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    data: { label: "Etapa 1: Boas-vindas" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "custom",
    data: { label: "Etapa 2: Captura de Lead" },
    position: { x: 0, y: 0 },
  },
  {
    id: "3",
    type: "custom",
    data: { label: "Etapa 3: Conversão" },
    position: { x: 0, y: 0 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "data",
    data: {
      path: "smoothstep",
    },
    animated: true,
    className: "stroke-muted-foreground stroke-[2.5] [stroke-dasharray:8,4]",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "data",
    data: {
      path: "smoothstep",
    },
    animated: true,
    className: "stroke-muted-foreground stroke-[2.5] [stroke-dasharray:8,4]",
  },
];

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = "TB",
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

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

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);

export function FunnelFlow() {
  const [nodes, , onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

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
        className: "stroke-muted-foreground stroke-[2.5] [stroke-dasharray:8,4]",
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
          className: "stroke-muted-foreground stroke-[2.5] [stroke-dasharray:8,4]",
        }}
      >
        <Background className="[&>*]:stroke-muted-foreground/20" />
        <ZoomSlider position="bottom-left" className="bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-lg" />
        <MiniMap className="bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-lg [&_.react-flow__minimap-mask]:fill-background/90 [&_.react-flow__minimap-node]:fill-muted [&_.react-flow__minimap-node]:stroke-muted-foreground" />
      </ReactFlow>
    </div>
  );
}
