import { useEffect, useState } from "react";
import { api } from "../data/api";
import { API_URL } from "../env";
import { GraphData, Node } from "../types/graphData";

export const useGetGraphData = (currentNode: Node | null) => {
  const [data, setData] = useState<GraphData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentNodeHierarchy, setCurrentNodeHierarchy] = useState<Node[]>([]);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        setLoading(true);
        const graphData = await api(API_URL);

        setData(graphData);
      } catch (err) {
        setError("Failed to fetch graph data");
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  useEffect(() => {
    if (!currentNode) {
      return;
    }

    const nodeHierarchy: Node[] = [];
    const ancestorNodes = getParentNodes(currentNode, nodeHierarchy);

    setCurrentNodeHierarchy(ancestorNodes);
  }, [currentNode, data]);

  function getParentNodes(node: Node, nodeHierarchy: Node[]): Node[] {
    node.data.prerequisites.forEach((parentNodeLink) => {
      const parentNode = data?.nodes.find((node) => node.id === parentNodeLink);

      if (!parentNode) {
        return;
      }

      nodeHierarchy.push(parentNode);

      if (parentNode?.data.prerequisites) {
        getParentNodes(parentNode, nodeHierarchy);
      }
    });

    return nodeHierarchy;
  }

  return { data, loading, error, currentNodeHierarchy };
};
