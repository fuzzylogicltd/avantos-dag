import { describe, it, expect, vi } from "vitest";
import { api } from "./api";

global.fetch = vi.fn();

describe("api", () => {
  it("should return data when the fetch is successful", async () => {
    const mockData = { key: "value" };
    fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockData),
    });

    const result = await api("https://example.com");

    expect(fetch).toHaveBeenCalledWith("https://example.com");
    expect(result).toEqual(mockData);
  });

  it("should return an error message when the fetch fails", async () => {
    const mockError = new Error("Network error");
    fetch.mockRejectedValueOnce(mockError);

    const result = await api("https://example.com");

    expect(fetch).toHaveBeenCalledWith("https://example.com");
    expect(result).toBe(`api error: ${mockError}`);
  });
});