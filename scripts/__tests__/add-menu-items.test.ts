import { describe, expect, test } from "vitest";

import { validateMenuItems } from "../add-menu-items.js";

describe("validateMenuItems", () => {
  test("accepts a record keyed by name", () => {
    const data = {
      "Sushi Roll": {
        id: "item-1",
        price: 12.99,
        description: "Fresh salmon and avocado",
        category: "sushi"
      }
    };

    expect(validateMenuItems(data)["Sushi Roll"].name).toBe("Sushi Roll");
  });

  test("rejects missing fields", () => {
    const data = {
      "Sushi Roll": {
        id: "item-1",
        name: "Sushi Roll",
        price: 12.99
      }
    };

    expect(() => validateMenuItems(data)).toThrow(/missing required field/i);
  });

  test("rejects invalid price", () => {
    const data = {
      "Sushi Roll": {
        id: "item-1",
        price: "12.99",
        description: "Fresh salmon and avocado",
        category: "sushi"
      }
    } as unknown as Record<string, unknown>;

    expect(() => validateMenuItems(data)).toThrow(/invalid price/i);
  });

  test("rejects array input", () => {
    const data = [];
    expect(() => validateMenuItems(data)).toThrow(/object keyed by item name/i);
  });
});
