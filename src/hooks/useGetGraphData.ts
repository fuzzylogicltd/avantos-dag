import { useEffect, useState } from "react";
import { Node, Edge } from "../types/nodes";
import { api } from "../data/api";
import { API_URL } from "../env";
import { GraphData } from "../types/graphData";

export const useGetGraphData = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        setLoading(true);
        const graphData = await api(API_URL);

        const formattedNodes: Node[] = graphData.nodes.map((node: Node) => ({
          id: node.id,
          position: node.position,
          data: { label: node.data.name },
        }));

        const formattedEdges: Edge[] = graphData.edges.map((edge: Edge) => ({
          id: `${edge.source}-${edge.target}`,
          source: edge.source,
          target: edge.target,
        }));

        setNodes(formattedNodes);
        setEdges(formattedEdges);
      } catch (err) {
        setError("Failed to fetch graph data");
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  return { nodes, edges, loading, error };
};
