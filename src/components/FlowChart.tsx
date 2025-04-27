import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Edge, Node } from "../types/graphData";
import { Dispatch, SetStateAction } from "react";

interface FlowChartProps {
  openFormHandler: Dispatch<SetStateAction<Node | null>>;
  nodes: Node[];
  edges: Edge[];
}

export const FlowChart = ({
  openFormHandler,
  nodes,
  edges,
}: FlowChartProps) => {
  const transformedNodes = nodes.map((node: Node) => ({
    id: node.id,
    position: node.position,
    data: { label: node.data.name },
  }));

  const transformedEdges = edges.map((edge: Edge) => ({
    id: `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
  }));

  const handleElementClick = (event, element) => {
    console.log({ event }, { element });
    const nodeClicked = nodes.find((node) => node.id === element.id);

    if (!nodeClicked) {
      return;
    }

    openFormHandler(nodeClicked);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={transformedNodes}
        edges={transformedEdges}
        onNodeClick={handleElementClick}
      />
    </div>
  );
};
