import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useGetGraphData } from "./hooks/useGetGraphData";

export const FlowChart = () => {
  const { nodes, edges, loading, error } = useGetGraphData();

  const handleElementClick = (event, element) => {
    console.log({ event }, { element });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={handleElementClick} />
    </div>
  );
};
