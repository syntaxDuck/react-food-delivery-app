import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import useFetch from "../../functions/useFetch";

describe("useFetch", () => {
  test("returns data on success", async () => {
    const mockResponse = { message: "ok" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      })
    );

    const { result } = renderHook(() => useFetch<typeof mockResponse>("/api/test"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.error).toBeNull();
  });

  test("returns error on failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      })
    );

    const { result } = renderHook(() => useFetch("/api/error"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toMatch(/HTTP error/);
  });
});
