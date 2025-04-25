import { ReactFlow } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const res = await fetch(
  "http://localhost:3000/api/v1/project123/actions/blueprints/blueprint456/graph"
);
const graphData = await res.json();
console.log({ graphData });

const someNodes = graphData.nodes.map((node) => {
  return {
    id: node.id,
    position: node.position,
    data: { label: node.data.name },
  };
});

const someEdges = graphData.edges.map((edge) => {
  return {
    id: `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
  };
});

export default function App() {
  const handleElementClick = (event, element) => {
    console.log({ event }, { element });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={someNodes}
        edges={someEdges}
        onNodeClick={handleElementClick}
      />
    </div>
  );
}
