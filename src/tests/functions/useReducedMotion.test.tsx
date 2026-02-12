import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { useReducedMotion } from "../../functions/useReducedMotion";

describe("useReducedMotion", () => {
  test("returns matchMedia preference", () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: true,
        addEventListener,
        removeEventListener,
      })),
    });

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });
});
