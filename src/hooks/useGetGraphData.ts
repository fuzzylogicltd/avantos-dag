import { useEffect, useState } from "react";
import { api } from "../data/api";
import { API_URL } from "../env";
import { GraphData } from "../types/graphData";

export const useGetGraphData = () => {
  const [data, setData] = useState<GraphData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return { data, loading, error };
};
