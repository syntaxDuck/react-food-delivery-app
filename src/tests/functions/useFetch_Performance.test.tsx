/**
 * @vitest-environment jsdom
 */
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach,describe, expect, test, vi } from "vitest";

import useFetch from "../../functions/useFetch";

describe("useFetch performance", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: "ok" }),
      })
    );
  });

  test("does not re-fetch when parent re-renders with default params", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");

    const { rerender, result } = renderHook(() => useFetch("/api/test"));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    // Rerender the hook (simulating parent re-render)
    rerender();

    // It SHOULD NOT call fetch again
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  test("does not re-fetch when params are stable", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");
    const params = { method: "GET" as const };

    const { rerender, result } = renderHook(({ p }) => useFetch("/api/test", p), {
      initialProps: { p: params }
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    rerender({ p: params });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
