import { describe, it, expect, vi } from "vitest";
import { useGetGraphData } from "./useGetGraphData";
import { api } from "../data/api";
import { API_URL } from "../env";
import { renderHook, act } from "@testing-library/react";

vi.mock("../data/api");

describe("useGetGraphData", () => {
  it("should fetch graph data and update state", async () => {
    const mockGraphData = { nodes: [], edges: [] };
    api.mockResolvedValueOnce(mockGraphData);

    const { result } = renderHook(() => useGetGraphData(null));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      // Wait for the fetch to complete
    });

    expect(api).toHaveBeenCalledWith(API_URL);
    expect(result.current.data).toEqual(mockGraphData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should set an error state when the API call fails", async () => {
    api.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useGetGraphData(null));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      // Wait for the fetch to complete
    });

    expect(api).toHaveBeenCalledWith(API_URL);
    expect(result.current.data).toBeUndefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Failed to fetch graph data");
  });

  it("should update currentNodeHierarchy when currentNode is provided", async () => {
    const mockGraphData = {
      nodes: [
        { id: "1", data: { prerequisites: ["2"] } },
        { id: "2", data: { prerequisites: [] } },
      ],
      edges: [],
    };
    api.mockResolvedValueOnce(mockGraphData);

    const currentNode = { id: "1", data: { prerequisites: ["2"] } };

    const { result, rerender } = renderHook(
      ({ node }) => useGetGraphData(node),
      { initialProps: { node: null } }
    );

    await act(async () => {
      // Wait for the fetch to complete
    });

    rerender({ node: currentNode });

    expect(result.current.currentNodeHierarchy).toEqual([
      { id: "2", data: { prerequisites: [] } },
    ]);
  });
});